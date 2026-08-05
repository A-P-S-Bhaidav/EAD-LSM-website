'use client';
import Script from 'next/script';
import useLandingState from '@/hooks/useLandingState';
import Loader from '@/components/landing/Loader';
import Navbar from '@/components/landing/Navbar';
import MobileMenu from '@/components/landing/MobileMenu';
import Hero from '@/components/landing/Hero';
import WhatIsEAD from '@/components/landing/WhatIsEAD';
import Impact from '@/components/landing/Impact';
import EadLsmFlow from '@/components/landing/EadLsmFlow';
import Gallery from '@/components/landing/Gallery';
import Testimonials from '@/components/landing/Testimonials';
import RegisterNow from '@/components/landing/RegisterNow';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import AuthModal from '@/components/landing/AuthModal';
import LuckyDrawModal from '@/components/landing/LuckyDrawModal';
import EadLsmPopup from '@/components/landing/EadLsmPopup';
import QuestionnaireModal from '@/components/landing/QuestionnaireModal';
import ProjectModal from '@/components/landing/ProjectModal';
import CustomCursor from '@/components/landing/CustomCursor';
import SocialWidget from '@/components/landing/SocialWidget';

export default function Home() {
  const {
    user, authOpen, setAuthOpen, luckyOpen, setLuckyOpen, hasEAD,
    showDraw, drawText, sendOTP, signInWithGoogle, logoutUser, generateLuckyNumber,
    showPopup, handlePopupSelect, handlePopupClose,
    questionnaireOpen, setQuestionnaireOpen, handleQuestionnaireSubmit,
  } = useLandingState();

  const handleMenuToggle = () => {
    const menu = document.querySelector('[data-nav-menu]');
    if (menu) {
      const isVisible = menu.style.display === 'flex';
      if (window.__closeMobileMenu && isVisible) {
        window.__closeMobileMenu();
      } else if (window.gsap) {
        window.gsap.set(menu, { display: 'flex' });
        window.gsap.to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.out' });
      }
    }
  };

  return (
    <>
      <Loader />
      <div className="wrapper">
        <div className="overlay"></div>
        <div className="page_wrap" data-barba="wrapper">
          <Navbar 
            user={user} 
            onAuthClick={user ? logoutUser : () => setAuthOpen(true)} 
            onMenuToggle={handleMenuToggle} 
          />
          <MobileMenu onLinkClick={() => window.__closeMobileMenu?.()} />
          <div className="main_wrap" data-barba="container" data-barba-namespace="home">
            <Hero 
              hasEAD={hasEAD} 
              showLuckyDrawBtn={showDraw} 
              luckyDrawText={drawText} 
              onLuckyDrawClick={() => setLuckyOpen(true)} 
            />
            <WhatIsEAD />
            <Impact />
            <EadLsmFlow />
            <Gallery />
            <Testimonials />
            <Contact />
            <Footer />
          </div>
          <div className="page_transition" data-page-transition="" id="page-transition"></div>
        </div>
      </div>
      <CustomCursor />
      <ProjectModal />
      <SocialWidget />

      {/* EAD/LSM Selection Popup */}
      <EadLsmPopup
        isOpen={showPopup}
        onSelect={handlePopupSelect}
        onClose={handlePopupClose}
      />

      {/* Initial Questionnaire */}
      <QuestionnaireModal
        isOpen={questionnaireOpen}
        onClose={() => setQuestionnaireOpen(false)}
        onSubmit={handleQuestionnaireSubmit}
      />

      {/* Auth / Registration Modal */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        sendOTP={sendOTP} 
        signInWithGoogle={signInWithGoogle} 
      />
      <LuckyDrawModal 
        isOpen={luckyOpen} 
        onClose={() => setLuckyOpen(false)} 
        onGenerate={generateLuckyNumber} 
      />
      
      {/* Animations Script */}
      <Script src="/animations.js" strategy="lazyOnload" />
    </>
  );
}
