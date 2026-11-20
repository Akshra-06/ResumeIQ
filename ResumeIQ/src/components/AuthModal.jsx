import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202124]/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-2xl border border-[#E5E4E0] p-6 shadow-premium relative">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-1 rounded-md text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F0EC]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#F8F8F5] border border-[#E5E4E0] flex items-center justify-center text-[#202124] mx-auto mb-2.5">
            <Lock className="w-5 h-5 text-[#7C5CFC]" />
          </div>
          <h3 className="text-base font-bold text-[#202124] tracking-tight">
            Sign In to ResumeIQ
          </h3>
          <p className="text-[11px] text-[#5F6368] mt-0.5">
            Access previous scans and candidate analytics
          </p>
        </div>

        {isSuccess ? (
          <div className="py-5 text-center space-y-1.5">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-xs font-bold text-[#202124]">Signed in successfully</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#5F6368] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#5F6368] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#E5E4E0] text-xs text-[#202124] focus:outline-none focus:border-[#7C5CFC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5F6368] mb-1">
                Password
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                required
                className="w-full px-3 py-2 rounded-lg border border-[#E5E4E0] text-xs text-[#202124] focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#202124] hover:bg-[#333] text-white text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFC]" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
