import React from 'react';

/**
 * Wallet input component for entering wallet addresses
 */
const WalletInput = ({ 
  address, 
  onAddressChange, 
  onSubmit, 
  loading, 
  error 
}) => {
  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  return (
    <div className="input-section">
      <div className="input-container">
        <input
          type="text"
          value={address}
          onChange={onAddressChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter wallet address (0x...)"
          className={`wallet-input ${error ? 'error' : ''}`}
          disabled={loading}
        />
        <button 
          onClick={onSubmit}
          className="fetch-button"
          disabled={loading || !address.trim()}
        >
          {loading ? 'Loading...' : 'Fetch Assets'}
        </button>
      </div>
    </div>
  );
};

export default WalletInput;