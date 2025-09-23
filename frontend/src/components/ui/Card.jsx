import React from 'react';
export const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-card-bg p-6 md:p-8 rounded-lg border border-card-border shadow-md ${className}`}>
        {children}
      </div>
    );
  };
