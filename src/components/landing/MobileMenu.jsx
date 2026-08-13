'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MobileMenu({ onLinkClick }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const menuLinks = [
    { label: 'Home', href: isHomePage ? '#home' : '/' },
    { label: 'EAD & LSM', href: isHomePage ? '#what-is-ead' : '/#what-is-ead' },
    { label: 'Impact', href: isHomePage ? '#impact' : '/#impact' },
    { label: 'Gallery', href: isHomePage ? '#gallery' : '/#gallery' },
    { label: 'Testimonials', href: isHomePage ? '#testimonials' : '/#testimonials' },
    { label: 'Contact', href: isHomePage ? '#contact' : '/#contact' }
  ];

  const handleLinkClick = () => {
    const menu = document.querySelector('[data-nav-menu]');
    if (menu) {
      menu.style.display = 'none';
      document.documentElement.classList.remove('menu-open');
    }
    if (onLinkClick) onLinkClick();
  };

  return (
    <div className="nav_menu" data-nav-menu="">
      <div className="nav_menu_inner_wrap">
        <div className="nav_menu_links">
          {menuLinks.map((link) => (
            <Link 
              key={link.label}
              className="nav_menu_link w-inline-block no-underline" 
              data-nav-menu-link="" 
              href={link.href}
              onClick={handleLinkClick}
            >
              <div className="nav_menu_link_text u-text-xl text-white" data-lines="true" data-text-split="mask">
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
