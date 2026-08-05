'use client';
import React from 'react';
import TestimonialsColumn from './TestimonialsColumn';
import { firstColumn, secondColumn } from './testimonials-data';
import './testimonials.css';

export const TestimonialsColumns = () => {
  return (
    <div className="testimonials-container">
      <TestimonialsColumn 
        testimonials={firstColumn} 
        duration={18} 
        className="testimonials-column"
      />
      <TestimonialsColumn 
        testimonials={secondColumn} 
        duration={22} 
        className="testimonials-column"
      />
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section style={{ backgroundColor: 'transparent', width: '100%' }}>
      <TestimonialsColumns />
    </section>
  );
}
