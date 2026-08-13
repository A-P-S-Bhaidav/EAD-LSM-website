'use client';
import { motion } from 'framer-motion';
import { MapPin, Users, Award, Briefcase, Network, CheckCircle2 } from 'lucide-react';

const EAD_DATA = {
  step: '01 / 02',
  badge: 'EAD AT A GLANCE',
  title: 'What is EAD (Entrepreneurship Awareness Drive)',
  description:
    'EAD is the largest PAN-India confluence of new-age entrepreneurs and students, a city-hopping series of talks and interactions reaching:',
  metrics: [
    { value: '35,000+', label: 'Students',   icon: Users },
    { value: '100+',    label: 'Speakers',   icon: Award },
    { value: '20+',     label: 'Cities',     icon: MapPin },
    { value: '100+',    label: 'Startups',   icon: Briefcase },
  ],
  supportingText: 'From Delhi NCR and Mumbai to Kolkata, Hyderabad, Indore, Ranchi, and beyond, EAD brings founders and industry leaders directly to college campuses to spark the next generation of Indian entrepreneurship.',
  tags: ['Keynote Speakers', 'Startup Ideation', 'City Pitch Battles', 'Tier 2/3 Focus'],
  accentColor: '#0F172A',
};

const LSM_DATA = {
  step: '02 / 02',
  badge: 'Curated Networking',
  title: 'What is LSM (Local Startups Meet)',
  description:
    'LSM connects emerging startups with seasoned investors through mentorship, workshops, and vibrant networking opportunities — city by city.',
  metrics: [
    { value: '65+',    label: 'Investors',   icon: Network },
    { value: '1200+',  label: 'Startups',    icon: Briefcase },
    { value: '75+',    label: 'Speakers',    icon: Award },
    { value: '10+',    label: 'Cities',      icon: MapPin },
  ],
  supportingText: 'LSM chapters have run in Kolkata, Pune, Kanpur, Bengaluru, Delhi, Jaipur, Indore, Hyderabad, Gurugram, Mumbai, Nagpur, and Surat — pairing local founders with the capital and mentorship they need to scale.',
  tags: ['Speed Mentoring', 'Pitch Deck Reviews', 'Startup Showcase', 'Angel Connect'],
  accentColor: '#0F172A',
};

function InitiativeCard({ data, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-slate-200/90 rounded-[1.5rem] p-5 md:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 relative overflow-hidden w-full max-w-2xl"
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"
      />

      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full text-white bg-[#0F172A]"
        >
          {data.step}
        </span>
        <span className="text-[9px] font-bold font-mono tracking-widest uppercase text-slate-500">
          {data.badge}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-montserrat font-bold text-[#0F172A] tracking-tight mb-2 leading-tight">
        {data.title}
      </h3>

      <p className="text-slate-600 font-montserrat text-xs sm:text-sm leading-relaxed mb-4">
        {data.description}
      </p>

      {/* Metrics Grid (4 columns on desktop, 2x2 on mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {data.metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-[#F4F7F9] border border-slate-200/80 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1"
            >
              <div className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                <Icon size={10} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0F172A] leading-none font-montserrat tracking-tight">
                  {m.value}
                </p>
                <p className="text-[9px] font-bold tracking-wider uppercase text-slate-500 mt-0.5 font-montserrat">
                  {m.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-nowrap overflow-x-auto gap-1.5 pt-2 pb-3 border-t border-slate-100 w-full no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F7F9] text-slate-800 font-montserrat text-[10px] sm:text-xs font-semibold flex-shrink-0 whitespace-nowrap"
          >
            <CheckCircle2 size={10} className="text-[#7DA6A9]" />
            {tag}
          </span>
        ))}
      </div>

      {/* Supporting Text */}
      {data.supportingText && (
        <p className="text-slate-500 font-montserrat text-[11px] leading-relaxed mt-3 pt-3 border-t border-slate-100 italic">
          {data.supportingText}
        </p>
      )}
    </motion.div>
  );
}

export default function WhatIsEAD() {
  return (
    <section
      id="what-is-ead"
      className="relative bg-[#7DA6A9] py-0"
    >
      <div className="u-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN (STATIC / PINNED 100VH STICKY CENTERING) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen self-start flex flex-col justify-center py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A] block mb-4">
                EAD &amp; LSM Section
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-[#0F172A] tracking-tight leading-[1.15] mb-6">
                About Entrepreneurship Cell, IIT Kharagpur
              </h2>

              <p className="text-[#0F172A]/85 font-montserrat text-sm md:text-base font-semibold leading-relaxed max-w-md">
                Founded in 2006, the Entrepreneurship Cell (E-Cell) is a student body of IIT Kharagpur dedicated to inspiring and guiding startups on campus and beyond. What began on campus now operates on a national scale, instilling the entrepreneurial spirit in India's youth through workshops, mentorship, and flagship events like Empresario, the Global Entrepreneurship Summit, and Million at Stake.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (BOTH CARDS VISIBLE ON ONE SCREEN) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-5 py-8 lg:py-0 lg:min-h-screen">
            <InitiativeCard data={EAD_DATA} delay={0.1} />
            <InitiativeCard data={LSM_DATA} delay={0.2} />
          </div>

        </div>
      </div>
    </section>
  );
}
