import crypto from 'node:crypto';

function getSecret() {
  const s = process.env.REVIEW_LINK_SECRET;
  if (!s || !s.trim()) {
    throw new Error('Missing REVIEW_LINK_SECRET.');
  }
  return s.trim();
}

export function createReviewToken() {
  return crypto.randomBytes(24).toString('base64url');
}

export function hashReviewToken(token: string) {
  const h = crypto.createHmac('sha256', getSecret());
  h.update(token, 'utf8');
  return h.digest('hex');
}

