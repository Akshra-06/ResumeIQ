import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileCheck2, 
  Sparkles
} from 'lucide-react';

export default function ReportModal({ isOpen, onClose, analysis }) {
  if (!isOpen || !analysis) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ResumeIQ_Report_${analysis.applicantName || 'Candidate'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202124]/40 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-[#E5E4E0] shadow-premium my-8 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-[#F8F8F5] border-b border-[#E5E4E0] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-4 h-4 text-[#7C5CFC]" />
            <h3 className="font-bold text-[#202124] text-xs sm:text-sm">
              ResumeIQ ATS Diagnostic Dossier
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md border border-[#E5E4E0] bg-white text-xs font-medium text-[#202124] hover:bg-[#F1F0EC]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#202124] text-xs font-medium text-white hover:bg-[#333]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#5F6368] hover:text-[#202124] rounded hover:bg-[#E5E4E0]/60 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Content */}
        <div id="printable-report" className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto text-left">
          {/* Header */}
          <div className="border-b border-[#E5E4E0] pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7C5CFC]">
                Evaluation Dossier
              </span>
              <h2 className="text-xl font-extrabold text-[#202124] mt-0.5">
                {analysis.targetRole}
              </h2>
              <p className="text-xs text-[#5F6368]">
                Candidate: <strong className="text-[#202124]">{analysis.applicantName || 'Alex Morgan'}</strong> • File: {analysis.filename}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-3xl font-extrabold text-[#202124] block">
                {analysis.overallScore} / 100
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                {analysis.scoreLabel}
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5F6368]">
              Executive Summary
            </h4>
            <p className="text-xs text-[#202124] leading-relaxed bg-[#F8F8F5] p-3.5 rounded-xl border border-[#E5E4E0]">
              {analysis.executiveSummary}
            </p>
          </div>

          {/* Category Scores */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5F6368]">
              Dimension Scores
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {analysis.categoryScores?.map((cat) => (
                <div key={cat.name} className="p-2.5 rounded-lg border border-[#E5E4E0] bg-[#F8F8F5]">
                  <span className="text-[11px] text-[#5F6368] block">{cat.name}</span>
                  <span className="text-sm font-bold text-[#202124]">{cat.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matched & Missing Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
              <h5 className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                Verified Skills ({analysis.skillsAnalysis?.matched?.length})
              </h5>
              <div className="flex flex-wrap gap-1">
                {analysis.skillsAnalysis?.matched?.map((s) => (
                  <span key={s.name} className="px-2 py-0.5 rounded bg-white text-emerald-900 text-[10px] font-medium border border-emerald-200">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/30">
              <h5 className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1.5">
                Missing Skill Gaps ({analysis.skillsAnalysis?.missing?.length})
              </h5>
              <div className="flex flex-wrap gap-1">
                {analysis.skillsAnalysis?.missing?.map((s) => (
                  <span key={s.name} className="px-2 py-0.5 rounded bg-white text-amber-900 text-[10px] font-medium border border-amber-200">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Recommendations */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5F6368]">
              Actionable Recommendations
            </h4>
            <ul className="space-y-1.5 text-xs text-[#202124]">
              {analysis.recommendations?.map((rec) => (
                <li key={rec.id} className="p-2.5 rounded-lg border border-[#E5E4E0] bg-white flex items-start space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C5CFC] shrink-0 mt-0.5" />
                  <div>
                    <strong>{rec.title}:</strong> {rec.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
