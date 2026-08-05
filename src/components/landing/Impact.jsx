'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const IndiaNetworkMapD3 = dynamic(() => import('./IndiaNetworkMapD3'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Impact() {
  return (
    <section
      id="impact"
      className="w-full min-h-screen h-screen py-0 bg-[#F4F7F9] flex items-center justify-center overflow-hidden font-montserrat"
    >
      <div className="u-container max-w-7xl mx-auto w-full py-8">
        
        {/* Full-Page Layout: Narrative Left + D3 India Map Right */}
        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center w-full">
          
          {/* Left Column: Context Narrative */}
          <div className="col-span-full lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="intro_main_bottom_cpt text-xs font-mono font-bold mb-4 text-[#0F172A]/60 tracking-widest uppercase">
                03 — IMPACT SCRIPT
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] leading-tight font-montserrat tracking-tight mb-6">
                Empowering change across the startup ecosystem.
              </h2>
              <p className="text-slate-600 font-montserrat text-sm md:text-base leading-relaxed mb-8">
                Through strategic milestones, we capture metrics that matter: student exposure, capital deployment, and early stage scaling. Our drives create structural networks that empower regional innovation hubs.
              </p>
              
              {/* Minimalist Quote Box matching 2-Combo Palette */}
              <div className="border-l-4 border-[#7DA6A9] pl-5 py-3.5 bg-[#7DA6A9]/15 rounded-r-xl border-y border-r border-[#7DA6A9]/30 shadow-2xs">
                <span className="text-sm font-semibold text-[#0F172A] font-montserrat italic block leading-snug">
                  &ldquo;We don't just host events; we coordinate the building blocks of regional startup economies.&rdquo;
                </span>
                <div className="text-xs font-mono font-bold text-[#0F172A] mt-2 uppercase tracking-wider">
                  — E-CELL, IIT KHARAGPUR
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: India Network Map (D3) */}
          <div className="col-span-full lg:col-span-7 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full h-[450px] md:h-[550px] lg:h-[640px] flex items-center justify-center"
            >
              <IndiaNetworkMapD3 />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
