'use client';
import { motion } from 'framer-motion';

export default function RegisterNow({ onRegisterClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="py-24 md:py-32 relative overflow-hidden bg-[#F4F7F9]"
    >
      <div className="u-container">
        <div className="max-w-5xl mx-auto">
          {/* Card Container */}
          <div
            className="relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/90 p-10 md:p-20 shadow-[0_20px_60px_rgba(15,23,42,0.07)] text-center flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #EBF4F5 50%, #F4F7F9 100%)',
            }}
          >
            {/* Decorative Glow Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-35 pointer-events-none" style={{ background: 'radial-gradient(circle, #7DA6A9, transparent 70%)', transform: 'translate(25%, -25%)' }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-35 pointer-events-none" style={{ background: 'radial-gradient(circle, #B2D2D4, transparent 70%)', transform: 'translate(-25%, 25%)' }} />

            <div className="relative z-10 max-w-3xl flex flex-col items-center text-center">

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1] mb-6 font-montserrat">
                Ready to Shape the<br />
                <span className="text-[#5B888B]">Future of Startups?</span>
              </h2>

              {/* Description */}
              <p className="text-slate-600 font-montserrat text-base md:text-lg leading-relaxed max-w-xl mb-10 mx-auto">
                Join thousands of students, founders, and innovators who&apos;ve kickstarted their entrepreneurial journey through EAD &amp; LSM.
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-8 md:gap-16 mb-12 flex-wrap">
                {[
                  { value: '30+', label: 'Cities Reached' },
                  { value: '30K+', label: 'Students Engaged' },
                  { value: '₹10Cr+', label: 'Funding Pipeline' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl md:text-4xl font-black text-[#0F172A] font-montserrat tracking-tight mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-montserrat font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Register CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdKt9Gdi38ylyrosM1tvcxfjtBnSNtJtsUloC_0g5u_ctCRuw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-montserrat font-black text-sm md:text-base tracking-wide cursor-pointer transition-all duration-200 bg-[#0F172A] hover:bg-[#1E293B] text-white border-none shadow-xl no-underline"
                >
                  Register EAD
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a
                  href="https://docs.google.com/forms/d/1GAFX0tb9pRztjLgdCw4_650h4piK1RTvXw8GzNiZJdA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-montserrat font-black text-sm md:text-base tracking-wide cursor-pointer transition-all duration-200 bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-none shadow-xl no-underline"
                >
                  Register LSM
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
