'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from './testimonials-data';

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

export default function TestimonialsColumn({
  className = '',
  testimonials,
  duration = 10,
}: TestimonialsColumnProps) {
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
            {testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? 'true' : 'false'}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                whileFocus={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                className="testimonial-card"
              >
                <blockquote style={{ margin: 0, padding: 0 }}>
                  <p className="testimonial-text">{text}</p>
                  <footer className="testimonial-footer">
                    <img
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-info">
                      <cite className="testimonial-name" style={{ fontStyle: 'normal' }}>{name}</cite>
                      <span className="testimonial-role">{role}</span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}
