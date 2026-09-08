'use client';

import { useEffect } from 'react';

/** Set to false to restore native scrolling without hunting call sites. */
export const INERTIA_ENABLED = true;

/** Per-frame damping at 60fps. 0.85 decays to ~5% in ~300ms. */
export const FRICTION = 0.85;

/**
 * Maps a native pixel delta onto velocity (px per 60fps frame).
 * Because position integrates velocity every frame, gain must stay well below 1
 * or a single tick coasts many times its native distance.
 */
export const WHEEL_GAIN = 0.35;

/** Hard cap on |velocity| in px/frame (~2.5x a fast native flick). */
export const MAX_VELOCITY = 140;

/** Ignore leftover motion smaller than this (px/frame). */
export const VELOCITY_STOP = 0.2;

export const HEADER_OFFSET = 80;

const FRAME_MS = 1000 / 60;
const MIN_DT = 8;
const MAX_DT = 32;
const LINE_HEIGHT_PX = 16;
const GOTO_SNAP_PX = 0.5;
/** Coast starts only after input pauses, so live ticks stay 1:1. */
const COAST_DELAY_MS = 48;
const VELOCITY_BLEND = 0.55;

type Engine = {
  position: number;
  velocity: number;
  target: number | null;
  raf: number;
  lastTime: number;
  lastInput: number;
  ignoreScroll: number;
};

const engine: Engine = {
  position: 0,
  velocity: 0,
  target: null,
  raf: 0,
  lastTime: 0,
  lastInput: 0,
  ignoreScroll: 0,
};

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isFinePointer() {
  return window.matchMedia('(pointer: fine)').matches;
}

function menuLocked() {
  return document.body.style.overflow === 'hidden';
}

function inertiaActive() {
  return INERTIA_ENABLED && !prefersReducedMotion() && isFinePointer();
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function applyScroll() {
  engine.ignoreScroll += 1;
  window.scrollTo(0, engine.position);
  window.requestAnimationFrame(() => {
    engine.ignoreScroll = Math.max(0, engine.ignoreScroll - 1);
  });
}

function stopLoop() {
  if (engine.raf) {
    window.cancelAnimationFrame(engine.raf);
    engine.raf = 0;
  }
}

function tick(now: number) {
  engine.raf = 0;

  if (menuLocked()) {
    engine.velocity = 0;
    engine.target = null;
    engine.position = window.scrollY;
    return;
  }

  const rawDt = engine.lastTime ? now - engine.lastTime : FRAME_MS;
  const dt = rawDt <= 0 || rawDt > MAX_DT ? FRAME_MS : Math.max(MIN_DT, rawDt);
  engine.lastTime = now;
  const max = maxScroll();
  const step = dt / FRAME_MS;
  const frictionDt = FRICTION ** step;
  const coasting = now - engine.lastInput >= COAST_DELAY_MS;

  if (engine.target != null) {
    const lerp = 1 - frictionDt;
    engine.position += (engine.target - engine.position) * lerp;
    engine.velocity = 0;
    if (Math.abs(engine.target - engine.position) < GOTO_SNAP_PX) {
      engine.position = engine.target;
      engine.target = null;
    }
  } else if (coasting) {
    engine.velocity *= frictionDt;
    if (Math.abs(engine.velocity) < VELOCITY_STOP) engine.velocity = 0;
    engine.position += engine.velocity * step;
  }

  if (engine.position <= 0) {
    engine.position = 0;
    engine.velocity = 0;
    if (engine.target != null && engine.target <= 0) engine.target = null;
  } else if (engine.position >= max) {
    engine.position = max;
    engine.velocity = 0;
    if (engine.target != null && engine.target >= max) engine.target = null;
  }

  if (engine.target != null) {
    engine.target = clamp(engine.target, 0, max);
  }

  if (engine.target != null || coasting) {
    applyScroll();
  }

  if (engine.velocity !== 0 || engine.target != null) {
    engine.raf = window.requestAnimationFrame(tick);
  } else {
    engine.lastTime = 0;
  }
}

function ensureLoop() {
  if (engine.raf) return;
  engine.lastTime = 0;
  engine.raf = window.requestAnimationFrame(tick);
}

function wheelPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * LINE_HEIGHT_PX;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

function nestedScrollsInDirection(start: EventTarget | null, deltaX: number, deltaY: number) {
  let node = start instanceof Element ? start : null;
  const vertical = Math.abs(deltaY) >= Math.abs(deltaX);

  while (node && node !== document.documentElement && node !== document.body) {
    const style = window.getComputedStyle(node);
    if (vertical) {
      const overflowY = style.overflowY;
      const yScrollable =
        (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight + 1;
      if (yScrollable) {
        const atTop = node.scrollTop <= 0;
        const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
        if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
      }
    } else {
      const overflowX = style.overflowX;
      const xScrollable =
        (overflowX === 'auto' || overflowX === 'scroll') && node.scrollWidth > node.clientWidth + 1;
      if (xScrollable) {
        const atLeft = node.scrollLeft <= 0;
        const atRight = node.scrollLeft + node.clientWidth >= node.scrollWidth - 1;
        if ((deltaX < 0 && !atLeft) || (deltaX > 0 && !atRight)) return true;
      }
    }
    node = node.parentElement;
  }

  return false;
}

function onWheel(event: WheelEvent) {
  if (!inertiaActive() || menuLocked()) return;
  if (nestedScrollsInDirection(event.target, event.deltaX, event.deltaY)) return;

  event.preventDefault();
  engine.target = null;
  if (!engine.raf) engine.position = window.scrollY;

  const pixels = wheelPixels(event);
  const max = maxScroll();
  engine.position = clamp(engine.position + pixels, 0, max);
  engine.lastInput = performance.now();

  if (engine.position <= 0 || engine.position >= max) {
    engine.velocity = 0;
  } else {
    engine.velocity = clamp(
      engine.velocity * VELOCITY_BLEND + pixels * WHEEL_GAIN,
      -MAX_VELOCITY,
      MAX_VELOCITY
    );
  }

  applyScroll();
  ensureLoop();
}

function onNativeScroll() {
  if (engine.ignoreScroll) return;
  engine.position = window.scrollY;
  engine.velocity = 0;
  engine.target = null;
  stopLoop();
}

function onResize() {
  engine.position = clamp(engine.position, 0, maxScroll());
  if (engine.target != null) engine.target = clamp(engine.target, 0, maxScroll());
}

function onDocumentClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href || !href.startsWith('#') || href === '#') return;

  const id = href.slice(1);
  if (!document.getElementById(id)) return;

  event.preventDefault();
  inertiaScrollToId(id);
  window.history.replaceState(null, '', `#${id}`);
}

