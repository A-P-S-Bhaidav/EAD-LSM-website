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
        <MobileMenu onLinkClick={() => {}} />
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
        <MobileMenu onLinkClick={() => {}} />
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

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] font-montserrat">
      <Navbar
        user={user}
        onAuthClick={() => {}}
        onMenuToggle={handleMenuToggle}
        onProfileClick={() => router.push('/profile')}
      />
      <MobileMenu onLinkClick={() => {}} />

      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="u-container max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Column - Card Summary */}
            <div className="md:col-span-4 bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] border border-slate-200/60 text-center flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-md mb-4"
                style={{ background: 'linear-gradient(135deg, #1E40AF, #7DA6A9)' }}
              >
                {initials}
              </div>

              <h2 className="text-lg font-black text-gray-900 leading-tight mb-1 truncate w-full px-2">
                {displayName}
              </h2>
              <p className="text-gray-400 text-xs truncate w-full px-2 mb-6">{email}</p>

              <div className="w-full flex flex-col gap-2 pt-5 border-t border-slate-100">
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold uppercase tracking-wider text-[11px] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Right Column - Tabs/Content details */}
            <div className="md:col-span-8 flex flex-col gap-6">
              
              {/* Event Subscriptions */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)] border border-slate-200/60">
                <h3 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-400 mb-4">
                  Registered Tracks
                </h3>
                {events.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {events.includes('EAD') && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        EAD Awareness Drive
                      </span>
                    )}
                    {events.includes('LSM') && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                        LSM Founder Summit
                      </span>
                    )}
                    {events.includes('Pitching') && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Pitching Track
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic">You haven't registered for any events yet.</p>
                )}
              </div>

              {/* Profile Details (Questionnaire response metadata) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)] border border-slate-200/60">
                <h3 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-400 mb-4">
                  Profile Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">College / Institution</p>
                    <p className="font-semibold text-slate-800">{questionnaire?.college || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Startup Experience</p>
                    <p className="font-semibold text-slate-800">{questionnaire?.experience || 'None'}</p>
                  </div>
                </div>
              </div>

              {/* EAD Lucky Draws History */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)] border border-slate-200/60">
                <h3 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-400 mb-4">
                  Lucky Draw Numbers (EAD only)
                </h3>
                {luckyNumbers.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {luckyNumbers.map((draw) => (
                      <div
                        key={draw.id}
                        className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/50"
                      >
                        <div>
                          <p className="font-black text-slate-800 text-base">{draw.event_name}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5">
                            Generated {new Date(draw.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                        <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-3xs">
                          <span className="font-mono font-black text-slate-700 tracking-wider">#{draw.lucky_number}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic">No lucky draw numbers generated yet.</p>
                )}
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
