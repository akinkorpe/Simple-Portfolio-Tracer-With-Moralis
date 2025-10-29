import React from 'react';

/**
 * Loading spinner component
 */
const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Fetching portfolio data...</p>
    </div>
  );
};

export default LoadingSpinner;