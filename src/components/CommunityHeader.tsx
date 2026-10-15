import { Icon, IconButton } from '@walmart/ld-kit';
import type { NavMode } from '../types';
import { buildHref } from '../utils/rewards';

interface CommunityHeaderProps {
  points: number;
  nav: NavMode;
}

export function CommunityHeader({ points, nav }: CommunityHeaderProps) {
  const profileHref = buildHref({ page: 'profile', points, nav });

  return (
    <header className="community-header">
      <div className="brand-lockup">
        <span className="decorative-back" aria-hidden="true">
          <Icon name="ArrowLeft" size="medium" />
        </span>
        <div>
          <span className="brand-name">Member's Mark</span>
          <span className="brand-subtitle">Community</span>
        </div>
      </div>
      <IconButton
        href={profileHref}
        a11yLabel="Open profile"
        variant="ghost"
        size="medium"
        color="default"
      >
        <Icon name="UserCircle" size="medium" />
      </IconButton>
    </header>
  );
}
