import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { saveCachedOtp } from '@/lib/otp-store';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Store in filesystem-based fallback cache
    saveCachedOtp(email, code);

    // Store in public.otps table
    const { error: dbError } = await supabase
      .from('otps')
      .insert({ email, code, expires_at: expiresAt });

    if (dbError) {
      console.warn('DB insert to public.otps failed, using in-memory log fallback:', dbError.message);
    }

    // Always log OTP to server console for local testing/fallback
    console.log(`\n========================================\n[OTP VERIFICATION]\nEmail: ${email}\nCode: ${code}\n========================================\n`);

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
            to: [email],
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
