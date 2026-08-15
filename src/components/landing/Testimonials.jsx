'use client';
import { motion } from 'framer-motion';
import { TestimonialsColumns } from '@/components/ui/testimonial-v2';
import { studentTestimonials, speakerTestimonials } from '@/components/ui/testimonials-data';

export default function Testimonials() {
  // Merge student and speaker testimonials in an interleaved fashion
  const combinedData = [];
  const maxLen = Math.max(studentTestimonials.length, speakerTestimonials.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < speakerTestimonials.length) {
      combinedData.push(speakerTestimonials[i]);
    }
    if (i < studentTestimonials.length) {
      combinedData.push(studentTestimonials[i]);
    }
  }

  return (
    <section id="testimonials" className="py-[12vh] relative overflow-hidden bg-[#7DA6A9]">
      <div className="u-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/*  LEFT SIDE: COMMUNITY HEADER & DESCRIPTION  */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F172A] block mb-4">
                Our Community
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] leading-[1.08] tracking-tight font-montserrat mb-6">
                We believe in the power of community
              </h2>

              <p className="text-[#0F172A]/85 font-montserrat text-sm md:text-base font-semibold leading-relaxed max-w-md">
                EAD-LSM has hosted voices like Deepit Purkayastha (Co-Founder &amp; CEO, Inshorts), Ashutosh Naik (Chief Commercial Officer, Groww), and Ram Mohan Rao (Executive Director, SEBI), bringing real startup and investment experience directly to students.
              </p>
            </motion.div>
          </div>

          {/*  RIGHT SIDE: VERTICAL SCROLLING TWEET CARDS  */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[500px]">
            <div className="w-full h-full flex items-center justify-center">
              <TestimonialsColumns data={combinedData} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
