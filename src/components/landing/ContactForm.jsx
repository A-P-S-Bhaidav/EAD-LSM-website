'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FloatingField({ id, name, label, type = 'text', value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete="off"
        suppressHydrationWarning
        whileFocus={{ scale: 1.002 }}
        transition={{ duration: 0.2 }}
        className={`
          peer w-full h-[56px] px-5 pt-6 pb-2
          bg-white text-gray-900 text-[0.95rem] font-medium
          rounded-xl outline-none
          border transition-all duration-200
          placeholder:text-transparent
          ${focused
            ? 'border-blue-500 shadow-[0_0_0_1px_#3b82f6,0_0_16px_rgba(59,130,246,0.1)]'
            : 'border-gray-200 hover:border-gray-300'}
        `}
      />
      <motion.label
        htmlFor={id}
        animate={{ 
          y: active ? -10 : 0, 
          scale: active ? 0.8 : 1, 
          color: active ? (focused ? '#3b82f6' : '#6b7280') : '#9ca3af' 
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-5 top-[18px] pointer-events-none text-[0.9rem] font-medium"
      >
        {label}
      </motion.label>
    </div>
  );
}

function FloatingTextarea({ id, name, label, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={4}
        suppressHydrationWarning
        whileFocus={{ scale: 1.002 }}
        transition={{ duration: 0.2 }}
        className={`
          peer w-full px-5 pt-8 pb-3
          bg-white text-gray-900 text-[0.95rem] font-medium leading-[1.6]
          rounded-xl outline-none resize-none
          border transition-all duration-200 min-h-[140px]
          placeholder:text-transparent
          ${focused
            ? 'border-blue-500 shadow-[0_0_0_1px_#3b82f6,0_0_16px_rgba(59,130,246,0.1)]'
            : 'border-gray-200 hover:border-gray-300'}
        `}
      />
      <motion.label
        htmlFor={id}
        animate={{ 
          y: active ? -8 : 0, 
          scale: active ? 0.8 : 1, 
          color: active ? (focused ? '#3b82f6' : '#6b7280') : '#9ca3af' 
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-5 top-5 pointer-events-none text-[0.9rem] font-medium"
      >
        {label}
      </motion.label>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', queryType: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [arrowHovered, setArrowHovered] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', phone: '', queryType: '', message: '' });
    }, 3000);
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } 
    }),
  };

  return (
    <motion.div
      className="flex flex-col gap-6 w-full bg-white rounded-2xl p-8 border border-gray-200"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Section label */}
      <motion.div custom={0} variants={fieldVariants}>
        <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">
          Send a Message
        </p>
        <p className="text-gray-500 text-[0.85rem]">Fill out the form below and we&apos;ll get back to you soon.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Row: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div custom={1} variants={fieldVariants}>
            <FloatingField 
              id="contact-name" 
              name="name" 
              label="Full Name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </motion.div>
          <motion.div custom={2} variants={fieldVariants}>
            <FloatingField 
              id="contact-email" 
              name="email" 
              label="Email Address" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </motion.div>
        </div>

        {/* Row: Phone + Query Type dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div custom={3} variants={fieldVariants}>
            <FloatingField 
              id="contact-phone" 
              name="phone" 
              label="Phone Number (Optional)" 
              type="tel" 
              value={form.phone} 
              onChange={handleChange} 
            />
          </motion.div>
          <motion.div custom={4} variants={fieldVariants}>
            <select
              id="contact-queryType"
              name="queryType"
              value={form.queryType}
              onChange={handleChange}
              required
              suppressHydrationWarning
              className="w-full h-[56px] px-5 bg-white text-gray-900 text-[0.9rem] font-medium rounded-xl outline-none border border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:shadow-[0_0_0_1px_#3b82f6,0_0_16px_rgba(59,130,246,0.1)] transition-all duration-200 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
              }}
            >
              <option value="" disabled>Query related to...</option>
              <option value="EAD">EAD — Entrepreneurship Awareness Drive</option>
              <option value="LSM">LSM — Local Startups Meet</option>
              <option value="General">General Inquiry</option>
            </select>
          </motion.div>
        </div>

        {/* Message */}
        <motion.div custom={5} variants={fieldVariants}>
          <FloatingTextarea 
            id="contact-message" 
            name="message" 
            label="Your Message" 
            value={form.message} 
            onChange={handleChange} 
            required 
          />
        </motion.div>

        {/* Submit */}
        <motion.div custom={6} variants={fieldVariants}>
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            onHoverStart={() => setArrowHovered(true)}
            onHoverEnd={() => setArrowHovered(false)}
            suppressHydrationWarning
            whileHover={{ 
              y: -2, 
              boxShadow: '0 12px 40px rgba(37, 99, 235, 0.2)' 
            }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={`
              relative w-full h-[56px] rounded-xl font-bold text-[0.9rem] tracking-[0.02em]
              flex items-center justify-center gap-3 overflow-hidden
              transition-all duration-200 border-none
              ${status === 'success'
                ? 'bg-gray-100 text-gray-400 cursor-default'
                : 'bg-gray-900 text-white cursor-pointer hover:bg-gray-700'}
            `}
          >
            <AnimatePresence mode="wait">
              {status === 'loading' && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  Sending…
                </motion.span>
              )}
              {status === 'success' && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 text-gray-500"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Message Sent Successfully
                </motion.span>
              )}
              {status === 'idle' && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5"
                >
                  Send Message
                  <motion.span
                    animate={{ x: arrowHovered ? 4 : 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="inline-block text-lg"
                  >
                    →
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Trust elements */}
        <motion.div 
          custom={7} 
          variants={fieldVariants}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-400 text-[0.8rem] pt-1"
        >
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Response within 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Your information is kept private</span>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}
