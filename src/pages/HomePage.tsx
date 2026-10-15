import { Page, Tag } from '@walmart/ld-kit';
import type { NavMode } from '../types';
import { buildHref, getCrossedThresholds } from '../utils/rewards';
import { BottomNav } from '../components/BottomNav';
import { CommunityHeader } from '../components/CommunityHeader';
import { DevPanel } from '../components/DevPanel';
import { ProgressModule } from '../components/ProgressModule';
import { WhatsNew } from '../components/WhatsNew';

interface HomePageProps {
  points: number;
  previous?: number;
  nav: NavMode;
  onNavigate: (href: string) => void;
}

export function HomePage({ points, previous, nav, onNavigate }: HomePageProps) {
  const passHref = buildHref({ page: 'pass', points, previous, nav });
  const crossed = getCrossedThresholds(previous, points);

  return (
    <Page title="Member's Mark Community" titleVisuallyHidden>
      <div className="app-shell">
        <CommunityHeader points={points} nav={nav} />
        <div className="page-content home-content">
          <p className="intro-line">Help shape what comes next</p>
          <div className="progress-module-wrap">
            {crossed.length > 0 && (
              <div className="milestone-badge">
                <Tag color="brand" size="small" variant="primary">
                  New milestone reached — tap to view
                </Tag>
              </div>
            )}
            <ProgressModule points={points} href={passHref} onActivate={() => onNavigate(passHref)} />
          </div>
          <WhatsNew points={points} />
          <section className="feed-placeholder" aria-labelledby="feed-heading">
            <div className="feed-placeholder-icon" aria-hidden="true">✦</div>
            <h2 id="feed-heading">More community updates are on the way</h2>
            <p>Keep participating to help shape the next Member's Mark experience.</p>
          </section>
        </div>
        <DevPanel nav={nav} />
        <BottomNav activePage="home" points={points} nav={nav} />
      </div>
    </Page>
  );
}
