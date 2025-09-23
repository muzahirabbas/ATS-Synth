import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, isLoading = false, disabled = false, className = '', ...props }) => {
  return (
    <button
      className={`
        flex items-center justify-center
        px-6 py-3 rounded-md font-semibold text-primary-bg
        bg-accent hover:bg-accent/90
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-bg focus:ring-accent
        transition-all duration-200
        disabled:bg-secondary-text/50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;

