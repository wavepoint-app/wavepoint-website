/** Same tileable wave as frontend/app/welcome.tsx */
const WAVE_CYCLE = 390;
const WAVE_VIEW_W = WAVE_CYCLE * 2;

function seamlessWavePath(baseY: number, amp: number): string {
  const p = WAVE_CYCLE;
  const w = WAVE_VIEW_W;
  const y = baseY;
  const a = amp;
  return [
    `M0 ${y}`,
    `C ${p * 0.25} ${y - a}, ${p * 0.75} ${y + a}, ${p} ${y}`,
    `C ${p + p * 0.25} ${y - a}, ${p + p * 0.75} ${y + a}, ${w} ${y}`,
    `L ${w} 280 L 0 280 Z`,
  ].join(' ');
}

const WAVE_BACK = seamlessWavePath(100, 42);
const WAVE_MID = seamlessWavePath(145, 38);
const WAVE_FRONT = seamlessWavePath(185, 34);

function WaveLayer({
  d,
  fill,
  opacity = 1,
  durationMs,
}: {
  d: string;
  fill: string;
  opacity?: number;
  durationMs: number;
}) {
  return (
    <div
      className="wave-track absolute inset-y-0 left-0 h-full"
      style={{ width: '200%', ['--wave-ms' as string]: `${durationMs}ms` }}
    >
      <svg
        className="h-full w-1/2"
        viewBox={`0 52 ${WAVE_VIEW_W} 228`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={d} fill={fill} opacity={opacity} />
      </svg>
      <svg
        className="absolute left-1/2 top-0 h-full w-1/2"
        viewBox={`0 52 ${WAVE_VIEW_W} 228`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={d} fill={fill} opacity={opacity} />
      </svg>
    </div>
  );
}

export function AnimatedWaves() {
  return (
    <div className="relative h-[140px] shrink-0 overflow-hidden md:h-[180px]" aria-hidden>
      <WaveLayer d={WAVE_BACK} fill="#C08A5E" opacity={0.45} durationMs={14000} />
      <WaveLayer d={WAVE_MID} fill="#0B617E" opacity={0.6} durationMs={10000} />
      <WaveLayer d={WAVE_FRONT} fill="#0B617E" durationMs={7000} />
    </div>
  );
}
