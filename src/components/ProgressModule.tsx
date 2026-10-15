import { Button, Icon, ProgressIndicator } from '@walmart/ld-kit';
import { getProgressModel } from '../utils/rewards';

interface ProgressModuleProps {
  points: number;
  href?: string;
  onActivate?: () => void;
}

export function ProgressModule({ points, href, onActivate }: ProgressModuleProps) {
  const model = getProgressModel(points);
  const labelId = `progress-label-${Math.round(points * 100)}`;
  const content = (
    <div className="progress-module">
      <div className="progress-module-heading">
        <div>
          <span className="eyebrow">Foundation progress</span>
          <strong>{model.label}</strong>
        </div>
        <span className="progress-icon" aria-hidden="true">
          <Icon name="Gift" size="medium" />
        </span>
      </div>
      <ProgressIndicator
        label={<span id={labelId} className="visually-hidden">{model.label}</span>}
        min={0}
        max={100}
        value={Math.min(100, Math.max(0, model.fill * 100))}
        valueLabel=""
        variant="success"
      />
      <p className="progress-copy">{model.copy}</p>
      {href && <span className="progress-cta">View your Pass <Icon name="ChevronRight" size="small" /></span>}
    </div>
  );

  if (!href) return <div className="progress-module-static">{content}</div>;

  return (
    <Button
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onActivate?.();
      }}
      variant="tertiary"
      shape="square"
      isFullWidth
      UNSAFE_className="progress-module-link"
    >
      {content}
    </Button>
  );
}
