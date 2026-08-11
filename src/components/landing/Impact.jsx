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

const COMPARISON_ROWS = [
  { metric: 'Students reached', ead: '35,000+', lsm: '—' },
  { metric: 'Speakers hosted', ead: '100+', lsm: '30+' },
  { metric: 'Startups engaged', ead: '100+', lsm: '100+' },
  { metric: 'Investors connected', ead: '—', lsm: '40+' },
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
        <div className="w-full mt-16 pt-12 border-t border-slate-200/60 flex flex-col gap-10 items-center">
          
          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-4xl px-4"
          >
            <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed font-montserrat italic">
              "From SEBI's Executive Director to founders featured on Shark Tank India, EAD-LSM has hosted leaders from Groww, Inshorts, INDmoney, RPSG Group, EY, Symphony Ltd., and dozens of other companies across two dozen Indian cities."
            </p>
          </motion.div>

          {/* Trusted-By Partner Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col gap-6"
          >
            <div className="text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F172A]/60">
                Trusted by Partnerships &amp; Associations
              </span>
            </div>
            
            {/* Partners Badge list (Grid of elegant badges) */}
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto px-4">
              {[
                { name: 'Kotak Mahindra Bank', role: 'Title Partner' },
                { name: 'REDOQ', role: 'Co-Title Partner' },
                { name: 'Sundaram Finance', role: 'Strategic Partner' },
                { name: 'Kuick Studio', role: 'Software Partner' },
                { name: 'Abhibus', role: 'Associate Partner' },
                { name: 'CNBC', role: 'Title Media Partner' },
                { name: 'Youth Incorporated', role: 'Youth Media Partner' },
                { name: 'V2A', role: 'Title Cap Partner' }
              ].map((p) => (
                <div key={p.name} className="px-4 py-2 bg-white/60 border border-slate-200/50 rounded-xl shadow-2xs hover:bg-white transition-all flex items-center gap-1.5 hover:scale-[1.03]">
                  <span className="text-xs font-bold text-slate-800 font-montserrat">{p.name}</span>
                  <span className="text-[9px] font-mono uppercase font-black text-slate-400">({p.role})</span>
                </div>
              ))}
            </div>

            {/* Previously Associated */}
            <div className="mt-2 text-center px-4">
              <p className="text-xs font-semibold text-slate-500 font-montserrat leading-relaxed">
                Previously associated with:{' '}
                <span className="text-[#0F172A] font-bold">
                  Livpure · Google for Developers · Odoo · Krafton · Adda52
                </span>
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
