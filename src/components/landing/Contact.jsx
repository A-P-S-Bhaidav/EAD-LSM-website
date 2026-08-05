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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1200));
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

          <div className="relative z-20 p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* ── LEFT COLUMN: Narrative & Info Grid ── */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-12">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-[#0F172A] font-montserrat mb-6">
                  You Have Questions,<br />
                  <span className="text-[#0F172A]/80">We Have Answers</span>
                </h2>

                <p className="text-[#0F172A]/85 font-montserrat text-sm md:text-base font-medium leading-relaxed max-w-lg">
                  Discover opportunities with EAD &amp; LSM — thoughtfully designed to connect student innovators with VCs, angel investors, and mentors across India.
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
                    E-Cell, IIT Kharagpur<br />
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

                {/* Email */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A]/70 mb-2">
                    Email
                  </h4>
                  <a href="mailto:ecell@iitkgp.ac.in" className="text-sm font-bold text-[#0F172A] hover:underline transition-all">
                    ecell@iitkgp.ac.in
                  </a>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A]/70 mb-2">
                    Contact
                  </h4>
                  <p className="text-sm font-bold text-[#0F172A]">
                    +91 98765 43210
                  </p>
                </div>

              </div>
            </div>

            {/* ── RIGHT COLUMN: Floating White Form Card ── */}
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
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all"
                    />
                  </div>

                  {/* City & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                      suppressHydrationWarning
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all"
                  />

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
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Message..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F172A] outline-none transition-all resize-none min-h-[110px]"
                  />

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
