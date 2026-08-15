'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import useLandingState from '@/hooks/useLandingState';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileMenu from '@/components/landing/MobileMenu';

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
          const { data: draws } = await supabase
            .from('lucky_draws')
            .select('*')
            .eq('email', user.email)
            .order('created_at', { ascending: false });
          
          setLuckyNumbers(draws || []);

          // Fetch questionnaire response
          const { data: quest } = await supabase
            .from('questionnaire_responses')
            .select('*')
            .eq('email', user.email)
            .order('timestamp', { ascending: false })
            .limit(1);

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
        <Navbar user={user} onMenuToggle={handleMenuToggle} onProfileClick={() => {}} />
        <MobileMenu onLinkClick={handleMenuClose} />
        <main className="flex-grow flex items-center justify-center pt-28">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F4F7F9] font-montserrat">
        <Navbar user={user} onMenuToggle={handleMenuToggle} onProfileClick={() => {}} />
        <MobileMenu onLinkClick={handleMenuClose} />
        <main className="flex-grow flex items-center justify-center pt-28 pb-16 px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-[440px] shadow-[0_15px_40px_rgba(15,23,42,0.05)] border border-slate-200/60 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Please register or log in to view your profile page.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/register-ead')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Register for EAD Drive
              </button>
              <button
                onClick={() => router.push('/register-lsm')}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Register for LSM Summit
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const email = user.email || '';
  const initials = email ? email[0].toUpperCase() : '?';
  const events = user.user_metadata?.registered_events || [];
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || questionnaire?.name || 'Innovator';

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
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] font-montserrat">
      <Navbar
        user={user}
        onAuthClick={() => {}}
        onMenuToggle={handleMenuToggle}
        onProfileClick={() => router.push('/profile')}
      />
      <MobileMenu onLinkClick={handleMenuClose} />

      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="u-container max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Column - User Card */}
            <div className="md:col-span-4 bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] border border-slate-200/60 text-center flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-md mb-4"
                style={{ background: 'linear-gradient(135deg, #0F172A, #7DA6A9)' }}
              >
                {initials}
              </div>

              <h2 className="text-lg font-black text-gray-900 leading-tight mb-1 truncate w-full px-2">
                {displayName}
              </h2>
              <p className="text-gray-400 text-xs truncate w-full px-2 mb-4">{email}</p>

              <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 ${getBadgeColor()}`}>
                {getBadgeText()}
              </span>

              <div className="w-full flex flex-col gap-2 pt-5 border-t border-slate-100">
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer border-none"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Right Column - Tickets Details */}
            <div className="md:col-span-8 flex flex-col gap-6">
              
              {/* If no registrations found */}
              {!isEadRegistered && !isLsmRegistered && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/60 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                  <p className="text-slate-400 text-sm italic mb-4">You have not registered for any events yet.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => router.push('/register-ead')}
                      className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none"
                    >
                      Register for EAD
                    </button>
                    <button
                      onClick={() => router.push('/register-lsm')}
                      className="py-2.5 px-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none"
                    >
                      Register for LSM
                    </button>
                  </div>
                </div>
              )}

              {/* 1. EAD Event Ticket (with Lucky Draw) */}
              {isEadRegistered && (
                <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.04)] border border-slate-200/60 overflow-hidden relative">
                  {/* Decorative side punch holes */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#F4F7F9] border-r border-slate-200/60 transform -translate-y-1/2 z-10" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#F4F7F9] border-l border-slate-200/60 transform -translate-y-1/2 z-10" />

                  {/* Header Strip */}
                  <div className="bg-gradient-to-r from-blue-700 to-[#1E40AF] p-6 text-white text-left">
                    <span className="text-[9px] font-bold font-mono tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded-full">
                      EAD Drive Pass
                    </span>
                    <h3 className="text-lg font-black tracking-tight mt-3 mb-1">
                      Entrepreneurship Awareness Drive
                    </h3>
                    <p className="text-blue-100 text-xs">National Roadshow & Innovators Meet</p>
                  </div>

                  {/* Ticket details */}
                  <div className="p-6 sm:p-8 flex flex-col gap-6 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Attendee Name</span>
                        <span className="font-semibold text-slate-800 text-sm">{displayName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">College/Institution</span>
                        <span className="font-semibold text-slate-800 text-sm">{questionnaire?.college || 'Registered'}</span>
                      </div>
                    </div>

                    {/* Lucky Draw Section */}
                    <div className="pt-6 border-t border-dashed border-slate-200/80">
                      <h4 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                        <span>✨</span> Lucky Draw Numbers
                      </h4>
                      {luckyNumbers.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {luckyNumbers.map(draw => (
                            <div key={draw.id} className="flex justify-between items-center bg-slate-50 border border-slate-200/50 p-3 rounded-xl">
                              <span className="text-xs font-bold text-slate-700">{draw.event_name}</span>
                              <span className="font-mono font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg text-sm tracking-wider">
                                #{draw.lucky_number}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl text-center">
                          <p className="text-slate-500 text-xs font-medium">No lucky draw number generated yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. LSM Startup Pass (with detailed questionnaire) */}
              {isLsmRegistered && (
                <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.04)] border border-slate-200/60 overflow-hidden relative">
                  {/* Decorative side punch holes */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#F4F7F9] border-r border-slate-200/60 transform -translate-y-1/2 z-10" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#F4F7F9] border-l border-slate-200/60 transform -translate-y-1/2 z-10" />

                  {/* Header Strip */}
                  <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 text-white text-left">
                    <span className="text-[9px] font-bold font-mono tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded-full">
                      LSM Startup Passport
                    </span>
                    <h3 className="text-lg font-black tracking-tight mt-3 mb-1">
                      Local Startups Meet
                    </h3>
                    <p className="text-purple-100 text-xs">Pitch Track & Capital Connection Summit</p>
                  </div>

                  {/* Pass details */}
                  <div className="p-6 sm:p-8 flex flex-col gap-6 text-left">
                    
                    {/* Render parsed startup profile */}
                    {startup ? (
                      <div className="flex flex-col gap-6">
                        {/* Startup Name and Stage Row */}
                        <div className="flex justify-between items-start gap-4 flex-wrap border-b border-slate-100 pb-4">
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Startup Name</span>
                            <h4 className="text-xl font-black text-slate-800 tracking-tight mt-0.5">{startup['Startup']}</h4>
                          </div>
                          <span className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {startup['Stage']}
                          </span>
                        </div>

                        {/* Startup Profile Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Attending LSM Location</span>
                            <span className="font-semibold text-slate-800 text-sm">{startup['LSM City']}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Based in City</span>
                            <span className="font-semibold text-slate-800 text-sm">{startup['Based in']}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Business Model</span>
                            <span className="font-semibold text-slate-800 text-sm">{startup['Business Model']}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Industry Domain</span>
                            <span className="font-semibold text-slate-800 text-sm">{startup['Domain']}</span>
                          </div>
                        </div>

                        {/* Pitch Deck Link */}
                        <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Submitted Pitch Deck</span>
                            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs block mt-0.5">{startup['Pitch Deck Link']}</span>
                          </div>
                          <a 
                            href={startup['Pitch Deck Link']}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer no-underline whitespace-nowrap"
                          >
                            Open Deck ➔
                          </a>
                        </div>

                        {/* Founders Team details */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Founding Team</span>
                          
                          {/* Founder 1 */}
                          <div className="flex flex-col text-xs bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                            <span className="font-bold text-slate-800">Founder 1 (Primary): {startup['Founder 1']?.split('(')[0]?.trim()}</span>
                            <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                              {startup['Founder 1']?.substring(startup['Founder 1']?.indexOf('('))?.replace(/[()]/g, '')}
                            </span>
                          </div>

                          {/* Founder 2 */}
                          {startup['Founder 2'] && startup['Founder 2'] !== 'N/A' && (
                            <div className="flex flex-col text-xs bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                              <span className="font-bold text-slate-800">Founder 2: {startup['Founder 2']?.split('(')[0]?.trim()}</span>
                              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                                {startup['Founder 2']?.substring(startup['Founder 2']?.indexOf('('))?.replace(/[()]/g, '')}
                              </span>
                            </div>
                          )}

                          {/* Founder 3 */}
                          {startup['Founder 3'] && startup['Founder 3'] !== 'N/A' && (
                            <div className="flex flex-col text-xs bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                              <span className="font-bold text-slate-800">Founder 3: {startup['Founder 3']?.split('(')[0]?.trim()}</span>
                              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                                {startup['Founder 3']?.substring(startup['Founder 3']?.indexOf('('))?.replace(/[()]/g, '')}
                              </span>
                            </div>
                          )}
                        </div>

                      </div>
                    ) : (
                      /* Fallback details if registration is legacy or has minimal data */
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Attendee Name</span>
                            <span className="font-semibold text-slate-800 text-sm">{displayName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Registered Email</span>
                            <span className="font-semibold text-slate-800 text-sm">{email}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Pass Status</span>
                            <span className="font-semibold text-green-600 text-sm">Confirmed Pass</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Role / Experience</span>
                            <span className="font-semibold text-slate-800 text-sm">{questionnaire?.experience || 'Founder'}</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl mt-2">
                          <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider block mb-1">Founder Profile Note</span>
                          <p className="text-[11px] text-purple-600 leading-relaxed m-0">
                            Welcome to the Local Startups Meet! Your founder credentials are valid for pitch slots and investor sessions. Ensure your profile details are updated with your startup info in your dashboard.
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
