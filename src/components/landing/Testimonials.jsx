'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestimonialsColumns } from '@/components/ui/testimonial-v2';
import { studentTestimonials, speakerTestimonials } from '@/components/ui/testimonials-data';

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('Students');
  
  const currentData = activeTab === 'Students' ? studentTestimonials : speakerTestimonials;

  return (
    <section id="testimonials" className="py-[12vh] relative overflow-hidden bg-[#7DA6A9]">
      <div className="u-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT SIDE: COMMUNITY HEADER & DESCRIPTION ── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A] block mb-4">
                Community
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] leading-[1.08] tracking-tight font-montserrat mb-6">
                We believe in the power of community
              </h2>

              <p className="text-[#0F172A]/85 font-montserrat text-sm md:text-base font-medium leading-relaxed max-w-md mb-8">
                Our goal is to create an ecosystem that founders love and rely on every day. This is why we&apos;re constantly scaling our drives across 30+ cities to connect ambitious innovators with capital, mentors, and networks.
              </p>

              {/* Tab Switcher */}
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-1.5 rounded-2xl w-fit border border-white/30 shadow-xs">
                {['Students', 'Speakers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-2.5 rounded-xl text-sm font-bold font-montserrat transition-colors duration-300 ${
                      activeTab === tab ? 'text-[#0F172A]' : 'text-[#0F172A]/60 hover:text-[#0F172A]'
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="active-testimonial-tab"
                        className="absolute inset-0 bg-white rounded-xl shadow-xs"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT SIDE: VERTICAL SCROLLING TWEET CARDS ── */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                <TestimonialsColumns data={currentData} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
