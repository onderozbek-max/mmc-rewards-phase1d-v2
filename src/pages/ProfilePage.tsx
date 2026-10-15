import { Button, Icon, Page, Tag } from '@walmart/ld-kit';
import type { NavMode, Threshold } from '../types';
import { buildHref, formatPoints, getMilestoneStatus } from '../utils/rewards';
import { BottomNav } from '../components/BottomNav';
import { CommunityHeader } from '../components/CommunityHeader';

interface ProfilePageProps {
  points: number;
  nav: NavMode;
}

const milestones: Array<{ threshold: Threshold; label: string }> = [
  { threshold: 250, label: 'Additional Community Home modules' },
  { threshold: 1000, label: 'Basic in-home use test eligibility' },
  { threshold: 3000, label: 'Premium in-home use test eligibility' },
];

export function ProfilePage({ points, nav }: ProfilePageProps) {
  const passHref = buildHref({ page: 'pass', points, nav });

  return (
    <Page title="Member's Mark Profile" titleVisuallyHidden>
      <div className="app-shell">
        <CommunityHeader points={points} nav={nav} />
        <div className="page-content profile-content">
          <section className="profile-hero" aria-labelledby="profile-heading">
            <div className="profile-avatar" aria-hidden="true"><Icon name="UserCircle" size="large" /></div>
            <div>
              <span className="eyebrow">Member profile</span>
              <h2 id="profile-heading">Community member</h2>
              <p>Helping shape what comes next.</p>
            </div>
          </section>
          <section className="points-total" aria-labelledby="points-total-heading">
            <span className="eyebrow">Lifetime points total</span>
            <h2 id="points-total-heading">{formatPoints(points)} points</h2>
          </section>
          <section className="status-list" aria-labelledby="status-list-heading">
            <h2 id="status-list-heading">Milestone status</h2>
            <ul>
              {milestones.map(({ threshold, label }) => {
                const status = getMilestoneStatus(threshold, points);
                const isLocked = status === 'locked';
                const isComingSoon = status === 'coming-soon';
                const isReached = points >= threshold;
                return (
                  <li key={threshold}>
                    <div className={`status-list-icon ${status}${isReached ? ' reached' : ''}`} aria-hidden="true">
                      <Icon name={isLocked ? 'Lock' : isReached ? 'Check' : 'Hourglass'} size="small" />
                    </div>
                    <div className="status-list-copy">
                      <strong>{threshold.toLocaleString('en-US')} points</strong>
                      <span>{label}</span>
                    </div>
                    <Tag color={isLocked ? 'gray' : isComingSoon ? 'orange' : 'green'} size="small" variant="secondary">
                      {isLocked ? 'Locked' : isComingSoon ? 'Coming Soon' : 'Unlocked'}
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </section>
          <Button href={passHref} variant="primary" isFullWidth trailing={<Icon name="ChevronRight" size="small" />}>
            View my Pass
          </Button>
        </div>
        <BottomNav activePage="profile" points={points} nav={nav} />
      </div>
    </Page>
  );
}
