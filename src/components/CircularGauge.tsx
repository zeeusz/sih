import React from 'react';
import { RiskLevel } from '../types';

interface CircularGaugeProps {
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  size?: number;
  strokeWidth?: number;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  score,
  riskLevel,
  size = 230,
  strokeWidth = 14,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Restrained risk badge colors
  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-[#F9EBEB] text-[#9E3232] border border-[#E6BCBC]';
      case 'HIGH':
        return 'bg-[#FAEEE8] text-[#BD5E38] border border-[#ECCDC1]';
      case 'MODERATE':
        return 'bg-[#FAF5E8] text-[#8C6D2B] border border-[#E8D9B5]';
      case 'LOW':
      default:
        return 'bg-[#EDF3EB] text-[#4F7546] border border-[#CCE0C7]';
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-[#FFFDF8] rounded-full p-2.5 shadow-[0_4px_24px_-4px_rgba(63,77,42,0.12)] border border-[#596B3A]/15"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          {/* Subtle gradient for progress */}
          <linearGradient id="oliveGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#71834B" />
            <stop offset="100%" stopColor="#596B3A" />
          </linearGradient>
        </defs>

        {/* Base Track in warm beige */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EFE2D0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Animated fill arc in sophisticated olive green */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#oliveGaugeGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 2px 6px rgba(89, 107, 58, 0.25))',
          }}
        />
      </svg>

      {/* Center score readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8B8E7D]">
          SVI SCORE
        </span>
        <div className="flex items-baseline justify-center font-bold tracking-tight mt-0.5">
          <span className="text-4xl sm:text-5xl font-extrabold text-[#3F4D2A] tabular-nums font-mono">
            {score}
          </span>
          <span className="text-[#68705C] text-base sm:text-lg ml-1 font-semibold">/100</span>
        </div>
        <div
          className={`mt-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${getRiskBadge(
            riskLevel
          )}`}
        >
          {riskLevel} RISK
        </div>
      </div>
    </div>
  );
};
