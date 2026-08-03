'use client';
import React from 'react';
import TestimonialsColumn from './TestimonialsColumn';
import { firstColumn, secondColumn, thirdColumn } from './testimonials-data';
import './testimonials.css';

export const TestimonialsColumns = () => {
  return (
    <div className="testimonials-container">
      <TestimonialsColumn 
        testimonials={firstColumn} 
        duration={15} 
        className="testimonials-column"
      />
      <TestimonialsColumn 
        testimonials={secondColumn} 
        duration={19} 
        className="testimonials-column hidden md-block"
      />
      <TestimonialsColumn 
        testimonials={thirdColumn} 
        duration={17} 
        className="testimonials-column hidden lg-block"
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
