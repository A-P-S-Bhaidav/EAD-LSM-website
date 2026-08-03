'use client';
import Image from 'next/image';

export default function Navbar({ user, onAuthClick, onMenuToggle }) {
  return (
    <div className="navbar_container u-container" id="w-node-_545319ae-733f-b4e8-5425-95c704c6b532-04c6b532">
      <div
        data-navbar=""
        className="flex items-center justify-between w-full"
        style={{ height: '60px' }}
      >

        {/* ── Logo — pinned to the left ── */}
        <a
          aria-current="page"
          href="/"
          className="flex items-center gap-2 flex-shrink-0 no-underline"
          style={{ height: '28px' }}
        >
          <Image
            src="/EAD-logo-transparent.png"
            alt="EAD"
            height={28}
            width={80}
            className="h-[28px] w-auto object-contain"
            priority
          />
          {/* Thin divider between the two logos */}
          <span
            className="hidden sm:block w-px h-[18px] flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          />
          <Image
            src="/LSM-logo-transparent.png"
            alt="LSM"
            height={28}
            width={80}
            className="hidden sm:block h-[28px] w-auto object-contain"
            priority
          />
        </a>

        {/* ── Nav links — centred absolutely so they don't push the logo ── */}
        <nav
          className="nav_links hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2"
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
              className="nav_link w-inline-block"
              data-hover="slideup"
              data-nav-link={navLink}
              href={href}
            >
              <div className="nav_link_text u-text-base" data-text-split="">
                {label}
              </div>
            </a>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="auth-btn"
            onClick={onAuthClick}
            className="bg-white text-darkbg border-none py-2 px-5 font-montserrat font-bold text-[0.8rem] tracking-wider cursor-pointer uppercase rounded-[2px] transition-all duration-300 ease-in-out hover:bg-neutral-200"
          >
            {user ? 'Logout' : 'Register'}
          </button>
          <button
            className="btn_btn lg:hidden"
            data-animate-btn=""
            data-menu-toggle=""
            onClick={onMenuToggle}
          >
            <div className="link_btn_text u-text-base">Menu</div>
            <div className="link_btn_line navbar" />
            <div className="link_btn_line is-2 navbar" />
          </button>
        </div>

      </div>
    </div>
  );
}
