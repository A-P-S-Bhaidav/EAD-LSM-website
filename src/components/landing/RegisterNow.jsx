'use client';
import { motion } from 'framer-motion';

export default function RegisterNow({ onRegisterClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: '#f0f1f5' }}
    >
      <div className="u-container">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #2563eb, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

            <div className="relative z-10 p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-blue-300/60 mb-4">
                  Start Your Journey
                </p>
                <h2
                  className="font-black text-white tracking-tight leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
                >
                  Ready to Shape the<br />
                  <span className="text-blue-400">Future of Startups?</span>
                </h2>
                <p className="text-gray-400 text-[0.9rem] leading-relaxed max-w-md mb-8">
                  Join thousands of students, founders, and innovators who&apos;ve kickstarted their entrepreneurial journey through EAD & LSM.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                  {[
                    { value: '30+', label: 'Cities' },
                    { value: '30K+', label: 'Students' },
                    { value: '₹10Cr+', label: 'Funding' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <p className="text-xl font-black text-white">{stat.value}</p>
                      <p className="text-[0.7rem] text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 16px 40px rgba(37, 99, 235, 0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onRegisterClick}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[0.9rem] tracking-wide cursor-pointer transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    color: '#ffffff',
                    border: 'none',
                  }}
                >
                  Register Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              </div>

              {/* Right visual — card stack */}
              <div className="flex-shrink-0 hidden md:flex flex-col gap-4 w-[260px]">
                {[
                  { icon: '🎯', title: 'EAD Events', desc: 'Workshops, keynotes & pitch battles' },
                  { icon: '🚀', title: 'LSM Sessions', desc: 'Investor meets & startup showcases' },
                  { icon: '🏆', title: 'Lucky Draw', desc: 'Exciting prizes for participants' },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{card.title}</p>
                      <p className="text-gray-400 text-xs">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
