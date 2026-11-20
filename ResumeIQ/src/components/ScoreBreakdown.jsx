import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function ScoreBreakdown({ categoryScores, radarData }) {
  const getProgressColor = (score) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 75) return 'bg-[#7C5CFC]';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 sm:p-7 shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E4E0]">
        <div>
          <h3 className="text-sm font-bold text-[#202124] tracking-tight">
            Category Breakdown
          </h3>
          <p className="text-[11px] text-[#5F6368]">
            Scoring across 5 core evaluation dimensions
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F1F0EC] text-[#202124]">
          Weighted
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-5 items-center">
        {/* Left: Horizontal Progress Bars */}
        <div className="lg:col-span-7 space-y-4">
          {categoryScores?.map((cat) => (
            <div key={cat.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#202124]">{cat.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-[#5F6368] font-mono">
                    Target: {cat.benchmark}%
                  </span>
                  <span className="font-bold text-[#202124]">
                    {cat.score}%
                  </span>
                </div>
              </div>

              {/* Progress bar container */}
              <div className="w-full bg-[#F1F0EC] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${getProgressColor(cat.score)}`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Radar Chart Visualization */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#F8F8F5] rounded-xl p-3 border border-[#E5E4E0]">
          <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">
            Candidate vs Benchmark
          </span>
          
          <div className="w-full h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#E5E4E0" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#5F6368', fontSize: 10, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#E5E4E0" tick={{ fontSize: 8 }} />
                
                <Radar
                  name="Your Resume"
                  dataKey="resume"
                  stroke="#7C5CFC"
                  fill="#7C5CFC"
                  fillOpacity={0.35}
                />
                <Radar
                  name="Role Benchmark"
                  dataKey="requirement"
                  stroke="#CBD5E1"
                  fill="#CBD5E1"
                  fillOpacity={0.2}
                  strokeDasharray="3 3"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#202124', 
                    borderRadius: '6px', 
                    border: 'none', 
                    color: '#FFF', 
                    fontSize: '11px',
                    padding: '4px 8px'
                  }} 
                />
                <Legend 
                  wrapperStyle={{ fontSize: '10px', paddingTop: '6px' }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
