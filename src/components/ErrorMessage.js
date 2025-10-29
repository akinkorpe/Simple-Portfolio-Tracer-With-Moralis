import React from 'react';

/**
 * Error message component
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      {message}
    </div>
  );
};

export default ErrorMessage;