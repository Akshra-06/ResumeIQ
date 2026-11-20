import React from 'react';

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E5E4E0] shadow-subtle hover:border-[#D5D4D0] transition-colors flex flex-col justify-between">
      <div>
        <div className="w-9 h-9 rounded-lg bg-[#F1F0EC] flex items-center justify-center text-[#202124] mb-4">
          <Icon className="w-4 h-4 text-[#7C5CFC]" />
        </div>
        <h3 className="text-sm font-semibold text-[#202124] mb-1.5 tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-[#5F6368] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
