import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8F8F5] border-t border-[#E5E4E0] pt-14 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#E5E4E0]">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-[#202124] flex items-center justify-center text-white">
                <FileCheck2 className="w-3.5 h-3.5 text-[#7C5CFC]" />
              </div>
              <span className="font-bold text-base tracking-tight text-[#202124]">
                Resume<span className="text-[#7C5CFC]">IQ</span>
              </span>
            </div>
            <p className="text-[#5F6368] text-xs leading-relaxed max-w-sm">
              Visual ATS resume scoring, candidate qualification breakdown, and actionable bullet point optimization.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-[#202124] uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              <li>
                <Link to="/analyze" className="hover:text-[#202124] transition-colors">
                  ATS Resume Scanner
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-[#202124] transition-colors">
                  Results Dashboard
                </Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-[#202124] transition-colors">
                  Skills Gap Detection
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-[#202124] transition-colors">
                  Workflow
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-[#202124] uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              <li>
                <span className="hover:text-[#202124] cursor-pointer transition-colors">
                  ATS Scoring Guide
                </span>
              </li>
              <li>
                <span className="hover:text-[#202124] cursor-pointer transition-colors">
                  Technical Keywords
                </span>
              </li>
              <li>
                <Link to="/settings" className="hover:text-[#202124] transition-colors">
                  Architecture & Settings
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#202124] transition-colors">
                  Analysis History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5F6368] space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} ResumeIQ. Built for modern tech hiring.</p>
          <div className="flex space-x-5">
            <span className="hover:text-[#202124] cursor-pointer">Privacy</span>
            <span className="hover:text-[#202124] cursor-pointer">Terms</span>
            <span className="hover:text-[#202124] cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
