import React from 'react';

/**
 * Empty state component for displaying empty states
 */
const EmptyState = ({ icon, title, message }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;