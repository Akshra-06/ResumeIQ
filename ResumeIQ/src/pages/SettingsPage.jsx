import React, { useState } from 'react';
import { 
  Cloud, 
  Sliders, 
  User, 
  Database, 
  Server, 
  Cpu, 
  Key, 
  CheckCircle2, 
  Save, 
  Menu
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AuthModal from '../components/AuthModal';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('cloud');
  const [savedMessage, setSavedMessage] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
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
        <header className="sticky top-0 z-20 bg-[#F8F8F5]/90 backdrop-blur-md border-b border-[#E5E4E0] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1 rounded-md text-[#5F6368] hover:bg-[#EAE9E4] md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-[#202124] tracking-tight">
              Settings & Cloud Architecture
            </h1>
          </div>

          {savedMessage && (
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Settings saved
            </span>
          )}
        </header>

        <main className="p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
          {/* Tabs bar */}
          <div className="flex items-center space-x-1 border-b border-[#E5E4E0] pb-2">
            <button
              onClick={() => setActiveTab('cloud')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'cloud'
                  ? 'bg-[#202124] text-white'
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#EAE9E4]'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>AWS Cloud Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'profile'
                  ? 'bg-[#202124] text-white'
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#EAE9E4]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Candidate Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('scoring')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'scoring'
                  ? 'bg-[#202124] text-white'
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#EAE9E4]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Scoring Weights</span>
            </button>
          </div>

          {/* TAB 1: AWS Architecture */}
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 shadow-subtle space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#202124]">
                    AWS Serverless Service Architecture
                  </h3>
                  <p className="text-xs text-[#5F6368]">
                    Asynchronous PDF extraction & evaluation pipeline
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-1.5">
                    <Database className="w-4 h-4 text-[#7C5CFC]" />
                    <h5 className="text-xs font-bold text-[#202124]">Amazon S3</h5>
                    <p className="text-[11px] text-[#5F6368]">
                      Presigned URL direct upload with AES-256 encryption.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-1.5">
                    <Server className="w-4 h-4 text-[#7C5CFC]" />
                    <h5 className="text-xs font-bold text-[#202124]">Amazon Textract</h5>
                    <p className="text-[11px] text-[#5F6368]">
                      OCR extraction of multi-column layout, headers, and tables.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-1.5">
                    <Cpu className="w-4 h-4 text-[#7C5CFC]" />
                    <h5 className="text-xs font-bold text-[#202124]">Amazon Bedrock</h5>
                    <p className="text-[11px] text-[#5F6368]">
                      LLM competency matching with Claude 3.5 Sonnet.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-1.5">
                    <Key className="w-4 h-4 text-[#7C5CFC]" />
                    <h5 className="text-xs font-bold text-[#202124]">AWS Lambda</h5>
                    <p className="text-[11px] text-[#5F6368]">
                      Serverless orchestration behind Amazon API Gateway.
                    </p>
                  </div>
                </div>
              </div>

              {/* Endpoint Config */}
              <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 shadow-subtle space-y-3">
                <h4 className="text-xs font-bold text-[#202124] uppercase tracking-wider">
                  API Gateway Endpoint
                </h4>
                <form onSubmit={handleSave} className="space-y-3">
                  <input
                    type="url"
                    defaultValue="https://api.resumeiq.internal/v1"
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E4E0] text-xs font-mono text-[#202124] focus:outline-none focus:border-[#7C5CFC]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#202124] hover:bg-[#333] text-white text-xs font-medium"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Endpoint</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: Candidate Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-[#202124]">
                Candidate Information
              </h3>

              <form onSubmit={handleSave} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5F6368] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Morgan"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E4E0] text-xs text-[#202124] focus:outline-none focus:border-[#7C5CFC]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#5F6368] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="alex.morgan@email.com"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E4E0] text-xs text-[#202124] focus:outline-none focus:border-[#7C5CFC]"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#202124] hover:bg-[#333] text-white text-xs font-medium"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Update Profile</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: Scoring Weights */}
          {activeTab === 'scoring' && (
            <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 shadow-subtle space-y-3">
              <h3 className="text-sm font-bold text-[#202124]">
                Evaluation Weights
              </h3>

              <div className="space-y-2">
                {[
                  { name: 'Skills Match', weight: '30%', desc: 'Technical languages & core libraries' },
                  { name: 'Experience Relevance', weight: '25%', desc: 'Timeline & domain experience' },
                  { name: 'Keyword Density', weight: '20%', desc: 'Presence of critical ATS tokens' },
                  { name: 'Education Alignment', weight: '15%', desc: 'Degree alignment & credentials' },
                  { name: 'Resume Formatting', weight: '10%', desc: 'Layout parseability' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg border border-[#E5E4E0] bg-[#F8F8F5] text-xs">
                    <div>
                      <span className="font-semibold text-[#202124]">{item.name}</span>
                      <span className="text-[#5F6368] block text-[11px]">{item.desc}</span>
                    </div>
                    <span className="font-bold text-[#202124] font-mono px-2 py-0.5 rounded bg-white border border-[#E5E4E0]">
                      {item.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
