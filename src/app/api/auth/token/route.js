import { NextResponse } from 'next/server';

// BACKEND DISABLED - Auth token exchange commented out
export async function POST(req) {
  return NextResponse.json({
    message: 'Backend disabled. Registrations are handled via Google Forms.',
    success: false
  }, { status: 200 });
}

/*
================================================================================
PREVIOUS AUTH TOKEN ROUTE (COMMENTED OUT)
================================================================================

import { supabase } from '@/lib/supabase';
import { signToken } from '@/lib/auth-tokens';

export async function ORIGINAL_POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid Supabase session' }, { status: 401 });
    }

    const sessionToken = signToken({
      email: user.email.toLowerCase(),
      verified: true,
      time: Date.now(),
      role: 'user'
    });

    return NextResponse.json({ success: true, token: sessionToken });
  } catch (err) {
    console.error('Auth token exchange API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
================================================================================
*/
