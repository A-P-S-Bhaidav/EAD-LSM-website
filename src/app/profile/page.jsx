'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { queryDatabase } from '@/lib/db-client';
import useLandingState from '@/hooks/useLandingState';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileMenu from '@/components/landing/MobileMenu';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logoutUser } = useLandingState();

  const handleMenuToggle = () => {
    const menu = document.querySelector('[data-nav-menu]');
    if (menu) {
      const isVisible = menu.style.display === 'flex';
      if (isVisible) {
        menu.style.display = 'none';
        document.documentElement.classList.remove('menu-open');
      } else {
        menu.style.display = 'flex';
        document.documentElement.classList.add('menu-open');
      }
    }
  };

  const handleMenuClose = () => {
    const menu = document.querySelector('[data-nav-menu]');
    if (menu) {
      menu.style.display = 'none';
      document.documentElement.classList.remove('menu-open');
    }
  };

  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      const fetchProfileData = async () => {
        setLoading(true);
        try {
          // Fetch lucky numbers
          const { data: draws } = await queryDatabase('getUserLuckyDraws', { email: user.email });

          setLuckyNumbers(draws || []);

          // Fetch questionnaire response
          const { data: quest } = await queryDatabase('getLatestQuestionnaire', { email: user.email });

          if (quest && quest.length > 0) {
            setQuestionnaire(quest[0]);
          }
        } catch (e) {
          console.error('Error fetching profile sub-data:', e);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSignOut = async () => {
    await logoutUser();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F4F7F9] font-montserrat">
        <Navbar user={user} onMenuToggle={handleMenuToggle} onProfileClick={() => { }} />
        <MobileMenu onLinkClick={handleMenuClose} />
        <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-80px)] pt-24 pb-12 px-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F4F7F9] font-montserrat">
        <Navbar user={user} onMenuToggle={handleMenuToggle} onProfileClick={() => { }} />
        <MobileMenu onLinkClick={handleMenuClose} />
        <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-80px)] pt-24 pb-12 px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-[440px] shadow-[0_15px_40px_rgba(15,23,42,0.05)] border border-slate-200/60 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Please register using the official forms below.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdKt9Gdi38ylyrosM1tvcxfjtBnSNtJtsUloC_0g5u_ctCRuw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors text-center no-underline block"
              >
                Register for EAD Drive
              </a>
              <a
                href="https://docs.google.com/forms/d/1GAFX0tb9pRztjLgdCw4_650h4piK1RTvXw8GzNiZJdA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors text-center no-underline block"
              >
                Register for LSM Summit
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const email = user.email || '';
  const events = user.user_metadata?.registered_events || [];
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || questionnaire?.name || 'Innovator';

  // Smart Initials logic to avoid showing numeric characters (e.g. from 123@gmail.com)
  const initials = (() => {
    if (displayName && displayName !== 'Innovator') {
      const parts = displayName.trim().split(/\s+/);
      if (parts.length > 1) {
        const init = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        if (/^[A-Z]{2}$/.test(init)) return init;
      }
      const singleInit = parts[0].slice(0, 2).toUpperCase();
      if (/^[A-Z]/.test(singleInit)) return singleInit;
    }

    const emailParts = email.split('@')[0];
    const letters = emailParts.replace(/[^a-zA-Z]/g, '');
    if (letters.length >= 2) return letters.slice(0, 2).toUpperCase();
    if (letters.length === 1) return letters.toUpperCase() + 'N';

    return 'IN';
  })();

  // Parse custom startup details if LSM
  const parseStartupDetails = (expText) => {
    if (!expText || !expText.startsWith('Startup:')) return null;
    const lines = expText.split('\n');
    const details = {};
    lines.forEach(line => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.substring(0, idx).trim();
        const value = line.substring(idx + 1).trim();
        details[key] = value;
      }
    });
    return details;
  };

  const startup = parseStartupDetails(questionnaire?.experience);
  const isEadRegistered = events.includes('EAD') || luckyNumbers.length > 0;
  const isLsmRegistered = events.includes('LSM') || !!startup;

  const getBadgeColor = () => {
    if (isEadRegistered && isLsmRegistered) return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
    if (isLsmRegistered) return 'bg-purple-50 text-purple-700 border border-purple-200';
    return 'bg-blue-50 text-blue-700 border border-blue-200';
  };

  const getBadgeText = () => {
    if (isEadRegistered && isLsmRegistered) return 'Dual Track Pass';
    if (isLsmRegistered) return 'LSM Founder';
    if (isEadRegistered) return 'EAD Innovator';
    return 'General Pass';
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] font-montserrat relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-purple-400/10 blur-[120px] pointer-events-none" />

      <Navbar
        user={user}
        onAuthClick={() => { }}
        onMenuToggle={handleMenuToggle}
        onProfileClick={() => router.push('/profile')}
      />
      <MobileMenu onLinkClick={handleMenuClose} />

      <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-80px)] pt-24 pb-12 px-4 relative z-10">
        <div className="u-container max-w-4xl mx-auto w-full">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

            {/* Left Column - Redesigned User Card */}
            <div className="md:col-span-4 backdrop-blur-md bg-white/75 rounded-3xl p-6 shadow-[0_20px_50px_rgba(15,23,42,0.04)] border border-white/60 text-center flex flex-col items-center justify-between transition-all duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.07)]">
              <div className="flex flex-col items-center w-full">
                {/* Avatar with custom gradient ring */}
                <div className="relative mb-5 group">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur-xs transition duration-300 group-hover:opacity-100" />
                  <div
                    className="relative w-20 h-20 bg-slate-900 rounded-[22px] flex items-center justify-center text-2xl font-black text-white shadow-inner select-none font-mono"
                  >
                    {initials}
                  </div>
                </div>

                <h2 className="text-lg font-black text-slate-800 leading-tight mb-1 truncate w-full px-2">
                  {displayName}
                </h2>
                <p className="text-slate-400 text-xs truncate w-full px-2 mb-5 font-medium">{email}</p>

                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider mb-6 shadow-xs border ${isEadRegistered && isLsmRegistered
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                    : isLsmRegistered
                      ? 'bg-purple-50 text-purple-700 border-purple-100'
                      : 'bg-blue-50 text-blue-700 border-blue-100'
                  }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {getBadgeText()}
                </span>
              </div>

              <div className="w-full flex flex-col gap-2 pt-5 border-t border-slate-100/80">
                <button
                  onClick={handleSignOut}
                  className="w-full py-3 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all duration-350 cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>

            {/* Right Column - Redesigned Ticket Passes with Entrance Animation */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-8 flex flex-col gap-6"
            >

              {/* If no registrations found */}
              {!isEadRegistered && !isLsmRegistered && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/60 text-center shadow-[0_20px_50px_rgba(15,23,42,0.03)]">
                  <p className="text-slate-400 text-sm italic mb-5 font-medium">You have not registered for any events yet.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdKt9Gdi38ylyrosM1tvcxfjtBnSNtJtsUloC_0g5u_ctCRuw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none shadow-md transition-all hover:scale-[1.02] text-center no-underline inline-block"
                    >
                      Register for EAD
                    </a>
                    <a
                      href="https://docs.google.com/forms/d/1GAFX0tb9pRztjLgdCw4_650h4piK1RTvXw8GzNiZJdA/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none shadow-md transition-all hover:scale-[1.02] text-center no-underline inline-block"
                    >
                      Register for LSM
                    </a>
                  </div>
                </div>
              )}

              {/* 1. EAD Event Ticket (with Lucky Draw) */}
              {isEadRegistered && (
                <div className="bg-white/85 backdrop-blur-md rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.03)] border border-slate-200/60 overflow-hidden relative transition-all duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.06)]">

                  {/* Header Strip with rich indigo gradient */}
                  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-7 text-white text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                    <span className="text-[9px] font-black font-mono tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full border border-white/10 select-none">
                      EAD Drive Pass
                    </span>
                    <h3 className="text-xl font-black tracking-tight mt-4 mb-1 font-montserrat">
                      Entrepreneurship Awareness Drive
                    </h3>
                    <p className="text-blue-100/90 text-xs font-medium">National Roadshow & Innovators Meet</p>
                  </div>

                  {/* Dashed separator with realistic ticket cutout punches */}
                  <div className="relative h-px bg-transparent my-1 select-none pointer-events-none">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4.5 h-9 rounded-r-full bg-[#F4F7F9] border-r border-slate-200/60 z-10" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4.5 h-9 rounded-l-full bg-[#F4F7F9] border-l border-slate-200/60 z-10" />
                    <div className="mx-6 border-t-2 border-dashed border-slate-100" />
                  </div>

                  {/* Ticket details */}
                  <div className="p-7 sm:p-8 flex flex-col gap-6 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Attendee Name</span>
                        <span className="font-extrabold text-slate-800 text-sm">{displayName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">College/Institution</span>
                        <span className="font-extrabold text-slate-800 text-sm">{questionnaire?.college || 'Registered Attendee'}</span>
                      </div>
                    </div>

                    {/* Lucky Draw Section */}
                    <div className="pt-6 border-t border-slate-100">
                      <h4 className="text-xs font-black font-mono tracking-widest uppercase text-slate-400 mb-3.5 flex items-center gap-2">
                        <span className="text-amber-500">✨</span> Lucky Draw Passports
                      </h4>
                      {luckyNumbers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {luckyNumbers.map(draw => (
                            <div key={draw.id} className="flex justify-between items-center bg-slate-50/70 border border-slate-100 p-3.5 rounded-2xl transition-all hover:bg-slate-50">
                              <span className="text-xs font-bold text-slate-600">{draw.event_name}</span>
                              <span className="font-mono font-black text-amber-600 bg-amber-50 border border-amber-100/70 px-3.5 py-1 rounded-xl text-xs tracking-wider shadow-xs">
                                #{draw.lucky_number}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-center">
                          <p className="text-slate-400 text-xs font-medium m-0">No lucky draw number generated yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. LSM Startup Pass (with detailed questionnaire) */}
              {isLsmRegistered && (
                <div className="bg-white/85 backdrop-blur-md rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.03)] border border-slate-200/60 overflow-hidden relative transition-all duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.06)]">

                  {/* Header Strip with premium purple/indigo gradient */}
                  <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 p-7 text-white text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                    <span className="text-[9px] font-black font-mono tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full border border-white/10 select-none">
                      LSM Startup Passport
                    </span>
                    <h3 className="text-xl font-black tracking-tight mt-4 mb-1 font-montserrat">
                      Local Startups Meet
                    </h3>
                    <p className="text-purple-100/90 text-xs font-medium">Pitch Track & Capital Connection Summit</p>
                  </div>

                  {/* Dashed separator with realistic ticket cutout punches */}
                  <div className="relative h-px bg-transparent my-1 select-none pointer-events-none">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4.5 h-9 rounded-r-full bg-[#F4F7F9] border-r border-slate-200/60 z-10" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4.5 h-9 rounded-l-full bg-[#F4F7F9] border-l border-slate-200/60 z-10" />
                    <div className="mx-6 border-t-2 border-dashed border-slate-100" />
                  </div>

                  {/* Pass details */}
                  <div className="p-7 sm:p-8 flex flex-col gap-6 text-left">

                    {/* Render parsed startup profile */}
                    {startup ? (
                      <div className="flex flex-col gap-6">
                        {/* Startup Name and Stage Row */}
                        <div className="flex justify-between items-start gap-4 flex-wrap border-b border-slate-100/80 pb-4.5">
                          <div>
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Startup Name</span>
                            <h4 className="text-xl font-black text-slate-800 tracking-tight mt-0.5">{startup['Startup']}</h4>
                          </div>
                          <span className="px-3.5 py-1.5 bg-purple-50 border border-purple-100 text-purple-700 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                            {startup['Stage']}
                          </span>
                        </div>

                        {/* Startup Profile Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Attending LSM Location</span>
                            <span className="font-extrabold text-slate-800 text-sm">{startup['LSM City']}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Based in City</span>
                            <span className="font-extrabold text-slate-800 text-sm">{startup['Based in']}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Business Model</span>
                            <span className="font-extrabold text-slate-800 text-sm">{startup['Business Model']}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Industry Domain</span>
                            <span className="font-extrabold text-slate-800 text-sm">{startup['Domain']}</span>
                          </div>
                        </div>

                        {/* Pitch Deck Link */}
                        <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Submitted Pitch Deck</span>
                            <span className="text-[11px] text-slate-500 font-medium truncate block mt-0.5">{startup['Pitch Deck Link']}</span>
                          </div>
                          <a
                            href={startup['Pitch Deck Link']}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer no-underline whitespace-nowrap"
                          >
                            Open Deck ➔
                          </a>
                        </div>

                        {/* Founders Team details */}
                        <div className="pt-5 border-t border-slate-100 flex flex-col gap-3">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Founding Team</span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Founder 1 */}
                            <div className="flex flex-col text-xs bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100/50">
                              <span className="font-black text-slate-800">Founder 1 (Primary)</span>
                              <span className="text-slate-600 font-medium mt-1">{startup['Founder 1']?.split('(')[0]?.trim()}</span>
                              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                                {startup['Founder 1']?.substring(startup['Founder 1']?.indexOf('('))?.replace(/[()]/g, '')}
                              </span>
                            </div>

                            {/* Founder 2 */}
                            {startup['Founder 2'] && startup['Founder 2'] !== 'N/A' && (
                              <div className="flex flex-col text-xs bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100/50">
                                <span className="font-black text-slate-800">Founder 2</span>
                                <span className="text-slate-600 font-medium mt-1">{startup['Founder 2']?.split('(')[0]?.trim()}</span>
                                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                                  {startup['Founder 2']?.substring(startup['Founder 2']?.indexOf('('))?.replace(/[()]/g, '')}
                                </span>
                              </div>
                            )}

                            {/* Founder 3 */}
                            {startup['Founder 3'] && startup['Founder 3'] !== 'N/A' && (
                              <div className="flex flex-col text-xs bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100/50">
                                <span className="font-black text-slate-800">Founder 3</span>
                                <span className="text-slate-600 font-medium mt-1">{startup['Founder 3']?.split('(')[0]?.trim()}</span>
                                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                                  {startup['Founder 3']?.substring(startup['Founder 3']?.indexOf('('))?.replace(/[()]/g, '')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Fallback details if registration is legacy or has minimal data */
                      <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Attendee Name</span>
                            <span className="font-extrabold text-slate-800 text-sm">{displayName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Registered Email</span>
                            <span className="font-extrabold text-slate-800 text-sm">{email}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Pass Status</span>
                            <span className="inline-flex items-center gap-1.5 font-extrabold text-green-600 text-sm bg-green-50 border border-green-100/50 px-3 py-1 rounded-lg w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              Confirmed Pass
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Role / Experience</span>
                            <span className="font-extrabold text-slate-800 text-sm">{questionnaire?.experience || 'Founder'}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50/60 border-l-4 border-purple-500 rounded-r-2xl mt-2 flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 text-xs font-bold font-mono">i</div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-purple-800 tracking-wider block mb-0.5">Founder Passport Note</span>
                            <p className="text-[11px] text-purple-600/90 leading-relaxed m-0 font-medium">
                              Welcome to the Local Startups Meet! Your founder credentials are valid for pitch slots and investor sessions. Ensure your profile details are updated with your startup info in your dashboard.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

            </motion.div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
