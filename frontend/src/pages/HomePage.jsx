import React from 'react'; // Added React import
import AnalysisDashboard from "../components/features/analysis/AnalysisDashboard";
import InputSection from "../components/features/input/InputSection";
import { useResumeAnalysisStore } from "../hooks/useResumeAnalysis";

const HomePage = () => {
  const { analysis, isLoading, error, analyze } = useResumeAnalysisStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5">
        <InputSection 
          onAnalyze={analyze} 
          isLoading={isLoading} 
        />
      </div>
      <div className="lg:col-span-7">
        <AnalysisDashboard 
          analysis={analysis} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default HomePage;