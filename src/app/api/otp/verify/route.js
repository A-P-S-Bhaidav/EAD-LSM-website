import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    // Query latest active OTP code for this email
    const { data, error } = await supabase
      .from('otps')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: 'No verification code found' }, { status: 400 });
    }

    const latestOtp = data[0];
    const isExpired = new Date(latestOtp.expires_at).getTime() < Date.now();

    if (isExpired) {
      return NextResponse.json({ error: 'Verification code expired' }, { status: 400 });
    }

    if (latestOtp.code !== code.trim()) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // Clean up used OTP
    supabase
      .from('otps')
      .delete()
      .eq('email', email)
      .then(() => {})
      .catch(() => {});

    // Create session token (keep it simple: base64 encoded JSON)
    const sessionToken = btoa(JSON.stringify({ email, verified: true, time: Date.now() }));

    return NextResponse.json({ success: true, token: sessionToken });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
