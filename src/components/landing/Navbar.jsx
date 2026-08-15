'use client';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar({ user, onAuthClick, onMenuToggle, onProfileClick }) {
  const router = useRouter();
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const initials = user?.email ? user.email[0].toUpperCase() : null;
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || null;
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navItems = [
    { label: 'Home',        href: isHomePage ? '#home' : '/' },
    { label: 'EAD & LSM',   href: isHomePage ? '#what-is-ead' : '/#what-is-ead' },
    { label: 'Impact',      href: isHomePage ? '#impact' : '/#impact' },
    { label: 'Gallery',     href: isHomePage ? '#gallery' : '/#gallery' },
    { label: 'Testimonials',href: isHomePage ? '#testimonials' : '/#testimonials' },
    { label: 'Contact',     href: isHomePage ? '#contact' : '/#contact' },
  ];

  return (
    <header className="fixed-navbar py-3 bg-transparent">
      <div className="navbar_container u-container relative">
        <div
          data-navbar=""
          className="flex items-center justify-between w-full"
          style={{ height: '54px' }}
        >

          {/*  Logo — pinned to the left  */}
          <Link
            aria-current="page"
            href="/"
            className="flex items-center gap-3 flex-shrink-0 no-underline relative z-20"
            style={{ height: '32px' }}
          >
            <Image
              src="/EAD-logo-transparent.png"
              alt="EAD"
              height={32}
              width={90}
              style={{ height: '32px', width: 'auto' }}
              className="object-contain"
              priority
            />
            <span
              className="hidden sm:block w-px h-[20px] flex-shrink-0 bg-slate-400/60"
            />
            <Image
              src="/LSM-logo-transparent.png"
              alt="LSM"
              height={32}
              width={90}
              style={{ height: '32px', width: 'auto' }}
              className="hidden sm:block object-contain"
              priority
            />
          </Link>

          {/*  Nav links — centred absolutely  */}
          <nav
            className="nav_links hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 z-20"
            id="w-node-_545319ae-733f-b4e8-5425-95c704c6b534-04c6b532"
          >
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                className="nav_link font-montserrat font-extrabold text-[0.875rem] tracking-wide transition-colors text-black hover:text-[#1E40AF] no-underline"
                data-hover="slideup"
                href={href}
              >
                <div className="nav_link_text text-black" data-text-split="">
                  {label}
                </div>
              </Link>
            ))}
          </nav>

          {/*  Right actions  */}
          <div className="flex items-center gap-3 flex-shrink-0 z-30 relative">
            {user ? (
              /* Avatar button — shown when logged in */
              <button
                id="auth-btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onProfileClick) onProfileClick();
                }}
                suppressHydrationWarning
                title={displayName || user.email}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7DA6A9)' }}
              >
                {initials}
                {/* Subtle glow ring */}
                <span className="absolute inset-0 rounded-xl ring-2 ring-white/30 pointer-events-none" />
              </button>
            ) : (
              /* Auth buttons — shown when logged out */
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsLoginModalOpen(true);
                  }}
                  suppressHydrationWarning
                  className="bg-white border border-[#2563EB]/40 hover:border-[#2563EB] text-[#2563EB] hover:bg-blue-50/50 py-2.5 px-5 font-montserrat font-extrabold text-[0.825rem] tracking-wider cursor-pointer uppercase rounded-lg shadow-sm transition-all duration-300 ease-in-out relative z-30 pointer-events-auto hover:scale-105 active:scale-95"
                >
                  Login
                </button>
                <button
                  id="auth-btn"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsRegModalOpen(true);
                  }}
                  suppressHydrationWarning
                  className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-none py-2.5 px-6 font-montserrat font-extrabold text-[0.825rem] tracking-wider cursor-pointer uppercase rounded-lg shadow-md transition-all duration-300 ease-in-out relative z-30 pointer-events-auto hover:scale-105 active:scale-95"
                >
                  Register
                </button>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-black focus:outline-none p-2 -mr-2 flex items-center justify-center relative z-[10000] pointer-events-auto bg-transparent border-none cursor-pointer"
              data-animate-btn=""
              data-menu-toggle=""
              onClick={onMenuToggle}
              suppressHydrationWarning
              aria-label="Toggle Menu"
            >
              {/* Keep the link_btn_text in the DOM but visually hidden to satisfy animations.js */}
              <div 
                className="link_btn_text" 
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0, overflow: 'hidden' }}
              >
                Menu
              </div>
              
              {/* Hamburger Icon */}
              <div className="hamburger-container">
                <span className="hamburger-line hamburger-line-1"></span>
                <span className="hamburger-line hamburger-line-2"></span>
                <span className="hamburger-line hamburger-line-3"></span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Registration Choice Modal */}
      {isRegModalOpen && (
        <div 
          className="fixed inset-0 z-[20000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300"
          onClick={() => setIsRegModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-[440px] shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/80 relative transform scale-100 transition-all duration-300 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setIsRegModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200/80 p-1.5 rounded-full transition-colors cursor-pointer border-none flex items-center justify-center"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header info */}
            <div className="text-left">
              <span className="text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded-full text-slate-700 bg-slate-100 border border-slate-200">
                Choose Track
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-3 mb-1.5 leading-tight">
                Select Your Event
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                Choose which registration track you would like to proceed with.
              </p>
            </div>

            {/* Option Cards */}
            <div className="flex flex-col gap-3">
              
              {/* EAD Card */}
              <button
                onClick={() => {
                  setIsRegModalOpen(false);
                  router.push('/register-ead');
                }}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-300 hover:shadow-xs transition-all duration-300 cursor-pointer flex gap-4 items-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  EAD
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-slate-800 leading-none group-hover:text-blue-700 transition-colors">
                    EAD Registration
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                    National Entrepreneurship roadshow and network sessions.
                  </p>
                </div>
                <span className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">➔</span>
              </button>

              {/* LSM Card */}
              <button
                onClick={() => {
                  setIsRegModalOpen(false);
                  router.push('/register-lsm');
                }}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-purple-50/40 hover:border-purple-300 hover:shadow-xs transition-all duration-300 cursor-pointer flex gap-4 items-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-extrabold flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  LSM
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-slate-800 leading-none group-hover:text-purple-700 transition-colors">
                    LSM Summit
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                    Startup summit, pitching track, and investor meets.
                  </p>
                </div>
                <span className="text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all">➔</span>
              </button>

            </div>

            {/* Login Toggle Link */}
            <div className="text-center pt-2.5 border-t border-slate-100 mt-1">
              <p className="text-xs text-slate-500 font-medium">
                Already registered?{' '}
                <button
                  onClick={() => {
                    setIsRegModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-bold bg-transparent border-none cursor-pointer p-0 underline inline"
                >
                  Log In here
                </button>
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Login Choice Modal */}
      {isLoginModalOpen && (
        <div 
          className="fixed inset-0 z-[20000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-[440px] shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/80 relative transform scale-100 transition-all duration-300 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200/80 p-1.5 rounded-full transition-colors cursor-pointer border-none flex items-center justify-center"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header info */}
            <div className="text-left">
              <span className="text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded-full text-slate-700 bg-slate-100 border border-slate-200">
                Choose Track
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-3 mb-1.5 leading-tight">
                Select Your Login
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                Choose which registration track you would like to log in to.
              </p>
            </div>

            {/* Option Cards */}
            <div className="flex flex-col gap-3.5">
              
              {/* EAD Login Card */}
              <button
                onClick={() => {
                  setIsLoginModalOpen(false);
                  router.push('/ead/login');
                }}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-300 hover:shadow-xs transition-all duration-300 cursor-pointer flex gap-4 items-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  EAD
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-slate-800 leading-none group-hover:text-blue-700 transition-colors">
                    EAD Login
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                    National Entrepreneurship roadshow and network sessions.
                  </p>
                </div>
                <span className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">➔</span>
              </button>

              {/* LSM Login Card */}
              <button
                onClick={() => {
                  setIsLoginModalOpen(false);
                  router.push('/lsm/login');
                }}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-purple-50/40 hover:border-purple-300 hover:shadow-xs transition-all duration-300 cursor-pointer flex gap-4 items-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-extrabold flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  LSM
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-slate-800 leading-none group-hover:text-purple-700 transition-colors">
                    LSM Login
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                    Startup summit, pitching track, and investor meets.
                  </p>
                </div>
                <span className="text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all">➔</span>
              </button>

            </div>

            {/* Register Link Toggle */}
            <div className="text-center pt-2.5 border-t border-slate-100 mt-1">
              <p className="text-xs text-slate-500 font-medium">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsRegModalOpen(true);
                  }}
                  className="text-purple-600 hover:text-purple-700 font-bold bg-transparent border-none cursor-pointer p-0 underline inline"
                >
                  Register here
                </button>
              </p>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
