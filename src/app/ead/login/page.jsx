'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import useLandingState from '@/hooks/useLandingState';
import Navbar from '@/components/landing/Navbar';
import MobileMenu from '@/components/landing/MobileMenu';

export default function EadLoginPage() {
  const router = useRouter();
  const { user } = useLandingState();

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (authError) {
        setError(authError.message);
      } else if (data?.session) {
        // Successful login
        localStorage.setItem('ead_lsm_session', btoa(JSON.stringify({ email: data.user.email, verified: true, time: Date.now() })));
        
        // Fetch registered events from metadata
        const events = data.user.user_metadata?.registered_events || [];
        localStorage.setItem('registered_events', JSON.stringify(events));

        router.push('/profile');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-montserrat bg-[#F4F7F9] overflow-x-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 h-[100vh] w-full overflow-hidden">
        <img
          alt="EAD Landing Background"
          className="w-full h-full object-cover object-center"
          src="/landing_new.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F9]/70 via-[#F4F7F9]/40 to-[#F4F7F9]/80 z-10" />
      </div>

      <Navbar
        user={user}
        onAuthClick={() => router.push('/register-ead')}
        onMenuToggle={handleMenuToggle}
        onProfileClick={() => router.push('/profile')}
      />
      <MobileMenu onLinkClick={handleMenuClose} />

      <main className="relative z-20 flex-grow flex items-center justify-center pt-20 pb-8 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-[430px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-200/80 relative overflow-hidden my-auto">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded-full text-white bg-blue-600">
                EAD Portal
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-2.5 mb-1 leading-tight">
              EAD Login
            </h1>
            <p className="text-gray-500 text-xs mb-5 leading-relaxed">
              Log in to access your Entrepreneurship Awareness Drive pass.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold leading-relaxed">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gray-500 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-900 outline-none transition-colors duration-200 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1.5 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors disabled:bg-gray-300 shadow-sm border-none cursor-pointer"
              >
                {loading ? 'Logging In...' : 'Log In ➔'}
              </button>
            </form>

            <div className="text-center pt-4 border-t border-slate-100 mt-5">
              <p className="text-xs text-slate-500 font-medium">
                Don't have an account?{' '}
                <Link
                  href="/register-ead"
                  className="text-blue-600 hover:text-blue-700 font-bold underline"
                >
                  Register here
                </Link>
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
