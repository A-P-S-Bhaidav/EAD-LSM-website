import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { signToken } from '@/lib/auth-tokens';

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Retrieve user from Supabase using the provided access token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.warn('Supabase auth validation failed:', error?.message);
      return NextResponse.json({ error: 'Invalid Supabase session' }, { status: 401 });
    }

    // Generate signed HMAC session token for the database proxy
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
