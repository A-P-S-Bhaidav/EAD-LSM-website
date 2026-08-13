'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar({ user, onAuthClick, onMenuToggle, onProfileClick }) {
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

          {/* ── Logo — pinned to the left ── */}
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

          {/* ── Nav links — centred absolutely ── */}
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

          {/* ── Right actions ── */}
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
              /* Register button — shown when logged out */
              <button
                id="auth-btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onAuthClick) onAuthClick();
                }}
                suppressHydrationWarning
                className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-none py-2.5 px-6 font-montserrat font-extrabold text-[0.825rem] tracking-wider cursor-pointer uppercase rounded-lg shadow-md transition-all duration-300 ease-in-out relative z-30 pointer-events-auto hover:scale-105 active:scale-95"
              >
                Register
              </button>
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
    </header>
  );
}
