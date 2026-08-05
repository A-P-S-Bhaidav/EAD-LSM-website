'use client';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/iitkgp_ecell/',
    brandColor: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white',
    activeGlow: 'hover:shadow-[0_0_18px_rgba(236,72,153,0.4)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/ecellkgp/',
    brandColor: 'hover:bg-[#0A66C2] hover:text-white',
    activeGlow: 'hover:shadow-[0_0_18px_rgba(10,102,194,0.4)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/ecell.iitkgp/',
    brandColor: 'hover:bg-[#1877F2] hover:text-white',
    activeGlow: 'hover:shadow-[0_0_18px_rgba(24,119,242,0.4)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://x.com/ecelliitkgp',
    brandColor: 'hover:bg-slate-900 hover:text-white',
    activeGlow: 'hover:shadow-[0_0_18px_rgba(15,23,42,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function SocialWidget() {
  return (
    <aside
      aria-label="Social Media Links"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] hidden sm:flex flex-col items-center bg-white/90 backdrop-blur-xl border-l border-y border-slate-200/80 rounded-l-xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] p-2 gap-2"
    >
      {SOCIAL_LINKS.map((s) => (
        <motion.a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          title={s.name}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`w-9 h-9 rounded-lg bg-slate-100/90 border border-slate-200/70 flex items-center justify-center text-slate-700 transition-all duration-300 ${s.brandColor} ${s.activeGlow}`}
        >
          {s.icon}
        </motion.a>
      ))}
    </aside>
  );
}
