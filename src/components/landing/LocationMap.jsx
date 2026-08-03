'use client';

import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

/**
 * Location Map Component
 * Shows IIT Kharagpur location with embedded map
 */
export default function LocationMap() {
  const location = {
    name: 'IIT Kharagpur',
    address: 'Kharagpur, West Bengal 721302, India',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.7373134042944!2d87.30915731495652!3d22.31963298533467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d440c9f3a6fd5%3A0x880ab6a62b1b5e6!2sIIT%20Kharagpur!5e0!3m2!1sen!2sin!4v1659447284123!5m2!1sen!2sin',
    directionsUrl: 'https://www.google.com/maps/dir//IIT+Kharagpur,+Kharagpur,+West+Bengal+721302/@22.3196329,87.3091573,17z'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative bg-[#0a0a0a] border border-neutral-800/80 rounded-2xl overflow-hidden group hover:border-neutral-700 transition-colors duration-300"
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-800/80">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                {location.name}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {location.address}
              </p>
            </div>
          </div>
          
          {/* Get Directions Link */}
          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors rounded-lg hover:bg-purple-500/10"
          >
            <span>Directions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Map Embed */}
      <div className="relative w-full h-[280px] bg-neutral-900">
        <iframe
          src={location.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
          title="IIT Kharagpur Location"
        />
        
        {/* Overlay gradient for better integration */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-neutral-900/50 border-t border-neutral-800/80">
        <p className="text-neutral-500 text-xs text-center">
          Home of E-Cell, IIT Kharagpur
        </p>
      </div>
    </motion.div>
  );
}
