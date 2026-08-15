import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth-tokens';

export async function POST(req) {
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

    // List of user-scoped database actions
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

      // Allow if request belongs to the authenticated user OR caller is admin
      const isOwner = payload.email === requestEmail;
      if (!isOwner && !isAdmin) {
        return NextResponse.json({ error: 'Forbidden: You do not have permission to access this record' }, { status: 403 });
      }
    } else {
      // Administrative actions (restricted to admins only)
      if (!isAdmin) {
        return NextResponse.json({ error: 'Forbidden: Administrative access required' }, { status: 403 });
      }

      // Check regional location access if regional admin
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
        const result = await sql`
          INSERT INTO user_registrations (email, registered_events)
          VALUES (${email.trim().toLowerCase()}, ${registeredEvents})
          ON CONFLICT (email)
          DO UPDATE SET registered_events = ${registeredEvents}
          RETURNING *
        `;
        data = result;
        break;
      }

      case 'insertLuckyDraw': {
        const { name, email, eventName } = body;
        let luckyNumber;
        let success = false;
        let attempts = 0;
        let result;

        while (!success && attempts < 100) {
          attempts++;
          luckyNumber = Math.floor(1000 + Math.random() * 9000);
          try {
            result = await sql`
              INSERT INTO lucky_draws (name, email, event_name, lucky_number)
              VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${eventName.trim()}, ${luckyNumber})
              RETURNING *
            `;
            success = true;
          } catch (dbError) {
            if (dbError.code === '23505') {
              console.warn(`Lucky number collision for #${luckyNumber}, retrying...`);
              continue;
            }
            throw dbError;
          }
        }

        if (!success) {
          return NextResponse.json({ error: 'Failed to generate a unique lucky number' }, { status: 500 });
        }

        data = result;
        break;
      }

      case 'insertQuestionnaire': {
        const { name, email, college, interest, experience } = body;
        const result = await sql`
          INSERT INTO questionnaire_responses (name, email, college, interest, experience)
          VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${college.trim()}, ${interest}, ${experience})
          RETURNING *
        `;
        data = result;
        break;
      }

      case 'getLatestLuckyDraw': {
        const { email } = body;
        const result = await sql`
          SELECT created_at, lucky_number FROM lucky_draws
          WHERE email = ${email.trim().toLowerCase()}
          ORDER BY created_at DESC
          LIMIT 1
        `;
        data = result;
        break;
      }

      case 'getUserLuckyDraws': {
        const { email } = body;
        const result = await sql`
          SELECT * FROM lucky_draws
          WHERE email = ${email.trim().toLowerCase()}
          ORDER BY created_at DESC
        `;
        data = result;
        break;
      }

      case 'getLatestQuestionnaire': {
        const { email } = body;
        const result = await sql`
          SELECT * FROM questionnaire_responses
          WHERE email = ${email.trim().toLowerCase()}
          ORDER BY timestamp DESC
          LIMIT 1
        `;
        data = result;
        break;
      }

      case 'queryLuckyDrawsByLocation': {
        const { eventName } = body;
        const pattern = `%${eventName.trim()}%`;
        const result = await sql`
          SELECT * FROM lucky_draws
          WHERE event_name ILIKE ${pattern}
          ORDER BY created_at DESC
        `;
        data = result;
        break;
      }

      case 'queryLsmUserRegistrations': {
        const result = await sql`
          SELECT email FROM user_registrations
          WHERE registered_events ILIKE '%LSM%'
        `;
        data = result;
        break;
      }

      case 'queryLuckyDrawsRecent': {
        const { eventName, oneDayAgo } = body;
        const pattern = `%${eventName.trim()}%`;
        const result = await sql`
          SELECT * FROM lucky_draws
          WHERE event_name ILIKE ${pattern} AND created_at >= ${oneDayAgo}
          ORDER BY created_at DESC
        `;
        data = result;
        break;
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('API /api/db error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
