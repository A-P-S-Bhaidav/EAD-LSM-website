import { NextResponse } from 'next/server';

// BACKEND DISABLED - Database operations commented out
export async function POST(req) {
  return NextResponse.json({
    message: 'Backend disabled. Registrations are handled via Google Forms.',
    data: []
  }, { status: 200 });
}

/*
================================================================================
PREVIOUS DATABASE BACKEND ROUTE (COMMENTED OUT)
================================================================================

import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth-tokens';

export async function ORIGINAL_POST(req) {
  try {
    // 1. Authenticate Request
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authentication token is required' }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // 2. Parse Request Action
    const body = await req.json();
    const { action } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    // 3. Enforce Access Control Checks
    const isAdmin = payload.role === 'admin';

    const userActions = [
      'upsertUserRegistration',
      'insertLuckyDraw',
      'insertQuestionnaire',
      'getLatestLuckyDraw',
      'getUserLuckyDraws',
      'getLatestQuestionnaire'
    ];

    if (userActions.includes(action)) {
      const requestEmail = (body.email || '').trim().toLowerCase();
      if (!requestEmail) {
        return NextResponse.json({ error: 'Email parameter is required for this action' }, { status: 400 });
      }

      const isOwner = payload.email === requestEmail;
      if (!isOwner && !isAdmin) {
        return NextResponse.json({ error: 'Forbidden: You do not have permission to access this record' }, { status: 403 });
      }
    } else {
      if (!isAdmin) {
        return NextResponse.json({ error: 'Forbidden: Administrative access required' }, { status: 403 });
      }

      if (payload.ead && payload.ead !== 'all') {
        const requestedEventName = (body.eventName || '').trim().toLowerCase();
        if (requestedEventName && requestedEventName !== payload.ead.toLowerCase()) {
          return NextResponse.json({ error: `Forbidden: Access restricted to ${payload.ead} location only` }, { status: 403 });
        }
      }
    }

    let data = null;

    switch (action) {
      case 'upsertUserRegistration': {
        const { email, registeredEvents } = body;
        data = await sql`
          INSERT INTO user_registrations (email, registered_events)
          VALUES (${email.trim().toLowerCase()}, ${registeredEvents})
          ON CONFLICT (email)
          DO UPDATE SET registered_events = ${registeredEvents}
          RETURNING *
        `;
        break;
      }
      case 'insertLuckyDraw': {
        const { name, email, eventName } = body;
        data = await sql`
          INSERT INTO lucky_draw (name, email, event_name)
          VALUES (${name}, ${email.trim().toLowerCase()}, ${eventName})
          RETURNING *
        `;
        break;
      }
      case 'queryLuckyDrawsByLocation': {
        const { eventName } = body;
        data = await sql`
          SELECT * FROM lucky_draw
          WHERE event_name = ${eventName}
          ORDER BY created_at DESC
        `;
        break;
      }
      case 'queryLsmUserRegistrations': {
        data = await sql`
          SELECT * FROM user_registrations
          WHERE registered_events ILIKE '%LSM%'
          ORDER BY registered_at DESC
        `;
        break;
      }
      default:
        return NextResponse.json({ error: 'Invalid action requested' }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('API /api/db error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
================================================================================
*/
