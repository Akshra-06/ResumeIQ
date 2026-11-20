import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FileCheck2, 
  Check, 
  Plus, 
  Sparkles, 
  Upload, 
  Search, 
  BarChart2, 
  FileText,
  Copy,
  TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState(false);

  const handleCopyDemo = () => {
    navigator.clipboard.writeText('Designed and deployed serverless cloud functions on AWS Lambda integrated with Amazon S3 for event-driven storage.');
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F5] text-[#202124]">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Hero Section */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#202124] max-w-4xl mx-auto leading-[1.08]">
            Your next opportunity starts with a{' '}
            <span className="text-[#7C5CFC]">better resume.</span>
          </h1>

          {/* One-sentence supporting description */}
          <p className="mt-5 text-base sm:text-lg text-[#5F6368] max-w-xl mx-auto font-normal">
            AI-powered resume analysis that shows exactly where you stand and how to bridge the gap.
          </p>

          {/* One prominent CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/analyze"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#202124] hover:bg-[#333] active:bg-[#111] text-white text-sm font-medium shadow-subtle transition-all duration-150 group"
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-4 h-4 text-[#7C5CFC] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Large Realistic Product Preview */}
          <div className="mt-14 sm:mt-18 relative max-w-4xl mx-auto">
            {/* Main Preview Container */}
            <div className="bg-white rounded-2xl border border-[#E5E4E0] shadow-premium p-6 sm:p-8 text-left transition-all">
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E5E4E0] gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-[#202124] text-white flex items-center justify-center font-bold text-xs">
                    AM
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-semibold text-[#202124]">Alex Morgan</h3>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Strong Match
                      </span>
                    </div>
                    <p className="text-xs text-[#5F6368]">
                      Target: Senior Full-Stack Cloud Engineer • Vanguard Tech
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-[#5F6368]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>ATS Algorithm Score: 84/100</span>
                </div>
              </div>

              {/* Dashboard Preview Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
                {/* Score Dial */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#F8F8F5] rounded-xl border border-[#E5E4E0]">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                      <circle
                        cx="80"
                        cy="80"
                        r="64"
                        className="stroke-[#E5E4E0]"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="64"
                        stroke="#7C5CFC"
                        strokeWidth="12"
                        strokeDasharray={402}
                        strokeDashoffset={402 - (84 / 100) * 402}
                        strokeLinecap="round"
                        fill="transparent"
                        className="animate-score-ring"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-[#202124] tracking-tight">84</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5F6368]">out of 100</span>
                    </div>
                  </div>
                  <span className="mt-3 text-xs font-semibold text-[#202124]">
                    Top 12% Candidate Bracket
                  </span>
                  <span className="text-[11px] text-[#5F6368]">
                    Meets automatic screening threshold
                  </span>
                </div>

                {/* Category Progress Bars */}
                <div className="md:col-span-7 space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#202124]">Skills Match</span>
                      <span className="text-[#202124] font-semibold">88%</span>
                    </div>
                    <div className="w-full bg-[#F1F0EC] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#7C5CFC] h-2 rounded-full w-[88%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#202124]">Experience Relevance</span>
                      <span className="text-[#202124] font-semibold">82%</span>
                    </div>
                    <div className="w-full bg-[#F1F0EC] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#7C5CFC] h-2 rounded-full w-[82%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#202124]">Education Match</span>
                      <span className="text-[#202124] font-semibold">95%</span>
                    </div>
                    <div className="w-full bg-[#F1F0EC] rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full w-[95%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#202124]">Keyword Density</span>
                      <span className="text-[#202124] font-semibold">74%</span>
                    </div>
                    <div className="w-full bg-[#F1F0EC] rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-2 rounded-full w-[74%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#202124]">Resume Structure</span>
                      <span className="text-[#202124] font-semibold">90%</span>
                    </div>
                    <div className="w-full bg-[#F1F0EC] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#7C5CFC] h-2 rounded-full w-[90%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Strip Preview */}
              <div className="mt-6 pt-5 border-t border-[#E5E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-[#5F6368] mr-1">Matched:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center">
                    <Check className="w-3 h-3 mr-1 text-emerald-600" /> React
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center">
                    <Check className="w-3 h-3 mr-1 text-emerald-600" /> Python
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center">
                    <Check className="w-3 h-3 mr-1 text-emerald-600" /> TypeScript
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center">
                    <Check className="w-3 h-3 mr-1 text-emerald-600" /> SQL
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-[#5F6368] mr-1">Missing:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center">
                    <Plus className="w-3 h-3 mr-1 text-amber-600" /> AWS Lambda
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center">
                    <Plus className="w-3 h-3 mr-1 text-amber-600" /> Docker
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Visual Cards */}
            <div className="hidden lg:flex items-center space-x-2 absolute -bottom-5 -left-6 bg-white px-4 py-2.5 rounded-xl border border-[#E5E4E0] shadow-subtle text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-[#202124]">ATS Match: 84%</span>
              <span className="text-[#5F6368]">• Screened in</span>
            </div>

            <div className="hidden lg:flex items-center space-x-2 absolute -top-5 -right-6 bg-white px-4 py-2.5 rounded-xl border border-[#E5E4E0] shadow-subtle text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span className="font-semibold text-[#202124]">+12% Potential Boost</span>
              <span className="text-[#5F6368]">with cloud bullets</span>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Workflow: Upload → Analyze → Improve */}
      <section id="how-it-works" className="py-20 border-t border-[#E5E4E0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-wider">
              Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202124] mt-1">
              From upload to interview-ready in seconds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1: Upload */}
            <div className="p-6 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#5F6368] uppercase tracking-wider">01 • Upload</span>
                <Upload className="w-4 h-4 text-[#7C5CFC]" />
              </div>
              <h3 className="text-base font-bold text-[#202124]">Upload your resume PDF</h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Drag and drop your resume. Text, layout, and work timeline are parsed instantly without manual data entry.
              </p>
              <div className="p-3 bg-white rounded-lg border border-[#E5E4E0] flex items-center space-x-2 text-xs text-[#202124]">
                <FileText className="w-4 h-4 text-[#7C5CFC]" />
                <span className="font-medium truncate">Resume_Senior_Engineer.pdf</span>
                <span className="text-[10px] text-[#5F6368] shrink-0 ml-auto">184 KB</span>
              </div>
            </div>

            {/* Step 2: Analyze */}
            <div className="p-6 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#5F6368] uppercase tracking-wider">02 • Analyze</span>
                <Search className="w-4 h-4 text-[#7C5CFC]" />
              </div>
              <h3 className="text-base font-bold text-[#202124]">Compare against job spec</h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Our semantic model compares your qualifications against required frameworks, seniority level, and technical keywords.
              </p>
              <div className="p-3 bg-white rounded-lg border border-[#E5E4E0] space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#5F6368]">Keyword Coverage</span>
                  <span className="font-semibold text-[#202124]">76%</span>
                </div>
                <div className="w-full bg-[#F1F0EC] rounded-full h-1.5">
                  <div className="bg-[#7C5CFC] h-1.5 rounded-full w-[76%]" />
                </div>
              </div>
            </div>

            {/* Step 3: Improve */}
            <div className="p-6 rounded-xl border border-[#E5E4E0] bg-[#F8F8F5] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#5F6368] uppercase tracking-wider">03 • Improve</span>
                <Sparkles className="w-4 h-4 text-[#7C5CFC]" />
              </div>
              <h3 className="text-base font-bold text-[#202124]">Copy optimized bullets</h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Receive prioritized bullet points written with quantifiable results and tailored keywords ready to paste.
              </p>
              <div className="p-3 bg-white rounded-lg border border-[#E5E4E0] flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#5F6368] truncate mr-2">
                  "Deployed AWS Lambda functions..."
                </span>
                <button
                  onClick={handleCopyDemo}
                  className="p-1 text-[#5F6368] hover:text-[#202124] shrink-0"
                  title="Copy bullet"
                >
                  {copiedDemo ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Demonstrations Section */}
      <section id="features" className="py-20 border-t border-[#E5E4E0] bg-[#F8F8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-wider">
              Visual Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202124] mt-1">
              Clarity over paragraphs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visual Demo 1: Skills Gap Detection */}
            <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#202124]">Skills Gap Detection</h3>
                <span className="text-[11px] font-medium text-[#5F6368]">Instant Comparison</span>
              </div>
              <p className="text-xs text-[#5F6368]">
                Clear distinction between validated qualifications and missing criteria from the job specification.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    10 Verified Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Python', 'SQL', 'TypeScript', 'REST APIs'].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-2">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                    6 Detected Gaps
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['AWS Lambda', 'Amazon S3', 'Docker', 'CI/CD'].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white text-amber-900 border border-amber-200 text-[10px] font-semibold">
                        ! {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Demo 2: Actionable Bullet Rewriting */}
            <div className="bg-white rounded-2xl border border-[#E5E4E0] p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#202124]">Actionable Bullet Rewriting</h3>
                <span className="text-[11px] font-medium text-[#7C5CFC]">High Impact</span>
              </div>
              <p className="text-xs text-[#5F6368]">
                Suggested rewrites pairing action verbs, missing technical keywords, and quantifiable metrics.
              </p>

              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E5E4E0] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-[#202124]">Recommended Addition:</span>
                  <span className="text-[10px] text-[#7C5CFC] font-semibold">+8 ATS Points</span>
                </div>
                <p className="text-xs font-mono text-[#202124] pl-2.5 border-l-2 border-[#7C5CFC] leading-relaxed">
                  "Designed and deployed serverless cloud functions on AWS Lambda integrated with Amazon S3 for event-driven storage."
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#5F6368] pt-1">
                  <span>Covers: AWS Lambda, Amazon S3</span>
                  <span className="text-emerald-700 font-medium">Ready to copy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-14 text-center">
            <Link
              to="/analyze"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#202124] hover:bg-[#333] text-white text-sm font-medium shadow-subtle transition-all duration-150"
            >
              <span>Analyze Your Resume Now</span>
              <ArrowRight className="w-4 h-4 text-[#7C5CFC]" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
