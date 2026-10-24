import { NextResponse } from 'next/server';

// BACKEND DISABLED - Contact API commented out
export async function POST(req) {
  return NextResponse.json({
    success: true,
    message: 'Backend disabled. Message handled locally.'
  }, { status: 200 });
}

/*
================================================================================
PREVIOUS CONTACT ROUTE (COMMENTED OUT)
================================================================================

export async function ORIGINAL_POST(req) {
  try {
    const { firstName, lastName, city, phone, email, inquiryType, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: `E-Cell Contact Form <${fromEmail}>`,
          to: ['admin@ecell-iitkgp.in'],
          subject: `New Inquiry: ${inquiryType} from ${firstName} ${lastName}`,
          html: `<p>${message}</p>`
        })
      });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
================================================================================
*/
