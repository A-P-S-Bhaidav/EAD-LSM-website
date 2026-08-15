'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function TestimonialsColumn({
  className = '',
  testimonials = [],
  duration = 14,
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="testimonials-list"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, handle, date }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? 'true' : 'false'}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)',
                  transition: { type: 'spring', stiffness: 400, damping: 20 },
                }}
                className="testimonial-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="testimonial-avatar flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[11px] font-montserrat tracking-wider uppercase select-none"
                    >
                      {(() => {
                        if (!name) return '';
                        const parts = name.trim().split(/\s+/);
                        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
                        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                      })()}
                    </div>
                    <div>
                      <h4 className="testimonial-name">{name}</h4>
                      {handle && (
                        <p className="text-[10px] font-semibold text-slate-500 font-montserrat mt-0.5 leading-tight">
                          {handle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Twitter / X Icon */}
                  <svg
                    className="w-4 h-4 text-neutral-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>

                <p className="testimonial-text mb-4">&ldquo;{text}&rdquo;</p>

                <span className="testimonial-date">{date}</span>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}
