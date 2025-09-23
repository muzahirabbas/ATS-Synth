import React from 'react';
import Gauge from "../../ui/Gauge";

const ATSMatchScore = ({ score }) => {
  return (
    <div className="flex flex-col items-center">
      <Gauge value={score} />
      <h2 className="mt-4 text-xl font-semibold">ATS Match Score</h2>
      <p className="text-secondary-text">
        This score estimates how well your resume matches the job description.
      </p>
    </div>
  );
};

export default ATSMatchScore;
