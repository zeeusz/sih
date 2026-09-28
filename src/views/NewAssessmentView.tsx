import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Languages,
  Mic,
  MicOff,
  Volume2,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Radio,
  FileQuestion,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, AnalysisInput } from '../services/assessmentEngine';
import { DEMO_SCENARIOS } from '../data/mockCases';

interface NewAssessmentViewProps {
  onAssessmentCompleted: (input: AnalysisInput) => void;
  preselectedScenarioId?: string | null;
}

export const NewAssessmentView: React.FC<NewAssessmentViewProps> = ({
  onAssessmentCompleted,
  preselectedScenarioId,
}) => {
  // 3-step state
  // Step 1: Consent & Setup
  // Step 2: Interaction Input (Text or Voice)
  // Step 3: AI Analysis Processing (Animated)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [language, setLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState<'text' | 'voice'>('text');
  const [statement, setStatement] = useState(
    "I am scared to return home. They threatened my family and told me not to speak to anyone. I haven't been able to sleep properly and I feel like nobody will help me."
  );

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasVoiceSample, setHasVoiceSample] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // AI analysis stages
  const [analysisStage, setAnalysisStage] = useState(0);
  const stages = [
    { title: 'Language Processing', desc: 'Parsing syntax, sentiment polarity, and dialect semantics' },
    { title: 'Speech Pattern Analysis', desc: 'Evaluating pitch variance, pauses, and acoustic tremor' },
    { title: 'Emotional Indicator Analysis', desc: 'Classifying fear, acute dread, and cognitive overload signals' },
    { title: 'Vulnerability Signal Detection', desc: 'Scanning for physical threats, coercion, and isolation markers' },
    { title: 'Stress Vulnerability Calculation', desc: 'Formulating structured Stress Vulnerability Index (SVI)' },
  ];

  // If a preselected scenario was passed in
  useEffect(() => {
    if (preselectedScenarioId) {
      const match = DEMO_SCENARIOS.find((s) => s.id === preselectedScenarioId);
      if (match) {
        setStatement(match.statement);
        setLanguage(match.language);
        setConsentConfirmed(true);
      }
    }
  }, [preselectedScenarioId]);

  // Voice timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setHasVoiceSample(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasVoiceSample(true);
    if (!voiceTranscript) {
      setVoiceTranscript(
        "I need immediate help. There are people outside threatening us and I don't know who to trust."
      );
    }
  };

  const handleLoadDemoVoice = () => {
    setIsRecording(false);
    setRecordingSeconds(12);
    setHasVoiceSample(true);
    setVoiceTranscript(
      "Please listen to me, I am alone at home and they keep calling and banging on the gate. My hands are shaking and I am terrified to even turn on the light."
    );
    setStatement(
      "Please listen to me, I am alone at home and they keep calling and banging on the gate. My hands are shaking and I am terrified to even turn on the light."
    );
  };

  const handleStartAnalysis = (useScenarioId?: string) => {
    setCurrentStep(3);
    setAnalysisStage(0);

    // Progress through the 5 animated stages over ~2.8s
    const stepInterval = 550;
    const t1 = setTimeout(() => setAnalysisStage(1), stepInterval * 1);
    const t2 = setTimeout(() => setAnalysisStage(2), stepInterval * 2);
    const t3 = setTimeout(() => setAnalysisStage(3), stepInterval * 3);
    const t4 = setTimeout(() => setAnalysisStage(4), stepInterval * 4);
    const t5 = setTimeout(() => setAnalysisStage(5), stepInterval * 5);

    const finishTimeout = setTimeout(() => {
      onAssessmentCompleted({
        statement: activeTab === 'voice' && voiceTranscript ? voiceTranscript : statement,
        language,
        isVoiceMode: activeTab === 'voice',
        audioDurationSeconds: recordingSeconds || 14,
        forcedScenarioId: useScenarioId || preselectedScenarioId || undefined,
      });
    }, stepInterval * 5.8);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(finishTimeout);
    };
  };

  const sampleTexts = [
    {
      title: 'Coercion & Threat (High Risk)',
      text: "I am scared to return home. They threatened my family and told me not to speak to anyone. I haven't been able to sleep properly and I feel like nobody will help me.",
    },
    {
      title: 'Active Siege (Critical Risk)',
      text: 'कृपया तुरंत कोई मदद भेजिए! वो हथियार लेकर मेरे दरवाजे पर हैं और उसे तोड़ने की कोशिश कर रहे हैं। मेरी जान खतरे में है!',
      lang: 'Hindi',
    },
    {
      title: 'Workplace Intimidation (Moderate)',
      text: 'My supervisor is withholding my salary documents and threatening to ruin my career if I file a grievance. I feel constant anxiety and chest tightness.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#3F4D2A] bg-[#EFE2D0] border border-[#71834B]/30 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <span>First Contact Intake Module</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293022] tracking-tight font-serif">
          Start New Assessment
        </h1>
        <p className="text-[#68705C] text-sm mt-1">
          Assess the individual's reported distress and vulnerability during first contact.
        </p>
      </div>

      {/* 3-Step Process Indicator */}
      <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#596B3A]/15 shadow-xs">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div
            className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl transition-all ${
              currentStep === 1
                ? 'bg-[#EFE2D0] text-[#293022] font-bold border border-[#71834B]/40'
                : currentStep > 1
                ? 'text-[#596B3A] font-semibold'
                : 'text-[#8B8E7D]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 1
                  ? 'bg-[#596B3A] text-[#FFFDF8]'
                  : currentStep > 1
                  ? 'bg-[#3F4D2A] text-[#FFFDF8]'
                  : 'bg-[#EFE2D0] text-[#68705C]'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <span className="hidden sm:inline">01 Interaction & Consent</span>
            <span className="sm:hidden">01 Consent</span>
          </div>

          <div
            className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl transition-all ${
              currentStep === 2
                ? 'bg-[#EFE2D0] text-[#293022] font-bold border border-[#71834B]/40'
                : currentStep > 2
                ? 'text-[#596B3A] font-semibold'
                : 'text-[#8B8E7D]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 2
                  ? 'bg-[#596B3A] text-[#FFFDF8]'
                  : currentStep > 2
                  ? 'bg-[#3F4D2A] text-[#FFFDF8]'
                  : 'bg-[#EFE2D0] text-[#68705C]'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </span>
            <span className="hidden sm:inline">02 AI Assessment</span>
            <span className="sm:hidden">02 Assessment</span>
          </div>

          <div
            className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl transition-all ${
              currentStep === 3
                ? 'bg-[#EFE2D0] text-[#293022] font-bold border border-[#71834B]/40'
                : 'text-[#8B8E7D]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 3
                  ? 'bg-[#596B3A] text-[#FFFDF8]'
                  : 'bg-[#EFE2D0] text-[#68705C]'
              }`}
            >
              3
            </span>
            <span className="hidden sm:inline">03 Support Plan</span>
            <span className="sm:hidden">03 Plan</span>
          </div>
        </div>
      </div>

      {/* STEP 1: Informed Consent & Language */}
      {currentStep === 1 && (
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] space-y-6">
          <div className="flex items-start space-x-4 pb-6 border-b border-[#596B3A]/15">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE2D0] border border-[#71834B]/25 text-[#596B3A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#596B3A]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#293022]">Informed Consent & Privacy Protocol</h2>
              <p className="text-xs text-[#68705C] mt-1 leading-relaxed">
                Before proceeding, confirm that the individual has been informed about the purpose of this assessment, how their information will be processed, and their privacy rights under national guidelines.
              </p>
            </div>
          </div>

          {/* Legal statement card */}
          <div className="p-4 rounded-2xl bg-[#EFE2D0]/60 border border-[#71834B]/25 text-xs text-[#293022] space-y-2">
            <div className="font-semibold text-[#293022] flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#596B3A]" />
              <span>Standard Intake Notice (NHAA Helpline 14566):</span>
            </div>
            <p className="italic text-[#68705C] leading-normal pl-6">
              "This interaction is being analyzed solely for the purpose of identifying distress and prioritizing supportive human resources (counselling, legal aid, or protective measures). The analysis is a decision-support aid for trained officers and does not constitute a clinical or medical diagnosis. All records are handled in strict compliance with data minimization standards."
            </p>
          </div>

          {/* Consent Checkbox */}
          <div className="p-4 rounded-2xl border-2 transition-all bg-[#FCF9F2] hover:border-[#596B3A]/40 border-[#71834B]/25 cursor-pointer">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentConfirmed}
                onChange={(e) => setConsentConfirmed(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-[#71834B]/40 text-[#596B3A] focus:ring-[#596B3A] cursor-pointer accent-[#596B3A]"
              />
              <div>
                <span className="font-bold text-[#293022] text-sm">
                  Consent confirmed
                </span>
                <p className="text-xs text-[#68705C] mt-0.5">
                  I confirm that the complainant/caller has provided explicit consent or this assessment is initiated under approved first-contact emergency triage protocols.
                </p>
              </div>
            </label>
          </div>

          {/* Language Selection */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#293022]">
              Interaction Language
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full appearance-none bg-[#FCF9F2] border border-[#71834B]/30 text-[#293022] text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#596B3A]/30 focus:border-[#596B3A] font-medium"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.name} ({lang.native})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#68705C]">
                  <Languages className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold text-[#3F4D2A] bg-[#EFE2D0] border border-[#71834B]/25 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-[#596B3A]" />
                <span>Multilingual assessment supported (11 Languages)</span>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!consentConfirmed}
              className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all cursor-pointer ${
                consentConfirmed
                  ? 'bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] shadow-md'
                  : 'bg-[#EFE2D0] text-[#8B8E7D] cursor-not-allowed'
              }`}
            >
              <span>Continue to Interaction</span>
              <ArrowRight className="w-4 h-4 text-[#FFFDF8]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Interaction Input (Text or Voice) */}
      {currentStep === 2 && (
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#596B3A]/15 shadow-[0_2px_12px_-2px_rgba(41,48,34,0.06)] space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between pb-4 border-b border-[#596B3A]/15">
            <div>
              <h2 className="text-base font-bold text-[#293022]">Interaction Input Channel</h2>
              <p className="text-xs text-[#68705C]">
                Select whether the first-contact interaction is captured as a statement or voice recording.
              </p>
            </div>

            <div className="flex p-1 rounded-xl bg-[#EFE2D0] border border-[#71834B]/25">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'text'
                    ? 'bg-[#596B3A] text-[#FFFDF8] shadow-xs'
                    : 'text-[#293022] hover:text-[#596B3A]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Text Interaction</span>
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'voice'
                    ? 'bg-[#596B3A] text-[#FFFDF8] shadow-xs'
                    : 'text-[#293022] hover:text-[#596B3A]'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Interaction</span>
              </button>
            </div>
          </div>

          {/* TEXT INTERACTION TAB */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#293022] mb-1.5">
                  Complainant / Victim Statement
                </label>
                <textarea
                  rows={5}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="Enter or paste the victim/complainant's statement..."
                  className="w-full rounded-2xl border border-[#71834B]/30 p-4 text-sm text-[#293022] placeholder-[#8B8E7D] focus:outline-none focus:ring-2 focus:ring-[#596B3A]/30 focus:border-[#596B3A] font-sans leading-relaxed bg-[#FCF9F2]"
                />
              </div>

              {/* Sample statement quick loaders */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#8B8E7D] uppercase tracking-wider">
                  Or load demo scenario statement for SIH presentation:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sampleTexts.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setStatement(sample.text);
                        if (sample.lang) setLanguage(sample.lang);
                      }}
                      className="text-left p-3 rounded-xl border border-[#596B3A]/15 bg-[#FFFDF8] hover:bg-[#EFE2D0] hover:border-[#596B3A]/40 text-xs transition-colors cursor-pointer group"
                    >
                      <div className="font-bold text-[#293022] group-hover:text-[#596B3A] line-clamp-1">
                        {sample.title}
                      </div>
                      <div className="text-[11px] text-[#68705C] line-clamp-1 mt-0.5">
                        {sample.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VOICE INTERACTION TAB */}
          {activeTab === 'voice' && (
            <div className="space-y-5">
              <div className="rounded-3xl border-2 border-dashed border-[#71834B]/35 bg-[#FCF9F2] p-6 sm:p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#596B3A] to-[#71834B] text-[#FFFDF8] flex items-center justify-center shadow-lg shadow-[#596B3A]/20 text-2xl">
                  🎙️
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#293022]">Voice Assessment</h3>
                  <p className="text-xs text-[#68705C] max-w-md mx-auto mt-0.5">
                    Record a short interaction for speech and emotional-indicator analysis.
                  </p>
                </div>

                {/* Animated waveform visual during recording */}
                {isRecording && (
                  <div className="flex items-center justify-center space-x-1.5 py-3">
                    {[12, 28, 45, 60, 35, 75, 40, 85, 55, 30, 70, 90, 45, 20].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-[#596B3A] rounded-full animate-pulse"
                          style={{
                            height: `${height}px`,
                            animationDelay: `${(i % 5) * 120}ms`,
                          }}
                        />
                      )
                    )}
                  </div>
                )}

                {/* Recording indicator & timer */}
                {isRecording && (
                  <div className="flex items-center justify-center space-x-2 text-[#596B3A] text-xs font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#596B3A] animate-ping"></span>
                    <span>Recording in progress: {recordingSeconds}s</span>
                  </div>
                )}

                {hasVoiceSample && !isRecording && (
                  <div className="p-3 rounded-xl bg-[#EFE2D0] border border-[#71834B]/30 text-[#3F4D2A] text-xs flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#596B3A]" />
                    <span className="font-semibold">
                      Audio sample captured ({recordingSeconds}s duration) • Pitch & Tremor extraction ready
                    </span>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="px-5 py-2.5 rounded-xl bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Start Recording</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      className="px-5 py-2.5 rounded-xl bg-[#3F4D2A] hover:bg-[#293022] text-[#FFFDF8] text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <MicOff className="w-4 h-4" />
                      <span>Stop Recording</span>
                    </button>
                  )}

                  {/* Demo Voice Analysis Button */}
                  <button
                    onClick={handleLoadDemoVoice}
                    className="px-4 py-2.5 rounded-xl bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 text-[#3F4D2A] border border-[#71834B]/30 text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#B69A5A]" />
                    <span>Demo Voice Analysis</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#8B8E7D] italic">
                  Note: Audio processing features acoustic proxy indicators for demonstration and decision triage. Not a clinical measurement.
                </p>
              </div>

              {/* Transcript preview */}
              {hasVoiceSample && (
                <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#596B3A]/15">
                  <div className="flex items-center justify-between text-xs font-bold text-[#293022] mb-1">
                    <span className="flex items-center space-x-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#596B3A]" />
                      <span>Speech-to-Text Transcription Preview:</span>
                    </span>
                    <span className="text-[11px] text-[#BD5E38] font-bold">Acoustic Stress: High</span>
                  </div>
                  <p className="text-xs text-[#293022] italic bg-[#FCF9F2] p-3 rounded-xl border border-[#596B3A]/15">
                    "{voiceTranscript}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#596B3A]/15 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-[#68705C] hover:text-[#293022] cursor-pointer"
            >
              ← Back to Consent
            </button>

            <button
              onClick={() => handleStartAnalysis()}
              disabled={activeTab === 'text' ? !statement.trim() : !hasVoiceSample}
              className={`px-7 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all cursor-pointer ${
                (activeTab === 'text' && statement.trim()) ||
                (activeTab === 'voice' && hasVoiceSample)
                  ? 'bg-[#596B3A] hover:bg-[#3F4D2A] text-[#FFFDF8] shadow-md'
                  : 'bg-[#EFE2D0] text-[#8B8E7D] cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#B69A5A]" />
              <span>Analyse Interaction</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Animated AI Analysis Screen */}
      {currentStep === 3 && (
        <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 border border-[#596B3A]/15 shadow-lg text-center space-y-8 animate-in fade-in duration-300">
          <div className="max-w-md mx-auto space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EFE2D0] text-[#596B3A] border border-[#71834B]/30 shadow-inner mb-2 animate-bounce">
              <Sparkles className="w-7 h-7 text-[#B69A5A]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#293022]">
              Analysing Interaction
            </h2>
            <p className="text-xs text-[#68705C]">
              Processing language indicators, stress cues, and vulnerability dimensions through TRAUMA CURE pipeline.
            </p>
          </div>

          {/* Five Stages Checklist with animated icons */}
          <div className="max-w-lg mx-auto space-y-3 text-left">
            {stages.map((stage, idx) => {
              const isCompleted = analysisStage > idx;
              const isCurrent = analysisStage === idx;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                    isCompleted
                      ? 'bg-[#EFE2D0]/60 border-[#71834B]/30 text-[#293022] font-medium'
                      : isCurrent
                      ? 'bg-[#EFE2D0] border-[#596B3A] text-[#293022] shadow-xs ring-1 ring-[#596B3A]/30'
                      : 'bg-[#FFFDF8] border-[#596B3A]/10 text-[#8B8E7D] opacity-60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-[#596B3A] text-[#FFFDF8] flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    ) : isCurrent ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#596B3A] border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#EFE2D0] flex items-center justify-center text-[10px] font-bold text-[#68705C]">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-bold flex items-center space-x-2">
                      <span>{stage.title}</span>
                      {isCurrent && (
                        <span className="text-[10px] text-[#596B3A] font-semibold animate-pulse">
                          Processing...
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#68705C] mt-0.5">
                      {stage.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Status */}
          {analysisStage >= 5 && (
            <div className="p-3 rounded-2xl bg-[#596B3A] text-[#FFFDF8] text-xs font-bold animate-in fade-in zoom-in duration-200 max-w-sm mx-auto shadow-md">
              ✓ Assessment Complete • Generating Triage Profile...
            </div>
          )}
        </div>
      )}
    </div>
  );
};
