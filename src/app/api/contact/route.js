import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { firstName, lastName, city, phone, email, inquiryType, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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
            from: `E-Cell Contact Form <${fromEmail}>`,
            to: ['admin@ecell-iitkgp.in'],
            subject: `New Inquiry: ${inquiryType} from ${firstName} ${lastName}`,
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
  <h2 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 20px;">New Contact Form Inquiry</h2>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 30%;">Name:</td>
      <td style="padding: 8px 0; color: #0f172a;">${firstName} ${lastName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
      <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td>
      <td style="padding: 8px 0; color: #0f172a;">${phone || 'N/A'}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-weight: bold;">City:</td>
      <td style="padding: 8px 0; color: #0f172a;">${city || 'N/A'}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Inquiry Type:</td>
      <td style="padding: 8px 0; font-weight: bold; color: #2563eb;">${inquiryType}</td>
    </tr>
  </table>
  <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
    <h3 style="margin-top: 0; color: #0f172a; font-size: 14px;">Message:</h3>
    <p style="color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
  </div>
</div>
            `
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error('Resend contact API error:', errText);
          return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }
      } catch (emailErr) {
        console.error('Failed to send contact email via Resend:', emailErr.message);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
      }
    } else {
      console.warn('RESEND_API_KEY is missing, logging contact inquiry to console:');
      console.log({ firstName, lastName, city, phone, email, inquiryType, message });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
