'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Track scroll progress through the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'center 45%'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll-linked desktop transforms (settle faster at 50% scroll progress)
  const yOdd = useTransform(scrollYProgress, [0, 0.5], [140, 0]);
  const yEven = useTransform(scrollYProgress, [0, 0.5], [-140, 0]);
  const opacityCards = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const scaleCards = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);

  // Spring physics for scroll-linked animations
  const ySpringOdd = useSpring(yOdd, { stiffness: 65, damping: 15 });
  const ySpringEven = useSpring(yEven, { stiffness: 65, damping: 15 });
  const opacitySpring = useSpring(opacityCards, { stiffness: 65, damping: 15 });
  const scaleSpring = useSpring(scaleCards, { stiffness: 65, damping: 15 });

  return (
    <section
      id="ead-lsm-flow"
      ref={containerRef}
      className="relative py-[10vh] md:py-[14vh] bg-[#7DA6A9] text-[#0F172A] overflow-hidden font-montserrat"
    >
      <div className="u-container relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-montserrat font-black text-[#0F172A] tracking-tight leading-tight">
            The EAD–LSM Flow
          </h2>
          <p className="text-[#0F172A]/85 font-montserrat text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed mt-4">
            From awareness to investment — a seamless pipeline connecting student innovators to the startup ecosystem.
          </p>
        </div>

        {/* ── TIMELINE CONTAINER ── */}
        <div className="relative font-montserrat w-full">

          {/* Horizontal Track (Line) — visible on desktop only */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[12.5%] right-[12.5%] h-[3px] bg-[#0F172A]/20 z-10 pointer-events-none">
            {/* Animated Progress Line */}
            <motion.div
              style={{ scaleX, transformOrigin: 'left' }}
              className="h-full bg-[#0F172A]"
            />
          </div>

          {/* Steps Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-20 md:h-[480px]">
            {FLOW_STEPS.map((item, idx) => {
              const isEven = idx % 2 === 1; // Step 2 and 4 are even

              // Responsive animation styles
              const desktopCardStyle = {
                y: isEven ? ySpringEven : ySpringOdd,
                opacity: opacitySpring,
                scale: scaleSpring,
              };

              const nodeProps = {
                initial: { scale: 0, opacity: 0 },
                whileInView: { scale: 1, opacity: 1 },
                viewport: { once: true, margin: '-60px' },
                transition: { type: 'spring', stiffness: 200, damping: 20, delay: idx * 0.1 }
              };

              const mobileCardProps = {
                initial: { opacity: 0, y: isEven ? -60 : 60 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-60px' },
                transition: { type: 'spring', stiffness: 50, damping: 12, delay: idx * 0.15 }
              };

              return (
                <div
                  key={item.number}
                  className="flex flex-col items-center md:justify-center md:relative md:h-full text-center md:text-left"
                >
                  {/* Step Number Circle Node (Always visible once scrolled into view) */}
                  <motion.div
                    {...nodeProps}
                    whileHover={{ scale: 1.15 }}
                    className="w-16 h-16 rounded-full bg-white border-[3px] border-[#0F172A] shadow-md flex items-center justify-center z-30 mb-6 md:mb-0 md:absolute md:top-[calc(50%-32px)] font-montserrat cursor-pointer"
                  >
                    <span className="text-2xl font-black text-[#0F172A]">
                      {item.number}
                    </span>
                  </motion.div>

                  {/* Card Content Wrapper */}
                  <motion.div
                    {...(isDesktop ? {} : mobileCardProps)}
                    style={isDesktop ? desktopCardStyle : {}}
                    className={`w-full flex-1 md:flex-initial md:absolute md:left-0 md:right-0 ${
                      isEven 
                        ? 'md:bottom-[calc(50%+50px)] md:top-auto' 
                        : 'md:top-[calc(50%+50px)] md:bottom-auto'
                    }`}
                  >
                    {/* Inner floating & hover card layer */}
                    <motion.div
                      animate={{
                        y: [0, isEven ? 8 : -8, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.4
                      }}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-[0_4px_25px_rgba(15,23,42,0.04)] w-full cursor-pointer h-full"
                    >
                      <h3 className="text-lg md:text-xl font-montserrat font-extrabold text-[#0F172A] tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 font-montserrat text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
