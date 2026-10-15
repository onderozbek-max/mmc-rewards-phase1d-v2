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
  { threshold: 1000, title: '1,000 points', detail: 'Basic in-home use test eligibility is being prepared.' },
  { threshold: 3000, title: '3,000 points', detail: 'Premium in-home use test eligibility is being prepared.' },
] as const;

export function MilestoneTimeline({ points, nav }: MilestoneTimelineProps) {
  return (
    <section className="timeline-section" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading">Foundation milestones</h2>
      <ol className="milestone-timeline">
        {milestones.map((milestone) => {
          const status = milestone.threshold === null ? 'unlocked' : getMilestoneStatus(milestone.threshold, points);
          const isPreparing = status === 'being-prepared';
          const isLocked = status === 'locked';
          const tagColor = isLocked ? 'gray' : isPreparing ? 'orange' : 'green';
          const tagLabel = isLocked ? 'Locked' : isPreparing ? 'Being prepared' : 'Unlocked';

          return (
            <li className={`timeline-item ${status}`} key={milestone.title}>
              <div className="timeline-marker" aria-hidden="true">
                <Icon name={isLocked ? 'Lock' : isPreparing ? 'Hourglass' : 'Check'} size="small" />
              </div>
              <div className="timeline-content">
                <div className="timeline-title-row">
                  <h3>{milestone.title}</h3>
                  <Tag color={tagColor} size="small" variant="secondary">{tagLabel}</Tag>
                </div>
                <p>{milestone.detail}</p>
                {milestone.threshold === 250 && <WhatsNew points={points} />}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
