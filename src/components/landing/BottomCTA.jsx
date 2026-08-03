'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Bottom CTA Component
 * Final call-to-action at the bottom of the Contact section
 */
export default function BottomCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-20 pt-16 border-t border-neutral-800/50"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
          Ready to Start Your Journey?
        </h3>
        
        {/* Description */}
        <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          Join thousands of entrepreneurs who've transformed their ideas into thriving businesses through EAD.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 flex items-center gap-2"
          >
            <span className="relative z-10">Explore EAD</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#impact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-transparent border-2 border-neutral-700 text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/10 flex items-center gap-2"
          >
            <span>View Impact</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-neutral-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>30+ Cities</span>
          </div>
          <div className="w-px h-4 bg-neutral-700" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>30K+ Students</span>
          </div>
          <div className="w-px h-4 bg-neutral-700" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>₹10Cr+ Capital</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
