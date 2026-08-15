'use client';
import { useState, useEffect, useRef } from 'react';

export default function AuthModal({ isOpen, onClose, sendOTP, verifyOTP, signInWithGoogle }) {
  const [event, setEvent] = useState('EAD');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [step, setStep] = useState('email');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, []);

  if (!isOpen) return null;

  const validateEmail = (val) => {
    if (!val) return 'Email is required.';
    if (!val.includes('@') || !val.includes('.')) return 'Please enter a valid email address.';
    return '';
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(cooldownRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const events = [event];
      const res = await sendOTP(email, events);
      if (res.error) {
        setMsg({ text: res.error.message, type: 'error' });
      } else {
        setStep('otp');
        startResendCooldown();
      }
    } catch (err) {
      setMsg({ text: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      setOtpError('Enter a valid 6-digit code');
      return;
    }
    setLoading(true);
    setOtpError('');
    setMsg({ text: '', type: '' });
    try {
      const res = await verifyOTP(email, otp);
      if (res.error) {
        setOtpError(res.error.message);
      } else {
        setMsg({ text: 'Successfully authenticated!', type: 'success' });
        // Close modal on success
        setTimeout(() => {
          onClose();
          // Reset state
          setStep('email');
          setEmail('');
          setOtp('');
          setMsg({ text: '', type: '' });
        }, 1000);
      }
    } catch (err) {
      setOtpError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const res = await sendOTP(email, [event]);
      if (res.error) {
        setMsg({ text: res.error.message, type: 'error' });
      } else {
        setMsg({ text: 'Verification code resent!', type: 'success' });
        startResendCooldown();
      }
    } catch {
      setMsg({ text: 'Failed to resend. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "flex items-center gap-2.5 cursor-pointer text-[0.9rem] font-bold text-gray-800";
  const inputRadioClass = "w-[18px] h-[18px] cursor-pointer accent-blue-600";

  return (
    <div id="auth-modal" className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-10 md:p-12 w-full max-w-[420px] relative shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
        <button 
          className="absolute top-4 right-5 bg-none border-none text-2xl text-gray-400 cursor-pointer hover:text-gray-700 font-montserrat" 
          onClick={onClose}
        >
          &times;
        </button>

        {step === 'email' ? (
          <div>
            <h2 className="font-montserrat text-[1.1rem] sm:text-[1.3rem] font-extrabold text-gray-900 m-0 mb-2 uppercase tracking-widest">Register / Login</h2>
            <p className="font-montserrat text-gray-500 text-[0.85rem] m-0 mb-5">Select your event and continue</p>

            <div className="mb-5 flex gap-6 justify-center bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              {['EAD', 'LSM'].map((evt) => (
                <label key={evt} className={labelClass}>
                  <input 
                    type="radio" 
                    checked={event === evt} 
                    onChange={() => setEvent(evt)} 
                    className={inputRadioClass} 
                  />
                  {evt}
                </label>
              ))}
            </div>

            {event === 'LSM' && (
              <div className="mb-4 p-3 bg-purple-50 border border-purple-100 rounded-xl">
                <p className="text-[0.78rem] text-purple-700 font-medium leading-relaxed">
                  Registering for LSM automatically includes you in the pitching process.
                </p>
              </div>
            )}

            <div className="mb-0">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }} 
                onBlur={handleEmailBlur}
                suppressHydrationWarning
                className={`w-full py-3.5 px-4 border-2 rounded-xl text-[0.95rem] font-montserrat outline-none transition-colors duration-200 text-gray-900 bg-gray-50 focus:bg-white placeholder-gray-400 ${
                  emailError ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-[0.75rem] mt-1.5 font-medium">{emailError}</p>
              )}
            </div>

            <button 
              className="w-full p-3.5 bg-gray-900 text-white border-none rounded-xl font-montserrat font-bold text-[0.85rem] tracking-wider uppercase cursor-pointer mt-3 transition-colors duration-200 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed" 
              disabled={loading} 
              onClick={handleSendOTP}
              suppressHydrationWarning
            >
              {loading ? 'Sending…' : 'Send OTP ➔'}
            </button>

            <div className="flex items-center my-5 gap-3 text-gray-400 text-[0.75rem] font-montserrat uppercase tracking-[0.15em] before:content-[''] before:flex-1 before:h-[1px] before:bg-gray-200 after:content-[''] after:flex-1 after:h-[1px] after:bg-gray-200">or</div>

            <button 
              className="w-full p-[13px] bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-montserrat font-semibold text-[0.85rem] cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50" 
              onClick={() => signInWithGoogle([event])}
              suppressHydrationWarning
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className={`font-montserrat text-[0.8rem] mt-3 text-center min-h-[20px] ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full bg-purple-100 animate-ping opacity-40" />
              <div className="relative w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>

            <h2 className="font-montserrat text-[1.1rem] sm:text-[1.3rem] font-extrabold text-gray-900 m-0 mb-2 uppercase tracking-widest">Verify Email</h2>
            <p className="font-montserrat text-gray-500 text-[0.85rem] m-0 mb-1">Enter the 6-digit code sent to</p>
            <p className="font-montserrat font-bold text-gray-900 text-[0.9rem] mb-5 break-all">{email}</p>

            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-3.5 mb-4">
              <input
                type="text"
                placeholder="6-digit code"
                maxLength={6}
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setOtpError(''); }}
                suppressHydrationWarning
                className={`w-full py-3.5 px-4 border-2 rounded-xl text-center text-lg font-mono font-bold tracking-[0.25em] outline-none bg-gray-50 focus:bg-white transition-colors duration-200 text-gray-900 placeholder-gray-400 ${
                  otpError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              />
              {otpError && (
                <p className="text-red-500 text-[0.75rem] font-medium text-left px-1">{otpError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full p-3.5 bg-gray-900 text-white border-none rounded-xl font-montserrat font-bold text-[0.85rem] tracking-wider uppercase cursor-pointer transition-colors duration-200 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                suppressHydrationWarning
              >
                {loading ? 'Verifying…' : 'Verify & Login ➔'}
              </button>
            </form>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0 || loading}
                className="w-full p-[11px] text-[0.8rem] rounded-xl font-montserrat font-semibold transition-all duration-200 border-2 cursor-pointer disabled:cursor-default"
                style={{
                  background: resendCooldown > 0 ? '#f3f4f6' : '#ffffff',
                  color: resendCooldown > 0 ? '#9ca3af' : '#374151',
                  borderColor: resendCooldown > 0 ? '#e5e7eb' : '#d1d5db',
                }}
                suppressHydrationWarning
              >
                {loading ? 'Sending…' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>

              <button 
                className="w-full p-[13px] bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-montserrat font-semibold text-[0.85rem] cursor-pointer flex items-center justify-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50" 
                onClick={onClose}
              >
                Close Window
              </button>
            </div>

            {msg.text && (
              <div className={`font-montserrat text-[0.8rem] mt-3 text-center ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
