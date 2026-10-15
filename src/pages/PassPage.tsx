import { Page } from '@walmart/ld-kit';
import type { NavMode } from '../types';
import { buildHref } from '../utils/rewards';
import { BottomNav } from '../components/BottomNav';
import { CommunityHeader } from '../components/CommunityHeader';
import { MilestoneTimeline } from '../components/MilestoneTimeline';
import { ProgressModule } from '../components/ProgressModule';

interface PassPageProps {
  points: number;
  previous?: number;
  nav: NavMode;
}

export function PassPage({ points, nav }: PassPageProps) {
  const homeHref = buildHref({ page: 'home', points, nav });

  return (
    <Page title="Member's Mark Pass" titleVisuallyHidden>
      <div className="app-shell">
        <CommunityHeader points={points} nav={nav} />
        <div className="page-content pass-content">
          <section className="lifetime-hero" aria-labelledby="lifetime-heading">
            <span className="eyebrow">Your Member's Mark Pass</span>
            <h2 id="lifetime-heading">Lifetime points</h2>
            <strong>{points.toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong>
            <p>Every response helps shape what's next.</p>
          </section>
          <ProgressModule points={points} />
          <MilestoneTimeline points={points} />
          <div className="page-action-row">
            <a className="text-link" href={homeHref}>Back to Community Home</a>
          </div>
        </div>
        <BottomNav activePage="pass" points={points} nav={nav} />
      </div>
    </Page>
  );
}
