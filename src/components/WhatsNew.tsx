import { Card, CardContent, CardHeader, Icon } from '@walmart/ld-kit';

interface WhatsNewProps {
  points: number;
}

const cards = [
  {
    title: 'Community Home modules',
    body: 'Explore new ways to help shape what comes next for your community.',
    icon: 'Home',
  },
  {
    title: 'Member opportunities',
    body: 'Explore member opportunities available to eligible participants.',
    icon: 'Gift',
  },
];

export function WhatsNew({ points }: WhatsNewProps) {
  const isVisible = points >= 250;

  return (
    <section className="whats-new" aria-labelledby="whats-new-heading">
      <div className="section-heading-row">
        <h2 id="whats-new-heading">What's new</h2>
        <span className="section-rule" aria-hidden="true" />
      </div>
      <div className="whats-new-grid">
        {cards.map((card) => (
          <div key={card.title} className="whats-new-card">
            <Card size="small">
              <CardHeader
                headingLevel="h3"
                title={(
                  <div className="card-title-row">
                    <span className="card-icon" aria-hidden="true"><Icon name={card.icon} size="small" /></span>
                    <span className="card-title">{card.title}</span>
                  </div>
                )}
              />
              <CardContent>
                {isVisible ? (
                  <p>{card.body}</p>
                ) : (
                  <div className="locked-card-copy">
                    <Icon name="Lock" size="small" a11yLabel="Locked" />
                    <p>Unlock after 250 points to see what's new</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
