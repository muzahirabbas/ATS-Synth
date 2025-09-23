import React from 'react';
import KeywordTag from "../../ui/KeywordTag";

const KeywordGapAnalysis = ({ keywords }) => {
  const { found, missing } = keywords;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Keyword & Skill Analysis</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-medium mb-2 text-success">✅ Found in Your Resume</h3>
          {found && found.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {found.map((kw, i) => <KeywordTag key={i} text={kw} type="found" />)}
            </div>
          ) : (
            <p className="text-sm text-secondary-text">No matching keywords found.</p>
          )}
        </div>
        
        {/* Partial match section can be added later */}
        
        <div>
          <h3 className="text-md font-medium mb-2 text-error">❌ Missing from Your Resume</h3>
          {missing && missing.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missing.map((kw, i) => <KeywordTag key={i} text={kw} type="missing" />)}
            </div>
          ) : (
            <p className="text-sm text-secondary-text">Great job! No essential keywords seem to be missing.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordGapAnalysis;
