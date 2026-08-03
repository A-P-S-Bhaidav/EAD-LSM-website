'use client';
import { TestimonialsColumns } from '@/components/ui/testimonial-v2';

export default function Testimonials() {
  return (
    <div id="testimonials" className="max-h-[120vh] py-[10vh] border-t-0 overflow-y-hidden" style={{ backgroundColor: '#f8f9fb' }}>
      <div className="u-container">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-gray-400 mb-4">
            05 — TESTIMONIALS
          </div>
          <h2
            className="font-black tracking-tight text-gray-900 leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            What our partners say about<br />
            <span className="text-gray-400">the ecosystems we build together.</span>
          </h2>
        </div>
        <div className="flex justify-center">
          <TestimonialsColumns />
        </div>
      </div>
    </div>
  );
}
