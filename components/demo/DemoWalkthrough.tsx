'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CampusMapDemo } from '@/components/demo/CampusMapDemo';
import { IndoorMapDemo } from '@/components/demo/IndoorMapDemo';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { DEMO_BUILDING } from '@/lib/demo-map';
import { cn } from '@/lib/cn';

type Stage = 'campus' | 'entering' | 'indoor';

const ENTER_MS = 720;
/** Zoom origin aligned with GDC pin on the campus map SVG */
const ZOOM_ORIGIN = '74% 57%';

export function DemoWalkthrough() {
  const [stage, setStage] = useState<Stage>('campus');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const enterBuilding = useCallback(() => {
    if (stage !== 'campus') return;
    setStage('entering');
    timerRef.current = window.setTimeout(() => setStage('indoor'), ENTER_MS);
  }, [stage]);

  function goCampus() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStage('campus');
  }

  function goIndoor() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStage('indoor');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 rounded-full bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={goCampus}
          className={
            stage === 'campus'
              ? 'rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-bold text-white'
              : 'rounded-full px-3.5 py-1.5 text-[13px] font-bold text-ink-muted'
          }
        >
          Campus
        </button>
        <button
          type="button"
          onClick={goIndoor}
          className={
            stage === 'indoor' || stage === 'entering'
              ? 'rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-bold text-white'
              : 'rounded-full px-3.5 py-1.5 text-[13px] font-bold text-ink-muted'
          }
        >
          Indoor
        </button>
      </div>

      <PhoneFrame>
        <div className="relative h-full overflow-hidden">
          {/* Outdoor — zooms into GDC pin then fades */}
          <div
            className={cn(
              'absolute inset-0 will-change-[transform,opacity] motion-reduce:transition-none',
              stage === 'campus' && 'demo-campus-idle',
              stage === 'entering' && 'demo-campus-enter',
              stage === 'indoor' && 'pointer-events-none demo-campus-done'
            )}
            style={{ transformOrigin: ZOOM_ORIGIN }}
            aria-hidden={stage === 'indoor'}
          >
            <CampusMapDemo embedded entering={stage === 'entering'} onEnterBuilding={enterBuilding} />
          </div>

          {/* Indoor — crossfades in as outdoor zoom completes */}
          <div
            className={cn(
              'absolute inset-0 will-change-[transform,opacity] motion-reduce:transition-none',
              stage === 'campus' && 'pointer-events-none demo-indoor-hidden',
              stage === 'entering' && 'demo-indoor-enter',
              stage === 'indoor' && 'demo-indoor-idle'
            )}
            style={{ transformOrigin: ZOOM_ORIGIN }}
            aria-hidden={stage === 'campus'}
          >
            <IndoorMapDemo embedded />
          </div>

          {/* Brief handoff badge */}
          <div
            className={cn(
              'pointer-events-none absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 motion-reduce:transition-none',
              stage === 'entering' ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden={stage !== 'entering'}
          >
            <div className="demo-enter-badge rounded-2xl bg-white/95 px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.18)] backdrop-blur-sm">
              <p className="text-[13px] font-bold text-[#16140F]">
                Entering {DEMO_BUILDING.shortName}…
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-[#64748b]">Loading floor plan</p>
            </div>
          </div>
        </div>
      </PhoneFrame>

      <p className="max-w-sm text-center text-[13px] font-medium text-ink-muted">
        {stage === 'campus'
          ? 'Tap Enter building on GDC to open the indoor floor plan.'
          : stage === 'entering'
            ? 'Zooming into the building…'
            : 'Filter rooms, tap one, then Start directions to see the route.'}
      </p>
    </div>
  );
}
