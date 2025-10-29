import { useState } from 'react';
import { fetchPortfolioData } from '../services/moralisService';

/**
 * Custom hook for portfolio data management
 */
export const usePortfolio = () => {
  const [asset, setAsset] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Main fetch function
  const fetchAsset = async (walletAddress) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const tokens = await fetchPortfolioData(walletAddress);
      setAsset(tokens);
    } catch (error) {
      console.error("Error fetching asset:", error);
      setError(error.message || 'An unexpected error occurred while fetching portfolio data.');
      setAsset([]);
    } finally {
      setLoading(false);
    }
  };

  // Clear error when needed
  const clearError = () => {
    setError(null);
  };

  return {
    asset,
    loading,
    error,
    hasSearched,
    fetchAsset,
    clearError
  };
};