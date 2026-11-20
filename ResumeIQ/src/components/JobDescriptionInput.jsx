import React from 'react';
import { 
  RotateCcw, 
  AlertCircle
} from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTIONS } from '../data/mockAnalysis';

export default function JobDescriptionInput({
  jobDescription,
  setJobDescription,
  jobError,
  setJobError
}) {
  const charCount = jobDescription.length;
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;

  const handleClear = () => {
    setJobDescription('');
    setJobError(null);
  };

  const handleSelectSampleJob = (sample) => {
    setJobDescription(sample.text);
    setJobError(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 shadow-subtle flex-1 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-[#202124]">
              Job Description
            </h2>
            <p className="text-[11px] text-[#5F6368]">
              Paste the target job requirements
            </p>
          </div>

          {jobDescription && (
            <button
              onClick={handleClear}
              className="inline-flex items-center space-x-1 text-xs text-[#5F6368] hover:text-rose-600 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
              if (jobError) setJobError(null);
            }}
            placeholder={`Paste job description here...\n\nExample:\nJob Title: Senior Full-Stack Cloud Engineer\nResponsibilities: Architect serverless solutions on AWS Lambda, build React applications, containerize with Docker...\nRequirements: 4+ years React, Python, TypeScript, SQL, CI/CD...`}
            rows={10}
            className={`w-full p-3.5 rounded-xl border text-xs text-[#202124] placeholder:text-[#80868B] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]/30 transition-all leading-relaxed resize-none ${
              jobError 
                ? 'border-rose-300 bg-rose-50/20 focus:border-rose-500' 
                : 'border-[#E5E4E0] bg-[#F8F8F5] focus:border-[#7C5CFC] focus:bg-white'
            }`}
          />

          {/* Word and Character Counters */}
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-[#5F6368] font-medium">
            <span>{wordCount} words • {charCount} chars</span>
            <span>Recommended: 100+ words</span>
          </div>
        </div>

        {/* Error State */}
        {jobError && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{jobError}</span>
          </div>
        )}
      </div>

      {/* Preset Example Job Descriptions */}
      <div className="mt-6 pt-4 border-t border-[#E5E4E0]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#202124]">
            Sample Jobs:
          </span>
          <span className="text-[11px] text-[#5F6368]">Click to load criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_JOB_DESCRIPTIONS.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => handleSelectSampleJob(job)}
              className="text-left px-2.5 py-2 rounded-lg border border-[#E5E4E0] hover:border-[#7C5CFC] hover:bg-[#F8F8F5] text-xs transition-colors group"
            >
              <div className="font-medium text-[#202124] group-hover:text-[#7C5CFC] truncate text-[11px]">
                {job.title}
              </div>
              <div className="text-[10px] text-[#5F6368] truncate">
                {job.company}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
