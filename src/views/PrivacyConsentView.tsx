import React from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  UserCheck,
  Cpu,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
} from 'lucide-react';

export const PrivacyConsentView: React.FC = () => {
  const pillars = [
    {
      icon: CheckCircle2,
      title: 'Informed Consent',
      desc: 'Assessment begins only after unambiguous consent confirmation by the complainant or caller, with plain-language disclosure of purpose.',
      highlight: 'Mandatory gate before analysis',
      color: 'bg-[#EDF3EB] text-[#4F7546] border-[#CCE0C7]',
    },
    {
      icon: Lock,
      title: 'Confidentiality',
      desc: 'Sensitive first-contact information is protected end-to-end and restricted exclusively to authenticated, authorized frontline duty officers.',
      highlight: 'Role-based access control',
      color: 'bg-[#EFE2D0] text-[#3F4D2A] border-[#71834B]/25',
    },
    {
      icon: Eye,
      title: 'Data Minimization',
      desc: 'Only linguistic and acoustic cues essential for risk triage and protective referral routing are evaluated. Ephemeral processing prevents needless persistent profiling.',
      highlight: 'Zero non-essential data collection',
      color: 'bg-[#EFE2D0] text-[#3F4D2A] border-[#71834B]/25',
    },
    {
      icon: UserCheck,
      title: 'Human Oversight',
      desc: 'AI does not autonomously dispatch coercive state actions, medical prescriptions, or police raids. Every recommendation requires authorized human verification.',
      highlight: 'Mandatory human confirmation',
      color: 'bg-[#FAF5E8] text-[#8C6D2B] border-[#E8D9B5]',
    },
    {
      icon: Cpu,
      title: 'Explainability',
      desc: 'Officers can inspect the transparent lexical and acoustic indicators that triggered an SVI score, ensuring accountable, non-black-box decision support.',
      highlight: 'Transparent signal attribution',
      color: 'bg-[#DCE2CC] text-[#293022] border-[#71834B]/25',
    },
    {
      icon: Scale,
      title: 'Ethical AI & Bias Mitigation',
      desc: 'Calibrated across regional Indian languages and diverse socioeconomic contexts to avoid biased risk inflation or systemic neglect.',
      highlight: 'Multilingual fairness standards',
      color: 'bg-[#FAF5E8] text-[#8C6D2B] border-[#E8D9B5]',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[#596B3A]/15 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#3F4D2A] bg-[#EFE2D0] border border-[#71834B]/30 px-3 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#596B3A]" />
              <span>Responsible Government AI Governance</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293022] tracking-tight font-serif">
              Privacy & Responsible AI
            </h1>
            <p className="text-xs sm:text-sm text-[#68705C] leading-relaxed">
              TRAUMA CURE is built on foundational ethics of non-diagnostic decision-support, citizen consent, explainable algorithms, and absolute human authority.
            </p>
          </div>

          {/* Prominent Badge */}
          <div className="shrink-0 p-5 rounded-2xl bg-gradient-to-br from-[#3F4D2A] via-[#596B3A] to-[#293022] text-[#FFFDF8] shadow-md border border-[#71834B]/35 text-center space-y-1">
            <div className="text-[11px] font-mono text-[#B69A5A] uppercase tracking-widest font-bold">
              Core Charter
            </div>
            <div className="text-sm sm:text-base font-extrabold text-[#FFFDF8] tracking-tight">
              Privacy-first • Human-reviewed • Responsible AI
            </div>
            <p className="text-[10px] text-[#DCE2CC]">
              Smart India Hackathon PS 26093 Standard
            </p>
          </div>
        </div>
      </div>

      {/* 6 Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FFFDF8] border border-[#596B3A]/15 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-[#596B3A]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#EFE2D0] border border-[#71834B]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#596B3A]" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${pillar.color}`}>
                    {pillar.highlight}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#293022]">{pillar.title}</h3>
                <p className="text-xs text-[#68705C] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Non-Diagnostic Clinical Clarification Box */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#FFFDF8] border-2 border-[#71834B]/30 shadow-xs space-y-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#596B3A] text-[#FFFDF8] flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-[#FFFDF8]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#293022]">
              Important Decision-Support & Non-Diagnostic Boundary
            </h2>
            <p className="text-xs text-[#68705C] mt-1 leading-relaxed">
              TRAUMA CURE is engineered exclusively as a <strong>first-contact prioritization aid</strong> for frontline emergency helpline operators and citizen service desks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#FCF9F2] border border-[#596B3A]/15 text-xs text-[#293022] space-y-1.5">
            <span className="font-bold text-[#3F4D2A] flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#596B3A]" />
              <span>What TRAUMA CURE Does:</span>
            </span>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#68705C]">
              <li>Assesses indicators of acute fear, anxiety, and distress in reported interactions.</li>
              <li>Calculates a structured Stress Vulnerability Index (SVI) score for triage queue ordering.</li>
              <li>Recommends appropriate human resources (counselling, legal aid, police review).</li>
              <li>Surfaces explainable linguistic and acoustic signals for officer verification.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#FCF9F2] border border-[#596B3A]/15 text-xs text-[#293022] space-y-1.5">
            <span className="font-bold text-[#3F4D2A] flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-[#B69A5A]" />
              <span>What TRAUMA CURE Does NOT Do:</span>
            </span>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#68705C]">
              <li>Does NOT provide medical or psychiatric diagnoses.</li>
              <li>Does NOT independently make binding legal or clinical determinations.</li>
              <li>Does NOT bypass mandatory human confirmation before contacting emergency services.</li>
              <li>Does NOT share personal identifiable statements with unauthorized commercial entities.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
