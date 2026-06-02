export interface SupervisorManager {
  id: string;
  name: string;
  role: string;
  branch: string;
  sbu: 'IT' | 'Non-IT';
  avatarBg: string;
}

export interface JobTrackData {
  careerTrack: string | null;
  functionalDomain: string | null;
  functionSpecialty: string | null;
  span: string | null;
  sm: SupervisorManager | null;
  selfReflection: {
    reason: string;
    currentView: string;
    goal12Months: string;
  };
  submitted: boolean;
  submittedAt: string | null;
  cosigned?: boolean;
  cosignedAt?: string | null;
  smFeedback?: string;
  smStatus?: 'approved' | 'rejected' | 'pending';
  changeReason?: string;
  isSecondSubmission?: boolean;
  isEditing?: boolean;

  // Parallel Second Job Track
  hasSecondTrack?: boolean;
  secondCareerTrack?: string | null;
  secondFunctionalDomain?: string | null;
  secondFunctionSpecialty?: string | null;
  secondSpan?: string | null;
  secondSubmitted?: boolean;
  secondSubmittedAt?: string | null;
  secondCosigned?: boolean;
  secondCosignedAt?: string | null;
  secondSmFeedback?: string;
  secondSmStatus?: 'approved' | 'rejected' | 'pending';
  secondChangeReason?: string;
  secondSelfReflection?: {
    reason: string;
    currentView: string;
    goal12Months: string;
  };
  secondIsEditing?: boolean;
}

export type ActiveSidebarItem = 'dashboard' | 'ilead' | 'dwork' | 'dlink' | 'daccount' | 'toolbox' | 'library' | 'ig' | 'manager' | 'profile';

export type ActiveSubTab = 'onboarding' | 'jobtrack' | 'depthtrack' | 'idptrack';
