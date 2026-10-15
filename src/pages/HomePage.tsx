import { useEffect, useRef, useState } from 'react';
import { Page } from '@walmart/ld-kit';
import type { NavMode } from '../types';
import { buildHref, getCelebrations } from '../utils/rewards';
import { BottomNav } from '../components/BottomNav';
import { CelebrationSheet } from '../components/CelebrationSheet';
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
  const celebrations = getCelebrations(previous, points);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(celebrations.length > 0);
  const nextSheetTimer = useRef<number | undefined>(undefined);
  const activeCelebration = celebrations[activeIndex];
  const passHref = buildHref({ page: 'pass', points, previous, nav });

  useEffect(() => () => {
    if (nextSheetTimer.current !== undefined) window.clearTimeout(nextSheetTimer.current);
  }, []);

  const handleClose = () => {
    setIsSheetOpen(false);
    if (activeIndex < celebrations.length - 1 && nextSheetTimer.current === undefined) {
      nextSheetTimer.current = window.setTimeout(() => {
        nextSheetTimer.current = undefined;
        setActiveIndex((index) => index + 1);
        setIsSheetOpen(true);
      }, 950);
    }
  };

  return (
    <Page title="Member's Mark Community" titleVisuallyHidden>
      <div className="app-shell">
        <CommunityHeader points={points} nav={nav} />
        <div className="page-content home-content">
          <p className="intro-line">Help shape what comes next</p>
          <div className="progress-module-wrap">
            <ProgressModule points={points} href={passHref} onActivate={() => onNavigate(passHref)} />
          </div>
          <WhatsNew points={points} />
        </div>
        <DevPanel />
        <BottomNav activePage="home" points={points} nav={nav} />
        <CelebrationSheet
          celebration={activeCelebration}
          isOpen={isSheetOpen}
          onClose={handleClose}
          onClosed={() => undefined}
        />
      </div>
    </Page>
  );
}
