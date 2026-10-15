import { Button } from '@walmart/ld-kit';

const scenarios = [
  ['Cross 250', '?points=260&previous=240'],
  ['Cross 1,000', '?points=1050&previous=980'],
  ['Cross 3,000', '?points=3050&previous=2950'],
] as const;

export function DevPanel() {
  return (
    <aside className="dev-panel" aria-labelledby="dev-panel-heading">
      <details>
        <summary id="dev-panel-heading">Prototype scenarios</summary>
        <div className="dev-scenario-list">
          {scenarios.map(([label, href]) => (
            <Button key={href} href={href} variant="tertiary" size="small">
              {label}
            </Button>
          ))}
        </div>
      </details>
    </aside>
  );
}
