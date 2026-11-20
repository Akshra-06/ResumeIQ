import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileUp, 
  History, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  FileCheck2
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed, onOpenAuth }) {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', to: '/results', icon: LayoutDashboard },
    { name: 'Analyze Resume', to: '/analyze', icon: FileUp },
    { name: 'Previous Analyses', to: '/history', icon: History },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 bg-[#F8F8F5] border-r border-[#E5E4E0] transition-all duration-200 flex flex-col justify-between ${
        collapsed ? 'w-18' : 'w-60'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E4E0]">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2.5 cursor-pointer overflow-hidden"
          >
            <div className="w-8 h-8 min-w-8 rounded-lg bg-[#202124] flex items-center justify-center text-white">
              <FileCheck2 className="w-4 h-4 text-[#7C5CFC]" />
            </div>
            {!collapsed && (
              <span className="font-bold text-base tracking-tight text-[#202124]">
                Resume<span className="text-[#7C5CFC]">IQ</span>
              </span>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1 rounded-md text-[#5F6368] hover:text-[#202124] hover:bg-[#EAE9E4] transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-2.5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EAE9E4] text-[#202124] font-semibold'
                      : 'text-[#5F6368] hover:bg-[#F1F0EC] hover:text-[#202124]'
                  } ${collapsed ? 'justify-center' : 'justify-start space-x-2.5'}`
                }
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <span className="truncate flex-1">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User profile & Footer section */}
      <div className="p-2.5 border-t border-[#E5E4E0] space-y-2">
        <div className={`flex items-center p-1.5 rounded-lg hover:bg-[#F1F0EC] transition-colors ${
          collapsed ? 'justify-center' : 'justify-between space-x-2.5'
        }`}>
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-7 h-7 min-w-7 rounded-full bg-[#202124] text-white font-bold text-xs flex items-center justify-center">
              AM
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#202124] truncate">Alex Morgan</p>
                <p className="text-[10px] text-[#5F6368] truncate">alex.morgan@email.com</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onOpenAuth}
              className="p-1 text-[#5F6368] hover:text-[#202124] rounded hover:bg-[#EAE9E4]"
              title="Account"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
