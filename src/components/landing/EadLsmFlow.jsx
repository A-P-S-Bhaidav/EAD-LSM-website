'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const FLOW_STEPS = [
  {
    number: '1',
    title: 'EAD City Roadshow',
    desc: 'Nation-wide awareness drives in 30+ cities — keynotes, workshops, and ideation sessions with student innovators across India.',
  },
  {
    number: '2',
    title: 'Idea Incubation',
    desc: 'Shortlisted participants receive guided 1-on-1 mentorship, business model refining, and investor pitch deck preparation.',
  },
  {
    number: '3',
    title: 'LSM Pitch Events',
    desc: 'Curated local meets connecting early-stage founders directly to VCs, angel investor networks, and domain mentors for feedback & funding.',
  },
  {
    number: '4',
    title: 'Scale & Connect',
    desc: 'Top startups receive long-term mentorship, access to incubation networks, and capital pipelines to scale their ventures nationally.',
  },
];

export default function EadLsmFlow() {
  const containerRef = useRef(null);

  // Track scroll progress through the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="ead-lsm-flow"
      ref={containerRef}
      className="relative py-[10vh] md:py-[14vh] bg-[#7DA6A9] text-[#0F172A] overflow-hidden font-montserrat"
    >
      <div className="u-container relative z-10 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-montserrat font-black text-[#0F172A] tracking-tight leading-tight">
            The EAD–LSM Flow
          </h2>
          <p className="text-[#0F172A]/85 font-montserrat text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed mt-4">
            From awareness to investment — a seamless pipeline connecting student innovators to the startup ecosystem.
          </p>
        </div>

        {/* ── VERTICAL TIMELINE CONTAINER ── */}
        <div className="relative font-montserrat">

          {/* Symmetrical Center Line Column */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 flex justify-center z-10 pointer-events-none">
            {/* Background track */}
            <div className="w-[3px] h-full bg-[#0F172A]/20" />
            {/* Animated Progress Line */}
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute top-0 bottom-0 w-[3px] bg-[#0F172A]"
            />
          </div>

          {/* Alternating Steps Grid */}
          <div className="flex flex-col gap-16 md:gap-24 font-montserrat relative z-20">
            {FLOW_STEPS.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={item.number}
                  className="relative flex items-center w-full min-h-[120px]"
                >
                  {/* Left Column (50%) */}
                  <div className="w-1/2 pr-6 md:pr-12 flex justify-end">
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-left bg-white border border-slate-200/90 p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.06)] w-full max-w-md"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl md:text-4xl font-montserrat font-black text-[#0F172A]">
                            {item.number}
                          </span>
                          <h3 className="text-lg md:text-2xl font-montserrat font-extrabold text-[#0F172A] tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-slate-600 font-montserrat text-xs md:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Symmetrically Centered Node Dot Container */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-30 pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.35 }}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-[3.5px] border-[#0F172A] shadow-md box-border"
                    />
                  </div>

                  {/* Right Column (50%) */}
                  <div className="w-1/2 pl-6 md:pl-12 flex justify-start">
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-left bg-white border border-slate-200/90 p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.06)] w-full max-w-md"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl md:text-4xl font-montserrat font-black text-[#0F172A]">
                            {item.number}
                          </span>
                          <h3 className="text-lg md:text-2xl font-montserrat font-extrabold text-[#0F172A] tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-slate-600 font-montserrat text-xs md:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
