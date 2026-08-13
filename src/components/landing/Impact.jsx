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



export default function Impact() {
  return (
    <section
      id="impact"
      className="w-full min-h-screen pt-20 sm:pt-32 lg:pt-48 pb-16 bg-[#F4F7F9] flex flex-col items-center justify-start overflow-hidden font-montserrat"
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

        {/* India Network Map (D3) Full Width */}
        <div className="w-full flex items-center justify-center min-h-[450px] lg:min-h-[550px] bg-white/30 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-[0_8px_30px_rgba(15,23,42,0.03)] p-4 relative">
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
              className="lg:col-span-6 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-[0_8px_30px_rgba(15,23,42,0.03)] relative overflow-hidden flex flex-col gap-5 justify-between min-h-[380px] hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:border-slate-300 transition-all duration-500 group"
            >
              {/* Decorative accent lines */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#7DA6A9] to-[#7DA6A9]/30" />
              
              {/* Giant background quotation mark */}
              <div className="absolute -right-4 -top-8 text-[180px] font-serif font-black select-none pointer-events-none text-[#7DA6A9]/5 leading-none z-0">
                “
              </div>
              
              <div className="relative z-10 flex flex-col gap-4">
                {/* Sleek pill badge with custom indicator */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7DA6A9] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7DA6A9]"></span>
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest bg-slate-100 text-[#0F172A]/70 rounded-full border border-slate-200/50">
                    Media & Representation
                  </span>
                </div>
                
                {/* Beautiful quote typography with semantic emphasis */}
                <p className="text-slate-700 text-sm md:text-[15px] lg:text-base font-medium leading-relaxed font-montserrat relative">
                  "From <span className="font-extrabold text-[#0F172A] border-b border-[#7DA6A9]/30 pb-0.5">SEBI's Executive Director</span> to founders featured on <span className="font-extrabold text-[#0F172A] border-b border-[#7DA6A9]/30 pb-0.5">Shark Tank India</span>, EAD-LSM has hosted leaders from <span className="font-semibold text-slate-900 bg-[#7DA6A9]/10 px-1 py-0.5 rounded">Groww</span>, <span className="font-semibold text-slate-900 bg-[#7DA6A9]/10 px-1 py-0.5 rounded">Inshorts</span>, <span className="font-semibold text-slate-900 bg-[#7DA6A9]/10 px-1 py-0.5 rounded">INDmoney</span>, <span className="font-semibold text-slate-900 bg-[#7DA6A9]/10 px-1 py-0.5 rounded">RPSG Group</span>, <span className="font-semibold text-slate-900 bg-[#7DA6A9]/10 px-1 py-0.5 rounded">EY</span>, <span className="font-semibold text-slate-900 bg-[#7DA6A9]/10 px-1 py-0.5 rounded">Symphony Ltd.</span>, and dozens of other premier brands across two dozen Indian cities."
                </p>
              </div>

              {/* Decorative subtle network badge at bottom of quote */}
              <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7DA6A9]/20 to-white flex items-center justify-center text-slate-500 border border-[#7DA6A9]/30 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-[#7DA6A9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0F172A]">E-Cell Network Ecosystem</span>
                  <span className="text-[9px] font-mono text-slate-400">National Roadshows & Summits</span>
                </div>
              </div>
            </motion.div>

            {/* Right side: Newspaper / Press Image Container */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-3xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.03)] flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] group cursor-pointer hover:scale-[1.02] transition-all"
            >
              <img 
                src="/newspaper.png" 
                alt="EAD-LSM Press Coverage" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.05] transition-transform duration-500 absolute inset-0 z-0 opacity-100"
              />
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

            {/* Previously Associated With Marquee */}
            <div className="mt-12 flex flex-col items-center gap-5 px-4 w-full max-w-4xl mx-auto border-t border-slate-200/40 pt-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]/50">
                Previously Associated With
              </span>
              <div className="relative w-full overflow-hidden py-4 select-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 sm:before:w-24 before:bg-gradient-to-r before:from-[#F4F7F9] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 sm:after:w-24 after:bg-gradient-to-l after:from-[#F4F7F9] after:to-transparent">
                <style>{`
                  @keyframes marquee-associated {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-marquee-associated {
                    display: flex;
                    width: max-content;
                    gap: 28px;
                    animation: marquee-associated 20s linear infinite;
                  }
                  .animate-marquee-associated:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className="animate-marquee-associated">
                  {[...Array(2)].map((_, listIdx) => (
                    <React.Fragment key={listIdx}>
                      {[
                        { name: 'Livpure', src: '/livpure.svg', className: 'h-6 w-auto' },
                        { name: 'Google for Developers', src: '/gdevs.svg', className: 'h-5.5 w-auto' },
                        { name: 'Odoo', src: '/odoo.svg', className: 'h-6 w-auto' },
                        { name: 'Krafton', src: '/krafton.svg', className: 'h-5 w-auto' },
                        { name: 'Adda52', src: '/adda52.svg', className: 'h-7 w-auto' }
                      ].map((logo, idx) => (
                        <div
                          key={`${listIdx}-${idx}`}
                          className="flex items-center justify-center select-none grayscale opacity-45 hover:grayscale-0 hover:opacity-90 hover:scale-[1.05] transition-all duration-300 cursor-pointer whitespace-nowrap"
                        >
                          <img
                            src={logo.src}
                            alt={logo.name}
                            title={logo.name}
                            className={`${logo.className} object-contain max-w-[120px]`}
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
