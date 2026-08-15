'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { queryDatabase } from '@/lib/db-client';
import useLandingState from '@/hooks/useLandingState';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileMenu from '@/components/landing/MobileMenu';

export default function RegisterLsmPage() {
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

  const LSM_CITIES = [
    'Kolkata',
    'Pune',
    'Bengaluru',
    'Delhi',
    'Hyderabad',
    'Mumbai',
    'Indore',
    'Jaipur',
    'Nagpur',
    'Surat',
    'Bhubaneswar',
    'Kochi',
    'Visakhapatnam'
  ];

  const BUSINESS_MODELS = [
    'B2B',
    'B2C',
    'D2C',
    'B2G',
    'Social Commerce',
    'B2B2C'
  ];

  const DOMAINS = [
    'EdTech',
    'AgriTech',
    'FinTech',
    'Web3',
    'E-Commerce',
    'SaaS',
    'Healthcare & Fitness',
    'Gaming',
    'Media & Entertainment',
    'Hospitality',
    'Fashion',
    'Other'
  ];

  const STAGES = [
    'Early Stage',
    'Growth Stage',
    'Expansion Phase',
    'Pre-Seed Stage',
    'Seed Stage'
  ];

  const [step, setStep] = useState('form'); // form | otp | success
  const [formStep, setFormStep] = useState(1); // 1: founder 1, 2: co-founders, 3: startup profile
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    college: '',
    founder2Name: '',
    founder2Phone: '',
    founder2Email: '',
    founder3Name: '',
    founder3Phone: '',
    founder3Email: '',
    startupName: '',
    startupCity: '',
    lsmCity: '',
    businessModel: '',
    startupDomain: '',
    startupStage: '',
    pitchDeckUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

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

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = 'Full name is required';
      if (!form.email.trim()) newErrors.email = 'Email address is required';
      else if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = 'Enter a valid email address';
      if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!form.college.trim()) newErrors.college = 'College/Institution is required';
    } else if (currentStep === 3) {
      if (!form.startupName.trim()) newErrors.startupName = 'Startup name is required';
      if (!form.startupCity.trim()) newErrors.startupCity = 'Based city is required';
      if (!form.lsmCity) newErrors.lsmCity = 'Attending LSM city is required';
    } else if (currentStep === 4) {
      if (!form.businessModel) newErrors.businessModel = 'Business model is required';
      if (!form.startupDomain) newErrors.startupDomain = 'Startup domain is required';
      if (!form.startupStage) newErrors.startupStage = 'Startup stage is required';
      if (!form.pitchDeckUrl.trim()) newErrors.pitchDeckUrl = 'Pitch deck URL link is required';
      else if (!form.pitchDeckUrl.includes('http://') && !form.pitchDeckUrl.includes('https://')) {
        newErrors.pitchDeckUrl = 'Enter a valid URL (starting with http:// or https://)';
      }
    } else if (currentStep === 5) {
      if (!form.password) newErrors.password = 'Password is required';
      else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleNextStep = () => {
    const newErrors = validateStep(formStep);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setFormStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    const newErrors = validateStep(5);
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
          isLsm: true,
          startupName: form.startupName.trim(),
          lsmCity: form.lsmCity,
          password: form.password
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // 1. Save session locally first
        localStorage.setItem('ead_lsm_session', data.token);
        localStorage.setItem('registered_events', JSON.stringify(['LSM', 'Pitching']));

        const emailClean = form.email.trim().toLowerCase();

        // 2. Write user registration (LSM + Pitching automatic check)
        await queryDatabase('upsertUserRegistration', {
          email: emailClean,
          registeredEvents: 'LSM,Pitching',
        });

        // 3. Write responses to questionnaire (serialize detailed startup responses in the experience field)
        const experienceSummary = `Startup: ${form.startupName.trim()}
Founder 1: ${form.name.trim()} (Contact: ${form.phone.trim()}, Email: ${emailClean})
Founder 2: ${form.founder2Name.trim() || 'N/A'} (Contact: ${form.founder2Phone.trim() || 'N/A'}, Email: ${form.founder2Email.trim() || 'N/A'})
Founder 3: ${form.founder3Name.trim() || 'N/A'} (Contact: ${form.founder3Phone.trim() || 'N/A'}, Email: ${form.founder3Email.trim() || 'N/A'})
Based in: ${form.startupCity.trim()}
LSM City: ${form.lsmCity}
Business Model: ${form.businessModel}
Domain: ${form.startupDomain}
Stage: ${form.startupStage}
Pitch Deck Link: ${form.pitchDeckUrl.trim()}`;

        await queryDatabase('insertQuestionnaire', {
          name: form.name.trim(),
          email: emailClean,
          college: form.college.trim(),
          interest: 'LSM',
          experience: experienceSummary,
        });

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

  const labelClass = "block text-[0.7rem] font-bold tracking-[0.12em] uppercase text-gray-500 mb-1.5";

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
        onAuthClick={() => router.push('/register-lsm')}
        onMenuToggle={handleMenuToggle}
        onProfileClick={() => router.push('/profile')}
      />
      <MobileMenu onLinkClick={handleMenuClose} />

      <main className="relative z-20 flex-grow flex items-center justify-center pt-20 pb-8 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-[430px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-200/80 relative overflow-hidden my-auto">

          {step === 'form' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded-full text-white bg-purple-600">
                  Startup Ecosystem
                </span>
                <span className="text-[10px] font-bold font-mono text-slate-400">
                  Step {formStep} of 4
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-2.5 mb-1 leading-tight">
                LSM Registration
              </h1>
              <p className="text-gray-500 text-xs mb-5 leading-relaxed">
                Connect with investors, pitch your idea, and scale your startup.
              </p>

              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6 px-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center flex-grow last:flex-grow-0">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-all duration-300 ${
                        formStep === s 
                          ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                          : formStep > s
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      {formStep > s ? '✓' : s}
                    </div>
                    {s < 4 && (
                      <div 
                        className={`h-0.5 flex-grow mx-2 rounded transition-all duration-300 ${
                          formStep > s ? 'bg-emerald-500' : 'bg-slate-100'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3.5">
                {formStep === 1 && (
                  <div className="flex flex-col gap-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Founder 1 (Primary) Details</h3>
                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
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
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                          errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Contact Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Founder 1 phone number"
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                          errors.phone ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">College / Institution *</label>
                      <input
                        type="text"
                        name="college"
                        value={form.college}
                        onChange={handleChange}
                        placeholder="Your college or institution"
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                          errors.college ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.college && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.college}</p>}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full mt-2.5 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors shadow-sm cursor-pointer border-none"
                    >
                      Next Step ➔
                    </button>

                    <div className="text-center pt-4 border-t border-slate-100 mt-5">
                      <p className="text-xs text-slate-500 font-medium">
                        Already registered?{' '}
                        <Link
                          href="/lsm/login"
                          className="text-purple-600 hover:text-purple-700 font-bold underline"
                        >
                          Log In here
                        </Link>
                      </p>
                    </div>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="flex flex-col gap-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Co-Founder Details (Optional)</h3>
                    
                    {/* Founder 2 */}
                    <div className="border border-slate-100 rounded-2xl p-3 bg-slate-50/50 flex flex-col gap-2.5">
                      <span className="text-[10px] font-black uppercase text-slate-400">Founder 2</span>
                      <input
                        type="text"
                        name="founder2Name"
                        value={form.founder2Name}
                        onChange={handleChange}
                        placeholder="Name of founder 2"
                        className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
                      />
                      <input
                        type="tel"
                        name="founder2Phone"
                        value={form.founder2Phone}
                        onChange={handleChange}
                        placeholder="Contact number of founder 2"
                        className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
                      />
                      <input
                        type="email"
                        name="founder2Email"
                        value={form.founder2Email}
                        onChange={handleChange}
                        placeholder="Email of founder 2"
                        className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
                      />
                    </div>

                    {/* Founder 3 */}
                    <div className="border border-slate-100 rounded-2xl p-3 bg-slate-50/50 flex flex-col gap-2.5">
                      <span className="text-[10px] font-black uppercase text-slate-400">Founder 3</span>
                      <input
                        type="text"
                        name="founder3Name"
                        value={form.founder3Name}
                        onChange={handleChange}
                        placeholder="Name of founder 3"
                        className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
                      />
                      <input
                        type="tel"
                        name="founder3Phone"
                        value={form.founder3Phone}
                        onChange={handleChange}
                        placeholder="Contact number of founder 3"
                        className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
                      />
                      <input
                        type="email"
                        name="founder3Email"
                        value={form.founder3Email}
                        onChange={handleChange}
                        placeholder="Email of founder 3"
                        className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="flex gap-3 mt-2.5">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-1/2 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer bg-white"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer border-none"
                      >
                        Next ➔
                      </button>
                    </div>
                  </div>
                )}

                {formStep === 3 && (
                  <div className="flex flex-col gap-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Startup Info</h3>
                    
                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Startup Name *</label>
                      <input
                        type="text"
                        name="startupName"
                        value={form.startupName}
                        onChange={handleChange}
                        placeholder="What is the name of your startup?"
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                          errors.startupName ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.startupName && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.startupName}</p>}
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Startup Based City *</label>
                      <input
                        type="text"
                        name="startupCity"
                        value={form.startupCity}
                        onChange={handleChange}
                        placeholder="Which city are you based out of?"
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                          errors.startupCity ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.startupCity && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.startupCity}</p>}
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Attending LSM Location *</label>
                      <select
                        name="lsmCity"
                        value={form.lsmCity}
                        onChange={handleChange}
                        className={`w-full py-2.5 px-3 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-purple-500 ${
                          errors.lsmCity ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select LSM city to attend</option>
                        {LSM_CITIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.lsmCity && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.lsmCity}</p>}
                    </div>

                    <div className="flex gap-3 mt-2.5">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-1/3 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer bg-white"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-2/3 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer border-none"
                      >
                        Next ➔
                      </button>
                    </div>
                  </div>
                )}

                {formStep === 4 && (
                  <div className="flex flex-col gap-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Startup Profile</h3>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Business Model *</label>
                      <select
                        name="businessModel"
                        value={form.businessModel}
                        onChange={handleChange}
                        className={`w-full py-2.5 px-3 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-purple-500 ${
                          errors.businessModel ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select business model</option>
                        {BUSINESS_MODELS.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      {errors.businessModel && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.businessModel}</p>}
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Startup Domain *</label>
                      <select
                        name="startupDomain"
                        value={form.startupDomain}
                        onChange={handleChange}
                        className={`w-full py-2.5 px-3 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-purple-500 ${
                          errors.startupDomain ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select industry domain</option>
                        {DOMAINS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      {errors.startupDomain && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.startupDomain}</p>}
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Startup Stage *</label>
                      <select
                        name="startupStage"
                        value={form.startupStage}
                        onChange={handleChange}
                        className={`w-full py-2.5 px-3 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-purple-500 ${
                          errors.startupStage ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select current stage</option>
                        {STAGES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.startupStage && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.startupStage}</p>}
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Pitch Deck Link *</label>
                      <input
                        type="url"
                        name="pitchDeckUrl"
                        value={form.pitchDeckUrl}
                        onChange={handleChange}
                        placeholder="Google Drive, DocSend link, etc."
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                          errors.pitchDeckUrl ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.pitchDeckUrl && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.pitchDeckUrl}</p>}
                    </div>

                    <div className="flex gap-3 mt-2.5">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-1/3 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer bg-white"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-2/3 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer border-none"
                      >
                        Next ➔
                      </button>
                    </div>
                  </div>
                )}

                {formStep === 5 && (
                  <div className="flex flex-col gap-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Account Security</h3>
                    
                    <div>
                      <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Choose Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create a secure password (min. 6 chars)"
                        className={`w-full py-2.5 px-3.5 bg-slate-50 border rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                          errors.password ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.password && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.password}</p>}
                    </div>

                    <div className="flex gap-3 mt-2.5">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-1/3 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer bg-white"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="w-2/3 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors cursor-pointer border-none disabled:bg-slate-300"
                      >
                        {loading ? 'Sending OTP...' : 'Send OTP ➔'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="text-center">
              <div className="relative w-14 h-14 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-purple-100 animate-ping opacity-40" />
                <div className="relative w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2}>
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
                  className={`w-full py-2.5 px-3 border-2 rounded-xl text-center font-bold tracking-[0.5em] text-lg text-gray-900 bg-gray-50 outline-none transition-colors placeholder-gray-300 focus:bg-white focus:border-purple-500 ${
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
              <p className="text-gray-500 text-xs mb-5 leading-relaxed">
                You have successfully registered for **LSM Summit** &amp; **Pitching**.
              </p>

              <button
                onClick={() => router.push('/profile')}
                className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold tracking-wider uppercase cursor-pointer hover:bg-gray-700 transition-colors"
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
