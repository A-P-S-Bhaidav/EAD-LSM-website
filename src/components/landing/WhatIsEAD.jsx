'use client';
import { motion } from 'framer-motion';
import { MapPin, Users, Award, Briefcase, Network, CheckCircle2 } from 'lucide-react';

const EAD_DATA = {
  step: '01 / 02',
  badge: 'Nation-wide Roadshow',
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
    { value: '40+',    label: 'Investors',   icon: Network },
    { value: '100+',   label: 'Startups',    icon: Briefcase },
    { value: '30+',    label: 'Speakers',    icon: Award },
    { value: '10+',    label: 'Cities',      icon: MapPin },
  ],
  supportingText: 'LSM chapters have run in Kolkata, Pune, Kanpur, Bengaluru, Delhi, Jaipur, Indore, Hyderabad, Gurugram, Mumbai, Nagpur, and Surat — pairing local founders with the capital and mentorship they need to scale.',
  tags: ['Speed Mentoring', 'Pitch Deck Reviews', 'Startup Showcase', 'Angel Connect'],
  accentColor: '#0F172A',
};

function InitiativeCard({ data, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-slate-200/90 rounded-[2rem] p-6 md:p-8 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden w-full max-w-2xl"
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-[#0F172A]"
      />

      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-bold font-mono tracking-widest uppercase px-3 py-1 rounded-full text-white bg-[#0F172A]"
        >
          {data.step}
        </span>
        <span className="text-[0.7rem] font-bold font-mono tracking-widest uppercase text-slate-500">
          {data.badge}
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-montserrat font-bold text-[#0F172A] tracking-tight mb-4 leading-tight">
        {data.title}
      </h3>

      <p className="text-slate-600 font-montserrat text-base leading-relaxed mb-6">
        {data.description}
      </p>

      {/* Metrics Grid (4 columns on desktop, 2x2 on mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {data.metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-[#F4F7F9] border border-slate-200/80 rounded-2xl p-3 flex flex-col gap-1.5"
            >
              <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                <Icon size={12} />
              </div>
              <div>
                <p className="text-base md:text-lg font-black text-[#0F172A] leading-none font-montserrat tracking-tight">
                  {m.value}
                </p>
                <p className="text-[0.6rem] font-bold tracking-wider uppercase text-slate-500 mt-1 font-montserrat">
                  {m.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-2 pb-4 border-t border-slate-100">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F7F9] text-slate-800 font-montserrat text-xs font-semibold"
          >
            <CheckCircle2 size={12} className="text-[#7DA6A9]" />
            {tag}
          </span>
        ))}
      </div>

      {/* Supporting Text */}
      {data.supportingText && (
        <p className="text-slate-500 font-montserrat text-xs leading-relaxed mt-4 pt-4 border-t border-slate-100 italic">
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

          {/* ── RIGHT COLUMN (1 CARD AT A TIME PER SCREEN VIEWPORT) ── */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Card 1: EAD Slot */}
            <div className="min-h-[calc(60vh-4rem)] lg:min-h-[60vh] flex items-center justify-center py-6 lg:py-10">
              <InitiativeCard data={EAD_DATA} delay={0.1} />
            </div>

            {/* Card 2: LSM Slot */}
            <div className="min-h-[calc(60vh-4rem)] lg:min-h-[60vh] flex items-center justify-center py-6 lg:py-10">
              <InitiativeCard data={LSM_DATA} delay={0.2} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
