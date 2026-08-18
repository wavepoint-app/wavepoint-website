/** Permissive address check — any domain is allowed. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return email.length >= 3 && email.length <= 254 && EMAIL_RE.test(email);
}
