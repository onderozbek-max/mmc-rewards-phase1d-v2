import { useEffect, useState } from 'react';
import { A11yAnnouncementProvider, A11yDevAssertions } from '@walmart/ld-kit';
import { useInitializeStore } from '@walmart/ld-kit/store';
import { useInitializeTheming } from '@walmart/ld-kit/theming';
import '@walmart/ld-kit/styles.css';
import type { RouteState } from './types';
import { readRoute } from './utils/rewards';
import { HomePage } from './pages/HomePage';
import { PassPage } from './pages/PassPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  useInitializeTheming("Member's Mark", ["Member's Mark"] as const);
  useInitializeStore();

  const [route, setRoute] = useState<RouteState>(() => readRoute());

  useEffect(() => {
    const handlePopState = () => setRoute(readRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    setRoute(readRoute());
  };

  return (
    <A11yAnnouncementProvider>
      <A11yDevAssertions />
      {route.page === 'home' && (
        <HomePage
          key={`${route.points}-${route.previous ?? ''}-${route.nav}`}
          points={route.points}
          previous={route.previous}
          nav={route.nav}
          onNavigate={navigate}
        />
      )}
      {route.page === 'pass' && (
        <PassPage
          key={`${route.points}-${route.previous ?? ''}-${route.nav}`}
          points={route.points}
          previous={route.previous}
          nav={route.nav}
        />
      )}
      {route.page === 'profile' && (
        <ProfilePage
          key={`${route.points}-${route.nav}`}
          points={route.points}
          nav={route.nav}
        />
      )}
    </A11yAnnouncementProvider>
  );
}
