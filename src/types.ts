export type PageName = 'home' | 'pass' | 'profile';
export type NavMode = 'prime' | 'secondary';
export type Threshold = 250 | 1000 | 3000;

export interface RouteState {
  page: PageName;
  points: number;
  previous?: number;
  nav: NavMode;
}

export interface ProgressModel {
  fill: number;
  label: string;
  copy: string;
}

export interface CelebrationCopy {
  threshold: Threshold;
  congrats: string;
  benefit: string;
  next: string;
}
