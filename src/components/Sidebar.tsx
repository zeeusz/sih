import React from 'react';
import {
  LayoutDashboard,
  FilePlus2,
  FolderGit2,
  ListOrdered,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'new-assessment'
  | 'cases'
  | 'queue'
  | 'analytics'
  | 'privacy';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  caseCount: number;
  criticalQueueCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  caseCount,
  criticalQueueCount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'overview' as NavTab,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'new-assessment' as NavTab,
      label: 'New Assessment',
      icon: FilePlus2,
      badge: 'Active',
      badgeColor: 'bg-red-100 text-red-700 font-bold',
    },
    {
      id: 'cases' as NavTab,
      label: 'Cases',
      icon: FolderGit2,
      badge: caseCount.toString(),
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'queue' as NavTab,
      label: 'Support Queue',
      icon: ListOrdered,
      badge: criticalQueueCount > 0 ? `${criticalQueueCount} Critical` : null,
      badgeColor: 'bg-rose-100 text-rose-700 font-bold',
    },
    {
      id: 'analytics' as NavTab,
      label: 'Analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'privacy' as NavTab,
      label: 'Privacy & Consent',
      icon: ShieldCheck,
      badge: null,
    },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full justify-between p-4 bg-[#3F4D2A] text-[#EFE2D0] border-r border-[#596B3A]/30">
      {/* Top Header section */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#596B3A]/30 md:hidden">
          <span className="font-bold text-[#FFFDF8] text-sm font-serif">TRAUMA CURE</span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-[#DCE2CC] hover:text-[#FFFDF8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Subtitle */}
        <div className="px-3.5 py-2.5 mb-4 rounded-2xl bg-[#323E22] border border-[#596B3A]/40 shadow-xs">
          <div className="flex items-center space-x-1.5 text-[#FFFDF8] font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#B69A5A] inline-block animate-pulse"></span>
            <span>NHAA Portal 14566</span>
          </div>
          <p className="text-[11px] text-[#DCE2CC]/85 mt-0.5 leading-snug">
            Intelligent trauma & distress triage module
          </p>
        </div>

        {/* Nav List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#596B3A] text-[#FFFDF8] shadow-sm font-semibold border border-[#71834B]/60'
                    : 'text-[#DCE2CC]/80 hover:text-[#FFFDF8] hover:bg-[#596B3A]/25'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#FFFDF8]' : 'text-[#DCE2CC] group-hover:text-[#FFFDF8]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-[#3F4D2A] text-[#FFFDF8] border border-[#71834B]/40'
                        : 'bg-[#323E22] text-[#DCE2CC] border border-[#596B3A]/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Human-in-the-Loop Card */}
      <div className="pt-4 border-t border-[#596B3A]/30 space-y-3">
        <div className="p-3.5 rounded-2xl bg-[#323E22] border border-[#596B3A]/40">
          <div className="flex items-center space-x-2 text-[#FFFDF8] font-semibold text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#B69A5A] shrink-0" />
            <span>Human-in-the-loop enabled</span>
          </div>
          <p className="text-[11px] text-[#DCE2CC]/80 mt-1 leading-snug">
            All AI vulnerability assessments require trained frontline authority verification prior to action.
          </p>
        </div>

        <div className="px-2 text-[10px] text-[#8B8E7D] flex items-center justify-between">
          <span>Engine: TRAUMA-CURE v2.4</span>
          <span className="text-[#B69A5A] font-semibold">Triage Live</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-[calc(100vh-4.5rem)] sticky top-[4.5rem]">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#293022]/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-xs h-full bg-[#3F4D2A] shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
