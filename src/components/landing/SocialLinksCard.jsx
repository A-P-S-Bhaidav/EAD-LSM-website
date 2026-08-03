'use client';

import { motion } from 'framer-motion';
import { Globe, ExternalLink } from 'lucide-react';

/**
 * Social Links Card Component
 * Shows social media links in a premium card design
 */

// Custom Social Media Icon Components
const LinkedInIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function SocialLinksCard() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      url: 'https://www.linkedin.com/company/e-cell-iit-kharagpur',
      color: '#0A66C2',
      handle: '@ecell-iitkgp'
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/ecell.iitkgp',
      color: '#E4405F',
      handle: '@ecell.iitkgp'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: 'https://www.facebook.com/ecelliitkharagpur',
      color: '#1877F2',
      handle: '@ecelliitkharagpur'
    },
    {
      name: 'X (Twitter)',
      icon: XIcon,
      url: 'https://twitter.com/ecell_iitkgp',
      color: '#000000',
      handle: '@ecell_iitkgp'
    },
    {
      name: 'Website',
      icon: Globe,
      url: 'https://www.ecell-iitkgp.org',
      color: '#a855f7',
      handle: 'ecell-iitkgp.org'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative bg-[#0a0a0a] border border-neutral-800/80 rounded-2xl p-6 hover:border-neutral-700 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg">
          Connect With Us
        </h3>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-500/60" />
          <div className="w-2 h-2 rounded-full bg-purple-500/40" />
          <div className="w-2 h-2 rounded-full bg-purple-500/20" />
        </div>
      </div>

      {/* Social Links Grid */}
      <div className="space-y-3">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ x: 4 }}
              className="group flex items-center justify-between p-3.5 bg-neutral-900/50 border border-neutral-800/60 rounded-xl hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300"
            >
              {/* Left: Icon + Info */}
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: `${social.color}15`,
                    borderColor: `${social.color}30`
                  }}
                >
                  <Icon 
                    className="w-4 h-4 transition-colors duration-300" 
                    style={{ color: social.color }}
                  />
                </div>
                
                <div>
                  <div className="text-white text-sm font-semibold mb-0.5">
                    {social.name}
                  </div>
                  <div className="text-neutral-500 text-xs font-mono">
                    {social.handle}
                  </div>
                </div>
              </div>

              {/* Right: External Link Icon */}
              <ExternalLink 
                className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors duration-300 opacity-0 group-hover:opacity-100" 
              />
            </motion.a>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-5 border-t border-neutral-800/60">
        <p className="text-neutral-500 text-xs text-center leading-relaxed">
          Follow us for updates on events, workshops, and entrepreneurship news
        </p>
      </div>
    </motion.div>
  );
}
