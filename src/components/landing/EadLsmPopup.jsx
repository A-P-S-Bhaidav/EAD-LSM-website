'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EadLsmPopup({ isOpen, onSelect, onClose }) {
  const [hovered, setHovered] = useState(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-[520px] mx-4 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)' }} />

          <div className="p-8 md:p-10">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-gray-400 mb-3">
                Welcome to
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-3">
                EAD–LSM Portal
              </h2>
              <p className="text-gray-500 text-[0.9rem] leading-relaxed max-w-sm mx-auto">
                What are you interested in? This helps us personalize your experience.
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* EAD Option */}
              <motion.button
                onHoverStart={() => setHovered('EAD')}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect('EAD')}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left"
                style={{
                  borderColor: hovered === 'EAD' ? '#2563eb' : '#e5e7eb',
                  background: hovered === 'EAD' ? '#eff6ff' : '#ffffff',
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">EAD</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Entrepreneurship Awareness Drive</p>
                </div>
              </motion.button>

              {/* LSM Option */}
              <motion.button
                onHoverStart={() => setHovered('LSM')}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect('LSM')}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left"
                style={{
                  borderColor: hovered === 'LSM' ? '#7c3aed' : '#e5e7eb',
                  background: hovered === 'LSM' ? '#f5f3ff' : '#ffffff',
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">LSM</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Local Startups Meet</p>
                </div>
              </motion.button>
            </div>

            {/* Both option */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect('Both')}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-gray-600 border-2 border-gray-200 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-50 transition-all cursor-pointer"
            >
              I&apos;m interested in both →
            </motion.button>

            <p className="text-center text-[0.7rem] text-gray-400 mt-4">
              You can always change this later
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
