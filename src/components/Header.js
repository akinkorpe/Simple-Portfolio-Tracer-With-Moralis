import React from 'react';

/**
 * Header component with title and theme toggle
 */
const Header = ({ isDarkTheme, onToggleTheme }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-text">
          <h1>Moralis Portfolio Tracker</h1>
          <p className="app-description">
            Enter an Ethereum wallet address to view your cryptocurrency portfolio
          </p>
        </div>
        <button 
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
          title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          <span className="theme-icon">
            {isDarkTheme ? '☀️' : '🌙'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;