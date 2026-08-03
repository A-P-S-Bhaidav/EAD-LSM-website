'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MapPin, Users, Award, Briefcase, TrendingUp, Network,
  CheckCircle2, ArrowRight, Zap, Target, Handshake, Mic, BookOpen, Star
} from 'lucide-react';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const INITIATIVES = {
  EAD: {
    badge: 'Nation-wide Roadshow',
    title: 'Entrepreneurship\nAwareness Drive',
    subtitle: 'Inspiring the next generation of innovators across India',
    description:
      'EAD is a nation-wide initiative by E-Cell IIT Kharagpur, traveling to 30+ cities. We bring together industry leaders, seasoned entrepreneurs, and aspiring students to foster a culture of innovation, self-reliance, and entrepreneurship at scale.',
    metrics: [
      { value: '30+',    label: 'Cities Reached',     icon: MapPin     },
      { value: '30,000+', label: 'Students Engaged',  icon: Users      },
      { value: '95%',    label: 'Satisfaction Rate',  icon: Award      },
    ],
    features: [
      { icon: Mic,       title: 'Keynote Speakers',     desc: 'Industry titans sharing real-world entrepreneurial journeys.' },
      { icon: Zap,       title: 'Startup Ideation',     desc: 'Hands-on workshops on business models and product thinking.' },
      { icon: Target,    title: 'City Pitch Battles',   desc: 'Live competitions with direct mentorship from experts.' },
    ],
  },
  LSM: {
    badge: 'Curated Networking',
    title: 'Local\nStartups Meet',
    subtitle: 'Bridging capital and innovation in local startup ecosystems',
    description:
      'LSM provides an exclusive, localised platform for early-stage startups to pitch their ventures to prominent VCs, angel investors, and domain mentors. It closes the gap between ambitious founders and the resources they need to scale.',
    metrics: [
      { value: '150+',  label: 'Startups Scaled',   icon: Briefcase  },
      { value: '₹10Cr+', label: 'Funding Facilitated', icon: TrendingUp },
      { value: '50+',   label: 'VC Partners',       icon: Network    },
    ],
    features: [
      { icon: Handshake, title: 'Speed Mentoring',    desc: 'One-on-one curated sessions with domain experts and VCs.' },
      { icon: BookOpen,  title: 'Pitch Deck Reviews', desc: 'Live review of decks by leading angel networks.' },
      { icon: Star,      title: 'Startup Showcase',   desc: 'Strategic networking with co-founders and tech leaders.' },
    ],
  },
};

const TABS = ['EAD', 'LSM'];

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function AnimatedMetric({ value }) {
  return <span>{value}</span>;
}

