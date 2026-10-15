import { Icon, Tag } from '@walmart/ld-kit';
import type { NavMode } from '../types';
import { getMilestoneStatus } from '../utils/rewards';
import { WhatsNew } from './WhatsNew';

interface MilestoneTimelineProps {
  points: number;
  nav: NavMode;
}

const milestones = [
  { threshold: null, title: 'Start', detail: 'Your Community journey begins here.' },
  { threshold: 250, title: '250 points', detail: 'Additional Community Home modules.' },
  { threshold: 1000, title: '1,000 points', detail: '' },
  { threshold: 3000, title: '3,000 points', detail: '' },
] as const;

function getMilestoneDetail(threshold: 250 | 1000 | 3000 | null, points: number, fallback: string): string {
  if (threshold === 1000) {
    return points >= threshold
      ? "You're now eligible for Basic in-home use test opportunities."
      : "At 1,000 points, you'll unlock Basic in-home use test eligibility.";
  }
  if (threshold === 3000) {
    return points >= threshold
      ? "You're now eligible for Premium in-home use test opportunities."
      : "At 3,000 points, you'll unlock Premium in-home use test eligibility.";
  }
  return fallback;
}

export function MilestoneTimeline({ points, nav }: MilestoneTimelineProps) {
  return (
    <section className="timeline-section" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading">Foundation milestones</h2>
      <ol className="milestone-timeline">
        {milestones.map((milestone) => {
          const status = milestone.threshold === null ? 'unlocked' : getMilestoneStatus(milestone.threshold, points);
          const isLocked = status === 'locked';
          const tagColor = isLocked ? 'gray' : 'green';
          const tagLabel = isLocked ? 'Locked' : 'Unlocked';
          const detail = getMilestoneDetail(milestone.threshold, points, milestone.detail);

          return (
            <li className={`timeline-item ${status}`} key={milestone.title}>
              <div className="timeline-marker" aria-hidden="true">
                <Icon name={isLocked ? 'Lock' : 'Check'} size="small" />
              </div>
              <div className="timeline-content">
                <div className="timeline-title-row">
                  <h3>{milestone.title}</h3>
                  <Tag color={tagColor} size="small" variant="secondary">{tagLabel}</Tag>
                </div>
                <p>{detail}</p>
                {milestone.threshold === 250 && <WhatsNew points={points} />}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
