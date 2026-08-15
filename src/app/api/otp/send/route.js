import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { saveCachedOtp } from '@/lib/otp-store';

export async function POST(req) {
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

    // Store in filesystem-based fallback cache
    saveCachedOtp(emailClean, code);

    // Store in Neon Postgres otps table
    try {
      await sql`
        INSERT INTO otps (email, code, expires_at)
        VALUES (${emailClean}, ${code}, ${expiresAt})
      `;
    } catch (dbError) {
      console.warn('DB insert to otps failed, using in-memory log fallback:', dbError.message);
    }

    // Always log OTP to server console for local testing/fallback
    console.log(`\n========================================\n[OTP VERIFICATION]\nEmail: ${emailClean}\nCode: ${code}\n========================================\n`);

    // Send via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (resendApiKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: `E-Cell IIT Kharagpur <${fromEmail}>`,
            to: [emailClean],
            subject: `${code} is your EAD-LSM Verification Code`,
            html: `<p>Your verification code is <strong>${code}</strong>. It will expire in 10 minutes.</p>`
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error('Resend API error:', errText);
        }
      } catch (emailErr) {
        console.error('Failed to send email via Resend:', emailErr.message);
      }
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