export function inertiaPinTop() {
  stopLoop();
  engine.velocity = 0;
  engine.target = null;
  engine.position = 0;
  engine.lastInput = 0;
  engine.ignoreScroll += 1;
  window.scrollTo(0, 0);
  window.requestAnimationFrame(() => {
    engine.ignoreScroll = Math.max(0, engine.ignoreScroll - 1);
  });
}

function offsetDocumentY(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null;
  }
  return y;
}

function inertiaScrollTo(target: number) {
  const dest = clamp(target, 0, maxScroll());

  if (prefersReducedMotion()) {
    stopLoop();
    engine.position = dest;
    engine.velocity = 0;
    engine.target = null;
    window.scrollTo(0, dest);
    return;
  }

  if (!INERTIA_ENABLED || !isFinePointer()) {
    stopLoop();
    engine.position = dest;
    engine.velocity = 0;
    engine.target = null;
    window.scrollTo({ top: dest, behavior: 'smooth' });
    return;
  }

  engine.position = window.scrollY;
  engine.velocity = 0;
  engine.target = dest;
  ensureLoop();
}

export function inertiaScrollToTop() {
  inertiaScrollTo(0);
}

export function inertiaScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const unclamped = offsetDocumentY(el) - HEADER_OFFSET;
  inertiaScrollTo(unclamped);
}

export function InertiaScroll() {
  useEffect(() => {
    engine.position = window.scrollY;

    window.addEventListener('scroll', onNativeScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('click', onDocumentClick);

    const attachWheel = () => {
      window.removeEventListener('wheel', onWheel);
      if (inertiaActive()) {
        window.addEventListener('wheel', onWheel, { passive: false });
      }
    };

    attachWheel();

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(pointer: fine)');
    motion.addEventListener('change', attachWheel);
    pointer.addEventListener('change', attachWheel);

    return () => {
      stopLoop();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onNativeScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onDocumentClick);
      motion.removeEventListener('change', attachWheel);
      pointer.removeEventListener('change', attachWheel);
    };
  }, []);

  return null;
}
