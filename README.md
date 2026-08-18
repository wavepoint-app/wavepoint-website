# Wavepoint website

Marketing site for Wavepoint (not a web version of the app). Next.js + Tailwind in this folder. Colors come from `frontend/constants/theme.colors.json`.

The waitlist form is a **placeholder** until Supabase is wired. Joining an email does not save anything yet.

---

## Local

```bash
cd website
npm install
cp .env.example .env.local   # fill after waitlist is live
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy (Vercel)

1. Push this repo to GitHub.
2. [Vercel](https://vercel.com) → **Add New Project** → import the repo.
3. Set **Root Directory** to `website` (not the repo root).
4. Leave build as detected (`npm run build`).
5. Deploy. You get a `*.vercel.app` URL first.

---

## Custom domain

1. Buy a domain (Namecheap, Cloudflare, Google Domains, etc.).
2. Vercel → project → **Settings → Domains** → add `wavepoint.app` and/or `www`.
3. At the registrar, add the records Vercel shows. Typical setup:

| Type | Name | Value |
| :--- | :--- | :--- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

4. Wait for DNS (often 5–60 min). HTTPS is automatic.

---

## Waitlist (Supabase)

Use the **same** Wavepoint Supabase project as the mobile app. The anon key can insert; it cannot create tables.

### 1. Run the migration

In the [SQL Editor](https://supabase.com/dashboard), paste and run `supabase/migrations/0034_waitlist.sql` (repo root, not this folder).

That creates `public.waitlist`: public insert, admin-only read, duplicate emails rejected.

### 2. Env vars on Vercel

Project → **Settings → Environment Variables** (Production + Preview):

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

Same values as `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` in the app. **Do not** prefix with `NEXT_PUBLIC_` — they stay server-only.

Redeploy after saving.

### 3. Turn the form back on

`components/WaitlistForm.tsx` currently `preventDefault`s and never calls the API. Restore the submit that `POST`s to `/api/waitlist` (route is already in `app/api/waitlist/route.ts`). Any email is allowed; no UT restriction.

After that, a successful submit shows “You’re on the list.” Duplicate emails say they’re already on the list. Admins can read rows in Supabase (`waitlist` table). No launch email is sent automatically.

---

## After the domain is live

In the **app** (`frontend/.env` / EAS secrets), set:

```
EXPO_PUBLIC_INVITE_WEB_BASE_URL=https://your-domain
```

so friend invite links can open this site instead of a custom scheme only.

---

## Checklist

- [ ] Deploy `website/` on Vercel (root directory = `website`)
- [ ] Connect custom domain + DNS
- [ ] Run `supabase/migrations/0034_waitlist.sql`
- [ ] Add `SUPABASE_URL` + `SUPABASE_ANON_KEY` on Vercel
- [ ] Restore waitlist submit in `components/WaitlistForm.tsx`
- [ ] (Optional) Set `EXPO_PUBLIC_INVITE_WEB_BASE_URL` in the app
