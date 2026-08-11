'use client';
import { motion } from 'framer-motion';
import DomeGallery from './DomeGallery';

/* The dome's overlay blur color — must match page bg #F4F7F9 */
const BG = '#F4F7F9';

export default function Gallery() {
  return (
    <div
      id="gallery"
      className="relative flex flex-col overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex flex-col items-center text-center pt-[8vh] pb-6 px-6"
      >
        <h2
          className="font-black leading-[1.04] tracking-[-0.02em] mb-5 font-montserrat"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
            color: '#0F172A',
            maxWidth: '700px',
          }}
        >
          Moments That Built<br />
          <span style={{ color: '#64748B' }}>the Ecosystem</span>
        </h2>

        <p
          className="text-[0.9rem] font-montserrat font-medium leading-relaxed"
          style={{ color: '#475569', maxWidth: '540px' }}
        >
          From packed auditoriums and startup pitches to networking sessions
          and founder interactions — explore the journey of EAD &amp; LSM across India.
        </p>
      </motion.div>

      {/* ── 3D Gallery — hero element ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className="relative w-full"
        style={{ height: '80vh', minHeight: '520px' }}
      >
        {/* Left vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{
            width: '12%',
            background: `linear-gradient(to right, ${BG}, transparent)`,
          }}
        />
        {/* Right vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{
            width: '12%',
            background: `linear-gradient(to left, ${BG}, transparent)`,
          }}
        />
        {/* Top vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{
            height: '15%',
            background: `linear-gradient(to bottom, ${BG}, transparent)`,
          }}
        />
        {/* Bottom vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{
            height: '20%',
            background: `linear-gradient(to top, ${BG}, transparent)`,
          }}
        />

        <DomeGallery
          fit={0.5}
          minRadius={450}
          segments={26}
          grayscale={false}
          overlayBlurColor={BG}
        />
      </motion.div>

      {/* ── City Chapters Grouping ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-[10vh] mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 shadow-[0_8px_30px_rgba(15,23,42,0.02)]">
          
          {/* EAD Chapters */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A]/70 border-b border-[#0F172A]/10 pb-2">
              EAD Chapters ({[
                'EAD-Pune', 'EAD-Chandigarh', 'EAD-Hyderabad', 'EAD-Raipur', 'EAD-Jabalpur',
                'EAD-Indore', 'EAD-Nagpur', 'EAD-Lucknow', 'EAD-Bhubaneswar', 'EAD-Ranchi',
                'EAD-Ahmedabad', 'EAD-Jamshedpur', 'EAD-Delhi(NCR)', 'EAD-Gaya', 'EAD-Kolkata',
                'EAD-Durgapur', 'EAD-Bhagalpur'
              ].length} Cities)
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'EAD-Pune', 'EAD-Chandigarh', 'EAD-Hyderabad', 'EAD-Raipur', 'EAD-Jabalpur',
                'EAD-Indore', 'EAD-Nagpur', 'EAD-Lucknow', 'EAD-Bhubaneswar', 'EAD-Ranchi',
                'EAD-Ahmedabad', 'EAD-Jamshedpur', 'EAD-Delhi(NCR)', 'EAD-Gaya', 'EAD-Kolkata',
                'EAD-Durgapur', 'EAD-Bhagalpur'
              ].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/50 text-[11px] font-semibold text-slate-700 font-montserrat shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all cursor-pointer hover:scale-[1.03]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* LSM Chapters */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A]/70 border-b border-[#0F172A]/10 pb-2">
              LSM Chapters ({[
                'LSM-Kolkata', 'LSM-Pune', 'LSM-Kanpur', 'LSM-Bengaluru', 'LSM-Delhi',
                'LSM-Jaipur', 'LSM-Indore', 'LSM-Hyderabad', 'LSM-Gurugram', 'LSM-Mumbai',
                'LSM-Nagpur', 'LSM-Surat'
              ].length} Cities)
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'LSM-Kolkata', 'LSM-Pune', 'LSM-Kanpur', 'LSM-Bengaluru', 'LSM-Delhi',
                'LSM-Jaipur', 'LSM-Indore', 'LSM-Hyderabad', 'LSM-Gurugram', 'LSM-Mumbai',
                'LSM-Nagpur', 'LSM-Surat'
              ].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/50 text-[11px] font-semibold text-slate-700 font-montserrat shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all cursor-pointer hover:scale-[1.03]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
