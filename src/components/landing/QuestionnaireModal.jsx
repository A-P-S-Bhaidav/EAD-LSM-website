'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionnaireModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    interest: (typeof window !== 'undefined' && sessionStorage.getItem('ead_lsm_interest')) || 'Both',
    experience: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = 'Enter a valid email';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  const inputClass = (field) =>
    `w-full py-2.5 px-3.5 bg-gray-50 border-2 rounded-xl text-[0.9rem] text-gray-800 outline-none transition-all duration-200 focus:bg-white placeholder:text-gray-400 ${
      errors[field] ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
    }`;
  const labelClass = "block text-[0.7rem] font-bold tracking-[0.12em] uppercase text-gray-500 mb-1.5";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99997] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-[440px] mx-0 sm:mx-4 overflow-hidden max-h-[92dvh] flex flex-col"
        >
          {/* Top gradient accent */}
          <div className="h-1 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />

          {/* Step progress bar */}
          <div className="px-6 pt-5 pb-0 flex-shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1.5 rounded-full bg-blue-500" />
              <div className="flex-1 h-1.5 rounded-full bg-gray-200" />
            </div>
            <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-gray-400 mt-1">Step 1 of 2 — Your Profile</p>
          </div>

          {/* Scrollable form body */}
          <div className="overflow-y-auto flex-1 px-5 sm:px-8 pt-4 pb-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all z-10"
            >
              ×
            </button>

            <div className="mb-5">
              <h2 className="text-lg font-black text-gray-900 tracking-tight mb-1">Quick Questionnaire</h2>
              <p className="text-gray-500 text-[0.82rem]">Help us personalise your EAD-LSM experience</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-500 text-[0.72rem] mt-1 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-500 text-[0.72rem] mt-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>College / Institution <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span></label>
                <input
                  type="text"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  placeholder="Your college or institution"
                  className={inputClass('college')}
                />
              </div>

              <div>
                <label className={labelClass}>Interest</label>
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  className={inputClass('interest')}
                >
                  <option value="EAD">EAD — Entrepreneurship Awareness Drive</option>
                  <option value="LSM">LSM — Local Startups Meet</option>
                  <option value="Both">Both EAD &amp; LSM</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Prior Entrepreneurship Experience <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span></label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className={inputClass('experience')}
                >
                  <option value="">Select one</option>
                  <option value="None">No prior experience</option>
                  <option value="Beginner">Beginner — attended workshops/events</option>
                  <option value="Intermediate">Intermediate — worked on a startup idea</option>
                  <option value="Advanced">Advanced — co-founded or founded a startup</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 py-3 rounded-xl font-bold text-[0.85rem] tracking-wider uppercase cursor-pointer transition-all duration-200 bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting…' : 'Continue →'}
              </button>
            </form>

            <button
              onClick={onClose}
              className="w-full mt-3 mb-2 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              Skip for now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
