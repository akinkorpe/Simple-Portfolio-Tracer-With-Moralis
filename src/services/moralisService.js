/**
 * Moralis API Service
 * Handles all API calls to Moralis for portfolio data
 */

// Wallet address validation function
export const isValidWalletAddress = (address) => {
  const walletRegex = /^0x[a-fA-F0-9]{40}$/;
  return walletRegex.test(address);
};

// Main API fetch function with comprehensive error handling
export const fetchPortfolioData = async (walletAddress) => {
  // Validate wallet address format
  if (!walletAddress.trim()) {
    throw new Error('Please enter a wallet address');
  }

  if (!isValidWalletAddress(walletAddress)) {
    throw new Error('Please enter a valid Ethereum wallet address (0x + 40 hex characters)');
  }

  // Check if API key is configured
  if (!process.env.REACT_APP_MORALIS_API_KEY || process.env.REACT_APP_MORALIS_API_KEY === 'your_moralis_api_key_here') {
    throw new Error('Moralis API key is not configured. Please add your API key to the .env file.');
  }

  // Use the tokens endpoint and then fetch price data separately
  const url = `https://deep-index.moralis.io/api/v2.2/wallets/${walletAddress}/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true&limit=100`;
  console.log("Fetching from URL:", url);
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
    },
  });
  
  console.log("Response status:", response.status);
  console.log("Response content-type:", response.headers.get("content-type"));
  
  // Handle HTTP errors
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your Moralis API key configuration.');
    } else if (response.status === 404) {
      throw new Error('Wallet address not found or invalid.');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  
  // Validate content type
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Non-JSON response received:", text.substring(0, 200));
    throw new Error(`Expected JSON response but received: ${contentType}`);
  }
  
  const data = await response.json();
  console.log("API Response:", data);
  
  // Return tokens with fallback to empty array
  const tokens = Array.isArray(data.result) ? data.result : [];
  
  // Debug: Log first token structure to understand available fields
  if (tokens.length > 0) {
    console.log("First token structure:", tokens[0]);
    console.log("Available fields:", Object.keys(tokens[0]));
  }
  
  if (tokens.length === 0) {
    throw new Error('No tokens found for this wallet address.');
  }

  // Enrich tokens with price data
  const enrichedTokens = await enrichTokensWithPriceData(tokens);
  
  return enrichedTokens;
};

// Function to enrich tokens with price data including 24h changes
const enrichTokensWithPriceData = async (tokens) => {
  const enrichedTokens = [];
  
  for (const token of tokens) {
    console.log(`Processing token ${token.symbol}:`, token);
    
    // Check if token already has price data from the main API
    if (token.usd_price && token.usd_price !== null) {
      console.log(`Token ${token.symbol} already has price data: $${token.usd_price}`);
      
      // Use existing price data and enhance with additional fields if needed
      const enrichedToken = {
        ...token,
        // Ensure usd_price_24h_percent_change is properly set
        usd_price_24h_percent_change: token.usd_price_24hr_percent_change || token.usd_price_24h_percent_change
      };
      
      enrichedTokens.push(enrichedToken);
      continue;
    }
    
    // For tokens without price data, try to fetch from price API
    try {
      // Skip native ETH as it doesn't have a separate price endpoint
      if (token.token_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        console.log(`Skipping price fetch for native ETH, using existing data`);
        enrichedTokens.push({
          ...token,
          usd_price: token.usd_price || null,
          usd_price_24h_percent_change: token.usd_price_24hr_percent_change || null
        });
        continue;
      }
      
      // Fetch price data for ERC20 tokens
      const priceUrl = `https://deep-index.moralis.io/api/v2.2/erc20/${token.token_address}/price?chain=eth&include=percent_change`;
      
      const priceResponse = await fetch(priceUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
        },
      });
      
      if (priceResponse.ok) {
         const priceData = await priceResponse.json();
         console.log(`Price data for ${token.symbol}:`, priceData);
         
         // Extract 24h percent change - try different field names
         let percentChange24h = null;
         if (priceData['24hrPercentChange']) {
           percentChange24h = parseFloat(priceData['24hrPercentChange']);
         } else if (priceData.usdPrice24hrPercentChange) {
           percentChange24h = parseFloat(priceData.usdPrice24hrPercentChange);
         } else if (priceData.percent_change_24h) {
           percentChange24h = parseFloat(priceData.percent_change_24h);
         }
         
         console.log(`24h percent change for ${token.symbol}:`, percentChange24h);
         
         // Merge token data with price data
         const enrichedToken = {
           ...token,
           usd_price: priceData.usdPrice || token.usd_price,
           usd_price_24h_percent_change: percentChange24h || token.usd_price_24hr_percent_change,
           // Calculate USD value if not already present
           usd_value: token.usd_value || (token.balance_formatted && priceData.usdPrice 
             ? (parseFloat(token.balance_formatted) * parseFloat(priceData.usdPrice)).toString()
             : null)
         };
         
         enrichedTokens.push(enrichedToken);
       } else {
         // If price fetch fails, use existing token data
         console.warn(`Failed to fetch price for ${token.symbol}:`, priceResponse.status);
         enrichedTokens.push({
           ...token,
           usd_price: token.usd_price || null,
           usd_price_24h_percent_change: token.usd_price_24hr_percent_change || null
         });
       }
     } catch (error) {
       console.error(`Error fetching price for ${token.symbol}:`, error);
       // Add token with existing data if error occurs
       enrichedTokens.push({
         ...token,
         usd_price: token.usd_price || null,
         usd_price_24h_percent_change: token.usd_price_24hr_percent_change || null
       });
     }
   }
   
   return enrichedTokens;
 };