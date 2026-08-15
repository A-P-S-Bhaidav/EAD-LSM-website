import fs from 'fs';
import path from 'path';

const cacheFile = path.join(process.cwd(), '.otp-cache.json');

export function getCachedOtp(email) {
  try {
    if (fs.existsSync(cacheFile)) {
      const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      return cache[email.trim().toLowerCase()] || null;
    }
  } catch (e) {
    console.error('Error reading OTP cache file:', e);
  }
  return null;
}

export function saveCachedOtp(email, code) {
  try {
    let cache = {};
    if (fs.existsSync(cacheFile)) {
      try {
        cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      } catch (err) {
        cache = {};
      }
    }
    cache[email.trim().toLowerCase()] = {
      code: code.trim(),
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes from now
    };
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing OTP cache file:', e);
  }
}

export function deleteCachedOtp(email) {
  try {
    if (fs.existsSync(cacheFile)) {
      let cache = {};
      try {
        cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      } catch (err) {
        cache = {};
      }
      delete cache[email.trim().toLowerCase()];
      fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
    }
  } catch (e) {
    console.error('Error deleting OTP cache entry:', e);
  }
}
