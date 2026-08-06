'use client';
import React, { useMemo } from 'react';
import TestimonialsColumn from './TestimonialsColumn';
import { Testimonial } from './testimonials-data';
import './testimonials.css';

interface TestimonialsColumnsProps {
  data: Testimonial[];
}

export const TestimonialsColumns: React.FC<TestimonialsColumnsProps> = ({ data }) => {
  const firstColumn = useMemo(() => data.slice(0, Math.ceil(data.length / 2)), [data]);
  const secondColumn = useMemo(() => data.slice(Math.ceil(data.length / 2)), [data]);

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
