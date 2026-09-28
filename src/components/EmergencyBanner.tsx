import React from 'react';
import { AlertCircle, UserCheck, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface EmergencyBannerProps {
  onEscalate?: () => void;
  onAssign?: () => void;
  caseId?: string;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  onEscalate,
  onAssign,
  caseId,
}) => {
  return (
    <div className="rounded-2xl border border-[#9E3232]/25 bg-[#FFFDF8] p-5 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#F9EBEB] text-[#9E3232] border border-[#E6BCBC] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base font-bold text-[#293022]">
                Priority Human Review Required
              </span>
              {caseId && (
                <span className="text-xs bg-[#F9EBEB] text-[#9E3232] border border-[#E6BCBC] font-mono font-bold px-2 py-0.5 rounded-lg">
                  {caseId}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#68705C] mt-0.5 max-w-2xl leading-relaxed">
              Critical indicators have been detected in this interaction. An authorized frontline professional should review this case promptly to coordinate protective resources.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
          {onAssign && (
            <button
              onClick={onAssign}
              className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 border border-[#71834B]/40 text-[#3F4D2A] text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#596B3A]" />
              <span>Assign Professional</span>
            </button>
          )}

          {onEscalate && (
            <button
              onClick={onEscalate}
              className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-[#FFFDF8]" />
              <span>Escalate for Human Review</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
