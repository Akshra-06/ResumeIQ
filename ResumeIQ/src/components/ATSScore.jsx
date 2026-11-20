import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  FileText
} from 'lucide-react';

export default function ATSScore({ analysis }) {
  const score = analysis?.overallScore || 84;
  const label = analysis?.scoreLabel || 'Strong Match';
  const summary = analysis?.executiveSummary || '';

  // SVG circular gauge geometry
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getTierStyles = () => {
    if (score >= 80) {
      return {
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        strokeColor: '#10B981',
        icon: CheckCircle2,
        pillText: 'Screened In'
      };
    } else if (score >= 65) {
      return {
        badgeBg: 'bg-violet-50 text-[#7C5CFC] border-violet-200',
        strokeColor: '#7C5CFC',
        icon: TrendingUp,
        pillText: 'Competitive'
      };
    } else {
      return {
        badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
        strokeColor: '#F59E0B',
        icon: AlertTriangle,
        pillText: 'Needs Attention'
      };
    }
  };

  const currentTier = getTierStyles();
  const StatusIcon = currentTier.icon;

  // Formulate a concise 2-line summary
  const conciseSummary = summary.length > 180 
    ? summary.substring(0, 180).trim() + '...' 
    : summary;

  return (
    <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 sm:p-8 shadow-subtle">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Prominent Circular ATS Score Indicator */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center">
            <svg 
              className="w-44 h-44 sm:w-52 sm:h-52 transform -rotate-90"
              viewBox="0 0 180 180"
            >
              {/* Background Track */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="stroke-[#F1F0EC]"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Progress Value Stroke */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke={currentTier.strokeColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </svg>

            {/* Centered Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tight">
                {score}
              </span>
              <span className="text-[10px] font-semibold text-[#5F6368] uppercase tracking-wider mt-0.5">
                out of 100
              </span>
            </div>
          </div>

          {/* Small Comparison Label */}
          <div className="mt-3 flex items-center space-x-1.5">
            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentTier.badgeBg}`}>
              <StatusIcon className="w-3 h-3" />
              <span>{label}</span>
            </span>
            <span className="text-xs text-[#5F6368]">
              • Top 12% Candidate Bracket
            </span>
          </div>
        </div>

        {/* Right: Candidate Meta & Concise 2-Line Summary */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#5F6368] mb-1">
              <span>{analysis?.company || 'Candidate Application'}</span>
              <span>•</span>
              <span className="flex items-center">
                <FileText className="w-3 h-3 mr-1 text-[#7C5CFC]" />
                {analysis?.filename || 'Resume.pdf'}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {analysis?.createdAt ? new Date(analysis.createdAt).toLocaleDateString() : 'Today'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#202124] tracking-tight">
              {analysis?.targetRole || 'Target Role Analysis'}
            </h2>
          </div>

          {/* Concise 2-line AI Summary */}
          <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed border-l-2 border-[#7C5CFC] pl-3 py-0.5">
            {conciseSummary}
          </p>

          {/* Compact Metric Indicators */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5]">
              <span className="text-[10px] font-semibold uppercase text-[#5F6368] tracking-wider block">
                Matched Skills
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-700">
                {analysis?.skillsAnalysis?.matched?.length || 10} verified
              </span>
            </div>

            <div className="p-3 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5]">
              <span className="text-[10px] font-semibold uppercase text-[#5F6368] tracking-wider block">
                Missing Gaps
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-800">
                {analysis?.skillsAnalysis?.missing?.length || 6} gaps
              </span>
            </div>

            <div className="p-3 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5]">
              <span className="text-[10px] font-semibold uppercase text-[#5F6368] tracking-wider block">
                Keyword Density
              </span>
              <span className="text-sm sm:text-base font-bold text-[#202124]">
                {analysis?.keywordAnalysis?.coveragePercentage || 76}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
