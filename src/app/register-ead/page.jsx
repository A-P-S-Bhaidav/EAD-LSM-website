'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import useLandingState from '@/hooks/useLandingState';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileMenu from '@/components/landing/MobileMenu';

export default function RegisterEadPage() {
  const router = useRouter();
  const { user, logoutUser, setProfileOpen } = useLandingState();

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

  const [step, setStep] = useState('form'); // form | otp | success
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [luckyNumber, setLuckyNumber] = useState(null);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email address is required';
    else if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = 'Enter a valid email address';
    if (!form.location.trim()) newErrors.location = 'EAD Location is required';
    return newErrors;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        setResendCooldown(60);
      } else {
        alert(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      setOtpError('Enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setOtpError('');
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          code: otp.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Successful verification -> Perform registrations
        const generatedNum = Math.floor(1000 + Math.random() * 9000);
        setLuckyNumber(generatedNum);

        const emailClean = form.email.trim().toLowerCase();

        // 1. Write user registration (EAD)
        await supabase
          .from('user_registrations')
          .upsert({ email: emailClean, registered_events: 'EAD' });

        // 2. Generate lucky draw record
        await supabase
          .from('lucky_draws')
          .insert({
            name: form.name.trim(),
            email: emailClean,
            event_name: form.location.trim(),
            lucky_number: generatedNum,
          });

        // 3. Write responses to questionnaire
        await supabase
          .from('questionnaire_responses')
          .insert({
            name: form.name.trim(),
            email: emailClean,
            college: form.college.trim(),
            interest: 'EAD',
            experience: 'None',
          });

        // 4. Save session locally
        localStorage.setItem('ead_lsm_session', data.token);
        localStorage.setItem('registered_events', JSON.stringify(['EAD']));

        setStep('success');
      } else {
        setOtpError(data.error || 'Invalid code. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setOtpError('An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full py-3 px-4 bg-gray-50 border-2 rounded-xl text-[0.95rem] text-gray-900 outline-none transition-colors duration-200 placeholder-gray-400 focus:bg-white ${
      errors[field] ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
    }`;

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
        onAuthClick={() => router.push('/register-ead')}
        onMenuToggle={handleMenuToggle}
        onProfileClick={() => router.push('/profile')}
      />
      <MobileMenu onLinkClick={handleMenuClose} />

      <main className="relative z-20 flex-grow flex items-center justify-center pt-20 pb-8 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-[430px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-200/80 relative overflow-hidden my-auto">

          {step === 'form' && (
            <div>
              <span className="text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded-full text-white bg-blue-600">
                Event Registration
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-2.5 mb-1 leading-tight">
                EAD Registration
              </h1>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                Register for the Entrepreneurship Awareness Drive roadshow.
              </p>

              <form onSubmit={handleSendOtp} className="flex flex-col gap-3.5">
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.name ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">College / Institution</label>
                  <input
                    type="text"
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    placeholder="Your college or institution"
                    className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">EAD Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Durgapur, Kolkata..."
                    className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.location ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.location}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1.5 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors disabled:bg-gray-300 shadow-sm"
                >
                  {loading ? 'Sending OTP...' : 'Send Verification Code ➔'}
                </button>
              </form>
            </div>
          )}

          {step === 'otp' && (
            <div className="text-center">
              <div className="relative w-14 h-14 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-40" />
                <div className="relative w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-xl font-black text-gray-900 tracking-tight mb-1">Verify Your Email</h2>
              <p className="text-gray-500 text-xs mb-1">Enter the 6-digit code sent to</p>
              <p className="font-bold text-gray-900 mb-4 text-sm break-all">{form.email}</p>

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3.5">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value); setOtpError(''); }}
                  placeholder="000000"
                  className={`w-full py-2.5 px-3 border-2 rounded-xl text-center font-bold tracking-[0.5em] text-lg text-gray-900 bg-gray-50 outline-none transition-colors placeholder-gray-300 focus:bg-white focus:border-blue-500 ${
                    otpError ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {otpError && <p className="text-red-500 text-xs font-semibold">{otpError}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 py-3 bg-gray-900 text-white rounded-xl font-bold tracking-wider uppercase cursor-pointer hover:bg-gray-700 transition-colors disabled:bg-gray-300"
                >
                  {loading ? 'Verifying...' : 'Verify & Register ➔'}
                </button>
              </form>

              <button
                onClick={handleSendOtp}
                disabled={resendCooldown > 0 || loading}
                className="w-full mt-3 py-2 rounded-xl font-semibold border-2 bg-transparent text-xs transition-all"
                style={{
                  color: resendCooldown > 0 ? '#9ca3af' : '#374151',
                  borderColor: resendCooldown > 0 ? '#e5e7eb' : '#d1d5db',
                  cursor: resendCooldown > 0 ? 'default' : 'pointer',
                }}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-1">Registration Complete!</h2>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                You have successfully registered for **EAD Drive** at **{form.location}**.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 mb-5">
                <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">Your Lucky Draw Number</p>
                <p className="text-2xl font-black text-slate-800 tracking-wider">{luckyNumber}</p>
              </div>

              <button
                onClick={() => router.push('/profile')}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold tracking-wider uppercase cursor-pointer hover:bg-gray-700 transition-colors"
              >
                Go to Profile ➔
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Clean low-profile footer */}
      <footer className="relative z-20 pb-4 text-center">
        <p className="text-[10px] text-gray-500 font-semibold tracking-wider">
          © 2026 Entrepreneurship Cell, IIT Kharagpur. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
