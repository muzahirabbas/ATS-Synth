import React, { useState, useMemo } from 'react';
import Button from '../../ui/Button';
import TextArea from '../../ui/TextArea';
import { Card } from '../../ui/Card';
import FileInput from '../../ui/FileInput'; // Import the new component

const MIN_LENGTH = 50;

const InputSection = ({ onAnalyze, isLoading }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const isButtonDisabled = useMemo(() => {
    return isLoading || !resumeFile || jobDescription.length < MIN_LENGTH;
  }, [isLoading, resumeFile, jobDescription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      const formData = new FormData();
      formData.append('resumeFile', resumeFile);
      formData.append('jobDescriptionText', jobDescription);
      onAnalyze(formData);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FileInput 
          onFileSelect={setResumeFile}
        />
        <TextArea
          id="job-description"
          label="Paste the Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Now, paste the job description you're targeting..."
          rows={12}
          required
        />
        <Button
          type="submit"
          disabled={isButtonDisabled}
          isLoading={isLoading}
          className="w-full"
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </form>
    </Card>
  );
};

export default InputSection;