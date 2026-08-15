'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const INQUIRY_TYPES = ['EAD Drive', 'LSM Pitch', 'General', 'Mentorship', 'Others'];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    email: '',
    inquiryType: 'General',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!form.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
    } else if (!/^[A-Za-z\s]+$/.test(form.firstName.trim())) {
      tempErrors.firstName = 'Must contain only letters';
    }

    if (!form.lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
    } else if (!/^[A-Za-z\s]+$/.test(form.lastName.trim())) {
      tempErrors.lastName = 'Must contain only letters';
    }

    if (!form.city.trim()) {
      tempErrors.city = 'City is required';
    }

    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      tempErrors.email = 'Enter a valid email address';
    }

    if (!form.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{10,14}$/.test(form.phone.trim())) {
      tempErrors.phone = 'Enter valid phone (10-14 digits)';
    }

    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      tempErrors.message = 'Must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setForm({
            firstName: '',
            lastName: '',
            city: '',
            phone: '',
            email: '',
            inquiryType: 'General',
            message: '',
          });
        }, 3000);
      } else {
        alert(data.error || 'Failed to send message. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-[#F4F7F9] font-montserrat overflow-hidden"
    >
      <div className="u-container max-w-7xl mx-auto px-6">
        
        {/* Main Card Container with 2-Combo Palette (#7DA6A9 background) */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-[#7DA6A9] border border-[#0F172A]/10 text-[#0F172A] min-h-[640px]">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle, #FFFFFF, transparent 70%)', transform: 'translate(25%, -25%)' }} />

          <div className="relative z-20 p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/*  LEFT COLUMN: Narrative & Info Grid  */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-12 animate-fade-in">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-[#0F172A] font-montserrat mb-6">
                  You Have Questions,<br />
                  <span className="text-[#0F172A]/80">We Have Answers</span>
                </h2>

                <p className="text-[#0F172A]/85 font-montserrat text-sm md:text-base font-semibold leading-relaxed max-w-lg">
                  Have questions about EAD-LSM, sponsorships, or bringing an event to your city?
                </p>
              </div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#0F172A]/20">
                
                {/* Location */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A]/70 mb-2">
                    Location
                  </h4>
                  <p className="text-sm font-bold text-[#0F172A] leading-snug">
                    Entrepreneurship Cell, IIT Kharagpur<br />
                    West Bengal 721302, India
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A]/70 mb-2">
                    Social Media
                  </h4>
                  <div className="flex flex-col gap-1 text-sm font-semibold text-[#0F172A]">
                    <a href="https://www.instagram.com/iitkgp_ecell/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Instagram</a>
                    <a href="https://www.linkedin.com/company/ecellkgp/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">LinkedIn</a>
                    <a href="https://www.facebook.com/ecell.iitkgp/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Facebook</a>
                  </div>
                </div>

                {/* Coordinator 1: Harshita */}
                <div className="sm:col-span-1 border-t border-[#0F172A]/10 pt-4 flex flex-col gap-1">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F172A]/70">
                    EAD-LSM Coordinator
                  </h4>
                  <p className="text-sm font-black text-[#0F172A] leading-none">
                    Harshita Garg
                  </p>
                  <a href="mailto:garg.harshita@ecell-iitkgp.in" className="text-xs font-bold text-[#0F172A] hover:underline transition-all mt-1">
                    garg.harshita@ecell-iitkgp.in
                  </a>
                  <a href="tel:+919991330965" className="text-xs font-bold text-[#0F172A] hover:underline transition-all">
                    +91 99913 30965
                  </a>
                </div>

                {/* Coordinator 2: Chaitanya */}
                <div className="sm:col-span-1 border-t border-[#0F172A]/10 pt-4 flex flex-col gap-1">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F172A]/70">
                    EAD-LSM Coordinator
                  </h4>
                  <p className="text-sm font-black text-[#0F172A] leading-none">
                    Chaitanya Ghuge
                  </p>
                  <a href="mailto:ghuge.chaitanya@ecell-iitkgp.in" className="text-xs font-bold text-[#0F172A] hover:underline transition-all mt-1">
                    ghuge.chaitanya@ecell-iitkgp.in
                  </a>
                  <a href="tel:+917688842669" className="text-xs font-bold text-[#0F172A] hover:underline transition-all">
                    +91 76888 42669
                  </a>
                </div>

              </div>
            </div>

            {/*  RIGHT COLUMN: Floating White Form Card  */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl border border-slate-200/80 text-[#0F172A]"
              >
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#0F172A] mb-2 font-montserrat">
                  Tell Us What You Need
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-montserrat leading-relaxed mb-6">
                  Our team is ready to assist you with every detail. Drop an email or message.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        suppressHydrationWarning
                        className={`w-full h-12 px-4 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all ${
                          errors.firstName ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-[10px] mt-1 font-semibold text-left pl-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        suppressHydrationWarning
                        className={`w-full h-12 px-4 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all ${
                          errors.lastName ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-[10px] mt-1 font-semibold text-left pl-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* City & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        suppressHydrationWarning
                        className={`w-full h-12 px-4 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all ${
                          errors.city ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-[10px] mt-1 font-semibold text-left pl-1">{errors.city}</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        suppressHydrationWarning
                        className={`w-full h-12 px-4 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all ${
                          errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[10px] mt-1 font-semibold text-left pl-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      suppressHydrationWarning
                      className={`w-full h-12 px-4 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-1 font-semibold text-left pl-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Type of Inquiry Pill Selector */}
                  <div>
                    <label className="text-[0.725rem] font-bold uppercase tracking-wider text-slate-400 block mb-2 font-mono">
                      Type of Inquiry
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, inquiryType: t })}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            form.inquiryType === t
                              ? 'bg-[#0F172A] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Message..."
                      value={form.message}
                      onChange={handleChange}
                      suppressHydrationWarning
                      className={`w-full p-4 bg-slate-50 border rounded-2xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all resize-none min-h-[110px] ${
                        errors.message ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-[10px] mt-1 font-semibold text-left pl-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-center gap-2 text-[0.725rem] font-medium text-slate-500 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-[#0F172A] cursor-pointer" />
                    I agree to receive event updates and news from E-Cell IIT Kharagpur.
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    suppressHydrationWarning
                    className={`w-full py-3.5 rounded-2xl font-montserrat font-black text-sm tracking-wide transition-all cursor-pointer border-none mt-1 shadow-md ${
                      status === 'success'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
                    }`}
                  >
                    {status === 'loading' && 'Sending...'}
                    {status === 'success' && '✓ Message Sent Successfully'}
                    {status === 'idle' && 'Submit'}
                  </button>

                </form>
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
