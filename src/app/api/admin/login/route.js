import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth-tokens';

export async function POST(req) {
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

    // Verify ead location if present (used by specific regional admin dashboards)
    if (ead && ead.toLowerCase() !== 'delhi') {
      return NextResponse.json({ error: 'Unauthorized location for this administrator' }, { status: 403 });
    }

    // Sign the admin token
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
