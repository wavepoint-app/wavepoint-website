// Uploads every file in public/team/ to the `website-assets` bucket under team/.
// Targets the Wavepoint dev project (must match TEAM_PHOTO_BASE in lib/team.ts).
// Needs that project's secret key, which must never be added to Vercel:
//   SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload-team-photos.mjs
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://dsomqfwodtyrbloajjwr.supabase.co';
const BUCKET = 'website-assets';
const LOCAL_DIR = path.join(process.cwd(), 'public', 'team');
const CONTENT_TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!serviceKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(PROJECT_URL, serviceKey, { auth: { persistSession: false } });

const files = (await readdir(LOCAL_DIR)).filter((f) => CONTENT_TYPES[path.extname(f).toLowerCase()]);
let failed = 0;

for (const file of files) {
  const body = await readFile(path.join(LOCAL_DIR, file));
  const { error } = await supabase.storage.from(BUCKET).upload(`team/${file}`, body, {
    contentType: CONTENT_TYPES[path.extname(file).toLowerCase()],
    cacheControl: '31536000',
    upsert: true,
  });
  if (error) {
    failed += 1;
    console.error(`✗ ${file}: ${error.message}`);
  } else {
    console.log(`✓ ${file}`);
  }
}

console.log(`\nUploaded ${files.length - failed}/${files.length} to ${BUCKET}/team/`);
process.exit(failed ? 1 : 0);
