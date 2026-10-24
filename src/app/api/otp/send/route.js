import { NextResponse } from 'next/server';

// BACKEND DISABLED - OTP sending commented out
export async function POST(req) {
  return NextResponse.json({
    message: 'Backend disabled. Registrations are handled via Google Forms.',
    success: true
  }, { status: 200 });
}

/*
================================================================================
PREVIOUS OTP SEND ROUTE (COMMENTED OUT)
================================================================================

import { sql } from '@/lib/db';
import { saveCachedOtp } from '@/lib/otp-store';

export async function ORIGINAL_POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailClean = email.trim().toLowerCase();

    // Check if email is already registered
    const existing = await sql`
      SELECT email FROM user_registrations
      WHERE email = ${emailClean}
    `;

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'This email is already registered. Please log in instead.' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    saveCachedOtp(emailClean, code);

    try {
      await sql`
        INSERT INTO otps (email, code, expires_at)
        VALUES (${emailClean}, ${code}, ${expiresAt})
      `;
    } catch (dbError) {
      console.warn('DB insert to otps failed:', dbError.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('OTP Send API Error:', err);
    return NextResponse.json({ error: 'Failed to process OTP request' }, { status: 500 });
  }
}
================================================================================
*/
