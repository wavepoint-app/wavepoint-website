'use client';

import type { ReactNode } from 'react';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { DEMO_BUILDING } from '@/lib/demo-map';
import { cn } from '@/lib/cn';

export function CampusMapDemo({
  onEnterBuilding,
  className,
  embedded = false,
  entering = false,
}: {
  onEnterBuilding: () => void;
  className?: string;
  embedded?: boolean;
  entering?: boolean;
}) {
  const content = (
      <div className="relative flex h-full flex-col bg-[#E8EAED]">
        <GoogleStyleCampusMap onSelectBuilding={onEnterBuilding} />

        {/* Search */}
        <div
          className={cn(
            'relative z-10 px-3 pt-8 transition-all duration-500 ease-out',
            entering && '-translate-y-3 opacity-0'
          )}
        >
          <label className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5 shadow-[0_2px_8px_rgba(60,64,67,0.28)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.5" stroke="#5F6368" strokeWidth="2" />
              <path d="M16 16l4 4" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="flex-1 text-[13px] font-medium text-[#9AA0A6]">Search destination</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F0FE]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 3v10m0 0l3-3m-3 3L9 10"
                  stroke="#1A73E8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M5 17a7 7 0 0014 0" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </label>
        </div>

        {/* Left settings FAB */}
        <button
          type="button"
          className="absolute left-3 top-[7.25rem] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5F6368] shadow-[0_2px_6px_rgba(60,64,67,0.3)]"
          aria-label="Map settings"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 3.5l1.1 2 2.3-.3.9 2.1 2 1.1-.3 2.3 2 1.1-2 1.1.3 2.3-2 1.1-.9 2.1-2.3-.3L12 20.5l-1.1-2-2.3.3-.9-2.1-2-1.1.3-2.3-2-1.1 2-1.1-.3-2.3 2-1.1.9-2.1 2.3.3L12 3.5z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right FABs — Google-ish stack */}
        <div className="absolute right-3 top-[7.25rem] z-10 flex flex-col gap-2.5">
          <Fab ariaLabel="Directions">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3l8 9h-5v9h-6v-9H4l8-9z" fill="#5F6368" />
            </svg>
          </Fab>
          <Fab ariaLabel="My location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="3" stroke="#5F6368" strokeWidth="2" />
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Fab>
          <Fab ariaLabel="Friends nearby">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="9" cy="8" r="2.8" stroke="#5F6368" strokeWidth="1.8" />
              <circle cx="16.5" cy="9" r="2.2" stroke="#5F6368" strokeWidth="1.8" />
              <path
                d="M4 18c.7-2.4 2.5-3.6 5-3.6s4.3 1.2 5 3.6M14 14.5c1.5.2 2.8 1 3.5 2.8"
                stroke="#5F6368"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </Fab>
          <button
            type="button"
            onClick={onEnterBuilding}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_3px_10px_rgba(11,97,126,0.4)]"
            aria-label="Drop pin"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 21s6.5-5 6.5-10.5a6.5 6.5 0 10-13 0C5.5 16 12 21 12 21z" fill="#fff" />
              <path d="M12 7v5M9.5 9.5h5" stroke="#0B617E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Building card */}
        <div
          className={cn(
            'relative z-10 mt-auto px-3 pb-2.5 transition-all duration-500 ease-out',
            entering && 'translate-y-8 opacity-0'
          )}
        >
          <button
            type="button"
            onClick={onEnterBuilding}
            disabled={entering}
            className="w-full rounded-[22px] bg-white p-3.5 text-left shadow-[0_4px_16px_rgba(60,64,67,0.28)] transition hover:-translate-y-0.5 disabled:pointer-events-none"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                    fill="currentColor"
                  />
                  <circle cx="12" cy="10" r="2.3" fill="#fff" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#80868B]">
                  Campus map
                </p>
                <p className="mt-0.5 text-[15px] font-extrabold tracking-[-0.2px] text-[#202124]">
                  {DEMO_BUILDING.name}
                </p>
                <p className="mt-0.5 text-[12px] font-medium leading-4 text-[#5F6368]">
                  Tap to open the indoor floor plan and route to a room.
                </p>
              </div>
            </div>
            <span className="mt-3 flex w-full items-center justify-center rounded-full bg-primary py-2.5 text-[13px] font-bold text-white">
              Enter building
            </span>
          </button>
        </div>

        {/* Tab bar */}
        <div className="relative z-10 flex items-end justify-between border-t border-[#E8EAED] bg-white px-4 pb-2.5 pt-1.5">
          <TabGlyph label="G">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M3.5 18c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </TabGlyph>
          <TabGlyph label="F">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M5 19c1-3.2 3.4-5 7-5s6 1.8 7 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </TabGlyph>
          <div className="-mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_16px_rgba(11,97,126,0.35)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" fill="#fff" />
              <circle cx="12" cy="10" r="2.4" fill="#0B617E" />
            </svg>
          </div>
          <TabGlyph label="C">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M8 3.5V7M16 3.5V7M4 10h16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </TabGlyph>
          <TabGlyph label="S">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M12 3.5l1.2 2.2 2.5-.3 1 2.3 2.2 1.2-.3 2.5 2.2 1.2-2.2 1.2.3 2.5-2.2 1.2-1 2.3-2.5-.3L12 20.5l-1.2-2.2-2.5.3-1-2.3-2.2-1.2.3-2.5L3.2 12l2.2-1.2-.3-2.5 2.2-1.2 1-2.3 2.5.3L12 3.5z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </TabGlyph>
        </div>
      </div>
  );

  if (embedded) return content;
  return <PhoneFrame className={className}>{content}</PhoneFrame>;
}

function GoogleStyleCampusMap({ onSelectBuilding }: { onSelectBuilding: () => void }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 320 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Ground */}
      <rect width="320" height="640" fill="#E8EAED" />

      {/* Parks / quads */}
      <rect x="8" y="40" width="120" height="90" rx="4" fill="#C8E6C9" />
      <rect x="200" y="30" width="110" height="70" rx="4" fill="#A5D6A7" />
      <ellipse cx="70" cy="250" rx="48" ry="36" fill="#C8E6C9" />
      <rect x="10" y="470" width="140" height="100" rx="6" fill="#C8E6C9" />
      <path d="M210 500 Q260 470 310 510 L310 580 L210 580 Z" fill="#A5D6A7" />

      {/* Minor local roads (white) */}
      <rect x="0" y="168" width="320" height="14" fill="#FFFFFF" />
      <rect x="0" y="318" width="320" height="12" fill="#FFFFFF" />
      <rect x="0" y="448" width="320" height="12" fill="#FFFFFF" />
      <rect x="78" y="0" width="12" height="640" fill="#FFFFFF" />
      <rect x="248" y="0" width="10" height="640" fill="#FFFFFF" />

      {/* Major roads (Google yellow) */}
      <rect x="0" y="288" width="320" height="22" fill="#F9CB40" />
      <rect x="148" y="0" width="22" height="640" fill="#F9CB40" />
      {/* Road center dashes */}
      <g stroke="#F0B429" strokeWidth="1.2" strokeDasharray="8 10">
        <line x1="0" y1="299" x2="320" y2="299" />
        <line x1="159" y1="0" x2="159" y2="640" />
      </g>

      {/* Sidewalks / curb */}
      <rect x="0" y="284" width="320" height="4" fill="#DADCE0" />
      <rect x="0" y="310" width="320" height="4" fill="#DADCE0" />

      {/* Building footprints — Google beige/gray */}
      <rect x="20" y="70" width="100" height="72" rx="3" fill="#DADCE0" stroke="#BDC1C6" strokeWidth="1" />
      <rect x="210" y="55" width="88" height="95" rx="3" fill="#E8EAED" stroke="#BDC1C6" strokeWidth="1" />
      <rect x="20" y="200" width="70" height="55" rx="3" fill="#DADCE0" stroke="#BDC1C6" strokeWidth="1" />
      <rect x="200" y="200" width="95" height="60" rx="3" fill="#DADCE0" stroke="#BDC1C6" strokeWidth="1" />
      <rect x="20" y="360" width="110" height="70" rx="3" fill="#DADCE0" stroke="#BDC1C6" strokeWidth="1" />
      <rect x="200" y="360" width="50" height="55" rx="3" fill="#E8EAED" stroke="#BDC1C6" strokeWidth="1" />

      {/* Highlighted GDC */}
      <g className="cursor-pointer" onClick={onSelectBuilding}>
        <rect
          x="188"
          y="345"
          width="112"
          height="88"
          rx="4"
          fill="#B2DFDB"
          stroke="#0B617E"
          strokeWidth="2.5"
        />
        <rect x="198" y="358" width="28" height="22" rx="2" fill="#80CBC4" />
        <rect x="234" y="358" width="28" height="22" rx="2" fill="#80CBC4" />
        <rect x="270" y="358" width="20" height="22" rx="2" fill="#80CBC4" />
        <rect x="198" y="388" width="92" height="30" rx="2" fill="#4DB6AC" />
        <text x="244" y="408" textAnchor="middle" fontSize="11" fontWeight="800" fill="#004D40">
          GDC
        </text>
      </g>

      {/* Parking lots */}
      <rect x="20" y="520" width="90" height="50" rx="2" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1" />
      <g stroke="#90A4AE" strokeWidth="0.8">
        <line x1="35" y1="525" x2="35" y2="565" />
        <line x1="50" y1="525" x2="50" y2="565" />
        <line x1="65" y1="525" x2="65" y2="565" />
        <line x1="80" y1="525" x2="80" y2="565" />
      </g>

      {/* Street labels */}
      <text x="170" y="283" fontSize="8" fontWeight="700" fill="#5F6368" letterSpacing="0.6">
        E 24TH ST
      </text>
      <text
        x="145"
        y="400"
        fontSize="8"
        fontWeight="700"
        fill="#5F6368"
        letterSpacing="0.6"
        transform="rotate(-90 145 400)"
      >
        SPEEDWAY
      </text>
      <text x="175" y="460" fontSize="7.5" fontWeight="700" fill="#5F6368" letterSpacing="0.5">
        SAN JACINTO BLVD
      </text>
      <text
        x="85"
        y="140"
        fontSize="7.5"
        fontWeight="700"
        fill="#5F6368"
        letterSpacing="0.4"
        transform="rotate(-90 85 140)"
      >
        RED RIVER ST
      </text>

      {/* Building / POI labels */}
      <text x="70" y="108" textAnchor="middle" fontSize="8" fontWeight="600" fill="#3C4043">
        Gregory Gym
      </text>
      <text x="254" y="100" textAnchor="middle" fontSize="8" fontWeight="600" fill="#3C4043">
        Stadium
      </text>
      <text x="75" y="400" textAnchor="middle" fontSize="8" fontWeight="600" fill="#3C4043">
        PCL
      </text>

      {/* POI pins */}
      <g transform="translate(254, 78)">
        <circle r="9" fill="#34A853" stroke="#fff" strokeWidth="2" />
        <rect x="-3.5" y="-4" width="7" height="5" rx="1" fill="#fff" />
        <rect x="-2" y="1" width="4" height="3" rx="0.5" fill="#fff" />
      </g>
      <g transform="translate(70, 90)">
        <circle r="9" fill="#4285F4" stroke="#fff" strokeWidth="2" />
        <circle cx="0" cy="-1" r="2.2" fill="#fff" />
        <path d="M-3.5 4 Q0 1 3.5 4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(75, 390)">
        <circle r="8" fill="#FBBC04" stroke="#fff" strokeWidth="2" />
        <rect x="-3" y="-3.5" width="6" height="7" rx="0.8" fill="#fff" />
      </g>

      {/* Selected destination pin on GDC */}
      <g transform="translate(244, 340)" className="cursor-pointer" onClick={onSelectBuilding}>
        <path
          d="M0 28 C0 28 -12 14 -12 4 a12 12 0 1 1 24 0 C12 14 0 28 0 28z"
          fill="#EA4335"
          stroke="#fff"
          strokeWidth="2"
        />
        <circle cy="4" r="4.5" fill="#fff" />
      </g>

      {/* User location (Google blue pulse) */}
      <circle cx="130" cy="300" r="16" fill="#4285F4" opacity="0.18" />
      <circle cx="130" cy="300" r="7" fill="#4285F4" stroke="#fff" strokeWidth="3" />

      {/* Google-style attribution corner */}
      <text x="10" y="628" fontSize="7" fontWeight="600" fill="#80868B">
        Map data © demo
      </text>
    </svg>
  );
}

function Fab({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(60,64,67,0.3)]"
    >
      {children}
    </button>
  );
}

function TabGlyph({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-11 flex-col items-center gap-0.5 text-[#9AA3AE]">
      {children}
      <span className="text-[8px] font-semibold">{label}</span>
    </div>
  );
}
