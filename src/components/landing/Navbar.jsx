'use client';
import Image from 'next/image';

export default function Navbar({ user, onAuthClick, onMenuToggle }) {
  return (
    <header className="fixed-navbar py-3 bg-transparent">
      <div className="navbar_container u-container relative">
        <div
          data-navbar=""
          className="flex items-center justify-between w-full"
          style={{ height: '54px' }}
        >

          {/* ── Logo — pinned to the left ── */}
          <a
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
              className="h-[32px] w-auto object-contain"
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
              className="hidden sm:block h-[32px] w-auto object-contain"
              priority
            />
          </a>

          {/* ── Nav links — centred absolutely ── */}
          <nav
            className="nav_links hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 z-20"
            id="w-node-_545319ae-733f-b4e8-5425-95c704c6b534-04c6b532"
          >
            {[
              { label: 'Home',        href: '#home',       navLink: 'home'              },
              { label: 'EAD & LSM',   href: '#what-is-ead', navLink: 'what-is-ead,-lsm' },
              { label: 'Impact',      href: '#impact',     navLink: 'impact-script'     },
              { label: 'Gallery',     href: '#gallery',    navLink: 'gallery'           },
              { label: 'Testimonials',href: '#testimonials',navLink: 'testimonials'     },
              { label: 'Contact',     href: '#contact',    navLink: 'contact'           },
            ].map(({ label, href, navLink }) => (
              <a
                key={href}
                className="nav_link font-montserrat font-extrabold text-[0.875rem] tracking-wide transition-colors text-black hover:text-[#1E40AF]"
                data-hover="slideup"
                data-nav-link={navLink}
                href={href}
              >
                <div className="nav_link_text text-black" data-text-split="">
                  {label}
                </div>
              </a>
            ))}
          </nav>

          {/* ── Right actions — Register Button ── */}
          <div className="flex items-center gap-3 flex-shrink-0 z-30 relative">
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
              {user ? 'Logout' : 'Register'}
            </button>
            <button
              className="btn_btn lg:hidden text-black font-extrabold"
              data-animate-btn=""
              data-menu-toggle=""
              onClick={onMenuToggle}
              suppressHydrationWarning
            >
              <div className="link_btn_text u-text-base text-black">Menu</div>
              <div className="link_btn_line navbar bg-black" />
              <div className="link_btn_line is-2 navbar bg-black" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
