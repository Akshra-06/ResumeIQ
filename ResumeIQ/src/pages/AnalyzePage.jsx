import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResumeUpload from '../components/ResumeUpload';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AnalysisLoadingModal from '../components/AnalysisLoadingModal';
import { useResumeAnalysis } from '../hooks/useResumeAnalysis';

export default function AnalyzePage() {
  const navigate = useNavigate();
  const { runAnalysis, isLoading, progressState } = useResumeAnalysis();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [jobDescription, setJobDescription] = useState('');
  const [jobError, setJobError] = useState(null);

  const [formError, setFormError] = useState(null);

  const handleStartAnalysis = async () => {
    setFormError(null);
    let hasError = false;

    if (!file) {
      setFileError('Please select or drop a PDF resume.');
      hasError = true;
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setJobError('Please provide the target job description (minimum 30 characters).');
      hasError = true;
    }

    if (hasError) {
      setFormError('Please resolve the requirements above to continue.');
      return;
    }

    try {
      const result = await runAnalysis(file, jobDescription);
      navigate('/results', { state: { analysis: result } });
    } catch (err) {
      setFormError(err.message || 'Analysis failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F5] text-[#202124]">
      <Navbar />
      
      {/* Loading Modal with step by step progress */}
      <AnalysisLoadingModal isOpen={isLoading} progressState={progressState} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="max-w-2xl mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202124]">
            Analyze Resume
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1 font-normal">
            Upload your resume and paste the target job description to evaluate your match.
          </p>
        </div>

        {/* Global Error Banner */}
        {formError && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-medium">{formError}</span>
          </div>
        )}

        {/* Two-Column Grid: Left Resume Upload, Right Job Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Panel: Resume Upload (7 cols - primary focus) */}
          <div className="lg:col-span-7 flex flex-col">
            <ResumeUpload
              file={file}
              setFile={setFile}
              fileError={fileError}
              setFileError={setFileError}
              uploadProgress={uploadProgress}
              setUploadProgress={setUploadProgress}
            />
          </div>

          {/* Right Panel: Job Description (5 cols - compact layout) */}
          <div className="lg:col-span-5 flex flex-col">
            <JobDescriptionInput
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              jobError={jobError}
              setJobError={setJobError}
            />
          </div>
        </div>

        {/* Action Button Section */}
        <div className="mt-8 pt-6 border-t border-[#E5E4E0] flex justify-end">
          <button
            type="button"
            onClick={handleStartAnalysis}
            disabled={isLoading}
            className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-white font-medium text-xs shadow-subtle transition-all duration-150 ${
              isLoading
                ? 'bg-[#7C5CFC]/70 cursor-not-allowed'
                : 'bg-[#202124] hover:bg-[#333] active:bg-[#111]'
            }`}
          >
            <span>{isLoading ? 'Analyzing Profile...' : 'Analyze Resume'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFC]" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
