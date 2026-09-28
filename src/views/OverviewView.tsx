import React from 'react';
import {
  FilePlus2,
  ListOrdered,
  AlertTriangle,
  Clock,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Sparkles,
  PhoneCall,
  UserCheck,
} from 'lucide-react';
import { CaseRecord } from '../types';
import { DEMO_SCENARIOS } from '../data/mockCases';
import { getRiskLevelBadgeColor } from '../services/assessmentEngine';

interface OverviewViewProps {
  cases: CaseRecord[];
  onStartNewAssessment: () => void;
  onViewQueue: () => void;
  onSelectCase: (caseItem: CaseRecord) => void;
  onRunDemoScenario: (scenarioId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  cases,
  onStartNewAssessment,
  onViewQueue,
  onSelectCase,
  onRunDemoScenario,
}) => {
  // KPI Calculations
  const activeAssessments = 24; // baseline demo metric as requested
  const highCriticalCount = cases.filter(
    (c) => c.riskLevel === 'CRITICAL' || c.riskLevel === 'HIGH'
  ).length;
  const awaitingReviewCount = cases.filter(
    (c) => c.humanReviewStatus === 'Pending' || c.humanReviewStatus === 'In Review'
  ).length;
  const referralsToday = 18;

  // Flow steps for visual diagram
  const flowSteps = [
    { number: '01', title: 'Interaction', desc: 'Text, Speech, or 14566 IVRS call', tag: 'Ingestion' },
    { number: '02', title: 'AI Analysis', desc: 'Speech tremor & semantic extraction', tag: 'Processing' },
    { number: '03', title: 'Stress Vulnerability Index', desc: 'Multidimensional SVI (0-100)', tag: 'Scoring' },
    { number: '04', title: 'Risk Classification', desc: 'Low, Moderate, High, Critical', tag: 'Triage' },
    { number: '05', title: 'Human Review', desc: 'Mandatory frontline officer verification', tag: 'Human-in-Loop' },
    { number: '06', title: 'Support Routing', desc: 'Counselling, Legal Aid, Police, ERSS', tag: 'Action' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3F4D2A] via-[#596B3A] to-[#293022] text-[#FFFDF8] p-6 sm:p-10 shadow-xl border border-[#71834B]/30">
        {/* Subtle decorative glow circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFDF8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#1E2514]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFFDF8]/15 backdrop-blur-md border border-[#FFFDF8]/25 text-[#FFFDF8] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B69A5A] animate-pulse"></span>
            <span>Smart India Hackathon 2024–2026 • PS 26093</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-[#FFFDF8] leading-tight">
            AI-Powered First-Contact Trauma Assessment
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#DCE2CC] font-normal leading-relaxed">
            Helping frontline authorities identify distress, acute fear, and vulnerability to prioritize timely human support across NHAA (14566) and emergency citizen interfaces.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartNewAssessment}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#FFFDF8] hover:bg-[#EFE2D0] text-[#3F4D2A] font-extrabold text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <FilePlus2 className="w-4 h-4 text-[#596B3A]" />
              <span>+ Start New Assessment</span>
            </button>

            <button
              onClick={onViewQueue}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#3F4D2A]/80 hover:bg-[#3F4D2A] text-[#FFFDF8] border border-[#71834B]/50 font-semibold text-sm backdrop-blur-sm transition-all cursor-pointer"
            >
              <ListOrdered className="w-4 h-4 text-[#DCE2CC]" />
              <span>View Support Queue</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8B8E7D] uppercase tracking-wider">
              Active Assessments
            </span>
            <div className="w-8 h-8 rounded-full bg-[#EFE2D0] text-[#596B3A] flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#596B3A]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#3F4D2A]">{activeAssessments}</span>
            <span className="text-xs text-[#596B3A] font-medium">Logged today</span>
          </div>
          <p className="mt-1 text-[11px] text-[#68705C]">
            Across 14566 IVRS & citizen portals
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8B8E7D] uppercase tracking-wider">
              High / Critical
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAEEE8] text-[#BD5E38] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#BD5E38]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#3F4D2A]">{highCriticalCount}</span>
            <span className="text-xs text-[#BD5E38] font-bold bg-[#FAEEE8] border border-[#ECCDC1] px-2 py-0.5 rounded-full">
              Priority
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#68705C]">
            Immediate protective human triage
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8B8E7D] uppercase tracking-wider">
              Awaiting Human Review
            </span>
            <div className="w-8 h-8 rounded-full bg-[#EFE2D0] text-[#71834B] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#71834B]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#3F4D2A]">{awaitingReviewCount}</span>
            <span className="text-xs text-[#71834B] font-medium">Duty Desk</span>
          </div>
          <p className="mt-1 text-[11px] text-[#68705C]">
            Assigned to trained intake officers
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8B8E7D] uppercase tracking-wider">
              Support Referrals Today
            </span>
            <div className="w-8 h-8 rounded-full bg-[#EFE2D0] text-[#596B3A] flex items-center justify-center">
              <HeartHandshake className="w-4 h-4 text-[#596B3A]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#3F4D2A]">{referralsToday}</span>
            <span className="text-xs text-[#596B3A] font-medium">94% Accepted</span>
          </div>
          <p className="mt-1 text-[11px] text-[#68705C]">
            Counselling, Legal Aid, Emergency
          </p>
        </div>
      </div>

      {/* Assessment Flow Visual */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#596B3A]/10">
          <div>
            <h2 className="text-lg font-bold text-[#293022] tracking-tight flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#596B3A]" />
              <span>Assessment Architecture Flow</span>
            </h2>
            <p className="text-xs text-[#68705C] mt-0.5">
              Transparent, accountable 6-stage triage pipeline connecting first contact to frontline human intervention.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#3F4D2A] bg-[#EFE2D0] border border-[#71834B]/25 px-3 py-1 rounded-full self-start sm:self-auto">
            Decision-Support Only (Not Diagnosis)
          </span>
        </div>

        {/* Flow Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {flowSteps.map((step, index) => (
            <div
              key={step.number}
              className="relative p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs flex flex-col justify-between group hover:border-[#596B3A] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-extrabold text-[#596B3A]">
                    {step.number}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#EFE2D0] text-[#3F4D2A]">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#293022] leading-snug">
                  {step.title}
                </h3>
                <p className="text-[11px] text-[#68705C] mt-1 leading-normal">
                  {step.desc}
                </p>
              </div>

              {index < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#71834B]/50">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Judge Demo Scenarios Showcase */}
      <div className="bg-[#EFE2D0]/50 rounded-3xl p-6 border border-[#71834B]/25 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#596B3A] text-[#FFFDF8] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#FFFDF8]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#293022]">
                SIH Judge Demo Scenarios (60-Second Walkthrough)
              </h2>
              <p className="text-xs text-[#68705C]">
                Pre-calibrated test cases illustrating how TRAUMA CURE assesses distress levels and directs frontline human response.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#3F4D2A] bg-[#FFFDF8] border border-[#71834B]/30 px-3 py-1 rounded-full self-start sm:self-auto">
            One-Click Presentation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#596B3A]/15 shadow-2xs hover:shadow-md hover:border-[#596B3A]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                      sc.riskLevel === 'CRITICAL'
                        ? 'bg-[#F9EBEB] text-[#9E3232] border border-[#E6BCBC]'
                        : sc.riskLevel === 'HIGH'
                        ? 'bg-[#FAEEE8] text-[#BD5E38] border border-[#ECCDC1]'
                        : 'bg-[#FAF5E8] text-[#8C6D2B] border border-[#E8D9B5]'
                    }`}
                  >
                    {sc.badge}
                  </span>
                  <span className="text-[10px] text-[#8B8E7D] font-medium">
                    {sc.language}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#293022] line-clamp-1">
                  {sc.name}
                </h3>
                <p className="text-[11px] text-[#68705C] mt-1 line-clamp-2">
                  {sc.summary}
                </p>
              </div>

              <button
                onClick={() => onRunDemoScenario(sc.id)}
                className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <span>Run This Live Demo</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFFDF8]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Triage Activity Table Snapshot */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-[#293022]">
              Recent First-Contact Assessments
            </h2>
            <p className="text-xs text-[#68705C]">
              Live incoming triage stream across regional NHAA terminals.
            </p>
          </div>
          <button
            onClick={onViewQueue}
            className="text-xs font-bold text-[#596B3A] hover:text-[#3F4D2A] flex items-center space-x-1 cursor-pointer"
          >
            <span>Open Case Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#596B3A]" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFE2D0]/60 text-[#68705C] uppercase tracking-wider font-semibold border-y border-[#596B3A]/15">
              <tr>
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3">SVI</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Primary Indicators</th>
                <th className="py-2.5 px-3">Review Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#596B3A]/10">
              {cases.slice(0, 4).map((c) => {
                const style = getRiskLevelBadgeColor(c.riskLevel);
                return (
                  <tr key={c.id} className="hover:bg-[#EFE2D0]/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#293022]">
                      {c.id}
                    </td>
                    <td className="py-3 px-3 text-[#68705C]">{c.time}</td>
                    <td className="py-3 px-3 text-[#293022] font-medium">{c.channel}</td>
                    <td className="py-3 px-3">
                      <span className="font-extrabold text-[#293022] text-sm">{c.svi}</span>
                      <span className="text-[#8B8E7D] text-[10px]">/100</span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${style.badge}`}
                      >
                        {c.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#68705C]">
                      {c.indicators
                        .filter((i) => i.level === 'High' || i.level === 'Detected')
                        .map((i) => i.name)
                        .slice(0, 2)
                        .join(' + ') || 'General Distress'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center space-x-1.5 text-[#293022] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#596B3A]"></span>
                        <span>{c.humanReviewStatus}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectCase(c)}
                        className="px-3 py-1.5 rounded-lg bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 text-[#3F4D2A] font-semibold text-[11px] transition-colors cursor-pointer border border-[#71834B]/30"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
