'use client';
import { motion } from 'framer-motion';
import DomeGallery from './DomeGallery';

/* The dome's overlay blur color — must match the page bg so edges dissolve cleanly */
const BG = '#f4f5f7';

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
        <p
          className="text-[0.62rem] font-bold tracking-[0.28em] uppercase mb-4"
          style={{ color: '#9ca3af' }}
        >
          04 &mdash; Gallery
        </p>

        <h2
          className="font-black leading-[1.04] tracking-[-0.02em] mb-5"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
            color: '#111827',
            maxWidth: '700px',
          }}
        >
          Moments That Built<br />
          <span style={{ color: '#9ca3af' }}>the Ecosystem</span>
        </h2>

        <p
          className="text-[0.9rem] leading-relaxed"
          style={{ color: '#6b7280', maxWidth: '540px' }}
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
        {/* Top vignette (reinforces the dome's built-in edge-fade) */}
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
    </div>
  );
}
