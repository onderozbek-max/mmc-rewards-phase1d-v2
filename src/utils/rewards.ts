import type { CelebrationCopy, PageName, ProgressModel, RouteState, Threshold, NavMode } from '../types';

export const THRESHOLDS: readonly Threshold[] = [250, 1000, 3000];

const celebrationCopy: Record<Threshold, CelebrationCopy> = {
  250: {
    threshold: 250,
    congrats: "🎉 Congratulations! You've reached 250 points.",
    benefit: "You've unlocked additional Community Home modules — check out what's new below.",
    next: 'Keep participating to work toward 1,000 points and Basic in-home use test eligibility.',
  },
  1000: {
    threshold: 1000,
    congrats: "🎉 Congratulations! You've reached 1,000 points.",
    benefit: "Basic in-home use test eligibility is coming soon — we'll let you know the moment it's ready.",
    next: 'Keep participating to work toward 3,000 points, our highest Foundation milestone.',
  },
  3000: {
    threshold: 3000,
    congrats: "🎉 Congratulations! You've reached 3,000 points — our highest Foundation milestone!",
    benefit: "Premium in-home use test eligibility is coming soon — we'll let you know the moment it's ready.",
    next: 'Thank you for being one of our most active community members.',
  },
};

export function normalizePoints(value: string | null): number {
  if (value === null) return 140;
  if (value.trim() === '') return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function normalizePrevious(value: string | null): number | undefined {
  if (value === null || value.trim() === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function parsePage(value: string | null): PageName {
  return value === 'pass' || value === 'profile' ? value : 'home';
}

function parseNav(value: string | null): NavMode {
  return value === 'prime' ? 'prime' : 'secondary';
}

export function readRoute(search = window.location.search): RouteState {
  const params = new URLSearchParams(search);
  return {
    page: parsePage(params.get('page')),
    points: normalizePoints(params.get('points')),
    previous: normalizePrevious(params.get('previous')),
    nav: parseNav(params.get('nav')),
  };
}

export function formatPoints(points: number): string {
  return points.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

export function buildHref(route: RouteState): string {
  const params = new URLSearchParams({
    page: route.page,
    points: String(route.points),
    nav: route.nav,
  });
  if (route.previous !== undefined) params.set('previous', String(route.previous));
  return `?${params.toString()}`;
}

export function getProgressModel(points: number): ProgressModel {
  if (points < 250) {
    return {
      fill: points / 250,
      label: `${formatPoints(points)} / 250 pts`,
      copy: "At 250 points, you'll unlock additional Community Home modules.",
    };
  }

  if (points < 1000) {
    return {
      fill: (points - 250) / 750,
      label: `${formatPoints(points)} / 1,000 pts`,
      copy: 'At 1,000 points: Basic in-home use test eligibility — coming soon.',
    };
  }

  if (points < 3000) {
    return {
      fill: (points - 1000) / 2000,
      label: `${formatPoints(points)} / 3,000 pts`,
      copy: "You've reached 1,000 points! Basic in-home use test eligibility is coming soon — we'll let you know the moment it's ready.",
    };
  }

  return {
    fill: 1,
    label: '3,000+ pts · All Foundation milestones reached',
    copy: "You've reached 3,000 points — our highest Foundation milestone! Premium in-home use test eligibility is coming soon — we'll let you know the moment it's ready.",
  };
}

export function getCrossedThresholds(previous: number | undefined, points: number): Threshold[] {
  if (previous === undefined) return [];
  return THRESHOLDS.filter((threshold) => previous < threshold && points >= threshold);
}

export function getCelebrations(previous: number | undefined, points: number): CelebrationCopy[] {
  return getCrossedThresholds(previous, points).map((threshold) => celebrationCopy[threshold]);
}

export function getMilestoneStatus(threshold: Threshold, points: number): 'locked' | 'unlocked' | 'coming-soon' {
  if (threshold === 250) return points < threshold ? 'locked' : 'unlocked';
  return 'coming-soon';
}

export function getCelebrationCopy(threshold: Threshold): CelebrationCopy {
  return celebrationCopy[threshold];
}
