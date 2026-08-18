import { NextResponse } from 'next/server';
import { isValidEmail, normalizeEmail } from '@/lib/email';
import { getSupabase } from '@/lib/supabase';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  if (tooMany(clientIp(request))) {
    return NextResponse.json({ error: 'Too many tries. Please wait a bit.' }, { status: 429 });
  }

  let body: { email?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — bots that fill hidden fields get a fake success.
  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof body.email !== 'string') {
    return NextResponse.json({ error: 'Enter your email.' }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'That email doesn’t look right.' }, { status: 400 });
  }

  try {
    const { error } = await getSupabase().from('waitlist').insert({ email });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ ok: true, alreadyJoined: true });
      }
      console.error('waitlist insert failed', error.message);
      return NextResponse.json({ error: 'Could not join right now. Try again.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('waitlist error', err);
    return NextResponse.json({ error: 'Could not join right now. Try again.' }, { status: 500 });
  }
}
