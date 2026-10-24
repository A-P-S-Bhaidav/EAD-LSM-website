import { NextResponse } from 'next/server';

// BACKEND DISABLED - OTP verification commented out
export async function POST(req) {
  return NextResponse.json({
    message: 'Backend disabled. Registrations are handled via Google Forms.',
    success: true
  }, { status: 200 });
}

/*
================================================================================
PREVIOUS OTP VERIFY ROUTE (COMMENTED OUT)
================================================================================

import { sql } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { signToken } from '@/lib/auth-tokens';
import { getCachedOtp, deleteCachedOtp } from '@/lib/otp-store';

export async function ORIGINAL_POST(req) {
  try {
    const { email, code, isLsm, startupName, lsmCity, password } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const emailClean = email.trim().toLowerCase();
    let isCodeValid = false;
    let isCodeExpired = false;

    const cachedOtp = getCachedOtp(emailClean);
    if (cachedOtp) {
      isCodeExpired = new Date(cachedOtp.expiresAt).getTime() < Date.now();
      if (!isCodeExpired && cachedOtp.code === code.trim()) {
        isCodeValid = true;
        deleteCachedOtp(emailClean);
      }
    }

    if (!isCodeValid) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    const sessionToken = signToken({
      email: emailClean,
      verified: true,
      time: Date.now(),
      role: 'user'
    });

    return NextResponse.json({
      success: true,
      token: sessionToken,
      message: 'Email successfully verified'
    });
  } catch (err) {
    console.error('OTP Verify API Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
================================================================================
*/
