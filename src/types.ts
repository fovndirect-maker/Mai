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
}

export type ActiveSidebarItem = 'dashboard' | 'ilead' | 'dwork' | 'dlink' | 'daccount' | 'toolbox' | 'library' | 'ig' | 'manager' | 'profile';

export type ActiveSubTab = 'onboarding' | 'jobtrack' | 'depthtrack' | 'idptrack';
