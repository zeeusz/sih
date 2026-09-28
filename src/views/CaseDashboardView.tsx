import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ShieldAlert,
  FolderGit2,
  PlusCircle,
  FileCheck2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CaseRecord, RiskLevel } from '../types';
import { getRiskLevelBadgeColor } from '../services/assessmentEngine';
import { CaseDetailsModal } from './CaseDetailsModal';

interface CaseDashboardViewProps {
  cases: CaseRecord[];
  onSelectCase: (caseRecord: CaseRecord) => void;
  onStartNewAssessment: () => void;
  onUpdateStatus?: (caseId: string, status: CaseRecord['humanReviewStatus']) => void;
}

export const CaseDashboardView: React.FC<CaseDashboardViewProps> = ({
  cases,
  onSelectCase,
  onStartNewAssessment,
  onUpdateStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>('ALL');
  const [activeModalCase, setActiveModalCase] = useState<CaseRecord | null>(null);

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.channel.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk =
      selectedRiskFilter === 'ALL' || c.riskLevel === selectedRiskFilter;

    const matchesLanguage =
      selectedLanguageFilter === 'ALL' || c.language === selectedLanguageFilter;

    return matchesSearch && matchesRisk && matchesLanguage;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with DEMO DATA label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293022] tracking-tight font-serif">
              Case Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF5E8] text-[#8C6D2B] border border-[#E8D9B5] uppercase tracking-wider">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#68705C] mt-1">
            Centralized registry of first-contact distress assessments, SVI classifications, and frontline support assignments.
          </p>
        </div>

        <button
          onClick={onStartNewAssessment}
          className="self-start sm:self-auto inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#FFFDF8]" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#596B3A]/15 shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8E7D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Case ID, keyword, or channel..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#71834B]/30 bg-[#FCF9F2] text-[#293022] placeholder-[#8B8E7D] focus:outline-none focus:ring-2 focus:ring-[#596B3A]/30 focus:border-[#596B3A] font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedRiskFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRiskFilter === lvl
                  ? 'bg-[#596B3A] text-[#FFFDF8] shadow-2xs'
                  : 'bg-[#EFE2D0] text-[#3F4D2A] hover:bg-[#EFE2D0]/80'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Case Management Table */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFE2D0]/60 text-[#68705C] uppercase tracking-wider font-semibold border-b border-[#596B3A]/15 text-[11px]">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Language</th>
                <th className="py-3 px-3">SVI</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-4">Primary Indicators</th>
                <th className="py-3 px-4">Recommended Support</th>
                <th className="py-3 px-3">Human Review</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#596B3A]/10">
              {filteredCases.map((c) => {
                const style = getRiskLevelBadgeColor(c.riskLevel);
                const primaryInds = c.indicators
                  .filter((i) => i.level === 'High' || i.level === 'Detected')
                  .map((i) => i.name)
                  .slice(0, 2)
                  .join(' + ') || 'Mild Anxiety';

                const recommendedSupportStr =
                  c.recommendations.map((r) => r.type).slice(0, 2).join(' + ') ||
                  'Counselling';

                return (
                  <tr
                    key={c.id}
                    onClick={() => setActiveModalCase(c)}
                    className="hover:bg-[#EFE2D0]/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#293022] group-hover:text-[#596B3A]">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-3 text-[#68705C] whitespace-nowrap">
                      {c.date}
                    </td>
                    <td className="py-3.5 px-3 text-[#293022] font-medium">
                      {c.language}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-[#293022] text-sm">
                        {c.svi}
                      </span>
                      <span className="text-[#8B8E7D] text-[10px]">/100</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${style.badge}`}
                      >
                        {c.riskLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#293022] font-medium max-w-xs truncate">
                      {primaryInds}
                    </td>
                    <td className="py-3.5 px-4 text-[#68705C] max-w-xs truncate">
                      {recommendedSupportStr}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center space-x-1.5 text-xs font-semibold ${
                          c.humanReviewStatus === 'Escalated'
                            ? 'text-[#BD5E38] font-bold'
                            : c.humanReviewStatus === 'Assigned'
                            ? 'text-[#596B3A]'
                            : c.humanReviewStatus === 'Resolved'
                            ? 'text-[#4F7546]'
                            : 'text-[#8C6D2B]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            c.humanReviewStatus === 'Escalated'
                              ? 'bg-[#BD5E38] animate-ping'
                              : c.humanReviewStatus === 'Assigned'
                              ? 'bg-[#596B3A]'
                              : c.humanReviewStatus === 'Resolved'
                              ? 'bg-[#4F7546]'
                              : 'bg-[#B69A5A]'
                          }`}
                        />
                        <span>{c.humanReviewStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#68705C]">
                      {c.channel}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalCase(c);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#EFE2D0] group-hover:bg-[#596B3A] group-hover:text-[#FFFDF8] text-[#3F4D2A] font-bold text-[11px] transition-colors cursor-pointer border border-[#71834B]/30"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[#8B8E7D]">
                    No cases match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Modal */}
      {activeModalCase && (
        <CaseDetailsModal
          caseRecord={activeModalCase}
          onClose={() => setActiveModalCase(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
};
