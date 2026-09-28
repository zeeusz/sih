import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Clock,
  HeartHandshake,
  Scale,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { CaseRecord } from '../types';

interface AnalyticsViewProps {
  cases: CaseRecord[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ cases }) => {
  // Metrics
  const totalAssessments = 142; // historical aggregate for presentation
  const highRiskCases = 28;
  const criticalCases = 9;
  const counsellingReferrals = 86;
  const legalAidReferrals = 54;
  const averageResponseTime = '3.8 min';

  // Risk Distribution Data (Donut Chart) - using Olive, Dark Olive, Muted Gold, Sage
  const riskDist = [
    { label: 'Low (0-24)', count: 48, pct: 34, color: '#71834B', bg: 'bg-[#71834B]' },
    { label: 'Moderate (25-49)', count: 57, pct: 40, color: '#596B3A', bg: 'bg-[#596B3A]' },
    { label: 'High (50-74)', count: 28, pct: 20, color: '#B69A5A', bg: 'bg-[#B69A5A]' },
    { label: 'Critical (75-100)', count: 9, pct: 6, color: '#3F4D2A', bg: 'bg-[#3F4D2A]' },
  ];

  // Support Routing Breakdown (Bar Chart) - using cohesive olive & gold tones
  const routingData = [
    { service: 'Counselling', count: 86, pct: 86, color: 'bg-[#596B3A]' },
    { service: 'Legal Aid (NALSA)', count: 54, pct: 54, color: 'bg-[#71834B]' },
    { service: 'Medical Assistance', count: 22, pct: 22, color: 'bg-[#8E9F6E]' },
    { service: 'Law Enforcement', count: 31, pct: 31, color: 'bg-[#3F4D2A]' },
    { service: 'Witness Protection', count: 12, pct: 12, color: 'bg-[#B69A5A]' },
    { service: 'Emergency Support (ERSS 112)', count: 9, pct: 9, color: 'bg-[#4B5B31]' },
  ];

  // 7-Day Assessment Trend (Line Chart SVG)
  const trendDays = [
    { day: 'Mon', count: 18 },
    { day: 'Tue', count: 22 },
    { day: 'Wed', count: 19 },
    { day: 'Thu', count: 26 },
    { day: 'Fri', count: 24 },
    { day: 'Sat', count: 15 },
    { day: 'Sun', count: 18 },
  ];

  // SVG Line coordinates
  // Width 500, Height 140
  const maxVal = 30;
  const points = trendDays.map((d, i) => {
    const x = 30 + i * 70;
    const y = 120 - (d.count / maxVal) * 90;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} 130 L ${points[0].x} 130 Z`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#3F4D2A] bg-[#EFE2D0] border border-[#71834B]/30 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <span>Triage Analytics & Insights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293022] tracking-tight font-serif">
            System Analytics & Reporting
          </h1>
          <p className="text-xs sm:text-sm text-[#68705C] mt-0.5">
            Aggregated decision-support metrics, risk distribution, and support routing statistics across NHAA terminals.
          </p>
        </div>
        <span className="text-[11px] font-bold px-3.5 py-1 rounded-full bg-[#EFE2D0] text-[#3F4D2A] border border-[#71834B]/25 self-start sm:self-auto">
          ILLUSTRATIVE DEMO DATA
        </span>
      </div>

      {/* 6 Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
            Total Assessments
          </span>
          <div className="text-2xl font-extrabold text-[#3F4D2A] mt-1">{totalAssessments}</div>
          <span className="text-[10px] text-[#596B3A] font-semibold">+18% this week</span>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
            High Risk Cases
          </span>
          <div className="text-2xl font-extrabold text-[#3F4D2A] mt-1">{highRiskCases}</div>
          <span className="text-[10px] text-[#68705C]">19.7% of intake</span>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
            Critical Cases
          </span>
          <div className="text-2xl font-extrabold text-[#3F4D2A] mt-1">{criticalCases}</div>
          <span className="text-[10px] text-[#BD5E38] font-semibold">Immediate attention</span>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
            Counselling Referrals
          </span>
          <div className="text-2xl font-extrabold text-[#3F4D2A] mt-1">{counsellingReferrals}</div>
          <span className="text-[10px] text-[#68705C]">Primary route</span>
        </div>

        {/* Metric 5 */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
            Legal Aid Referrals
          </span>
          <div className="text-2xl font-extrabold text-[#3F4D2A] mt-1">{legalAidReferrals}</div>
          <span className="text-[10px] text-[#68705C]">NALSA Network</span>
        </div>

        {/* Metric 6 */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
            Avg Response Time
          </span>
          <div className="text-2xl font-extrabold text-[#3F4D2A] mt-1">{averageResponseTime}</div>
          <span className="text-[10px] text-[#596B3A] font-semibold">Triage to contact</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Donut Chart */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#596B3A]/15 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#596B3A]/10">
              <h2 className="text-base font-bold text-[#293022] flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-[#596B3A]" />
                <span>Risk Distribution (SVI Classification)</span>
              </h2>
              <span className="text-[11px] text-[#8B8E7D] font-mono">142 Cases</span>
            </div>

            {/* Donut representation */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg width="176" height="176" className="transform -rotate-90">
                  {/* Circle 1 - Low (34%) */}
                  <circle
                    cx="88"
                    cy="88"
                    r="64"
                    stroke="#71834B"
                    strokeWidth="24"
                    strokeDasharray="402"
                    strokeDashoffset="136"
                    fill="transparent"
                  />
                  {/* Circle 2 - Moderate (40%) */}
                  <circle
                    cx="88"
                    cy="88"
                    r="64"
                    stroke="#596B3A"
                    strokeWidth="24"
                    strokeDasharray="402"
                    strokeDashoffset="241"
                    fill="transparent"
                    style={{ strokeDashoffset: 402 * (1 - 0.4) }}
                  />
                  {/* Circle 3 - High (20%) */}
                  <circle
                    cx="88"
                    cy="88"
                    r="64"
                    stroke="#B69A5A"
                    strokeWidth="24"
                    fill="transparent"
                    style={{
                      strokeDasharray: '402',
                      strokeDashoffset: 402 * (1 - 0.2),
                    }}
                  />
                  {/* Circle 4 - Critical (6%) */}
                  <circle
                    cx="88"
                    cy="88"
                    r="64"
                    stroke="#3F4D2A"
                    strokeWidth="24"
                    fill="transparent"
                    style={{
                      strokeDasharray: '402',
                      strokeDashoffset: 402 * (1 - 0.06),
                    }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs uppercase font-bold text-[#8B8E7D]">Total</span>
                  <span className="text-2xl font-black text-[#293022]">142</span>
                  <span className="text-[10px] text-[#596B3A] font-semibold">Triaged</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2.5 w-full sm:w-auto">
                {riskDist.map((item) => (
                  <div key={item.label} className="flex items-center justify-between space-x-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${item.bg}`} />
                      <span className="font-semibold text-[#293022]">{item.label}</span>
                    </div>
                    <div className="font-mono text-[#293022] font-bold">
                      {item.count} <span className="text-[#8B8E7D] font-normal">({item.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#596B3A]/10 text-[11px] text-[#68705C]">
            Categorization reflects initial automated screening. 100% of Critical and High cases were reviewed by designated personnel.
          </div>
        </div>

        {/* Support Routing Bar Chart */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#596B3A]/15 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#596B3A]/10">
              <h2 className="text-base font-bold text-[#293022] flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-[#596B3A]" />
                <span>Support Routing Referral Volume</span>
              </h2>
              <span className="text-[11px] text-[#8B8E7D] font-mono">Multi-channel</span>
            </div>

            <div className="mt-5 space-y-3.5">
              {routingData.map((item) => (
                <div key={item.service} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#293022]">
                    <span>{item.service}</span>
                    <span className="font-mono text-[#3F4D2A] font-bold">{item.count} referrals</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#EFE2D0] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-700`}
                      style={{ width: `${(item.count / 100) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#596B3A]/10 text-[11px] text-[#68705C]">
            Complainants may receive multi-disciplinary referrals (e.g., both Counseling and Legal Aid).
          </div>
        </div>
      </div>

      {/* Assessment Trend Line Chart over last 7 days */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#596B3A]/15 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#596B3A]/10">
          <div>
            <h2 className="text-base font-bold text-[#293022] flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#596B3A]" />
              <span>7-Day Assessment Volume Trend</span>
            </h2>
            <p className="text-xs text-[#68705C] mt-0.5">
              Daily incoming victim interactions processed through automated distress triage.
            </p>
          </div>
          <span className="text-xs font-bold text-[#3F4D2A] bg-[#EFE2D0] px-3 py-1 rounded-xl border border-[#71834B]/25">
            Average: 20.4 / day
          </span>
        </div>

        {/* Responsive SVG Chart */}
        <div className="mt-6 w-full overflow-x-auto">
          <svg viewBox="0 0 500 150" className="w-full h-44 text-[#596B3A] overflow-visible">
            {/* Grid lines in light beige */}
            <line x1="20" y1="30" x2="480" y2="30" stroke="#EFE2D0" strokeWidth="1" />
            <line x1="20" y1="75" x2="480" y2="75" stroke="#EFE2D0" strokeWidth="1" />
            <line x1="20" y1="120" x2="480" y2="120" stroke="#DCE2CC" strokeWidth="1" />

            {/* Gradient area in olive */}
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#596B3A" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#596B3A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path d={areaD} fill="url(#trendGradient)" />
            <path d={pathD} fill="none" stroke="#596B3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Points & Labels */}
            {points.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  fill="#FFFDF8"
                  stroke="#596B3A"
                  strokeWidth="2.5"
                />
                <text
                  x={pt.x}
                  y={pt.y - 10}
                  textAnchor="middle"
                  className="text-[10px] font-mono font-bold fill-[#293022]"
                >
                  {pt.count}
                </text>
                <text
                  x={pt.x}
                  y={140}
                  textAnchor="middle"
                  className="text-[11px] font-semibold fill-[#68705C]"
                >
                  {pt.day}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};
