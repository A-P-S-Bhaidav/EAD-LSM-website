'use client';

export default function SocialWidget() {
  const socials = [
    { name: 'Instagram', url: 'https://www.instagram.com/iitkgp_ecell/', icon: '/instagram_logo.png', extraClass: 'scale-[1.3]' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ecellkgp/', icon: '/linkedin_logo.png' },
    { name: 'Facebook', url: 'https://www.facebook.com/ecell.iitkgp/', icon: '/facebook_logo.png' },
    { name: 'X', url: 'https://x.com/ecelliitkgp', icon: '/X_Logo.png' }
  ];

  return (
    <div className="fixed top-1/2 right-5 -translate-y-1/2 flex flex-col gap-3.5 z-[999]">
      {socials.map((s) => (
        <a 
          key={s.name} 
          className="block transition-transform duration-300 ease-in-out hover:scale-115 hover:-translate-x-1.25" 
          href={s.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src={s.icon} 
            alt={s.name} 
            className={`w-8 h-8 object-contain block ${s.extraClass || ''}`} 
          />
        </a>
      ))}
    </div>
  );
}
