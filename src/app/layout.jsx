import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'EAD-LSM | E-Cell IIT Kharagpur\'s PAN-India Initiative',
  description: 'EAD-LSM by E-Cell IIT Kharagpur connects 35K+ students, 100+ speakers, and 100+ startups across 20+ Indian cities. Discover events, speakers & register now.',
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
        <Script src="https://unpkg.com/lenis@1.3.17/dist/lenis.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
