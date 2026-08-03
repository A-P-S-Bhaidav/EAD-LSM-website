'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="footer_container" id="footer">
      <div className="footer_wrap u-container">
        <div className="footer_main_wrap">

          {/* Top: Three column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Column 1: Logo + Description + Image */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/EAD-logo-transparent.png"
                  alt="EAD Logo"
                  width={60}
                  height={28}
                  className="h-[28px] w-auto object-contain brightness-0 invert opacity-80"
                />
                <span className="w-px h-5" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
                <Image
                  src="/LSM-logo-transparent.png"
                  alt="LSM Logo"
                  width={60}
                  height={28}
                  className="h-[28px] w-auto object-contain brightness-0 invert opacity-80"
                />
              </div>
              <p className="text-[0.8rem] text-gray-400 leading-relaxed text-center md:text-left max-w-[280px]">
                Empowering the next generation of entrepreneurs through awareness drives and startup meets across India.
              </p>
              {/* Footer image */}
              <div className="mt-2 w-full max-w-[280px] rounded-xl overflow-hidden opacity-60">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&w=400&q=80"
                  alt="IIT Kharagpur Campus"
                  className="w-full h-[120px] object-cover grayscale"
                />
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Quick Links</p>
              {[
                { label: 'Home', href: '#home' },
                { label: 'About EAD & LSM', href: '#what-is-ead' },
                { label: 'Impact', href: '#impact' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Contact', href: '#contact' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 text-[0.85rem] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Column 3: Social + Address */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Connect With Us</p>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/ecell.iitkgp' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/e-cell-iit-kharagpur' },
                { label: 'Facebook', href: 'https://www.facebook.com/ecelliitkharagpur' },
                { label: 'Twitter / X', href: 'https://twitter.com/ecell_iitkgp' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-[0.85rem] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}

              {/* Address */}
              <div className="mt-4 pt-4 border-t border-gray-700/50 w-full">
                <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Address</p>
                <p className="text-gray-400 text-[0.8rem] leading-relaxed">
                  E-Cell, IIT Kharagpur<br />
                  Kharagpur, West Bengal<br />
                  721302, India
                </p>
              </div>

              {/* Website Link */}
              <div className="mt-3">
                <a
                  href="https://ecell-iitkgp.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-400 text-[0.82rem] font-semibold hover:text-blue-300 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  ecell-iitkgp.org
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer_bottom_wrap">
            <img 
              className="footer_bottom_svg" 
              src="/Ecell-logo.png" 
              alt="E-Cell IIT KGP Logo"
            />
            <div className="footer_copyright">
              <p className="u-text-sm">© {new Date().getFullYear()} E-Cell IIT KGP. All rights reserved.</p>
              <p className="u-text-sm footer_subtitle">Empowering Student Entrepreneurs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