/* ─────────────────────────────────────────
   METRIC CARD
───────────────────────────────────────── */
function MetricCard({ metric, index }) {
  const Icon = metric.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, borderColor: 'rgba(0,0,0,0.12)' }}
      className="flex-1 min-w-0 bg-white border border-gray-200 rounded-2xl px-5 py-5 flex flex-col gap-3 cursor-default"
      style={{ transition: 'border-color 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
        <Icon size={15} />
      </div>
      <div>
        <p className="text-[1.85rem] font-black text-gray-900 leading-none tracking-tight">
          <AnimatedMetric value={metric.value} />
        </p>
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-gray-400 mt-1.5">
          {metric.label}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FEATURE ROW
───────────────────────────────────────── */
function FeatureRow({ feature, index }) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 + 0.3, duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)', x: 3 }}
      className="group flex items-start gap-4 px-4 py-3.5 rounded-xl cursor-default"
      style={{ transition: 'background-color 0.15s' }}
    >
      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-gray-600 group-hover:border-gray-300 transition-colors duration-200">
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[0.85rem] font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
          {feature.title}
        </p>
        <p className="text-[0.78rem] text-gray-400 leading-relaxed mt-0.5 group-hover:text-gray-500 transition-colors duration-200">
          {feature.desc}
        </p>
      </div>
      <CheckCircle2 size={14} className="text-gray-200 group-hover:text-gray-400 flex-shrink-0 mt-1 transition-colors duration-200" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   INFO BOX — EAD and LSM description boxes on the right
───────────────────────────────────────── */
function InfoBox({ title, color, description, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 cursor-default transition-all duration-300 hover:shadow-lg"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold mb-4" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-[0.82rem] text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function WhatIsEAD() {
  const [activeTab, setActiveTab] = useState('EAD');
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const data = INITIATIVES[activeTab];

  // Measure tab indicator position
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <section
      id="what-is-ead"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#f4f5f7' }}
    >
      <div className="u-container relative z-10 py-[12vh]">

        {/* ── SECTION HEADER ── */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.p custom={0} variants={fadeUp}
            className="text-[0.62rem] font-bold tracking-[0.28em] uppercase mb-5"
            style={{ color: '#9ca3af' }}
          >
            02 &mdash; What Is EAD &amp; LSM
          </motion.p>

          <motion.h2 custom={1} variants={fadeUp}
            className="font-black leading-[1.03] tracking-[-0.025em] mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              color: '#111827',
            }}
          >
            Empowering Startups<br />
            <span style={{ color: '#9ca3af' }}>Through Innovation</span>
          </motion.h2>

          <motion.p custom={2} variants={fadeUp}
            className="text-[0.975rem] leading-relaxed max-w-[520px]"
            style={{ color: '#6b7280' }}
          >
            IIT Kharagpur&apos;s flagship entrepreneurial initiatives — connecting
            students, founders, mentors, investors, and innovators under one ecosystem.
          </motion.p>

          <motion.div custom={3} variants={fadeUp}
            className="mt-10 w-px h-10"
            style={{ background: 'linear-gradient(to bottom, transparent, #d1d5db, transparent)' }}
          />
        </motion.div>

        {/* ── SEGMENTED TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center mb-12"
        >
          <div
            className="relative flex p-1 rounded-xl"
            style={{ backgroundColor: '#e5e7eb', border: '1px solid #d1d5db' }}
          >
            {/* Sliding pill indicator */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
              animate={{ left: tabIndicator.left, width: tabIndicator.width }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            />
            {TABS.map((tab) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[tab] = el; }}
                onClick={() => setActiveTab(tab)}
                className="relative z-10 px-8 py-2.5 rounded-lg text-[0.8rem] font-bold tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer"
                style={{ color: activeTab === tab ? '#111827' : '#9ca3af', border: 'none', background: 'transparent' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── MAIN CONTENT AREA ── */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Main content card */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-[2rem] overflow-hidden relative"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                <div className="p-8 md:p-12 lg:p-14">
                  <div className="flex flex-col">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mb-7"
                      style={{
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#2563eb', opacity: 0.6 }}
                      />
                      <span
                        className="text-[0.62rem] font-bold tracking-[0.2em] uppercase"
                        style={{ color: '#6b7280' }}
                      >
                        IIT Kharagpur Initiative &nbsp;·&nbsp; {data.badge}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.35 }}
                      className="font-black leading-[1.05] tracking-[-0.02em] mb-4 whitespace-pre-line"
                      style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', color: '#111827' }}
                    >
                      {data.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.35 }}
                      className="text-[0.85rem] font-medium mb-5"
                      style={{ color: '#9ca3af' }}
                    >
                      {data.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.14, duration: 0.38 }}
                      className="text-[0.9rem] leading-[1.75] mb-10"
                      style={{ color: '#6b7280' }}
                    >
                      {data.description}
                    </motion.p>

                    {/* Metrics */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-10">
                      {data.metrics.map((m, i) => (
                        <MetricCard key={m.label} metric={m} index={i} />
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px mb-8" style={{ backgroundColor: '#f3f4f6' }} />

                    {/* Features */}
                    <div className="mb-10">
                      <p
                        className="text-[0.6rem] font-bold tracking-[0.22em] uppercase mb-3 px-4"
                        style={{ color: '#9ca3af' }}
                      >
                        Key Highlights
                      </p>
                      <div className="flex flex-col gap-1">
                        {data.features.map((f, i) => (
                          <FeatureRow key={f.title} feature={f} index={i} />
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <motion.button
                        whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(37, 99, 235, 0.15)' }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center gap-2 px-7 h-12 rounded-full text-[0.8rem] font-bold tracking-wide cursor-pointer"
                        style={{ backgroundColor: '#111827', color: '#ffffff', border: 'none' }}
                      >
                        Learn More
                        <ArrowRight size={14} />
                      </motion.button>

                      <motion.button
                        whileHover={{ borderColor: 'rgba(0,0,0,0.2)', color: '#111827' }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center gap-2 px-7 h-12 rounded-full text-[0.8rem] font-bold tracking-wide cursor-pointer"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #d1d5db',
                          color: '#6b7280',
                        }}
                      >
                        View Gallery
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: EAD and LSM Info Boxes */}
          <div className="w-full lg:w-[340px] flex flex-col gap-6 flex-shrink-0">
            <InfoBox
              title="What is EAD?"
              color="#2563eb"
              icon="E"
              description="The Entrepreneurship Awareness Drive (EAD) is India's largest student-driven entrepreneurship roadshow. It covers 30+ cities, engaging 30,000+ students through workshops, keynotes, and pitch battles to ignite the spirit of innovation across Tier-2 and Tier-3 cities."
            />
            <InfoBox
              title="What is LSM?"
              color="#7c3aed"
              icon="L"
              description="Local Startups Meet (LSM) is a curated networking initiative that connects early-stage startups with VCs, angel investors, and domain mentors. It bridges the gap between ambitious founders and resources — facilitating ₹10Cr+ in funding and 150+ startup connections."
            />
          </div>
        </div>

      </div>
    </section>
  );
}
