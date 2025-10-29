import React from 'react';
import { formatCurrency, formatPercentage, get24hPriceChange } from '../utils/formatters';

// Helper function to extract price from token data
const getTokenPrice = (token) => {
  // Try different possible field names for price
  const possiblePriceFields = [
    'usd_price',
    'usdPrice', 
    'price',
    'current_price',
    'quote.USD.price'
  ];
  
  for (const field of possiblePriceFields) {
    if (field.includes('.')) {
      // Handle nested fields like 'quote.USD.price'
      const parts = field.split('.');
      let value = token;
      for (const part of parts) {
        value = value?.[part];
        if (value === undefined) break;
      }
      if (value !== null && value !== undefined && value !== '') {
        return value;
      }
    } else {
      const value = token[field];
      if (value !== null && value !== undefined && value !== '') {
        return value;
      }
    }
  }
  
  return null;
};

/**
 * Portfolio table component for displaying token data
 */
const PortfolioTable = ({ assets }) => {
  if (!assets || assets.length === 0) {
    return null;
  }

  return (
    <div className="portfolio-section">
      <h2>Portfolio Overview</h2>
      <div className="table-container">
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Name</th>
              <th>Price</th>
              <th>Balance</th>
              <th>Value</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((token) => {
              const priceChange24h = get24hPriceChange(token);
              const tokenPrice = getTokenPrice(token);
              

              
              return (
                <tr key={token.token_address} className="token-row">
                  <td className="token-logo-cell">
                    <img 
                      src={token.thumbnail || token.logo} 
                      alt={token.name || token.symbol}
                      className="token-logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="token-symbol">{token.symbol}</span>
                  </td>
                  <td className="token-name">{token.name || 'Unknown Token'}</td>
                  <td className="token-price">{formatCurrency(tokenPrice)}</td>
                  <td className="token-balance">{token.balance_formatted || 'N/A'}</td>
                  <td className="token-value">{formatCurrency(token.usd_value)}</td>
                  <td className={`token-change ${
                    priceChange24h > 0 ? 'positive' : 
                    priceChange24h < 0 ? 'negative' : 'neutral'
                  }`}>
                    {formatPercentage(priceChange24h)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTable;