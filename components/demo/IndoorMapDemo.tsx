'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import {
  CATEGORY_PILLS,
  DEMO_ROOMS,
  LEGEND,
  roomFill,
  type DemoRoom,
  type RoomCategory,
} from '@/lib/demo-map';
import { cn } from '@/lib/cn';

type Phase = 'browse' | 'selected' | 'routing';

export function IndoorMapDemo({
  compact = false,
  className,
  embedded = false,
}: {
  compact?: boolean;
  className?: string;
  embedded?: boolean;
}) {
  const [floor, setFloor] = useState<1 | 2>(1);
  const [category, setCategory] = useState<RoomCategory | 'all'>('classroom');
  const [selectedId, setSelectedId] = useState<string | null>('1.406');
  const [phase, setPhase] = useState<Phase>('routing');
  const [zoom, setZoom] = useState(1.05);
  const [query, setQuery] = useState('');

  // Homepage preview stays locked on the routed Lecture Hall B frame.
  const locked = compact;

  const rooms = useMemo(() => {
    return DEMO_ROOMS.filter((room) => {
      if (room.floor !== floor) return false;
      if (category !== 'all' && room.category !== category) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return room.name.toLowerCase().includes(q) || room.number.toLowerCase().includes(q);
    });
  }, [floor, category, query]);

  const selected = DEMO_ROOMS.find((r) => r.id === selectedId) ?? null;
  const showSelected = Boolean(selected && selected.floor === floor);
  const activePhase: Phase = locked ? 'routing' : phase;
  const activeSelectedId = locked ? '1.406' : selectedId;
  const activeSelected = locked
    ? DEMO_ROOMS.find((r) => r.id === '1.406') ?? null
    : selected;
  const activeShowSelected = locked ? true : showSelected;

  function selectRoom(room: DemoRoom) {
    if (locked) return;
    setSelectedId(room.id);
    setPhase('selected');
    if (room.floor !== floor) setFloor(room.floor);
  }

  function startRoute() {
    if (locked || !selected) return;
    setPhase('routing');
  }

  function clearRoute() {
    if (locked) return;
    setPhase(selected ? 'selected' : 'browse');
  }

  function changeFloor(n: 1 | 2) {
    if (locked) return;
    setFloor(n);
    setPhase('browse');
    setSelectedId(null);
  }

  const content = (
      <div className="relative flex h-full flex-col overflow-hidden bg-[#FAFAF8] text-[#16140F]">
        {/* Full-bleed map */}
        <div className="absolute inset-0 bottom-14">
          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoom})` }}
          >
            <FloorPlanSvg
              floor={floor}
              rooms={rooms}
              selectedId={activeShowSelected ? activeSelectedId : null}
              showPreviewPath={activePhase === 'selected' && activeShowSelected}
              routing={activePhase === 'routing' && activeShowSelected}
              routePath={
                activeShowSelected && (activePhase === 'routing' || activePhase === 'selected')
                  ? activeSelected!.path
                  : null
              }
              onSelect={selectRoom}
              large
            />
          </div>
        </div>

        {/* Compact floating search */}
        <div className="relative z-10 shrink-0 px-2.5 pt-8">
          <div className="rounded-[14px] bg-white/95 px-2 py-1.5 shadow-[0_4px_14px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="flex items-center gap-2">
              <label className="flex min-w-0 flex-1 items-center gap-1.5 rounded-[10px] border border-[#E2E6EA] bg-[#F7F8FA] px-2 py-1.5">
                <SearchIcon />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search rooms…"
                  className="w-full bg-transparent text-[11px] font-medium outline-none placeholder:text-[#A8B0BA]"
                />
              </label>
              <div className="flex shrink-0 overflow-hidden rounded-[8px] bg-[#F1F3F5]">
                {([1, 2] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => changeFloor(n)}
                    className={cn(
                      'px-2 py-1.5 text-[10px] font-extrabold',
                      floor === n ? 'bg-[#16140F] text-white' : 'text-[#6B7280]'
                    )}
                  >
                    L{n}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-1.5 flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORY_PILLS.map((pill) => {
                const active = category === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setCategory(pill.id)}
                    className={cn(
                      'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold',
                      active
                        ? 'border-[#16140F] bg-[#16140F] text-white'
                        : 'border-[#E2E6EA] bg-white text-[#3A4553]'
                    )}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute right-2.5 top-[6.5rem] z-10 flex flex-col gap-1">
          <div className="flex flex-col overflow-hidden rounded-[9px] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.12)]">
            <MapFab
              label="Zoom in"
              onClick={() => setZoom((z) => Math.min(1.45, +(z + 0.1).toFixed(2)))}
              className="border-b border-[#EEF1F4]"
            >
              +
            </MapFab>
            <MapFab
              label="Zoom out"
              onClick={() => setZoom((z) => Math.max(0.9, +(z - 0.1).toFixed(2)))}
            >
              −
            </MapFab>
          </div>
          <button
            type="button"
            aria-label="Recenter"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary shadow-[0_2px_8px_rgba(15,23,42,0.12)]"
            onClick={() => setZoom(1.05)}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.2" />
              <path
                d="M12 3v3M12 18v3M3 12h3M18 12h3"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Spacer pushes legend + sheet to bottom */}
        <div className="relative z-10 mt-auto" />

        {/* Legend near bottom, just above room card */}
        <div className="relative z-10 mx-2 mb-1 flex flex-wrap gap-x-2 gap-y-0.5 rounded-lg bg-white/95 px-2 py-1 shadow-[0_2px_8px_rgba(15,23,42,0.1)] backdrop-blur-sm">
          {LEGEND.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1 text-[8px] font-semibold text-[#5B6775]"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-[2px]"
                style={{ background: item.color }}
              />
              {item.label}
            </span>
          ))}
        </div>

        {/* Bottom sheet — compact */}
        <div className="relative z-10 px-2 pb-0 pt-0">
          {activePhase === 'routing' && activeShowSelected ? (
            <div className="rounded-t-[18px] bg-white px-3 pb-2.5 pt-2 shadow-[0_-6px_24px_rgba(15,23,42,0.14)]">
              <div className="mx-auto mb-1.5 h-0.5 w-7 rounded-full bg-[#E2E6EA]" />
              <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-extrabold tracking-[-0.2px]">
                    {activeSelected!.name}
                  </p>
                  <p className="truncate text-[10px] font-medium text-[#8A939E]">
                    {activeSelected!.number} · {activeSelected!.steps.slice(0, 2).join(' → ')} ·{' '}
                    {activeSelected!.etaMin} min
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearRoute}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F1F3F5] text-[14px] leading-none text-[#8A939E]"
                  aria-label="Close route"
                >
                  ×
                </button>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1 rounded-[10px] bg-primary py-1.5 text-[12px] font-bold text-white"
                >
                  <NavIcon />
                  Start
                </button>
                <IconButton label="Share">
                  <ShareIcon />
                </IconButton>
                <IconButton label="Bookmark">
                  <BookmarkIcon />
                </IconButton>
              </div>
            </div>
          ) : activeShowSelected && activePhase === 'selected' ? (
            <div className="rounded-t-[18px] bg-white px-3 pb-2.5 pt-2 shadow-[0_-6px_24px_rgba(15,23,42,0.14)]">
              <div className="mx-auto mb-1.5 h-0.5 w-7 rounded-full bg-[#E2E6EA]" />
              <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-[13px] font-extrabold tracking-[-0.2px]">
                      {activeSelected!.number} · {activeSelected!.name}
                    </p>
                    <span className="shrink-0 rounded-[6px] bg-[#E8D5C0] px-1.5 py-0.5 text-[9px] font-extrabold text-[#7A5530]">
                      {activeSelected!.etaMin} min
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[10px] font-medium text-[#8A939E]">
                    {activeSelected!.wing}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startRoute}
                  className="shrink-0 rounded-[10px] bg-[#16140F] px-3 py-1.5 text-[11px] font-bold text-white"
                >
                  Start
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-t-[18px] bg-white px-3 py-2 text-center shadow-[0_-6px_24px_rgba(15,23,42,0.1)]">
              <div className="mx-auto mb-1 h-0.5 w-7 rounded-full bg-[#E2E6EA]" />
              <p className="text-[11px] font-medium text-[#8A939E]">Tap a room to preview a route</p>
            </div>
          )}
        </div>

        <AppTabBar />
      </div>
  );

  if (embedded) return content;
  return (
    <PhoneFrame compact={compact} className={className}>
      {content}
    </PhoneFrame>
  );
}

function DestinationPin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y - 10})`}>
      <ellipse cx="0" cy="20" rx="7" ry="2.5" fill="#0f172a" opacity="0.12" />
      <path
        d="M0,-15 C-7.5,-15 -12,-8 -12,0 C-12,7 0,19 0,19 C0,19 12,7 12,0 C12,-8 7.5,-15 0,-15 Z"
        fill="#fff"
      />
      <circle cy="-3" r="4" fill="#0B617E" />
    </g>
  );
}

function FloorPlanSvg({
  floor,
  rooms,
  selectedId,
  showPreviewPath,
  routing,
  routePath,
  onSelect,
  large = false,
}: {
  floor: 1 | 2;
  rooms: DemoRoom[];
  selectedId: string | null;
  showPreviewPath: boolean;
  routing: boolean;
  routePath: string | null;
  onSelect: (room: DemoRoom) => void;
  large?: boolean;
}) {
  const selectedRoom = selectedId ? DEMO_ROOMS.find((r) => r.id === selectedId) : null;

  return (
    <svg
      viewBox="0 0 360 300"
      className={cn('w-full', large ? 'h-[118%] max-h-none' : 'h-full max-h-[260px]')}
      role="img"
      aria-label={`Floor ${floor} plan`}
    >
      <rect x="12" y="18" width="336" height="264" rx="12" fill="#F3F1EC" stroke="#D7DEE4" strokeWidth="1.5" />

      {/* Hallways */}
      <rect x="132" y="96" width="56" height="150" fill="#F5E6B8" />
      <rect x="12" y="168" width="336" height="44" fill="#F5E6B8" />
      <rect x="148" y="214" width="24" height="32" rx="3" fill="#CEDFE5" stroke="#9BB8C4" strokeWidth="1" />
      <text x="160" y="234" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0B617E">
        ↕
      </text>

      {DEMO_ROOMS.filter((r) => r.floor === floor).map((room) => {
        const visible = rooms.some((r) => r.id === room.id);
        const selected = room.id === selectedId;
        return (
          <g
            key={room.id}
            opacity={visible ? 1 : 0.28}
            className={visible ? 'cursor-pointer' : undefined}
            onClick={() => visible && onSelect(room)}
          >
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              rx="7"
              fill={roomFill(room.category, selected)}
              stroke={selected ? '#04303f' : '#C5CFD8'}
              strokeWidth={selected ? 2.5 : 1}
            />
            <text
              x={room.x + room.w / 2}
              y={room.y + room.h / 2 - (room.h > 50 ? 2 : 0)}
              textAnchor="middle"
              fontSize={room.w > 90 ? 11 : 9}
              fontWeight="800"
              fill={selected ? '#fff' : '#2C3642'}
            >
              {room.number}
            </text>
            {room.h > 48 ? (
              <text
                x={room.x + room.w / 2}
                y={room.y + room.h / 2 + 12}
                textAnchor="middle"
                fontSize="8"
                fontWeight="600"
                fill={selected ? 'rgba(255,255,255,0.9)' : '#5B6775'}
              >
                {room.category === 'restroom'
                  ? 'Restroom'
                  : room.name.length > 14
                    ? room.name.split(' ')[0]
                    : room.name}
              </text>
            ) : null}
          </g>
        );
      })}

      {/* User location */}
      <circle cx="52" cy="228" r="18" fill="#0B617E" opacity="0.15" />
      <circle cx="52" cy="228" r="9" fill="#0B617E" stroke="#fff" strokeWidth="3.5" />
      {routing ? <polygon points="52,214 58,225 52,222 46,225" fill="#0B617E" /> : null}

      {routePath ? (
        <polyline
          points={routePath}
          fill="none"
          stroke={routing ? '#0B617E' : '#D26A4A'}
          strokeWidth={routing ? 5 : 3.5}
          strokeDasharray={routing ? '7 7' : '5 6'}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={showPreviewPath && !routing ? 0.95 : 1}
        >
          {routing ? (
            <animate
              attributeName="stroke-dashoffset"
              from="56"
              to="0"
              dur="1s"
              repeatCount="indefinite"
            />
          ) : null}
        </polyline>
      ) : null}

      {routing && selectedRoom ? (
        <DestinationPin
          x={selectedRoom.x + selectedRoom.w / 2}
          y={selectedRoom.y + selectedRoom.h / 2}
        />
      ) : null}
    </svg>
  );
}

function AppTabBar() {
  return (
    <div className="relative z-20 flex shrink-0 items-end justify-between border-t border-[#E8EBEF] bg-white px-4 pb-2.5 pt-1.5">
      <TabItem icon={<PeopleIcon />} />
      <TabItem icon={<PersonIcon />} />
      <div className="-mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_16px_rgba(11,97,126,0.35)]">
        <MapPinIcon />
      </div>
      <TabItem icon={<CalendarIcon />} />
      <TabItem icon={<GearIcon />} />
    </div>
  );
}

function TabItem({ icon }: { icon: ReactNode }) {
  return (
    <div className="flex w-11 flex-col items-center gap-0.5 text-[#9AA3AE]">{icon}</div>
  );
}

function MapFab({
  children,
  onClick,
  label,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex h-7 w-7 items-center justify-center bg-white text-[13px] font-bold text-[#3A4553]',
        className
      )}
    >
      {children}
    </button>
  );
}

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#F1F3F5] text-[#5B6775]"
    >
      {children}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="#A8B0BA" strokeWidth="2" />
      <path d="M16 16l4 4" stroke="#A8B0BA" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NavIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l8 18-8-4-8 4 8-18z" fill="currentColor" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" fill="#fff" />
      <circle cx="12" cy="10" r="2.4" fill="#0B617E" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 4h10v16l-5-3-5 3V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 18c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4M14 14.2c1.7.2 3.2 1.2 3.9 3.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19c1-3.2 3.4-5 7-5s6 1.8 7 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3.5V7M16 3.5V7M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 3.5l1.2 2.2 2.5-.3 1 2.3 2.2 1.2-.3 2.5 2.2 1.2-2.2 1.2.3 2.5-2.2 1.2-1 2.3-2.5-.3L12 20.5l-1.2-2.2-2.5.3-1-2.3-2.2-1.2.3-2.5L3.2 12l2.2-1.2-.3-2.5 2.2-1.2 1-2.3 2.5.3L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
