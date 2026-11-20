import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileCheck2, 
  Menu, 
  X, 
  ArrowRight
} from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F8F5]/90 backdrop-blur-md border-b border-[#E5E4E0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#202124] flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <FileCheck2 className="w-4 h-4 text-[#7C5CFC]" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg tracking-tight text-[#202124]">
                Resume<span className="text-[#7C5CFC]">IQ</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isCurrent('/') 
                  ? 'text-[#202124] bg-[#EAE9E4] font-semibold' 
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F0EC]'
              }`}
            >
              Home
            </Link>
            <a
              href="/#features"
              className="px-3 py-1.5 rounded-md text-xs font-medium text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F0EC] transition-colors"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="px-3 py-1.5 rounded-md text-xs font-medium text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F0EC] transition-colors"
            >
              Workflow
            </a>
            <Link
              to="/results"
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isCurrent('/results') 
                  ? 'text-[#202124] bg-[#EAE9E4] font-semibold' 
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F0EC]'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-2.5">
            <button 
              onClick={onOpenAuth}
              className="text-xs font-medium text-[#5F6368] hover:text-[#202124] px-3 py-1.5 rounded-md hover:bg-[#F1F0EC] transition-colors"
            >
              Sign In
            </button>
            <Link
              to="/analyze"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#202124] hover:bg-[#333] active:bg-[#111] text-white text-xs font-medium shadow-subtle transition-all duration-150"
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFC]" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/analyze"
              className="px-3 py-1.5 rounded-md bg-[#202124] text-white text-xs font-medium"
            >
              Analyze
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F0EC] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E4E0] bg-[#F8F8F5] px-4 pt-2 pb-5 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-[#202124] hover:bg-[#F1F0EC]"
          >
            Home
          </Link>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-[#202124] hover:bg-[#F1F0EC]"
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-[#202124] hover:bg-[#F1F0EC]"
          >
            Workflow
          </a>
          <Link
            to="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-[#202124] hover:bg-[#F1F0EC]"
          >
            Dashboard
          </Link>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-[#202124] hover:bg-[#F1F0EC]"
          >
            History
          </Link>

          <div className="pt-3 border-t border-[#E5E4E0] flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuth) onOpenAuth();
              }}
              className="w-full text-center py-2 rounded-md border border-[#E5E4E0] text-xs font-medium text-[#202124]"
            >
              Sign In
            </button>
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-md bg-[#202124] text-white text-xs font-medium flex items-center justify-center space-x-1.5"
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFC]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
