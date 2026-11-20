import React, { useState } from 'react';
import { 
  Check, 
  Plus
} from 'lucide-react';

export default function SkillsAnalysis({ skillsAnalysis }) {
  const [activeTab, setActiveTab] = useState('all');

  const matched = skillsAnalysis?.matched || [];
  const missing = skillsAnalysis?.missing || [];

  const filterList = (list) => {
    return list.filter(item => {
      if (activeTab === 'all') return true;
      if (activeTab === 'cloud') return item.category.toLowerCase().includes('cloud') || item.category.toLowerCase().includes('devops');
      if (activeTab === 'frontend') return item.category.toLowerCase().includes('frontend');
      if (activeTab === 'backend') return item.category.toLowerCase().includes('backend') || item.category.toLowerCase().includes('database');
      return true;
    });
  };

  const filteredMatched = filterList(matched);
  const filteredMissing = filterList(missing);

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-[#202124] tracking-tight">
            Skills Comparison
          </h3>
          <p className="text-[11px] text-[#5F6368]">
            Verified competencies versus missing job criteria
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-[#F1F0EC] text-[11px] font-medium text-[#5F6368] self-start sm:self-auto">
          {['all', 'cloud', 'frontend', 'backend'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-white text-[#202124] shadow-subtle font-semibold'
                  : 'hover:text-[#202124]'
              }`}
            >
              {tab === 'all' ? 'All' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Two Visually Distinct Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Matched Skills: Subtle Green Indicators */}
        <div className="bg-white rounded-xl border border-emerald-200/70 p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
            <span className="text-xs font-bold text-emerald-900 flex items-center">
              <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
              Matched Skills ({filteredMatched.length})
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {filteredMatched.length > 0 ? (
              filteredMatched.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>{skill.name}</span>
                  {skill.countInResume && (
                    <span className="text-[9px] text-emerald-700 font-mono ml-0.5">
                      {skill.countInResume}x
                    </span>
                  )}
                </span>
              ))
            ) : (
              <p className="text-xs text-[#5F6368] italic py-2">
                No matched skills in this filter.
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills: Subtle Orange Indicators */}
        <div className="bg-white rounded-xl border border-amber-200/70 p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-100">
            <span className="text-xs font-bold text-amber-900 flex items-center">
              <Plus className="w-3.5 h-3.5 text-amber-600 mr-1.5" />
              Missing Skills ({filteredMissing.length})
            </span>
            <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Gaps
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {filteredMissing.length > 0 ? (
              filteredMissing.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900"
                >
                  <Plus className="w-3 h-3 text-amber-600" />
                  <span>{skill.name}</span>
                  <span className="text-[9px] text-amber-700 font-semibold px-1 rounded bg-amber-100/60 ml-0.5">
                    {skill.priority || 'Medium'}
                  </span>
                </span>
              ))
            ) : (
              <p className="text-xs text-[#5F6368] italic py-2">
                No missing skills in this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
