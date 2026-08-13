'use client';
import React from 'react';
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

const COMPARISON_ROWS = [
  { metric: 'Students reached', ead: '35,000+', lsm: '—' },
  { metric: 'Speakers hosted', ead: '100+', lsm: '75+' },
  { metric: 'Startups engaged', ead: '100+', lsm: '1200+' },
  { metric: 'Investors connected', ead: '—', lsm: '65+' },
  { metric: 'Cities covered', ead: '20+', lsm: '10+' },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="w-full min-h-screen pt-36 pb-16 lg:pt-48 bg-[#F4F7F9] flex flex-col items-center justify-start overflow-hidden font-montserrat"
    >
      <div className="u-container max-w-[1400px] mx-auto w-full px-4 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-12"
        >
          <div className="intro_main_bottom_cpt text-xs font-mono font-bold mb-3 text-[#0F172A]/60 tracking-widest uppercase">
            03 — IMPACT SCRIPT
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
            Empowering change across the startup ecosystem.
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Through strategic milestones, we capture metrics that matter: student exposure, capital deployment, and early stage scaling. Our drives create structural networks that empower regional innovation hubs.
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* Left Column: Glassmorphic Comparison Table */}
          <div className="lg:col-span-5 flex flex-col h-full justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.03)] h-full flex flex-col justify-center"
            >
              <h3 className="text-xl font-extrabold text-[#0F172A] font-montserrat tracking-tight mb-6">
                EAD vs. LSM Overview
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#0F172A]/10">
                      <th className="py-3 px-2 text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Metric</th>
                      <th className="py-3 px-2 text-xs font-mono uppercase tracking-wider text-[#0F172A] font-black text-center">EAD</th>
                      <th className="py-3 px-2 text-xs font-mono uppercase tracking-wider text-[#0F172A] font-black text-center">LSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.metric} className="border-b border-[#0F172A]/5 hover:bg-white/30 transition-colors">
                        <td className="py-3.5 px-2 text-sm font-semibold text-slate-700 font-montserrat">{row.metric}</td>
                        <td className="py-3.5 px-2 text-base font-black text-[#0F172A] text-center font-montserrat">{row.ead}</td>
                        <td className="py-3.5 px-2 text-base font-black text-[#0F172A] text-center font-montserrat">{row.lsm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column: India Network Map (D3) */}
          <div className="lg:col-span-7 flex items-center justify-center min-h-[450px] lg:min-h-[550px] h-full bg-white/30 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-[0_8px_30px_rgba(15,23,42,0.03)] p-4 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full h-full"
            >
              <IndiaNetworkMapD3 />
            </motion.div>
          </div>

        </div>

        {/* Bottom Supporting Info & Partner Strip */}
        <div className="w-full mt-16 pt-12 border-t border-slate-200/60 flex flex-col gap-16 items-center">
          
          {/* Highlight Section (Quote + Newspaper Image Slot) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl w-full px-4">
            
            {/* Left side: Highlighted Quote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white/50 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)] relative overflow-hidden flex flex-col gap-3 justify-center min-h-[160px]"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#7DA6A9]" />
              
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#0F172A]/50">
                Media & Representation
              </span>
              
              <p className="text-slate-800 text-sm md:text-base font-semibold leading-relaxed font-montserrat italic relative z-10">
                "From SEBI's Executive Director to founders featured on Shark Tank India, EAD-LSM has hosted leaders from Groww, Inshorts, INDmoney, RPSG Group, EY, Symphony Ltd., and dozens of other companies across two dozen Indian cities."
              </p>
            </motion.div>

            {/* Right side: Newspaper / Press Image Container */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-3xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.03)] flex flex-col items-center justify-center relative overflow-hidden min-h-[160px] group cursor-pointer hover:scale-[1.02] transition-all"
            >
              <img 
                src="/newspaper.png" 
                alt="EAD-LSM Press Coverage" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.05] transition-transform duration-500 absolute inset-0 z-0 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              <div className="relative z-10 flex flex-col items-center text-center p-4 select-none">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]/70 mb-2">
                  Featured in Press
                </span>
                <p className="text-[11px] font-semibold text-slate-500 font-montserrat max-w-[240px]">
                  Click to view newspaper clipping and media coverage details.
                </p>
              </div>
            </motion.div>
            
          </div>

          {/* Trusted-By Partner Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col gap-6 items-center"
          >
            <div className="text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]/60">
                Trusted by Partnerships &amp; Associations
              </span>
            </div>
            
            {/* Partners Badge list (Horizontal Infinite Marquee Scroll) */}
            <div className="w-full relative overflow-hidden py-6 select-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 sm:before:w-24 before:bg-gradient-to-r before:from-[#F4F7F9] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 sm:after:w-24 after:bg-gradient-to-l after:from-[#F4F7F9] after:to-transparent">
              <style>{`
                @keyframes marquee-horizontal {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-33.33%); }
                }
                .animate-marquee-horizontal {
                  display: flex;
                  width: max-content;
                  gap: 28px;
                  animation: marquee-horizontal 30s linear infinite;
                }
                .animate-marquee-horizontal:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="animate-marquee-horizontal">
                {[...Array(3)].map((_, listIdx) => (
                  <React.Fragment key={listIdx}>
                    {[
                      { 
                        name: 'Kotak Mahindra Bank', 
                        role: 'Title Partner',
                        logo: <img src="/kotak.svg" alt="Kotak Mahindra Bank" className="w-7 h-7 object-contain min-w-[28px]" />
                      },
                      { 
                        name: 'REDOQ', 
                        role: 'Co-Title Partner',
                        logo: <img src="/redoq.svg" alt="REDOQ" className="w-7 h-7 object-contain min-w-[28px]" />
                      },
                      { 
                        name: 'Sundaram Finance', 
                        role: 'Strategic Partner',
                        logo: <img src="/sundaram.png" alt="Sundaram Finance" className="w-7 h-7 object-contain min-w-[28px]" />
                      },
                      { 
                        name: 'Kuick Studio', 
                        role: 'Software Partner',
                        logo: <img src="/kuick.png" alt="Kuick Studio" className="w-7 h-7 object-contain min-w-[28px]" />
                      },
                      { 
                        name: 'Abhibus', 
                        role: 'Associate Partner',
                        logo: <img src="/abhibus.png" alt="Abhibus" className="w-7 h-7 object-contain min-w-[28px]" />
                      },
                      { 
                        name: 'CNBC', 
                        role: 'Title Media Partner',
                        logo: <img src="/cnbc.svg" alt="CNBC" className="w-9 h-7 object-contain min-w-[36px]" />
                      },
                      { 
                        name: 'Youth Incorporated', 
                        role: 'Youth Media Partner',
                        logo: <img src="/youthinc.ico" alt="Youth Incorporated" className="w-7 h-7 object-contain min-w-[28px]" />
                      },
                      { 
                        name: 'V2A', 
                        role: 'Title Cap Partner',
                        logo: <img src="/v2a.svg" alt="V2A" className="w-7 h-7 object-contain min-w-[28px]" />
                      }
                    ].map((p, itemIdx) => (
                      <div 
                        key={`${listIdx}-${itemIdx}`} 
                        className="px-6 py-4 bg-white/70 border border-slate-200/50 rounded-2xl shadow-3xs flex items-center gap-4 hover:bg-white hover:border-slate-300 transition-all duration-300 hover:scale-[1.03] cursor-pointer whitespace-nowrap"
                      >
                        {p.logo}
                        <div className="flex flex-col items-start leading-none">
                          <span className="text-sm font-bold text-slate-800 font-montserrat">{p.name}</span>
                          <span className="text-[10px] font-mono uppercase font-black text-slate-400 mt-1.5">({p.role})</span>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Previously Associated */}
            <div className="mt-12 flex flex-col items-center gap-5 px-4 w-full max-w-4xl mx-auto border-t border-slate-200/40 pt-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]/50">
                Previously Associated With
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
                {[
                  { name: 'Livpure', src: '/livpure.svg', className: 'h-6 w-auto' },
                  { name: 'Google for Developers', src: '/gdevs.svg', className: 'h-5.5 w-auto' },
                  { name: 'Odoo', src: '/odoo.svg', className: 'h-6 w-auto' },
                  { name: 'Krafton', src: '/krafton.svg', className: 'h-5 w-auto' },
                  { name: 'Adda52', src: '/adda52.svg', className: 'h-7 w-auto' }
                ].map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-center select-none grayscale opacity-45 hover:grayscale-0 hover:opacity-90 hover:scale-[1.05] transition-all duration-300 cursor-pointer"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      title={logo.name} 
                      className={`${logo.className} object-contain max-w-[120px]`} 
                    />
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
