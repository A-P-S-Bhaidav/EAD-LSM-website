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
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  const inputClass = "w-full py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-[0.9rem] text-gray-800 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white placeholder:text-gray-400";
  const labelClass = "block text-[0.7rem] font-bold tracking-[0.12em] uppercase text-gray-500 mb-1.5";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99997] flex items-center justify-center bg-black/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[440px] mx-4 overflow-hidden"
        >
          {/* Top accent */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />

          <div className="p-8 md:p-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              ×
            </button>

            <div className="text-center mb-8">
              <h2 className="text-xl font-black text-gray-900 tracking-tight mb-2">Quick Questionnaire</h2>
              <p className="text-gray-500 text-[0.85rem]">Help us get to know you better</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>College / Institution</label>
                <input
                  type="text"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  placeholder="Your college or institution"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Interest</label>
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="EAD">EAD — Entrepreneurship Awareness Drive</option>
                  <option value="LSM">LSM — Local Startups Meet</option>
                  <option value="Both">Both EAD & LSM</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Prior Entrepreneurship Experience</label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className={inputClass}
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
                className="w-full mt-2 py-3.5 rounded-xl font-bold text-[0.85rem] tracking-wider uppercase cursor-pointer transition-all duration-200 bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Continue →'}
              </button>
            </form>

            <button
              onClick={onClose}
              className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              Skip for now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
