import React, { useState, useRef } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  RefreshCw,
  Upload,
  Sparkles
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/mockAnalysis';

export default function ResumeUpload({ 
  file, 
  setFile, 
  fileError, 
  setFileError,
  uploadProgress,
  setUploadProgress
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile) => {
    setFileError(null);

    if (!selectedFile) return;

    // Validate PDF mime type or extension
    const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setFileError('Invalid file format. Please upload a PDF (.pdf).');
      return;
    }

    // Validate size (10 MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError('File exceeds 10 MB limit.');
      return;
    }

    // Progress bar animation
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 60);

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectSample = (sample) => {
    setFileError(null);
    setUploadProgress(100);
    setFile({
      name: sample.name,
      size: 184 * 1024,
      type: 'application/pdf',
      textSample: sample.textSample,
      isSample: true,
      applicantName: sample.applicantName
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 shadow-subtle flex-1 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-[#202124]">
              Resume PDF
            </h2>
            <p className="text-[11px] text-[#5F6368]">
              Standard PDF layout • Max 10MB
            </p>
          </div>

          {file && (
            <button
              onClick={handleRemoveFile}
              className="inline-flex items-center space-x-1 text-xs text-[#5F6368] hover:text-rose-600 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>

        {/* Drop Zone Area */}
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dotted p-10 text-center transition-all duration-150 flex flex-col items-center justify-center ${
              isDragging
                ? 'border-[#7C5CFC] bg-[#F8F8F5]'
                : 'border-[#D5D4D0] hover:border-[#7C5CFC] hover:bg-[#F8F8F5]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div className="w-12 h-12 rounded-xl bg-[#F8F8F5] border border-[#E5E4E0] flex items-center justify-center text-[#202124] mb-3">
              <Upload className="w-5 h-5 text-[#7C5CFC]" />
            </div>

            <p className="text-xs font-semibold text-[#202124] mb-0.5">
              Drag and drop your resume here
            </p>
            <p className="text-[11px] text-[#5F6368] mb-4">
              or select a file from your computer
            </p>

            <button
              type="button"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#202124] hover:bg-[#333] text-white text-xs font-medium transition-colors"
            >
              <span>Browse Files</span>
            </button>
          </div>
        ) : (
          /* Uploaded File Info Card */
          <div className="p-4 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-[#202124] flex items-center justify-center text-white shrink-0">
                  <FileText className="w-4 h-4 text-[#7C5CFC]" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-semibold text-[#202124] truncate">
                    {file.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] text-[#5F6368] mt-0.5">
                    <span>{file.size ? `${Math.round(file.size / 1024)} KB` : '184 KB'}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                      Ready
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-[#7C5CFC] hover:underline flex items-center shrink-0 ml-2"
                title="Replace PDF"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Replace
              </button>
            </div>

            {/* Visual upload progress bar */}
            <div>
              <div className="flex justify-between text-[10px] font-medium text-[#5F6368] mb-1">
                <span>Upload Status</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-[#E5E4E0] rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#7C5CFC] h-1.5 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>

            {file.isSample && (
              <div className="p-2 rounded bg-white border border-[#E5E4E0] text-[11px] text-[#5F6368] flex items-center">
                <span>Loaded sample profile: <strong className="text-[#202124]">{file.applicantName}</strong></span>
              </div>
            )}
          </div>
        )}

        {/* Validation Error Message */}
        {fileError && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{fileError}</span>
          </div>
        )}
      </div>

      {/* Quick Test Samples */}
      <div className="mt-6 pt-4 border-t border-[#E5E4E0]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#202124]">
            Test Profiles:
          </span>
          <span className="text-[11px] text-[#5F6368]">Quick test without PDF</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="text-left px-3 py-2 rounded-lg border border-[#E5E4E0] hover:border-[#7C5CFC] hover:bg-[#F8F8F5] text-xs transition-colors group"
            >
              <div className="font-medium text-[#202124] group-hover:text-[#7C5CFC] truncate">
                {sample.applicantName}
              </div>
              <div className="text-[10px] text-[#5F6368] truncate">
                {sample.targetTitle}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
