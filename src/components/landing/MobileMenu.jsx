'use client';

export default function MobileMenu({ onLinkClick }) {
  const menuLinks = [
    { label: 'Home', href: '#home' },
    { label: 'EAD & LSM', href: '#what-is-ead' },
    { label: 'Impact', href: '#impact' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div className="nav_menu" data-nav-menu="">
      <div className="nav_menu_inner_wrap">
        <div className="nav_menu_links">
          {menuLinks.map((link) => (
            <a 
              key={link.label}
              className="nav_menu_link w-inline-block" 
              data-nav-menu-link="" 
              href={link.href}
              onClick={onLinkClick}
            >
              <div className="nav_menu_link_text u-text-xl" data-lines="true" data-text-split="mask">
                {link.label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
