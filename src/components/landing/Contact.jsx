'use client';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function Contact() {
  return (
    <section
      id="contact"
      data-last-section=""
      className="relative py-[14vh] overflow-hidden"
      style={{ backgroundColor: '#f0f1f5' }}
    >
      <div className="u-container relative z-10 px-6 md:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <p className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-gray-400 mb-4">
            06 &mdash; CONTACT
          </p>
          <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-black tracking-[-0.02em] text-gray-900 leading-[1.05] mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-500 text-[1rem] max-w-[560px] leading-[1.7] px-4">
            Have a question about EAD or LSM? We&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start max-w-[1200px] mx-auto">
          {/* Left column: Form */}
          <div className="w-full lg:w-[55%]">
            <ContactForm />
          </div>

          {/* Right column: Details */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6">
            <ContactInfo />
          </div>
        </div>

      </div>
    </section>
  );
}
