import Image from 'next/image';
import { cn } from '@/lib/cn';

const LOGO_BOX_W = 260;
const LOGO_BOX_H = 170;
const LOGO_SRC_W = 626;
const LOGO_SRC_H = 399;
const LOGO_SCALE = Math.min(LOGO_BOX_W / LOGO_SRC_W, LOGO_BOX_H / LOGO_SRC_H);
const CIRCLE_SRC = { x: 199, y: 45, size: 216 };
const LOGO_OFFSET_X = (LOGO_BOX_W - LOGO_SRC_W * LOGO_SCALE) / 2;
const LOGO_OFFSET_Y = (LOGO_BOX_H - LOGO_SRC_H * LOGO_SCALE) / 2;
const CIRCLE_LEFT = LOGO_OFFSET_X + CIRCLE_SRC.x * LOGO_SCALE;
const CIRCLE_TOP = LOGO_OFFSET_Y + CIRCLE_SRC.y * LOGO_SCALE;
const CIRCLE_SIZE = CIRCLE_SRC.size * LOGO_SCALE;
const HAND_PIVOT_Y = CIRCLE_SIZE * 0.16;

export function WavingLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative', className)}
      style={{ width: LOGO_BOX_W, height: LOGO_BOX_H }}
    >
      <Image
        src="/logos/wavepointFullStatic.png"
        alt="Wavepoint"
        width={LOGO_BOX_W}
        height={LOGO_BOX_H}
        className="h-full w-full object-contain"
        priority
      />
      <div
        className="pointer-events-none absolute overflow-hidden rounded-full"
        style={{
          left: CIRCLE_LEFT,
          top: CIRCLE_TOP,
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
        }}
      >
        <div
          className="hand-wave h-full w-full"
          style={{ ['--hand-pivot-y' as string]: `${HAND_PIVOT_Y}px` }}
        >
          <Image
            src="/logos/wavepointHand.png"
            alt=""
            width={Math.round(CIRCLE_SIZE)}
            height={Math.round(CIRCLE_SIZE)}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
