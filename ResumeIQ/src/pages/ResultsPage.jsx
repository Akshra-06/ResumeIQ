import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Download, 
  Menu, 
  FileUp, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ATSScore from '../components/ATSScore';
import ScoreBreakdown from '../components/ScoreBreakdown';
import SkillsAnalysis from '../components/SkillsAnalysis';
import Recommendations from '../components/Recommendations';
import KeywordAnalysis from '../components/KeywordAnalysis';
import ReportModal from '../components/ReportModal';
import AuthModal from '../components/AuthModal';
import { useResumeAnalysis } from '../hooks/useResumeAnalysis';

export default function ResultsPage() {
  const location = useLocation();
  const { currentAnalysis } = useResumeAnalysis();

  const analysis = location.state?.analysis || currentAnalysis;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#202124] flex flex-col md:flex-row">
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Report Dossier Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        analysis={analysis}
      />

      {/* Desktop Persistent Sidebar */}
      <div className={`hidden md:block shrink-0 transition-all duration-200 ${sidebarCollapsed ? 'w-18' : 'w-60'}`}>
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#202124]/40 backdrop-blur-sm">
          <div className="w-60 h-full bg-[#F8F8F5] relative">
            <Sidebar 
              collapsed={false} 
              setCollapsed={() => setMobileSidebarOpen(false)} 
              onOpenAuth={() => {
                setMobileSidebarOpen(false);
                setAuthModalOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-[#F8F8F5]/90 backdrop-blur-md border-b border-[#E5E4E0] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1 rounded-md text-[#5F6368] hover:bg-[#EAE9E4] md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="flex items-center space-x-1.5 text-xs text-[#5F6368] truncate">
              <Link to="/" className="hover:text-[#202124] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-[#5F6368]" />
              <Link to="/analyze" className="hover:text-[#202124] transition-colors">Analyze</Link>
              <ChevronRight className="w-3 h-3 text-[#5F6368]" />
              <span className="font-semibold text-[#202124] truncate">Results</span>
            </nav>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Link
              to="/analyze"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#E5E4E0] bg-white hover:bg-[#F8F8F5] text-xs font-medium text-[#202124] transition-colors shadow-subtle"
            >
              <FileUp className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span className="hidden sm:inline">New Analysis</span>
            </Link>

            <button
              onClick={() => setReportModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#202124] hover:bg-[#333] active:bg-[#111] text-xs font-medium text-white shadow-subtle transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Download Report</span>
            </button>
          </div>
        </header>

        {/* Dashboard Workspace */}
        <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Section 1: Large Circular ATS Score Card */}
          <ATSScore analysis={analysis} />

          {/* Section 2: Category Breakdown & Radar Visualization */}
          <ScoreBreakdown
            categoryScores={analysis.categoryScores}
            radarData={analysis.radarData}
          />

          {/* Section 3: Skills Alignment & Gap Analysis */}
          <SkillsAnalysis skillsAnalysis={analysis.skillsAnalysis} />

          {/* Section 4: Prioritized Improvements */}
          <Recommendations recommendations={analysis.recommendations} />

          {/* Section 5: Keyword Analysis */}
          <KeywordAnalysis keywordAnalysis={analysis.keywordAnalysis} />

          {/* Bottom Action Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E4E0] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <h4 className="font-semibold text-[#202124]">
                Iterate on your resume
              </h4>
              <p className="text-[#5F6368] mt-0.5">
                Apply recommended bullet points and re-run analysis to verify score progression.
              </p>
            </div>

            <Link
              to="/analyze"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#202124] hover:bg-[#333] text-white text-xs font-medium shadow-subtle transition-colors"
            >
              <span>Re-Analyze Resume</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFC]" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
