'use client';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer_container w-full bg-[#7DA6A9] text-[#0F172A] pt-16 pb-8 font-montserrat">
      <div className="u-container max-w-7xl mx-auto px-6">
        
        {/* Main Grid: E-Cell Logo Left + EAD/LSM Logos & Links Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: E-Cell Logo (Centered & Enlarged) */}
          <div className="lg:col-span-4 flex items-center justify-center h-full self-center">
            <Image
              src="/Ecell-logo.png"
              alt="E-Cell IIT Kharagpur Logo"
              width={300}
              height={300}
              className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto object-contain mx-auto"
              priority
            />
          </div>

          {/* Right Column: EAD & LSM Logos Header + 3 Navigation Columns */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* EAD & LSM Logos Header */}
            <div className="flex items-center gap-5 flex-wrap">
              <Image
                src="/EAD-logo-transparent.png"
                alt="EAD Logo"
                width={180}
                height={60}
                className="h-10 md:h-14 w-auto object-contain"
                priority
              />
              <span className="w-px h-8 md:h-10 bg-[#0F172A]/30" />
              <Image
                src="/LSM-logo-transparent.png"
                alt="LSM Logo"
                width={180}
                height={60}
                className="h-10 md:h-14 w-auto object-contain"
                priority
              />
            </div>

            {/* 3 Links Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              
              {/* Column 1: About Us */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-[#0F172A] font-montserrat mb-1">
                  About Us
                </h3>
                <a href="#what-is-ead" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Mission
                </a>
                <a href="#ead-lsm-flow" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Our Flow
                </a>
                <a href="#impact" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Impact &amp; Metrics
                </a>
              </div>

              {/* Column 2: Support */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-[#0F172A] font-montserrat mb-1">
                  Support
                </h3>
                <a href="#contact" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Contact Us
                </a>
                <a href="#testimonials" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Community Feedback
                </a>
                <a href="#gallery" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Gallery Showcase
                </a>
              </div>

              {/* Column 3: Social */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-[#0F172A] font-montserrat mb-1">
                  Social
                </h3>
                <a href="https://www.instagram.com/iitkgp_ecell/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/ecellkgp/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  LinkedIn
                </a>
                <a href="https://www.facebook.com/ecell.iitkgp/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Facebook
                </a>
                <a href="https://x.com/ecelliitkgp" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#0F172A] transition-colors">
                  Twitter / X
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Horizontal Separator Bar */}
        <div className="pt-6 border-t border-[#0F172A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#0F172A]/90">
          <div>
            Copyright &copy; {new Date().getFullYear()} E-Cell, IIT Kharagpur
          </div>

          <div>
            Terms of Service
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:opacity-85 transition-opacity cursor-pointer text-xs font-semibold"
          >
            <span>Back to top</span>
            <span className="p-1 rounded-md border border-[#0F172A]/40 flex items-center justify-center">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
