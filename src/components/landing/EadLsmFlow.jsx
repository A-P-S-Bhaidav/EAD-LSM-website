'use client';
import { motion } from 'framer-motion';

const FLOW_STEPS = [
  {
    step: '01',
    title: 'EAD City Roadshow',
    desc: 'Nation-wide awareness drives in 30+ cities — keynotes, workshops, and ideation sessions with students.',
    color: '#2563eb',
  },
  {
    step: '02',
    title: 'Idea Incubation',
    desc: 'Shortlisted participants refine their startup ideas with guided mentorship and pitch preparation.',
    color: '#7c3aed',
  },
  {
    step: '03',
    title: 'LSM Pitch Events',
    desc: 'Curated local meets where founders pitch to VCs, angel investors, and domain mentors for feedback & funding.',
    color: '#0891b2',
  },
  {
    step: '04',
    title: 'Scale & Connect',
    desc: 'Top startups receive mentorship, access to networks, and capital pipelines to scale their ventures nationally.',
    color: '#059669',
  },
];

export default function EadLsmFlow() {
  return (
    <div className="py-16 relative overflow-hidden" style={{ backgroundColor: '#f8f9fb' }}>
      <div className="u-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-gray-400 mb-4">
            How It Works
          </p>
          <h2
            className="font-black tracking-tight text-gray-900 leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            The EAD–LSM Flow
          </h2>
          <p className="text-gray-500 text-[0.95rem] max-w-lg mx-auto leading-relaxed">
            From awareness to investment — a seamless pipeline connecting student innovators to the startup ecosystem.
          </p>
        </motion.div>

        {/* Flow steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {FLOW_STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="relative group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-default"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Step number */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black mb-4"
                style={{ backgroundColor: item.color }}
              >
                {item.step}
              </div>

              {/* Connecting arrow (not on last) */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-[28px] -right-3 text-gray-300 text-lg z-10">
                  →
                </div>
              )}

              <h3 className="text-[1rem] font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-[0.82rem] text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
