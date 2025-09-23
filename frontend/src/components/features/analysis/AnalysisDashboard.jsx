import React from 'react'; // Added React import
import ATSMatchScore from "./ATSMatchScore";
import KeywordGapAnalysis from "./KeywordGapAnalysis";
import AIPoweredFeedback from "./AIPoweredFeedback";
import SkeletonLoader from "../../ui/SkeletonLoader";
import { Card } from "../../ui/Card";

const AnalysisDashboard = ({ analysis, isLoading, error }) => {
  // The "Copy Resume" button has been removed as it's no longer applicable.

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center h-full text-center">
        <h3 className="text-lg font-semibold text-error mb-2">Analysis Failed</h3>
        <p className="text-secondary-text">{error}</p>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold mb-2">CV-Synth Dashboard</h2>
        <p className="text-secondary-text max-w-md">
          Upload your resume, paste a job description, and click "Analyze" to see your results here.
        </p>
      </Card>
    );
  }

  const { score, keywords, feedback } = analysis;

  return (
    <Card className="space-y-8 relative">
      <ATSMatchScore score={score} />
      <KeywordGapAnalysis keywords={keywords} />
      <AIPoweredFeedback feedback={feedback} />
    </Card>
  );
};

export default AnalysisDashboard;