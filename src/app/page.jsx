'use client';
import { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';

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
import ProfileModal from '@/components/landing/ProfileModal';
import SocialWidget from '@/components/landing/SocialWidget';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [splitTextLoaded, setSplitTextLoaded] = useState(false);

  useLayoutEffect(() => {
    // Expose gsap globals
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;
    window.Flip = Flip;
    window.Draggable = Draggable;

    // Load SplitText dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js';
    script.onload = () => {
      if (window.SplitText) {
        gsap.registerPlugin(window.SplitText);
      }
      setSplitTextLoaded(true);
    };
    script.onerror = () => {
      setSplitTextLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const {
    user, authOpen, setAuthOpen, luckyOpen, setLuckyOpen, hasEAD,
    showDraw, drawText, sendOTP, verifyOTP, signInWithGoogle, logoutUser, generateLuckyNumber,
    showPopup, handlePopupSelect, handlePopupClose,
    questionnaireOpen, setQuestionnaireOpen, handleQuestionnaireSubmit,
    profileOpen, setProfileOpen,
  } = useLandingState();

  const handleMenuToggle = () => {
    // On the homepage, animations.js is active and attaches its own
    // vanilla event listener to [data-menu-toggle]. We let it handle
    // the toggle to avoid event conflicts.
  };

  return (
    <>
      <Loader />
      <div className="wrapper">
        <div className="overlay"></div>
        <div className="page_wrap" data-barba="wrapper">
          <Navbar 
            user={user} 
            onAuthClick={() => router.push('/register-ead')} 
            onMenuToggle={handleMenuToggle}
            onProfileClick={() => router.push('/profile')}
          />
          <MobileMenu onLinkClick={() => window.__closeMobileMenu?.()} />
          <div className="main_wrap" data-barba="container" data-barba-namespace="home">
            <Hero 
              hasEAD={hasEAD} 
              showLuckyDrawBtn={showDraw} 
              luckyDrawText={drawText} 
              onLuckyDrawClick={() => setLuckyOpen(true)} 
              onRegisterClick={() => setAuthOpen(true)}
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
        verifyOTP={verifyOTP} 
        signInWithGoogle={signInWithGoogle} 
      />

      {/* Lucky Draw Modal */}
      <LuckyDrawModal 
        isOpen={luckyOpen} 
        onClose={() => setLuckyOpen(false)} 
        onGenerate={generateLuckyNumber} 
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onLogout={logoutUser}
      />
      
      {/* Animations Script */}
      {splitTextLoaded && <Script src="/animations.js" strategy="lazyOnload" />}
    </>
  );
}
