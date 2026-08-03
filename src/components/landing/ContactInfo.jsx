'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const INFO_ROWS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Address',
    value: 'E-Cell, IIT Kharagpur',
    sub: 'West Bengal, 721302, India',
    href: 'https://maps.google.com/?q=IIT+Kharagpur',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 8890054499',
    href: 'tel:+918890054499',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'sharma.samarth@ecell-iitkgp.in',
    href: 'mailto:sharma.samarth@ecell-iitkgp.in',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: 'Website',
    value: 'ecell-iitkgp.org',
    href: 'https://ecell-iitkgp.org',
  },
];

function ContactRow({ row, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={row.href}
      target={row.href.startsWith('http') ? '_blank' : undefined}
      rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08 + 0.1, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        group relative flex items-center gap-4 px-5 py-4
        text-gray-900 no-underline cursor-pointer
        transition-colors duration-200
        ${index < INFO_ROWS.length - 1 ? 'border-b border-gray-100' : ''}
      `}
      style={{
        backgroundColor: isHovered ? 'rgba(59,130,246,0.03)' : 'transparent',
      }}
    >
      {/* Icon */}
      <div className="relative flex-shrink-0">
        <motion.div
          transition={{ duration: 0.3 }}
          className="w-11 h-11 rounded-xl flex-shrink-0 bg-gray-50 border border-gray-200 flex items-center justify-center transition-all duration-200"
          style={{
            borderColor: isHovered ? '#93c5fd' : '#e5e7eb',
          }}
        >
          <motion.div
            animate={{
              color: isHovered ? '#3b82f6' : '#9ca3af',
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {row.icon}
          </motion.div>
        </motion.div>
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <motion.p
          animate={{
            color: isHovered ? '#3b82f6' : '#9ca3af',
          }}
          transition={{ duration: 0.2 }}
          className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1"
        >
          {row.label}
        </motion.p>
        <motion.p
          animate={{
            color: isHovered ? '#111827' : '#374151',
          }}
          transition={{ duration: 0.2 }}
          className="text-[0.9rem] font-semibold leading-tight mb-0.5 truncate"
        >
          {row.value}
        </motion.p>
        {row.sub && (
          <p className="text-[0.78rem] text-gray-400 leading-snug mt-1">{row.sub}</p>
        )}
      </div>

      {/* Chevron arrow */}
      <motion.div
        animate={{
          x: isHovered ? 4 : 0,
          color: isHovered ? '#3b82f6' : '#d1d5db',
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-sm flex-shrink-0 font-light"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>
    </motion.a>
  );
}

const rowVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08 + 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function ContactInfo() {
  return (
    <motion.div
      className="flex flex-col w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Header above card */}
      <motion.div custom={0} variants={rowVariants} className="mb-5">
        <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1.5">
          Contact Details
        </p>
        <p className="text-gray-500 text-[0.85rem] leading-relaxed max-w-sm">
          Reach out directly. We respond within one business day.
        </p>
      </motion.div>

      {/* Card with rows */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {INFO_ROWS.map((row, i) => (
          <ContactRow key={row.label} row={row} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
