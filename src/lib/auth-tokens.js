import crypto from 'crypto';

// Use RESEND_API_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY as a fallback signing secret.
// Since RESEND_API_KEY is secret and server-side only, it is the primary choice.
const SIGNING_SECRET = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'ead_lsm_secret_fallback_key_2026';

/**
 * Sign a payload object using HMAC SHA-256
 * @param {Object} payload 
 * @returns {string} Signed token: Base64(payload) + '.' + Signature
 */
export function signToken(payload) {
  const jsonStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonStr).toString('base64');
  
  const hmac = crypto.createHmac('sha256', SIGNING_SECRET);
  hmac.update(base64Payload);
  const signature = hmac.digest('hex');
  
  return `${base64Payload}.${signature}`;
}

/**
 * Verify a signed token and return the parsed payload
 * @param {string} token 
 * @returns {Object|null} Parsed payload if valid, otherwise null
 */
export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  
  const [base64Payload, signature] = parts;
  
  try {
    // Re-verify signature
    const hmac = crypto.createHmac('sha256', SIGNING_SECRET);
    hmac.update(base64Payload);
    const expectedSignature = hmac.digest('hex');
    
    // Timing-safe equal check if possible
    const sigBuffer = Buffer.from(signature);
    const expBuffer = Buffer.from(expectedSignature);
    if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
      return null;
    }
    
    // Decode and parse payload
    const jsonStr = Buffer.from(base64Payload, 'base64').toString('utf-8');
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('verifyToken error:', err);
    return null;
  }
}
