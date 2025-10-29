import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import WalletInput from './components/WalletInput';
import PortfolioTable from './components/PortfolioTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import { useTheme } from './hooks/useTheme';
import { usePortfolio } from './hooks/usePortfolio';

function App() {
  // Local state for wallet address
  const [address, setAddress] = useState('');
  
  // Custom hooks
  const { isDarkTheme, toggleTheme } = useTheme();
  const { asset, loading, error, hasSearched, fetchAsset, clearError } = usePortfolio();



  // Input change handler
  const handleInputChange = (e) => {
    setAddress(e.target.value);
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  // Button click handler
  const handleButtonClick = (e) => {
    e.preventDefault();
    fetchAsset(address);
  };

  return (
    <div className="App">
      <Header 
        isDarkTheme={isDarkTheme} 
        onToggleTheme={toggleTheme} 
      />
      
      <WalletInput
        address={address}
        onAddressChange={handleInputChange}
        onSubmit={handleButtonClick}
        loading={loading}
        error={error}
      />

      {error && (
        <ErrorMessage message={error} />
      )}

      {loading && (
        <LoadingSpinner />
      )}

      {!hasSearched && !loading && (
        <EmptyState 
          icon="📊"
          title="Welcome to Portfolio Tracker"
          message="Enter a valid Ethereum wallet address above to view the token portfolio"
        />
      )}

      {hasSearched && !loading && !error && asset.length > 0 && (
        <div className="container mx-auto px-4">
          <PortfolioTable assets={asset} />
        </div>
      )}

      {hasSearched && !loading && !error && asset.length === 0 && (
        <EmptyState 
          icon="🔍"
          title="No Tokens Found"
          message="This wallet address doesn't contain any tokens or they may be filtered out."
        />
      )}
    </div>
  );
}

export default App;
