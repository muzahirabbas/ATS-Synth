import React from 'react';
const KeywordTag = ({ text, type = 'default' }) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full";
    
    const typeClasses = {
      found: "bg-success/20 text-success",
      missing: "bg-error/20 text-error",
      partial: "bg-warning/20 text-warning",
      default: "bg-secondary-text/20 text-secondary-text",
    };
  
    return (
      <span className={`${baseClasses} ${typeClasses[type]}`}>
        {text}
      </span>
    );
  };
  
  export default KeywordTag;
