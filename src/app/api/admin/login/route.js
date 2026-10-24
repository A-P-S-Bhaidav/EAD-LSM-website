import { NextResponse } from 'next/server';

// BACKEND DISABLED - Admin login commented out
export async function POST(req) {
  return NextResponse.json({
    message: 'Backend disabled. Registrations are handled via Google Forms.',
    success: false
  }, { status: 200 });
}

/*
================================================================================
PREVIOUS ADMIN LOGIN ROUTE (COMMENTED OUT)
================================================================================

import { signToken } from '@/lib/auth-tokens';

export async function ORIGINAL_POST(req) {
  try {
    const { name, email, ead } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const isValidAdmin = name.toLowerCase() === 'anant pratap singh bhaidav' &&
                         email.toLowerCase() === 'anantbhaidav@gmail.com';

    if (!isValidAdmin) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    if (ead && ead.toLowerCase() !== 'delhi') {
      return NextResponse.json({ error: 'Unauthorized location for this administrator' }, { status: 403 });
    }

    const token = signToken({
      name,
      email: email.toLowerCase(),
      role: 'admin',
      ead: ead || 'all'
    });

    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error('Admin login API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
================================================================================
*/
