import React from 'react';
import {
  ShieldAlert,
  Sparkles,
  PhoneCall,
  Flame,
  PlusCircle,
  Menu,
  ChevronDown,
  HeartPulse,
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/mockCases';

interface NavbarProps {
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  onSelectScenario: (scenarioId: string) => void;
  onStartNewAssessment: () => void;
  onToggleMobileNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  demoMode,
  setDemoMode,
  onSelectScenario,
  onStartNewAssessment,
  onToggleMobileNav,
}) => {
  const [showScenarioMenu, setShowScenarioMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.05)]">
      {/* Top micro-bar for Government Public Service Context */}
      <div className="bg-[#323E22] text-[#EFE2D0] px-4 py-1.5 text-xs flex items-center justify-between border-b border-[#596B3A]/25">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B69A5A] animate-pulse"></span>
            <span className="text-[#FFFDF8] font-serif font-bold tracking-wider">NHAA 14566</span>
            <span className="text-[#71834B]">|</span>
            <span className="hidden sm:inline text-[#DCE2CC]">National Victim Helpline Assistance Switchboard</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-[11px]">
          <span className="hidden md:inline-flex items-center text-[#FFFDF8] font-medium bg-[#3F4D2A] px-2.5 py-0.5 rounded-full border border-[#71834B]/40">
            Smart India Hackathon • PS 26093
          </span>
          <div className="flex items-center space-x-1.5 text-[#FFFDF8]">
            <PhoneCall className="w-3 h-3 text-[#B69A5A]" />
            <span className="font-semibold text-[#FFFDF8]">Emergency: 112</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 bg-[#FFFDF8]">
        {/* Mobile menu trigger + Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleMobileNav}
            className="md:hidden p-2 rounded-xl text-[#3F4D2A] hover:bg-[#EFE2D0] focus:outline-none"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#596B3A] flex items-center justify-center text-[#FFFDF8] shadow-sm border border-[#71834B]/30">
              <HeartPulse className="w-5 h-5 text-[#FFFDF8]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-[#293022] tracking-tight font-serif">
                  TRAUMA<span className="text-[#596B3A] font-sans font-extrabold text-base ml-1">CURE</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-[#EFE2D0] text-[#3F4D2A] border border-[#71834B]/20">
                  Triage System
                </span>
              </div>
              <p className="text-[11px] text-[#68705C] font-medium leading-none hidden sm:block">
                Intelligent First-Contact Trauma & Vulnerability Assessment
              </p>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Demo Mode Dropdown */}
          <div className="relative">
            <div className="flex items-center rounded-xl border border-[#71834B]/25 bg-[#EFE2D0]/60 p-1 shadow-2xs">
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  demoMode
                    ? 'bg-[#596B3A] text-[#FFFDF8] shadow-xs'
                    : 'text-[#293022] hover:text-[#596B3A]'
                }`}
                title="Toggle Demo Mode with pre-calibrated SIH test cases"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B69A5A]" />
                <span>Demo Mode</span>
              </button>

              {demoMode && (
                <button
                  onClick={() => setShowScenarioMenu(!showScenarioMenu)}
                  className="px-2 py-1.5 text-[#3F4D2A] hover:text-[#293022] border-l border-[#71834B]/25 flex items-center text-xs cursor-pointer"
                  title="Choose pre-built scenario for SIH judges"
                >
                  <span className="text-[11px] font-medium mr-1 hidden sm:inline">Scenarios</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Scenario dropdown popover */}
            {demoMode && showScenarioMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/20 shadow-xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[11px] font-semibold text-[#8B8E7D] uppercase tracking-wider">
                  Select Judge Demo Scenario
                </div>
                <div className="space-y-1 mt-1">
                  {DEMO_SCENARIOS.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        onSelectScenario(sc.id);
                        setShowScenarioMenu(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#EFE2D0]/70 transition-colors group flex items-start space-x-2.5 border border-transparent hover:border-[#71834B]/20 cursor-pointer"
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                          sc.riskLevel === 'CRITICAL'
                            ? 'bg-[#9E3232]'
                            : sc.riskLevel === 'HIGH'
                            ? 'bg-[#BD5E38]'
                            : 'bg-[#B69A5A]'
                        }`}
                      />
                      <div>
                        <div className="text-xs font-bold text-[#293022] flex items-center space-x-1.5">
                          <span>{sc.name.split('—')[0]}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-[#EFE2D0] text-[#3F4D2A]">
                            SVI: {sc.sviTarget}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#68705C] line-clamp-1 mt-0.5">
                          {sc.summary}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* New Assessment Primary Button (Olive Green #596B3A, Hover Dark Olive #3F4D2A) */}
          <button
            onClick={onStartNewAssessment}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow-md cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#FFFDF8]" />
            <span className="hidden sm:inline">Start Assessment</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>
    </header>
  );
};
