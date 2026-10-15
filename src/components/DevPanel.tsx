import { Button } from '@walmart/ld-kit';
import type { NavMode } from '../types';

interface DevPanelProps {
  nav: NavMode;
}

const scenarios = [
  ['230 points', '?page=home&points=230'],
  ['950 points', '?page=home&points=950'],
  ['2,000 points', '?page=home&points=2000'],
  ['3,200 points', '?page=home&points=3200'],
  ['Cross 250', '?page=home&points=260&previous=240'],
  ['Cross 1,000', '?page=home&points=1050&previous=980'],
  ['Cross 3,000', '?page=home&points=3050&previous=2950'],
  ['Multi-threshold jump', '?page=home&points=1200&previous=200'],
  ['Prime nav', '?page=home&points=950&nav=prime'],
  ['Secondary nav', '?page=home&points=950&nav=secondary'],
  ['Profile direct link', '?page=profile&points=950'],
] as const;

export function DevPanel({ nav }: DevPanelProps) {
  return (
    <aside className="dev-panel" aria-labelledby="dev-panel-heading">
      <details>
        <summary id="dev-panel-heading">Prototype scenarios</summary>
        <div className="dev-scenario-list">
          {scenarios.map(([label, href]) => (
            <Button key={href} href={href.includes('nav=') ? href : `${href}&nav=${nav}`} variant="tertiary" size="small">
              {label}
            </Button>
          ))}
        </div>
      </details>
    </aside>
  );
}
