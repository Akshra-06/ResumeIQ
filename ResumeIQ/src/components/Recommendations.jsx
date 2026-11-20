import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

export default function Recommendations({ recommendations }) {
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(recommendations?.[0]?.id || null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPriorityStyle = (impact) => {
    if (impact.includes('High')) {
      return 'bg-rose-50 text-rose-800 border-rose-200';
    }
    if (impact.includes('Quick Win')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    return 'bg-violet-50 text-[#7C5CFC] border-violet-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 sm:p-7 shadow-subtle space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E4E0]">
        <div>
          <h3 className="text-sm font-bold text-[#202124] tracking-tight">
            Prioritized Improvements
          </h3>
          <p className="text-[11px] text-[#5F6368]">
            Targeted modifications to increase ATS algorithm pass rate
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F1F0EC] text-[#202124]">
          {recommendations?.length || 4} Actions
        </span>
      </div>

      {/* Prioritized List */}
      <div className="divide-y divide-[#E5E4E0] border border-[#E5E4E0] rounded-xl overflow-hidden">
        {recommendations?.map((rec) => {
          const isExpanded = expandedId === rec.id;

          return (
            <div
              key={rec.id}
              className={`transition-colors ${
                isExpanded ? 'bg-[#F8F8F5]' : 'bg-white hover:bg-[#F8F8F5]'
              }`}
            >
              {/* Header row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                className="p-4 flex items-center justify-between cursor-pointer select-none gap-3"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${getPriorityStyle(rec.impact)}`}>
                    {rec.impact}
                  </span>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-semibold text-[#202124] truncate">
                      {rec.title}
                    </h4>
                    <p className="text-[11px] text-[#5F6368] truncate mt-0.5">
                      {rec.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 text-[#5F6368]">
                  <span className="text-[11px] font-medium hidden sm:inline">
                    {isExpanded ? 'Hide' : 'Expand'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expandable Content & Ready-to-use Bullet */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#E5E4E0]">
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    {rec.description}
                  </p>

                  {rec.suggestedBullet && (
                    <div className="p-3.5 rounded-lg bg-[#202124] text-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C5CFC] flex items-center font-bold">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Ready-to-Use Bullet Point
                        </span>

                        <button
                          onClick={() => handleCopy(rec.id, rec.suggestedBullet)}
                          className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
                          title="Copy bullet"
                        >
                          {copiedId === rec.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-300 text-[11px]">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-300" />
                              <span className="text-[11px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs font-mono text-slate-200 leading-relaxed border-l-2 border-[#7C5CFC] pl-2.5">
                        "{rec.suggestedBullet}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
