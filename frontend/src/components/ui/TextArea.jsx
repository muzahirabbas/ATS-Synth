import React from 'react';
const TextArea = ({ id, label, className = '', ...props }) => {
    return (
      <div className="w-full">
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-secondary-text">
          {label}
        </label>
        <textarea
          id={id}
          className={`
            w-full p-3 rounded-md
            bg-primary-bg border border-card-border
            text-primary-text placeholder-secondary-text/50
            focus:outline-none focus:ring-2 focus:ring-accent
            transition-colors duration-200
            resize-y
            ${className}
          `}
          {...props}
        />
      </div>
    );
  };
  
  export default TextArea;
