import Image from 'next/image';
import { cn } from '@/lib/cn';

const LOGO_BOX_W = 364;
const LOGO_BOX_H = 238;
const LOGO_SRC_W = 626;
const LOGO_SRC_H = 399;
const LOGO_SCALE = Math.min(LOGO_BOX_W / LOGO_SRC_W, LOGO_BOX_H / LOGO_SRC_H);
const CIRCLE_SRC = { x: 199, y: 45, size: 216 };
const LOGO_OFFSET_X = (LOGO_BOX_W - LOGO_SRC_W * LOGO_SCALE) / 2;
const LOGO_OFFSET_Y = (LOGO_BOX_H - LOGO_SRC_H * LOGO_SCALE) / 2;
const CIRCLE_SIZE = Math.round(CIRCLE_SRC.size * LOGO_SCALE);
const CIRCLE_LEFT = Math.round(LOGO_OFFSET_X + CIRCLE_SRC.x * LOGO_SCALE);
const CIRCLE_TOP = Math.round(LOGO_OFFSET_Y + CIRCLE_SRC.y * LOGO_SCALE);
const HAND_PIVOT_Y = Math.round(CIRCLE_SIZE * 0.16);
const TEAL = '#0B617E';

const circleStyle = {
  left: CIRCLE_LEFT,
  top: CIRCLE_TOP,
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
} as const;

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
        unoptimized
        priority
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{ ...circleStyle, backgroundColor: TEAL, transform: 'scale(1.04)' }}
      />
      <div className="hand-clip pointer-events-none absolute" style={circleStyle}>
        <div className="hand-clip-inner">
          <div
            className="hand-wave h-full w-full"
            style={{ ['--hand-pivot-y' as string]: `${HAND_PIVOT_Y}px` }}
          >
            {/* Native img: Next/Image wrappers can skip overflow clipping while rotating. */}
            <img
              src="/logos/wavepointHand.png"
              alt=""
              width={CIRCLE_SIZE}
              height={CIRCLE_SIZE}
              className="block h-full w-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
      <div className="hand-rim pointer-events-none absolute rounded-full" style={circleStyle} />
    </div>
  );
}
