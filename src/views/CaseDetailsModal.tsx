import React from 'react';
import {
  X,
  Shield,
  HeartHandshake,
  Scale,
  AlertCircle,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Volume2,
  Printer,
  Share2,
} from 'lucide-react';
import { CaseRecord, SupportServiceType } from '../types';
import { CircularGauge } from '../components/CircularGauge';
import { getRiskLevelBadgeColor } from '../services/assessmentEngine';

interface CaseDetailsModalProps {
  caseRecord: CaseRecord;
  onClose: () => void;
  onUpdateStatus?: (caseId: string, status: CaseRecord['humanReviewStatus']) => void;
}

export const CaseDetailsModal: React.FC<CaseDetailsModalProps> = ({
  caseRecord,
  onClose,
  onUpdateStatus,
}) => {
  const style = getRiskLevelBadgeColor(caseRecord.riskLevel);

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
      default:
        return HeartHandshake;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#293022]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FFFDF8] rounded-3xl shadow-2xl border border-[#596B3A]/20 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#596B3A]/15 bg-[#FFFDF8] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#596B3A] text-[#FFFDF8] flex items-center justify-center font-serif font-bold text-sm shadow-sm">
              TC
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-[#293022] font-mono">
                  {caseRecord.id}
                </span>
                <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${style.badge}`}>
                  {caseRecord.riskLevel} RISK (SVI: {caseRecord.svi})
                </span>
                <span className="text-[10px] font-semibold text-[#3F4D2A] bg-[#EFE2D0] border border-[#71834B]/30 px-2.5 py-0.5 rounded-full">
                  DEMO RECORD
                </span>
              </div>
              <p className="text-xs text-[#68705C] mt-0.5">
                Logged on {caseRecord.date} at {caseRecord.time} via {caseRecord.channel}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#68705C] hover:text-[#293022] hover:bg-[#EFE2D0] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#FFFDF8]">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FCF9F2] border border-[#596B3A]/15">
              <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
                Language
              </span>
              <span className="text-xs font-bold text-[#293022] mt-0.5 block">
                {caseRecord.language}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FCF9F2] border border-[#596B3A]/15">
              <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
                Consent Confirmed
              </span>
              <span className="text-xs font-bold text-[#596B3A] mt-0.5 block">
                ✓ Confirmed
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FCF9F2] border border-[#596B3A]/15">
              <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
                Voice Analyzed
              </span>
              <span className="text-xs font-bold text-[#293022] mt-0.5 block">
                {caseRecord.voiceAnalyzed ? 'Yes (Tremor / Pitch)' : 'Text Ingestion'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FCF9F2] border border-[#596B3A]/15">
              <span className="text-[10px] font-bold text-[#8B8E7D] uppercase tracking-wider block">
                Human Review
              </span>
              <span className="text-xs font-bold text-[#3F4D2A] mt-0.5 block">
                {caseRecord.humanReviewStatus}
              </span>
            </div>
          </div>

          {/* Interaction Statement Excerpt */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#293022]">
              <FileText className="w-4 h-4 text-[#596B3A]" />
              <span>Reported Statement / Voice Transcript:</span>
            </div>
            <p className="text-xs text-[#293022] italic leading-relaxed pl-6 bg-[#FCF9F2] p-3 rounded-xl border border-[#596B3A]/15">
              "{caseRecord.statement}"
            </p>
          </div>

          {/* SVI & Detected Indicators */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#293022] uppercase tracking-wider">
              Detected Emotional Indicators
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {caseRecord.indicators.map((ind) => (
                <div
                  key={ind.id}
                  className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#596B3A]/15 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#293022]">
                    <span>{ind.name}</span>
                    <span className="text-[10px] font-bold text-[#596B3A]">{ind.level}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-[#EFE2D0] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        ind.percentage > 70
                          ? 'bg-[#596B3A]'
                          : ind.percentage > 40
                          ? 'bg-[#71834B]'
                          : 'bg-[#8E9F6E]'
                      }`}
                      style={{ width: `${ind.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Reasoning Signals */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#293022] uppercase tracking-wider">
              AI Reasoning Factors
            </h3>
            <div className="space-y-1.5">
              {caseRecord.explainableSignals.map((signal, idx) => (
                <div
                  key={idx}
                  className="text-xs text-[#293022] flex items-start space-x-2 bg-[#FCF9F2] p-2.5 rounded-xl border border-[#596B3A]/15"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#596B3A] mt-1.5 shrink-0" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Support Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#293022] uppercase tracking-wider">
              Recommended Support Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseRecord.recommendations.map((rec) => {
                const Icon = getServiceIcon(rec.type);
                return (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#EFE2D0] text-[#596B3A] flex items-center justify-center shrink-0 border border-[#71834B]/20">
                      <Icon className="w-4 h-4 text-[#596B3A]" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-[#293022]">
                          {rec.title}
                        </span>
                        <span className="text-[10px] font-bold text-[#3F4D2A] bg-[#EFE2D0] px-2 py-0.5 rounded">
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#68705C]">{rec.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Human Review Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#293022] uppercase tracking-wider">
              Human Review & Triage Timeline
            </h3>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EFE2D0]">
              {caseRecord.timeline.map((event) => (
                <div key={event.id} className="relative">
                  <div
                    className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-[#FFFDF8] shadow-2xs ${
                      event.status === 'completed'
                        ? 'bg-[#596B3A] ring-2 ring-[#71834B]/20'
                        : event.status === 'current'
                        ? 'bg-[#B69A5A] ring-2 ring-[#B69A5A]/30 animate-pulse'
                        : 'bg-[#DCE2CC]'
                    }`}
                  />
                  <div className="text-xs font-bold text-[#293022] flex items-center space-x-2">
                    <span>{event.title}</span>
                    <span className="text-[10px] font-mono text-[#8B8E7D]">
                      {event.timestamp}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#68705C] font-medium">
                    {event.actor} • {event.role}
                  </div>
                  {event.notes && (
                    <p className="text-[11px] text-[#293022] mt-0.5 bg-[#FCF9F2] p-2 rounded-lg border border-[#596B3A]/15">
                      {event.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FFFDF8] border-t border-[#596B3A]/15 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#68705C]">
            Current Status: <strong className="text-[#293022]">{caseRecord.humanReviewStatus}</strong>
          </span>

          <div className="flex items-center space-x-2">
            {onUpdateStatus && caseRecord.humanReviewStatus !== 'Assigned' && (
              <button
                onClick={() => onUpdateStatus(caseRecord.id, 'Assigned')}
                className="px-4 py-2 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Assign Support
              </button>
            )}
            {onUpdateStatus && caseRecord.humanReviewStatus !== 'Resolved' && (
              <button
                onClick={() => onUpdateStatus(caseRecord.id, 'Resolved')}
                className="px-4 py-2 rounded-xl bg-[#3F4D2A] hover:bg-[#293022] text-[#FFFDF8] text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Mark Verified
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 border border-[#71834B]/30 text-[#3F4D2A] text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
