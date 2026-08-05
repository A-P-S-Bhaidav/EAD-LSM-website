'use client';
import { motion } from 'framer-motion';
import { MapPin, Users, Award, Briefcase, TrendingUp, Network, CheckCircle2 } from 'lucide-react';

const EAD_DATA = {
  step: '01 / 02',
  badge: 'Nation-wide Roadshow',
  title: 'Entrepreneurship Awareness Drive',
  subtitle: 'What is EAD?',
  description:
    'The Entrepreneurship Awareness Drive (EAD) is India\'s largest student-driven entrepreneurship roadshow by E-Cell IIT Kharagpur. Traveling to 30+ cities, it brings together industry leaders, seasoned entrepreneurs, and aspiring students to foster a culture of innovation, self-reliance, and startup thinking across Tier-2 and Tier-3 cities.',
  metrics: [
    { value: '30+',     label: 'Cities Reached',    icon: MapPin },
    { value: '30,000+', label: 'Students Engaged', icon: Users  },
    { value: '95%',     label: 'Satisfaction',     icon: Award  },
  ],
  tags: ['Keynote Speakers', 'Startup Ideation', 'City Pitch Battles', 'Tier 2/3 Focus'],
  accentColor: '#0F172A',
};

const LSM_DATA = {
  step: '02 / 02',
  badge: 'Curated Networking',
  title: 'Local Startups Meet',
  subtitle: 'What is LSM?',
  description:
    'Local Startups Meet (LSM) is a curated networking initiative providing an exclusive, localized platform for early-stage startups to pitch their ventures to prominent VCs, angel investors, and domain mentors. It bridges the gap between ambitious founders and essential capital resources.',
  metrics: [
    { value: '150+',   label: 'Startups Scaled',   icon: Briefcase  },
    { value: '₹10Cr+', label: 'Funding Raised',    icon: TrendingUp },
    { value: '50+',    label: 'VC Partners',       icon: Network    },
  ],
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
      className="bg-white border border-slate-200/90 rounded-[2rem] p-8 md:p-12 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden w-full max-w-2xl"
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

      <p className="text-slate-600 font-montserrat text-base leading-relaxed mb-8">
        {data.description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {data.metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-[#F4F7F9] border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                <Icon size={14} />
              </div>
              <div>
                <p className="text-lg md:text-xl font-black text-[#0F172A] leading-none font-montserrat tracking-tight">
                  {m.value}
                </p>
                <p className="text-[0.65rem] font-bold tracking-wider uppercase text-slate-500 mt-1 font-montserrat">
                  {m.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-[#0F172A] tracking-tight leading-[1.1] mb-6">
                What is EAD &amp; LSM?
              </h2>

              <p className="text-[#0F172A]/85 font-montserrat text-[0.98rem] font-medium leading-relaxed max-w-md">
                The flagship entrepreneurial initiatives of E-Cell IIT Kharagpur, designed to focus on student awareness and early-stage startup acceleration, allowing participants to scale their ideas into impactful ventures.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (1 CARD AT A TIME PER SCREEN VIEWPORT) ── */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Card 1: EAD Slot */}
            <div className="min-h-[calc(100vh-6rem)] lg:min-h-screen flex items-center justify-center py-8 lg:py-16">
              <InitiativeCard data={EAD_DATA} delay={0.1} />
            </div>

            {/* Card 2: LSM Slot */}
            <div className="min-h-[calc(100vh-6rem)] lg:min-h-screen flex items-center justify-center py-8 lg:py-16">
              <InitiativeCard data={LSM_DATA} delay={0.2} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
