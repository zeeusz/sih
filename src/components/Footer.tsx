import React from 'react';
import { ShieldCheck, HeartHandshake, PhoneCall, HeartPulse } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#FFFDF8] border-t border-[#596B3A]/15 py-8 px-4 sm:px-6 lg:px-8 text-xs text-[#68705C]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 font-bold text-[#293022]">
            <HeartPulse className="w-4 h-4 text-[#596B3A]" />
            <span className="font-serif">TRAUMA CURE — Intelligent First-Contact Victim Support</span>
          </div>
          <p className="text-[#68705C] text-[11px]">
            Prototype for <strong className="text-[#293022]">Smart India Hackathon Problem Statement 26093 (PS 26093)</strong>
          </p>
          <p className="text-[#8B8E7D] font-medium text-[11px]">
            AI recommendations require authorized human review. Not a medical or clinical diagnostic system.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 text-[11px] text-[#68705C]">
          <div className="flex items-center space-x-1.5 bg-[#EFE2D0] px-3.5 py-1.5 rounded-xl border border-[#71834B]/25">
            <PhoneCall className="w-3.5 h-3.5 text-[#596B3A]" />
            <span>NHAA Helpline: <strong className="text-[#293022]">14566</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#596B3A] px-3.5 py-1.5 rounded-xl text-[#FFFDF8] font-semibold shadow-2xs">
            <span>Emergency Police: <strong>112</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-[#68705C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#596B3A]" />
            <span>Privacy-First Triage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
