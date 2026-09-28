import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { Footer } from './components/Footer';
import { OverviewView } from './views/OverviewView';
import { NewAssessmentView } from './views/NewAssessmentView';
import { AssessmentResultView } from './views/AssessmentResultView';
import { CaseDashboardView } from './views/CaseDashboardView';
import { SupportQueueView } from './views/SupportQueueView';
import { AnalyticsView } from './views/AnalyticsView';
import { PrivacyConsentView } from './views/PrivacyConsentView';
import { CaseRecord } from './types';
import { INITIAL_CASES, DEMO_SCENARIOS } from './data/mockCases';
import { analyzeInteraction, AnalysisInput } from './services/assessmentEngine';

export default function App() {
  // Navigation & UI state
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(true);

  // Active cases database (initialized with realistic demo records)
  const [cases, setCases] = useState<CaseRecord[]>(() => {
    try {
      const stored = localStorage.getItem('trauma_cure_cases') || localStorage.getItem('sahay_cases');
      return stored ? JSON.parse(stored) : INITIAL_CASES;
    } catch {
      return INITIAL_CASES;
    }
  });

  // Most recent assessment result to show on AssessmentResultView
  const [activeAssessmentCase, setActiveAssessmentCase] = useState<CaseRecord>(
    INITIAL_CASES[0]
  );
  // Preselected scenario if triggered from Demo mode
  const [preselectedScenarioId, setPreselectedScenarioId] = useState<string | null>(null);

  // Persist cases
  useEffect(() => {
    try {
      localStorage.setItem('trauma_cure_cases', JSON.stringify(cases));
    } catch {
      // ignore
    }
  }, [cases]);

  // Handler when user triggers a pre-built demo scenario (1-click presentation)
  const handleRunDemoScenario = (scenarioId: string) => {
    setPreselectedScenarioId(scenarioId);
    setCurrentTab('new-assessment');
  };

  // Handler when 3-step assessment completes
  const handleAssessmentCompleted = (input: AnalysisInput) => {
    const assessedCase = analyzeInteraction(input);
    // Prepend to cases queue
    setCases((prev) => [assessedCase, ...prev.filter((c) => c.id !== assessedCase.id)]);
    setActiveAssessmentCase(assessedCase);
    setCurrentTab('new-assessment'); // Result is rendered inside assessment flow
  };

  // Update existing case (from human review action or details modal)
  const handleUpdateCase = (updated: CaseRecord) => {
    setCases((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    if (activeAssessmentCase.id === updated.id) {
      setActiveAssessmentCase(updated);
    }
  };

  const handleUpdateStatus = (
    caseId: string,
    status: CaseRecord['humanReviewStatus']
  ) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              humanReviewStatus: status,
              timeline: [
                ...c.timeline,
                {
                  id: `tl-${Date.now()}`,
                  timestamp: 'Just now',
                  title: `Status updated to ${status}`,
                  actor: 'Trained Duty Officer',
                  role: 'Human Reviewer',
                  status: 'completed',
                },
              ],
            }
          : c
      )
    );
  };

  const criticalQueueCount = cases.filter(
    (c) => c.riskLevel === 'CRITICAL' && c.humanReviewStatus !== 'Resolved'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EBDD] text-[#293022] font-sans">
      {/* Top Navbar */}
      <Navbar
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        onSelectScenario={handleRunDemoScenario}
        onStartNewAssessment={() => {
          setPreselectedScenarioId(null);
          setCurrentTab('new-assessment');
        }}
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex bg-[#F4EBDD]">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          caseCount={cases.length}
          criticalQueueCount={criticalQueueCount}
          isMobileOpen={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 bg-[#F4EBDD]">
          {currentTab === 'overview' && (
            <OverviewView
              cases={cases}
              onStartNewAssessment={() => {
                setPreselectedScenarioId(null);
                setCurrentTab('new-assessment');
              }}
              onViewQueue={() => setCurrentTab('queue')}
              onSelectCase={(c) => {
                setActiveAssessmentCase(c);
                setCurrentTab('new-assessment');
              }}
              onRunDemoScenario={handleRunDemoScenario}
            />
          )}

          {currentTab === 'new-assessment' && (
            <div className="space-y-8">
              {/* If we have an active assessment generated, show the Result View with back option, else show New Form */}
              {activeAssessmentCase ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#596B3A]/15">
                    <button
                      onClick={() => {
                        setPreselectedScenarioId(null);
                        // Clear active to take another assessment
                        setActiveAssessmentCase(null as any);
                      }}
                      className="text-xs font-bold text-[#3F4D2A] hover:text-[#293022] flex items-center space-x-1.5 cursor-pointer bg-[#EFE2D0] hover:bg-[#EFE2D0]/80 px-3.5 py-1.5 rounded-xl border border-[#71834B]/30 transition-all shadow-2xs"
                    >
                      <span>← Evaluate Another Interaction</span>
                    </button>
                    <span className="text-[11px] font-semibold text-[#68705C]">
                      Case: <strong className="text-[#293022] font-mono">{activeAssessmentCase.id}</strong> (Triage Generated)
                    </span>
                  </div>

                  <AssessmentResultView
                    currentCase={activeAssessmentCase}
                    onUpdateCase={handleUpdateCase}
                    onNavigateToCases={() => setCurrentTab('cases')}
                    onNavigateToQueue={() => setCurrentTab('queue')}
                  />
                </div>
              ) : (
                <NewAssessmentView
                  onAssessmentCompleted={handleAssessmentCompleted}
                  preselectedScenarioId={preselectedScenarioId}
                />
              )}
            </div>
          )}

          {currentTab === 'cases' && (
            <CaseDashboardView
              cases={cases}
              onSelectCase={(c) => {
                setActiveAssessmentCase(c);
                setCurrentTab('new-assessment');
              }}
              onStartNewAssessment={() => {
                setActiveAssessmentCase(null as any);
                setPreselectedScenarioId(null);
                setCurrentTab('new-assessment');
              }}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {currentTab === 'queue' && (
            <SupportQueueView
              cases={cases}
              onSelectCase={(c) => {
                setActiveAssessmentCase(c);
                setCurrentTab('new-assessment');
              }}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {currentTab === 'analytics' && <AnalyticsView cases={cases} />}

          {currentTab === 'privacy' && <PrivacyConsentView />}
        </main>
      </div>

      {/* Official PS 26093 Footer */}
      <Footer />
    </div>
  );
}
