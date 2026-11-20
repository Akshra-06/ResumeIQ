import React from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export default function AnalysisLoadingModal({ isOpen, progressState }) {
  if (!isOpen) return null;

  const steps = [
    { id: 1, title: 'Document Parsing', desc: 'Validating format and text structure' },
    { id: 2, title: 'OCR Extraction', desc: 'Extracting competencies, timeline, and tables' },
    { id: 3, title: 'Requirements Comparison', desc: 'Evaluating profile against stated criteria' },
    { id: 4, title: 'Score Synthesis', desc: 'Calculating ATS score & tailored bullet improvements' },
  ];

  const currentStep = progressState?.step || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202124]/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl border border-[#E5E4E0] p-6 sm:p-7 shadow-premium space-y-5 text-center">
        {/* Animated Icon */}
        <div className="mx-auto w-12 h-12 rounded-xl bg-[#F8F8F5] border border-[#E5E4E0] flex items-center justify-center text-[#202124]">
          <Sparkles className="w-6 h-6 text-[#7C5CFC] animate-pulse" />
        </div>

        <div>
          <h3 className="text-base font-bold text-[#202124] tracking-tight">
            Analyzing Resume
          </h3>
          <p className="text-xs text-[#5F6368] mt-1 font-normal">
            {progressState?.message || 'Evaluating candidate qualifications...'}
          </p>
        </div>

        {/* Step List */}
        <div className="space-y-2 text-left">
          {steps.map((s) => {
            const isCompleted = s.id < currentStep;
            const isCurrent = s.id === currentStep;

            return (
              <div
                key={s.id}
                className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                  isCurrent
                    ? 'border-[#7C5CFC] bg-violet-50/30'
                    : isCompleted
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-[#E5E4E0] bg-[#F8F8F5] opacity-50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                        ? 'bg-[#7C5CFC] text-white'
                        : 'bg-[#E5E4E0] text-[#5F6368]'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.id}
                  </div>
                  <div>
                    <span className="font-semibold text-[#202124] block leading-tight">{s.title}</span>
                    <span className="text-[10px] text-[#5F6368]">{s.desc}</span>
                  </div>
                </div>

                {isCurrent && (
                  <Loader2 className="w-3.5 h-3.5 text-[#7C5CFC] animate-spin shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Global Progress Bar */}
        <div className="pt-2">
          <div className="w-full bg-[#E5E4E0] rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#7C5CFC] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-[#5F6368] mt-2 block font-medium">
            Step {currentStep} of 4 • Parsing qualifications
          </span>
        </div>
      </div>
    </div>
  );
}
