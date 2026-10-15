import { Icon, Button } from '@walmart/ld-kit';
import type { NavMode, PageName } from '../types';
import { buildHref } from '../utils/rewards';

interface BottomNavProps {
  activePage: PageName;
  points: number;
  nav: NavMode;
}

interface NavItemProps {
  active: boolean;
  href: string;
  icon: string;
  label: string;
}

function NavItem({ active, href, icon, label }: NavItemProps) {
  return (
    <Button
      href={href}
      variant="ghost"
      shape="square"
      size="small"
      UNSAFE_className={`bottom-nav-item${active ? ' is-active' : ''}`}
      aria-current={active ? 'page' : undefined}
    >
      <Icon name={icon} size="small" />
      <span>{label}</span>
    </Button>
  );
}

export function BottomNav({ activePage, points, nav }: BottomNavProps) {
  const items: NavItemProps[] = [
    { active: activePage === 'home', href: buildHref({ page: 'home', points, nav }), icon: 'Home', label: 'Home' },
  ];

  if (nav === 'prime') {
    items.push({ active: activePage === 'pass', href: buildHref({ page: 'pass', points, nav }), icon: 'Star', label: 'Pass' });
  }

  items.push({ active: activePage === 'profile', href: buildHref({ page: 'profile', points, nav }), icon: 'User', label: 'Profile' });

  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      <div className="bottom-nav-inner">
        {items.map((item) => <NavItem key={item.label} {...item} />)}
      </div>
    </nav>
  );
}
