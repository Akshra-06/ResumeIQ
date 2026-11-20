import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Search
} from 'lucide-react';

export default function KeywordAnalysis({ keywordAnalysis }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, found, missing

  const coverage = keywordAnalysis?.coveragePercentage || 76;
  const totalFound = keywordAnalysis?.totalFound || 19;
  const totalRequired = keywordAnalysis?.totalRequired || 25;
  const keywords = keywordAnalysis?.topKeywords || [];

  const filteredKeywords = keywords.filter((item) => {
    const matchesSearch = item.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus === 'found') return item.inResume;
    if (filterStatus === 'missing') return !item.inResume;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 sm:p-7 shadow-subtle space-y-4">
      {/* Header & Coverage Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E4E0] gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#202124] tracking-tight">
            Keyword Coverage
          </h3>
          <p className="text-[11px] text-[#5F6368]">
            Index of tokens required by the job specification
          </p>
        </div>

        {/* Visual Percentage Gauge */}
        <div className="flex items-center space-x-3 bg-[#F8F8F5] border border-[#E5E4E0] px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <span className="text-xs font-bold text-[#202124]">
            {coverage}% Coverage ({totalFound}/{totalRequired})
          </span>
          <div className="w-16 bg-[#E5E4E0] rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#7C5CFC] h-1.5 rounded-full" 
              style={{ width: `${coverage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5F6368] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E4E0] text-xs text-[#202124] placeholder:text-[#80868B] focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-[#F1F0EC] text-[11px] font-medium text-[#5F6368] self-start sm:self-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 rounded transition-colors ${
              filterStatus === 'all' ? 'bg-white text-[#202124] shadow-subtle font-semibold' : 'hover:text-[#202124]'
            }`}
          >
            All ({keywords.length})
          </button>
          <button
            onClick={() => setFilterStatus('found')}
            className={`px-2.5 py-1 rounded transition-colors ${
              filterStatus === 'found' ? 'bg-white text-emerald-800 shadow-subtle font-semibold' : 'hover:text-[#202124]'
            }`}
          >
            Found ({keywords.filter(k => k.inResume).length})
          </button>
          <button
            onClick={() => setFilterStatus('missing')}
            className={`px-2.5 py-1 rounded transition-colors ${
              filterStatus === 'missing' ? 'bg-white text-amber-900 shadow-subtle font-semibold' : 'hover:text-[#202124]'
            }`}
          >
            Missing ({keywords.filter(k => !k.inResume).length})
          </button>
        </div>
      </div>

      {/* Compact Keyword Table */}
      <div className="border border-[#E5E4E0] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8F8F5] text-[#5F6368] uppercase font-semibold text-[10px] tracking-wider border-b border-[#E5E4E0]">
            <tr>
              <th className="px-4 py-2.5">Keyword</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Job Frequency</th>
              <th className="px-4 py-2.5">Resume Matches</th>
              <th className="px-4 py-2.5 text-right">Importance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E0] text-[#202124]">
            {filteredKeywords.map((item) => (
              <tr key={item.keyword} className="hover:bg-[#F8F8F5] transition-colors">
                <td className="px-4 py-2.5 font-semibold">
                  {item.keyword}
                </td>
                <td className="px-4 py-2.5">
                  {item.inResume ? (
                    <span className="inline-flex items-center text-emerald-700 font-medium">
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      Detected
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-amber-800 font-medium">
                      <X className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      Missing
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-[#5F6368]">
                  {item.jobFrequency} mentions
                </td>
                <td className="px-4 py-2.5">
                  <span className={`px-2 py-0.5 rounded font-mono text-[11px] ${
                    item.inResume ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'bg-[#F1F0EC] text-[#5F6368]'
                  }`}>
                    {item.resumeCount}x
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                    item.importance === 'Critical' 
                      ? 'bg-rose-50 text-rose-800 border border-rose-200' 
                      : item.importance === 'High' 
                        ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                        : 'bg-[#F1F0EC] text-[#5F6368]'
                  }`}>
                    {item.importance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
