export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type IndicatorLevel = 'Low' | 'Moderate' | 'High' | 'Detected' | 'Possible' | 'Not Detected';

export interface EmotionalIndicator {
  id: string;
  name: string;
  level: IndicatorLevel;
  percentage: number;
  category: 'emotional' | 'physical' | 'safety' | 'social';
  evidence?: string;
}

export type SupportServiceType =
  | 'Counselling'
  | 'Legal Aid'
  | 'Medical Assistance'
  | 'Law Enforcement'
  | 'Witness Protection'
  | 'Emergency Support';

export interface SupportRecommendation {
  id: string;
  type: SupportServiceType;
  title: string;
  priority: 'Critical' | 'High' | 'Moderate' | 'Standard';
  reason: string;
  status: 'Recommended' | 'Assigned' | 'Referred' | 'Under Review' | 'Completed';
  assignedTo?: string;
  contactNumber?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  actor: string;
  role: string;
  status: 'completed' | 'current' | 'pending';
  notes?: string;
}

export interface CaseRecord {
  id: string;
  date: string;
  time: string;
  language: string;
  consentConfirmed: boolean;
  channel: 'NHAA 14566 IVRS' | 'Web Portal' | 'Victim App' | 'Chatbot' | 'Walk-in Desk';
  statement: string;
  voiceAnalyzed?: boolean;
  speechPitchVariance?: string;
  speechTremorDetected?: boolean;
  svi: number; // 0 - 100
  riskLevel: RiskLevel;
  indicators: EmotionalIndicator[];
  explainableSignals: string[];
  recommendations: SupportRecommendation[];
  humanReviewStatus: 'Pending' | 'In Review' | 'Assigned' | 'Escalated' | 'Resolved';
  assignedOfficer?: string;
  reviewNotes?: string;
  timeline: TimelineEvent[];
  isDemo?: boolean;
}

export interface AssessmentInput {
  statement: string;
  language: string;
  consentGiven: boolean;
  isVoiceMode: boolean;
  audioDurationSeconds?: number;
}
