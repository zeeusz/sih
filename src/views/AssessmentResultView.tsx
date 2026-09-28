import React, { useState } from 'react';
import {
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Scale,
  HeartHandshake,
  AlertCircle,
  Shield,
  PhoneCall,
  CheckCircle2,
  FileCheck2,
  Share2,
  Printer,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CaseRecord, SupportServiceType } from '../types';
import { CircularGauge } from '../components/CircularGauge';
import { EmergencyBanner } from '../components/EmergencyBanner';
import { getRiskLevelBadgeColor } from '../services/assessmentEngine';

interface AssessmentResultViewProps {
  currentCase: CaseRecord;
  onUpdateCase: (updated: CaseRecord) => void;
  onNavigateToCases: () => void;
  onNavigateToQueue: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  currentCase,
  onUpdateCase,
  onNavigateToCases,
  onNavigateToQueue,
}) => {
  const [whyExpanded, setWhyExpanded] = useState(true);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const categories = [
    { label: 'LOW', range: '0–24', color: 'emerald', active: currentCase.riskLevel === 'LOW' },
    { label: 'MODERATE', range: '25–49', color: 'red', active: currentCase.riskLevel === 'MODERATE' },
    { label: 'HIGH', range: '50–74', color: 'amber', active: currentCase.riskLevel === 'HIGH' },
    { label: 'CRITICAL', range: '75–100', color: 'rose', active: currentCase.riskLevel === 'CRITICAL' },
  ];

  const triggerActionFeedback = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  const handleSupportAction = (recId: string, title: string) => {
    const updatedRecs = currentCase.recommendations.map((r) =>
      r.id === recId
        ? {
            ...r,
            status: 'Assigned' as const,
            assignedTo: 'Officer In-Charge (NHAA Duty)',
          }
        : r
    );

    const updated = {
      ...currentCase,
      recommendations: updatedRecs,
      humanReviewStatus: 'In Review' as const,
    };
    onUpdateCase(updated);
    triggerActionFeedback(`Referral action initiated for: ${title}`);
  };

  const handleHumanReviewAction = (
    actionType: 'counselor' | 'legal' | 'escalate' | 'reviewed'
  ) => {
    let newStatus = currentCase.humanReviewStatus;
    let note = '';

    if (actionType === 'counselor') {
      newStatus = 'Assigned';
      note = 'Trauma-informed crisis counselor dispatched by frontline officer.';
    } else if (actionType === 'legal') {
      newStatus = 'In Review';
      note = 'Case dossier forwarded to NALSA Legal Aid Cell for expedited review.';
    } else if (actionType === 'escalate') {
      newStatus = 'Escalated';
      note = 'Case escalated to Senior Duty Officer & Emergency Services.';
    } else if (actionType === 'reviewed') {
      newStatus = 'Resolved';
      note = 'Trained frontline authority completed assessment verification.';
    }

    const newTimelineItem = {
      id: `tl-${Date.now()}`,
      timestamp: 'Just now',
      title: `Human Action: ${actionType.toUpperCase()}`,
      actor: 'Authorized Officer Sharma',
      role: 'Triage Supervisor',
      status: 'completed' as const,
      notes: note,
    };

    const updated: CaseRecord = {
      ...currentCase,
      humanReviewStatus: newStatus,
      reviewNotes: note,
      timeline: [...currentCase.timeline, newTimelineItem],
    };

    onUpdateCase(updated);
    triggerActionFeedback(note);
  };

  const getServiceIcon = (type: SupportServiceType) => {
    switch (type) {
      case 'Counselling':
        return HeartHandshake;
      case 'Legal Aid':
        return Scale;
      case 'Emergency Support':
        return AlertCircle;
      case 'Law Enforcement':
        return Shield;
      case 'Witness Protection':
        return UserCheck;
      case 'Medical Assistance':
      default:
        return HeartHandshake;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification Banner */}
      {actionSuccessMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs font-semibold animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* Critical Alert Banner if Case is Critical */}
      {currentCase.riskLevel === 'CRITICAL' && (
        <EmergencyBanner
          caseId={currentCase.id}
          onEscalate={() => handleHumanReviewAction('escalate')}
          onAssign={() => handleHumanReviewAction('counselor')}
        />
      )}

      {/* Main Assessment Header Card */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] relative overflow-hidden">
        {/* Subtle accent highlight */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EFE2D0]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left Info */}
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-mono font-bold bg-[#FFFDF8] text-[#293022] px-3 py-1 rounded-xl border border-[#71834B]/25 shadow-2xs">
                Case: {currentCase.id}
              </span>
              <span className="text-xs font-semibold bg-[#EFE2D0] text-[#3F4D2A] px-3 py-1 rounded-xl border border-[#71834B]/20">
                {currentCase.channel}
              </span>
              <span className="text-xs font-semibold bg-[#EFE2D0] text-[#3F4D2A] px-3 py-1 rounded-xl border border-[#71834B]/20">
                Language: {currentCase.language}
              </span>
              {currentCase.voiceAnalyzed && (
                <span className="text-xs font-semibold bg-[#DCE2CC] text-[#3F4D2A] px-3 py-1 rounded-xl border border-[#71834B]/30">
                  🎙️ Voice Analyzed
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293022] tracking-tight font-serif">
                Stress & Trauma Assessment
              </h1>
              <p className="text-xs sm:text-sm text-[#68705C] mt-1 leading-relaxed">
                Objective decision-support evaluation generated from first-contact statements and acoustic stress indicators.
              </p>
            </div>

            {/* SVI Clarification Note */}
            <div className="p-3.5 rounded-2xl bg-[#EFE2D0]/60 border border-[#71834B]/25 text-xs text-[#293022] flex items-start space-x-2.5 shadow-2xs">
              <Info className="w-4 h-4 text-[#596B3A] shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Stress Vulnerability Index (SVI):</strong> SVI is a structured triage indicator generated from the available interaction data. It is <strong>not a medical diagnosis</strong>.
              </p>
            </div>
          </div>

          {/* Right Circular Gauge */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <CircularGauge
              score={currentCase.svi}
              riskLevel={currentCase.riskLevel}
              size={220}
            />
          </div>
        </div>

        {/* 4 Risk Categories Bar */}
        <div className="mt-8 pt-6 border-t border-[#596B3A]/15">
          <div className="text-[11px] font-bold text-[#8B8E7D] uppercase tracking-wider mb-2 text-center md:text-left">
            Triage Risk Classification (Prototype Thresholds)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  cat.active
                    ? cat.label === 'CRITICAL'
                      ? 'bg-[#F9EBEB] border-[#E6BCBC] text-[#9E3232] shadow-sm ring-2 ring-[#9E3232]/25'
                      : cat.label === 'HIGH'
                      ? 'bg-[#FAEEE8] border-[#ECCDC1] text-[#BD5E38] shadow-sm ring-2 ring-[#BD5E38]/20'
                      : cat.label === 'MODERATE'
                      ? 'bg-[#FAF5E8] border-[#E8D9B5] text-[#8C6D2B] shadow-sm ring-2 ring-[#B69A5A]/20'
                      : 'bg-[#EDF3EB] border-[#CCE0C7] text-[#4F7546] shadow-sm ring-2 ring-[#4F7546]/20'
                    : 'bg-[#FFFDF8] border-[#596B3A]/15 opacity-60'
                }`}
              >
                <div
                  className={`text-xs font-bold uppercase tracking-wider ${
                    cat.active
                      ? cat.label === 'CRITICAL'
                        ? 'text-[#9E3232]'
                        : cat.label === 'HIGH'
                        ? 'text-[#BD5E38]'
                        : cat.label === 'MODERATE'
                        ? 'text-[#8C6D2B]'
                        : 'text-[#4F7546]'
                      : 'text-[#8B8E7D]'
                  }`}
                >
                  {cat.label}
                </div>
                <div className={`text-[11px] font-mono mt-0.5 ${cat.active ? 'text-[#293022]' : 'text-[#8B8E7D]'}`}>
                  Score {cat.range}
                </div>
                {cat.active && (
                  <span className="inline-block mt-1 text-[9px] uppercase font-bold tracking-widest px-2 py-0.2 bg-[#FFFDF8] text-[#3F4D2A] border border-[#71834B]/30 rounded-full shadow-2xs">
                    Current Case
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 9: Emotional Indicators */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#293022] tracking-tight">
            Detected Emotional Indicators
          </h2>
          <p className="text-xs text-[#68705C]">
            Multi-dimensional distress signals extracted from statement syntax and vocal cadence.
          </p>
        </div>

        {/* Visual Indicator Cards with Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCase.indicators.map((ind) => {
            const isHigh = ind.level === 'High' || ind.level === 'Detected';
            const isModerate = ind.level === 'Moderate' || ind.level === 'Possible';

            return (
              <div
                key={ind.id}
                className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 space-y-2 hover:border-[#596B3A]/40 transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#293022]">{ind.name}</span>
                  <span
                    className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-[#FAEEE8] text-[#BD5E38] border border-[#ECCDC1]'
                        : isModerate
                        ? 'bg-[#FAF5E8] text-[#8C6D2B] border border-[#E8D9B5]'
                        : 'bg-[#EDF3EB] text-[#4F7546] border border-[#CCE0C7]'
                    }`}
                  >
                    {ind.level}
                  </span>
                </div>

                {/* Visual Bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full bg-[#EFE2D0] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isHigh
                          ? 'bg-[#596B3A]'
                          : isModerate
                          ? 'bg-[#71834B]'
                          : 'bg-[#8E9F6E]'
                      }`}
                      style={{ width: `${ind.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#8B8E7D] font-mono">
                    <span>Signal Intensity</span>
                    <span>{ind.percentage}%</span>
                  </div>
                </div>

                {ind.evidence && (
                  <p className="text-[11px] text-[#68705C] italic line-clamp-1">
                    "{ind.evidence}"
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Expandable Section: "Why was this assessment generated?" */}
        <div className="border border-[#596B3A]/20 rounded-2xl overflow-hidden bg-[#EFE2D0]/30">
          <button
            onClick={() => setWhyExpanded(!whyExpanded)}
            className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#293022] hover:bg-[#EFE2D0]/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#B69A5A]" />
              <span>Why was this assessment generated? (Explainable AI Signals)</span>
            </div>
            {whyExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#596B3A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#596B3A]" />
            )}
          </button>

          {whyExpanded && (
            <div className="p-4 pt-0 space-y-2.5 text-xs text-[#293022] border-t border-[#596B3A]/15">
              <p className="text-[11px] text-[#68705C] mb-2">
                TRAUMA CURE provides transparent signal attribution so human triage officers can understand the factors informing the recommendation:
              </p>
              <div className="space-y-1.5">
                {currentCase.explainableSignals.map((signal, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2 bg-[#FFFDF8] p-2.5 rounded-xl border border-[#596B3A]/15"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#596B3A] mt-1.5 shrink-0" />
                    <span className="font-medium text-[#293022]">{signal}</span>
                  </div>
                ))}
              </div>

              {/* Statement excerpt reference */}
              <div className="mt-3 p-3 rounded-xl bg-[#FFFDF8] border border-[#596B3A]/15">
                <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block mb-1">
                  Evaluated Complainant Statement Excerpt:
                </span>
                <p className="italic text-[#293022] text-xs">
                  "{currentCase.statement}"
                </p>
              </div>

              <div className="text-[10px] text-[#8B8E7D] pt-1">
                Notice: The system identifies <strong>indicators detected</strong> in interactions and does not state medical conditions.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 10: Recommended Support Path */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#293022] tracking-tight">
            Recommended Support Path
          </h2>
          <p className="text-xs text-[#68705C]">
            Based on the assessment, the system recommends human review and potential referral to:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCase.recommendations.map((rec) => {
            const Icon = getServiceIcon(rec.type);
            const isAssigned = rec.status === 'Assigned';

            return (
              <div
                key={rec.id}
                className="p-5 rounded-2xl border border-[#596B3A]/15 bg-[#FFFDF8] flex flex-col justify-between space-y-4 hover:border-[#596B3A]/40 transition-colors shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#EFE2D0] text-[#596B3A] flex items-center justify-center shrink-0 border border-[#71834B]/20">
                        <Icon className="w-4 h-4 text-[#596B3A]" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#293022]">
                          {rec.title}
                        </h3>
                        <span className="text-[11px] font-medium text-[#68705C]">
                          {rec.type}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                        rec.priority === 'Critical'
                          ? 'bg-[#F9EBEB] text-[#9E3232] border border-[#E6BCBC]'
                          : rec.priority === 'High'
                          ? 'bg-[#FAEEE8] text-[#BD5E38] border border-[#ECCDC1]'
                          : 'bg-[#EDF3EB] text-[#4F7546] border border-[#CCE0C7]'
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                  </div>

                  <p className="text-xs text-[#68705C] leading-normal pl-11">
                    {rec.reason}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#596B3A]/15 flex items-center justify-between">
                  <span className="text-[11px] text-[#68705C] font-medium">
                    Status: <strong className="text-[#293022]">{rec.status}</strong>
                  </span>

                  <button
                    onClick={() => handleSupportAction(rec.id, rec.title)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isAssigned
                        ? 'bg-[#EFE2D0] text-[#3F4D2A] border border-[#71834B]/30'
                        : 'bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] shadow-xs'
                    }`}
                  >
                    {isAssigned ? '✓ Assigned' : 'Refer'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 11: Human-in-the-Loop Panel */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#FFFDF8] border-2 border-[#71834B]/30 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] space-y-5">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#596B3A] text-[#FFFDF8] flex items-center justify-center shrink-0 shadow-sm">
            <UserCheck className="w-5 h-5 text-[#FFFDF8]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#293022]">
              Human Review Required
            </h2>
            <p className="text-xs sm:text-sm text-[#68705C] mt-0.5 leading-relaxed">
              AI assessment is intended to support trained professionals. Final decisions must be made by authorized human personnel.
            </p>
          </div>
        </div>

        {/* 4 Important Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <button
            onClick={() => handleHumanReviewAction('counselor')}
            className="p-3 rounded-xl bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 text-[#3F4D2A] font-bold text-xs border border-[#71834B]/30 shadow-2xs transition-all flex flex-col items-center justify-center space-y-1.5 cursor-pointer text-center"
          >
            <HeartHandshake className="w-4 h-4 text-[#596B3A]" />
            <span>Assign Counsellor</span>
          </button>

          <button
            onClick={() => handleHumanReviewAction('legal')}
            className="p-3 rounded-xl bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 text-[#3F4D2A] font-bold text-xs border border-[#71834B]/30 shadow-2xs transition-all flex flex-col items-center justify-center space-y-1.5 cursor-pointer text-center"
          >
            <Scale className="w-4 h-4 text-[#596B3A]" />
            <span>Send for Legal Review</span>
          </button>

          <button
            onClick={() => handleHumanReviewAction('escalate')}
            className="p-3 rounded-xl bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 text-[#3F4D2A] font-bold text-xs border border-[#71834B]/30 shadow-2xs transition-all flex flex-col items-center justify-center space-y-1.5 cursor-pointer text-center"
          >
            <ShieldAlert className="w-4 h-4 text-[#596B3A]" />
            <span>Escalate to Officer</span>
          </button>

          <button
            onClick={() => handleHumanReviewAction('reviewed')}
            className="p-3 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] font-bold text-xs shadow-xs transition-all flex flex-col items-center justify-center space-y-1.5 cursor-pointer text-center"
          >
            <FileCheck2 className="w-4 h-4 text-[#FFFDF8]" />
            <span>Mark Reviewed</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[#596B3A]/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-[#68705C]">
            <span className="font-semibold">Review Status:</span>
            <span className="font-mono bg-[#EFE2D0] px-2.5 py-0.5 rounded-lg border border-[#71834B]/30 text-[#293022] font-bold">
              {currentCase.humanReviewStatus}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateToQueue}
              className="text-[#596B3A] hover:text-[#3F4D2A] font-bold flex items-center space-x-1 cursor-pointer"
            >
              <span>View in Support Queue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#596B3A]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
