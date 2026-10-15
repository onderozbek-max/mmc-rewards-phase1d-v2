import { Button, BottomSheet, Icon } from '@walmart/ld-kit';
import type { CelebrationCopy } from '../types';

interface CelebrationSheetProps {
  celebration?: CelebrationCopy;
  isOpen: boolean;
  onClose: () => void;
  onClosed: () => void;
}

const confettiPieces = Array.from({ length: 18 }, (_, index) => index);

export function CelebrationSheet({ celebration, isOpen, onClose, onClosed }: CelebrationSheetProps) {
  if (!celebration) return null;

  return (
    <>
      {isOpen && (
        <div className="confetti-layer" aria-hidden="true">
          {confettiPieces.map((piece) => <span key={piece} className="confetti-piece" style={{ '--piece': piece } as React.CSSProperties} />)}
        </div>
      )}
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        onClosed={onClosed}
        title="Milestone reached"
        actions={(
          <Button type="button" variant="primary" isFullWidth onClick={onClose}>
            Continue
          </Button>
        )}
      >
        <div className="celebration-content">
          <div className="celebration-part celebration-congrats">
            <span className="celebration-icon" aria-hidden="true"><Icon name="Gift" size="medium" /></span>
            <p>{celebration.congrats}</p>
          </div>
          <div className="celebration-part">
            <span className="celebration-icon" aria-hidden="true"><Icon name="Star" size="medium" /></span>
            <div>
              <span className="celebration-label">Your milestone benefit</span>
              <p>{celebration.benefit}</p>
            </div>
          </div>
          <div className="celebration-part">
            <span className="celebration-icon" aria-hidden="true"><Icon name="ArrowRight" size="medium" /></span>
            <div>
              <span className="celebration-label">What's next</span>
              <p>{celebration.next}</p>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
