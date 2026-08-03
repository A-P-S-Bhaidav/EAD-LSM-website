import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'EAD-LSM',
  description: 'A creative studio building visual identity systems that endure.',
  icons: {
    icon: '/Ecell-favicon.png',
    apple: '/Ecell-favicon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="js-off">
      <body className="body">
        {children}
        
        {/* Core Scripts */}
        <Script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=692f53da90a5f4498d0dc837" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/lenis@1.3.17/dist/lenis.min.js" strategy="beforeInteractive" />
        
        {/* Register GSAP Plugins */}
        <Script id="register-gsap" strategy="afterInteractive">
          {`
            if (typeof gsap !== 'undefined') {
              gsap.registerPlugin(Flip, ScrollTrigger, Draggable);
              if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
