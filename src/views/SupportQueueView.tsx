import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  PhoneCall,
  Scale,
  HeartHandshake,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CaseRecord, RiskLevel, SupportServiceType } from '../types';
import { getRiskLevelBadgeColor } from '../services/assessmentEngine';
import { CaseDetailsModal } from './CaseDetailsModal';

interface SupportQueueViewProps {
  cases: CaseRecord[];
  onSelectCase: (caseRecord: CaseRecord) => void;
  onUpdateStatus?: (caseId: string, status: CaseRecord['humanReviewStatus']) => void;
}

export const SupportQueueView: React.FC<SupportQueueViewProps> = ({
  cases,
  onSelectCase,
  onUpdateStatus,
}) => {
  const [selectedCaseForModal, setSelectedCaseForModal] = useState<CaseRecord | null>(null);

  // Group cases by risk tier
  const criticalCases = cases.filter((c) => c.riskLevel === 'CRITICAL');
  const highCases = cases.filter((c) => c.riskLevel === 'HIGH');
  const moderateCases = cases.filter((c) => c.riskLevel === 'MODERATE');
  const lowCases = cases.filter((c) => c.riskLevel === 'LOW');

  const getServiceBadge = (type: SupportServiceType) => {
    switch (type) {
      case 'Emergency Support':
        return 'bg-[#F9EBEB] text-[#9E3232] border-[#E6BCBC]';
      case 'Law Enforcement':
        return 'bg-[#EFE2D0] text-[#3F4D2A] border-[#71834B]/30';
      case 'Legal Aid':
        return 'bg-[#DCE2CC] text-[#293022] border-[#71834B]/30';
      case 'Counselling':
      default:
        return 'bg-[#FAF5E8] text-[#8C6D2B] border-[#E8D9B5]';
    }
  };

  const renderQueueSection = (
    title: string,
    subtitle: string,
    riskLevel: RiskLevel,
    caseList: CaseRecord[],
    headerBg: string,
    badgeColor: string
  ) => {
    return (
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#596B3A]/15 shadow-xs overflow-hidden">
        {/* Section Header */}
        <div className={`p-4 sm:p-5 ${headerBg} border-b border-[#596B3A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider ${badgeColor}`}>
              {title}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#293022]">
              {subtitle}
            </span>
          </div>

          <div className="text-xs font-semibold text-[#68705C]">
            {caseList.length} {caseList.length === 1 ? 'case enqueued' : 'cases enqueued'}
          </div>
        </div>

        {/* Case Cards List */}
        <div className="p-4 space-y-3">
          {caseList.map((c) => {
            return (
              <div
                key={c.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 hover:border-[#596B3A] hover:shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Left case overview */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-[#EFE2D0] text-[#293022] px-2.5 py-0.5 rounded-lg border border-[#71834B]/25">
                      {c.id}
                    </span>
                    <span className="text-xs font-semibold text-[#68705C]">
                      {c.date} • {c.time}
                    </span>
                    <span className="text-xs font-medium text-[#293022] bg-[#EFE2D0]/60 px-2 py-0.5 rounded-lg">
                      {c.language}
                    </span>
                    <span className="text-xs font-bold text-[#293022] bg-[#FFFDF8] px-2 py-0.5 rounded-lg border border-[#71834B]/25">
                      SVI: {c.svi}/100
                    </span>
                    {c.voiceAnalyzed && (
                      <span className="text-[10px] font-bold bg-[#DCE2CC] text-[#3F4D2A] px-2 py-0.5 rounded-lg border border-[#71834B]/30">
                        🎙️ Voice Analyzed
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#293022] line-clamp-2 italic">
                    "{c.statement}"
                  </p>

                  {/* Recommendations Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider mr-1">
                      Routing:
                    </span>
                    {c.recommendations.map((rec) => (
                      <span
                        key={rec.id}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getServiceBadge(
                          rec.type
                        )}`}
                      >
                        {rec.type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center space-x-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#596B3A]/15">
                  <div className="text-right mr-2 hidden sm:block">
                    <div className="text-[10px] font-bold text-[#8B8E7D] uppercase">
                      Review Status
                    </div>
                    <div className="text-xs font-bold text-[#293022]">
                      {c.humanReviewStatus}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCaseForModal(c)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    <span>Review Case</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFFDF8]" />
                  </button>
                </div>
              </div>
            );
          })}

          {caseList.length === 0 && (
            <div className="py-6 text-center text-xs text-[#8B8E7D]">
              No cases currently in this priority tier.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#3F4D2A] bg-[#EFE2D0] border border-[#71834B]/30 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <span>Frontline Triage Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293022] tracking-tight font-serif">
          Priority Support Queue
        </h1>
        <p className="text-xs sm:text-sm text-[#68705C] mt-1">
          Cases automatically ranked by Stress Vulnerability Index (SVI). Authorize human support, counseling, or emergency services.
        </p>
      </div>

      {/* Human-in-the-loop Protocol Reminder Box */}
      <div className="p-4 rounded-2xl bg-[#FAF5E8] border border-[#E8D9B5] text-xs text-[#293022] flex items-start space-x-3">
        <UserCheck className="w-5 h-5 text-[#B69A5A] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#293022]">Human-in-the-Loop Protocol:</span> AI generates triage recommendations. Emergency service dispatch, legal aid assignment, and counseling referrals are formally dispatched only upon authorized human confirmation.
        </div>
      </div>

      {/* 4 Tiers */}
      <div className="space-y-6">
        {/* Tier 1: Critical */}
        {renderQueueSection(
          'Critical',
          'Immediate Human Attention Required',
          'CRITICAL',
          criticalCases,
          'bg-[#F9EBEB]/70',
          'bg-[#9E3232] text-[#FFFDF8]'
        )}

        {/* Tier 2: High */}
        {renderQueueSection(
          'High',
          'Priority Review & Protective Measures',
          'HIGH',
          highCases,
          'bg-[#FAEEE8]/70',
          'bg-[#BD5E38] text-[#FFFDF8]'
        )}

        {/* Tier 3: Moderate */}
        {renderQueueSection(
          'Moderate',
          'Scheduled Support & Guidance',
          'MODERATE',
          moderateCases,
          'bg-[#FAF5E8]/70',
          'bg-[#B69A5A] text-[#FFFDF8]'
        )}

        {/* Tier 4: Low */}
        {renderQueueSection(
          'Low',
          'Standard Processing & Grievance Facilitation',
          'LOW',
          lowCases,
          'bg-[#EDF3EB]/70',
          'bg-[#596B3A] text-[#FFFDF8]'
        )}
      </div>

      {/* Case Details Modal */}
      {selectedCaseForModal && (
        <CaseDetailsModal
          caseRecord={selectedCaseForModal}
          onClose={() => setSelectedCaseForModal(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
};
