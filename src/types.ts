export type AppTab = 'home' | 'history' | 'culture' | 'leadership' | 'projects' | 'activities' | 'publications' | 'gallery' | 'blog';

export interface FamilyUnit {
  name: string;
  subUnits: string[];
}

export interface KindredGroup {
  name: string;
  families: string[];
}

export interface MarriageStage {
  phase: number;
  name: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'Under Construction' | 'Proposed' | 'Ongoing';
  supportedBy?: string;
  category: 'Education' | 'Infrastructure' | 'Healthcare' | 'Agriculture' | 'Religious' | 'Social';
  imagePlaceholderColor: string; // Tailored color theme for CSS SVG card illustrations
}

export interface TimelineEvent {
  year: string;
  date?: string;
  title: string;
  description: string;
  type: 'milestone' | 'conflict' | 'resolution' | 'development';
}

export interface MeetingBranch {
  name: string;
  region: string;
}

export interface TraditionalMonth {
  id: number;
  name: string;
  translation?: string;
}
