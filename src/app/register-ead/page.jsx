'use client';
import { useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileMenu from '@/components/landing/MobileMenu';
import useLandingState from '@/hooks/useLandingState';

const GOOGLE_FORM_EAD = 'https://docs.google.com/forms/d/e/1FAIpQLSdKt9Gdi38ylyrosM1tvcxfjtBnSNtJtsUloC_0g5u_ctCRuw/viewform';

export default function RegisterEadPage() {
  const { user } = useLandingState();

  useEffect(() => {
    // Automatically redirect to Google Form for EAD Registration
    window.location.href = GOOGLE_FORM_EAD;
  }, []);

  const handleMenuToggle = () => {
    const menu = document.querySelector('[data-nav-menu]');
    if (menu) {
      const isVisible = menu.style.display === 'flex';
      if (isVisible) {
        menu.style.display = 'none';
        document.documentElement.classList.remove('menu-open');
      } else {
        menu.style.display = 'flex';
        document.documentElement.classList.add('menu-open');
      }
    }
  };

  const handleMenuClose = () => {
    const menu = document.querySelector('[data-nav-menu]');
    if (menu) {
      menu.style.display = 'none';
      document.documentElement.classList.remove('menu-open');
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F4F7F9] font-montserrat overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          alt="EAD LSM Landing Background"
          className="w-full h-full object-cover object-center"
          src="/landing_new.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F9]/70 via-[#F4F7F9]/40 to-[#F4F7F9]/80 z-10" />
      </div>

      <Navbar
        user={user}
        onAuthClick={() => { window.location.href = GOOGLE_FORM_EAD; }}
        onMenuToggle={handleMenuToggle}
        onProfileClick={() => {}}
      />
      <MobileMenu onLinkClick={handleMenuClose} />

      <main className="relative z-20 flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-[460px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-200/80 text-center my-auto">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
          <span className="text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-full text-blue-700 bg-blue-50 border border-blue-200">
            Official Registration
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-3 mb-2">
            Redirecting to EAD Registration
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
            We are redirecting you to the official Google Form for Entrepreneurship Awareness Drive (EAD) registration.
          </p>
          <a
            href={GOOGLE_FORM_EAD}
            className="w-full inline-block py-3.5 px-6 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl text-sm transition-all shadow-md no-underline"
          >
            Click here if not redirected automatically →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/*
================================================================================
BACKEND REGISTRATION LOGIC COMMENTED OUT BELOW
================================================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { queryDatabase } from '@/lib/db-client';

function OldBackendRegistration() {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [luckyNumber, setLuckyNumber] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStep('otp');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          code: otp.trim(),
          isLsm: false,
          password: form.password
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('ead_lsm_session', data.token);
        localStorage.setItem('registered_events', JSON.stringify(['EAD']));
        await queryDatabase('upsertUserRegistration', {
          email: form.email.trim().toLowerCase(),
          registeredEvents: 'EAD',
        });
        setStep('success');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
}
================================================================================
*/
