import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getCachedOtp, deleteCachedOtp } from '@/lib/otp-store';

export async function POST(req) {
  try {
    const { email, code, isLsm, startupName, lsmCity, password } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const emailClean = email.trim().toLowerCase();
    let isCodeValid = false;
    let isCodeExpired = false;

    // 1. Try to verify from filesystem fallback cache first
    const cachedOtp = getCachedOtp(emailClean);
    if (cachedOtp) {
      isCodeExpired = new Date(cachedOtp.expiresAt).getTime() < Date.now();
      if (!isCodeExpired && cachedOtp.code === code.trim()) {
        isCodeValid = true;
        // Clean up fallback cache
        deleteCachedOtp(emailClean);
      }
    }

    // 2. If memory verification didn't succeed, fallback to querying Supabase
    if (!isCodeValid) {
      const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('email', emailClean)
        .order('created_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        const latestOtp = data[0];
        isCodeExpired = new Date(latestOtp.expires_at).getTime() < Date.now();
        if (!isCodeExpired && latestOtp.code === code.trim()) {
          isCodeValid = true;
          // Clean up database OTP asynchronously
          supabase
            .from('otps')
            .delete()
            .eq('email', emailClean)
            .then(() => {})
            .catch(() => {});
        }
      }
    }

    if (isCodeExpired) {
      return NextResponse.json({ error: 'Verification code expired' }, { status: 400 });
    }

    if (!isCodeValid) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // Natively sign up the user in Supabase auth if a password was set
    if (password) {
      try {
        const eventsList = isLsm ? ['LSM', 'Pitching'] : ['EAD'];
        await supabase.auth.signUp({
          email: emailClean,
          password: password,
          options: {
            data: {
              registered_events: eventsList
            }
          }
        });
      } catch (authErr) {
        console.warn('Supabase auth sign up warning:', authErr.message);
      }
    }

    // Send detailed welcome email if LSM registration confirmed and Resend is configured
    if (isLsm && process.env.RESEND_API_KEY) {
      try {
        const resendApiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        const displayStartup = startupName || 'Your Startup';
        const displayCity = lsmCity || 'Selected City';

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: `E-Cell IIT Kharagpur <${fromEmail}>`,
            to: [emailClean],
            subject: 'LSM Registration Confirmed - Welcome Founder!',
            html: `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
  <div style="text-align: center; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9;">
    <h2 style="color: #6b21a8; font-weight: 900; letter-spacing: -0.025em; margin: 0; font-size: 24px;">LOCAL STARTUPS MEET</h2>
    <p style="color: #64748b; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em;">Registration Confirmed</p>
  </div>
  
  <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
    Dear Founder,
  </p>
  <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
    Congratulations! Your registration for <strong>Local Startups Meet (LSM)</strong> has been successfully received and confirmed.
  </p>

  <div style="background-color: #faf5ff; border: 1px solid #f3e8ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
    <h3 style="color: #581c87; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0; margin-bottom: 12px;">Registration Summary</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 6px 0; color: #6b21a8; font-weight: bold; width: 40%;">Startup Name:</td>
        <td style="padding: 6px 0; color: #334155;">${displayStartup}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Attending LSM:</td>
        <td style="padding: 6px 0; color: #334155;">${displayCity}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #6b21a8; font-weight: bold;">Pitching Track:</td>
        <td style="padding: 6px 0; color: #16a34a; font-weight: bold;">Automatic Check-In Confirmed</td>
      </tr>
    </table>
  </div>

  <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
    <strong>Next Steps:</strong>
  </p>
  <ul style="color: #334155; font-size: 14px; line-height: 1.6; padding-left: 20px; margin-bottom: 24px;">
    <li style="margin-bottom: 8px;">Log in to your Founder Profile Dashboard to review your digital Startup Passport.</li>
    <li style="margin-bottom: 8px;">Ensure your Pitch Deck link is up-to-date in your profile so evaluating investors have the latest iteration.</li>
    <li style="margin-bottom: 8px;">Our regional team will contact you shortly with the exact schedule, venue details, and pitch slots for ${displayCity}.</li>
  </ul>

  <div style="text-align: center; padding-top: 24px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px; font-weight: 600;">
    © 2026 Entrepreneurship Cell, IIT Kharagpur. All rights reserved.
  </div>
</div>
            `
          })
        });
      } catch (err) {
        console.error('Failed to send LSM welcome email via Resend:', err.message);
      }
    }

    // Create session token (keep it simple: base64 encoded JSON)
    const sessionToken = btoa(JSON.stringify({ email, verified: true, time: Date.now() }));

    return NextResponse.json({ success: true, token: sessionToken });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
