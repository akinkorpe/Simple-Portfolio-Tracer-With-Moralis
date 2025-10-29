/**
 * Utility functions for formatting data
 */

// Format currency values
export const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '' || value === 0) return 'N/A';
  
  const numValue = Number(value);
  if (isNaN(numValue) || !isFinite(numValue)) return 'N/A';
  
  // Handle very small values
  if (numValue > 0 && numValue < 0.01) {
    return `$${numValue.toFixed(6)}`;
  }
  
  // Handle normal values
  if (numValue < 1000) {
    return `$${numValue.toFixed(2)}`;
  }
  
  // Handle large values with commas
  return `$${numValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format percentage change
export const formatPercentage = (value) => {
  if (value === null || value === undefined || value === '' || isNaN(value)) return 'N/A';
  const numValue = Number(value);
  if (!isFinite(numValue)) return 'N/A';
  const formatted = numValue.toFixed(2);
  return `${numValue > 0 ? '+' : ''}${formatted}%`;
};

// Get 24h price change from token data (handles different field names)
export const get24hPriceChange = (token) => {
  // Try different possible field names for 24h price change
  const possibleFields = [
    'usd_price_24h_percent_change',
    '24hrPercentChange',
    'percent_change_24h',
    'price_change_24h',
    'usd_price_24hr_percent_change',
    'price_change_percentage_24h',
    'quote.USD.percent_change_24h',
    'priceChange24h',
    'percentChange24h'
  ];
  
  for (const field of possibleFields) {
    // Handle nested fields like 'quote.USD.percent_change_24h'
    if (field.includes('.')) {
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
  
  // If no direct field found, try to calculate from current and previous prices
  if (token.usd_price && token.usd_price_24h_ago) {
    const current = Number(token.usd_price);
    const previous = Number(token.usd_price_24h_ago);
    if (current > 0 && previous > 0) {
      return ((current - previous) / previous) * 100;
    }
  }
  
  return null;
};