import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Trash2, 
  ArrowRight, 
  FileText, 
  Calendar, 
  Briefcase,
  Menu,
  FileUp,
  History
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AuthModal from '../components/AuthModal';
import { useResumeAnalysis } from '../hooks/useResumeAnalysis';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { history, deleteHistoryItem, currentAnalysis } = useResumeAnalysis();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const filteredHistory = history.filter(item => 
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewAnalysis = () => {
    navigate('/results', { state: { analysis: currentAnalysis } });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#202124] flex flex-col md:flex-row">
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Desktop Sidebar */}
      <div className={`hidden md:block shrink-0 transition-all duration-200 ${sidebarCollapsed ? 'w-18' : 'w-60'}`}>
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#F8F8F5]/90 backdrop-blur-md border-b border-[#E5E4E0] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1 rounded-md text-[#5F6368] hover:bg-[#EAE9E4] md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-[#202124] tracking-tight">
              Previous Analyses
            </h1>
          </div>

          <Link
            to="/analyze"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#202124] hover:bg-[#333] text-xs font-medium text-white shadow-subtle transition-colors"
          >
            <FileUp className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>New Scan</span>
          </Link>
        </header>

        <main className="p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-5">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#5F6368] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by role or company..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E4E0] bg-white text-xs text-[#202124] placeholder:text-[#80868B] focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <span className="text-xs text-[#5F6368] self-start sm:self-auto">
              {filteredHistory.length} total records
            </span>
          </div>

          {/* Scans List */}
          {filteredHistory.length > 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E4E0] shadow-subtle overflow-hidden divide-y divide-[#E5E4E0]">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F8F8F5] transition-colors"
                >
                  <div className="flex items-start space-x-3.5">
                    {/* Score Badge */}
                    <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 border ${
                      item.score >= 80 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : item.score >= 65 
                          ? 'bg-violet-50 text-[#7C5CFC] border-violet-200' 
                          : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      <span className="text-sm leading-none">{item.score}</span>
                      <span className="text-[8px] uppercase tracking-wider font-semibold mt-0.5">ATS</span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h4 className="text-xs font-semibold text-[#202124]">
                          {item.role}
                        </h4>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F1F0EC] text-[#5F6368]">
                          {item.status}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#5F6368] flex items-center space-x-2">
                        <span className="flex items-center">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {item.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {item.filename}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      onClick={handleViewAnalysis}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#202124] hover:bg-[#333] text-white text-xs font-medium transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 text-[#7C5CFC]" />
                    </button>

                    <button
                      onClick={() => deleteHistoryItem(item.id)}
                      className="p-1.5 rounded-lg text-[#5F6368] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete scan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-2xl border border-[#E5E4E0]">
              <History className="w-8 h-8 text-[#5F6368] mx-auto mb-2" />
              <h4 className="text-xs font-semibold text-[#202124]">No analyses recorded</h4>
              <p className="text-[11px] text-[#5F6368] mt-0.5">
                Scan your resume to track ATS score iterations over time.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
