'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { queryDatabase } from '@/lib/db-client';

export default function useLandingState() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [luckyOpen, setLuckyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hasEAD, setHasEAD] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
  const [drawText, setDrawText] = useState('LUCKY DRAW');
  const [showPopup, setShowPopup] = useState(false);
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState(null);

  // Check if initial popup has been shown this session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const popupShown = sessionStorage.getItem('ead_lsm_popup_shown');
    if (!popupShown) {
      const timer = setTimeout(() => setShowPopup(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePopupSelect = (choice) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ead_lsm_popup_shown', 'true');
      sessionStorage.setItem('ead_lsm_interest', choice);
    }
    setShowPopup(false);
    
    // Redirect cleanly to the corresponding new registration routes
    if (choice === 'EAD') {
      router.push('/register-ead');
    } else if (choice === 'LSM') {
      router.push('/register-lsm');
    } else if (choice === 'Both') {
      router.push('/register-ead');
    }
  };

  const handlePopupClose = () => {
    if (typeof window !== 'undefined') sessionStorage.setItem('ead_lsm_popup_shown', 'true');
    setShowPopup(false);
  };

  const handleQuestionnaireSubmit = async (data) => {
    setQuestionnaireData(data);
    setQuestionnaireOpen(false);
    // Store questionnaire data in Neon Postgres
    try {
      await queryDatabase('insertQuestionnaire', {
        name: data.name,
        email: data.email,
        college: data.college,
        interest: data.interest,
        experience: data.experience,
      });
    } catch (e) {
      console.error('Questionnaire save error:', e);
    }
  };

  const sendOTP = async (email, events) => {
    // If LSM is selected, auto-register for pitching
    const finalEvents = events.includes('LSM') && !events.includes('Pitching')
      ? [...events, 'Pitching']
      : events;
    localStorage.setItem('pending_event_pref', JSON.stringify(finalEvents));
    
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { error: { message: data.error || 'Failed to send OTP. Please try again.' } };
      }
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: { message: 'An error occurred. Please try again.' } };
    }
  };

  const verifyOTP = async (email, code) => {
    try {
      const pending = localStorage.getItem('pending_event_pref');
      const events = pending ? JSON.parse(pending) : [];
      const isLsm = events.includes('LSM');
      
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code: code.trim(),
          isLsm
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { error: { message: data.error || 'Invalid code. Please try again.' } };
      }
      
      // Save session locally
      localStorage.setItem('ead_lsm_session', data.token);
      localStorage.setItem('registered_events', JSON.stringify(events));
      
      // Also register user for the events in user_registrations table
      const emailClean = email.trim().toLowerCase();
      await queryDatabase('upsertUserRegistration', {
        email: emailClean,
        registeredEvents: events.join(','),
      });
      
      // Trigger update of user UI state
      const customUser = {
        email: emailClean,
        id: emailClean,
        user_metadata: {
          email: emailClean,
          registered_events: events
        },
        app_metadata: { provider: 'email-otp' }
      };
      await updateAuthUI(customUser);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: { message: 'An error occurred during verification.' } };
    }
  };

  const signInWithGoogle = async (events) => {
    // If LSM is selected, auto-register for pitching
    const finalEvents = events.includes('LSM') && !events.includes('Pitching')
      ? [...events, 'Pitching']
      : events;
    localStorage.setItem('pending_event_pref', JSON.stringify(finalEvents));
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  const logoutUser = async () => {
    await supabase.auth.signOut();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ead_lsm_session');
      localStorage.removeItem('registered_events');
    }
    setUser(null);
    setHasEAD(false);
    setShowDraw(false);
    setDrawText('LUCKY DRAW');
  };

  const applyPendingMetadata = async (u) => {
    const pending = localStorage.getItem('pending_event_pref');
    if (pending) {
      const events = JSON.parse(pending);
      if (!u.user_metadata?.registered_events || u.user_metadata.registered_events.join(',') !== events.join(',')) {
        await supabase.auth.updateUser({ data: { registered_events: events } });
      }
      localStorage.removeItem('pending_event_pref');
      const { data } = await supabase.auth.getUser();
      if (data?.user) return data.user;
    }
    return u;
  };

  const check24HourLimit = async (email) => {
    const { data } = await queryDatabase('getLatestLuckyDraw', { email });
    if (data && data.length > 0) {
      const lastDraw = new Date(data[0].created_at).getTime();
      if (Date.now() - lastDraw < 24 * 60 * 60 * 1000) {
        setDrawText('LUCKY NUMBER: ' + data[0].lucky_number);
      }
    }
  };

  const updateAuthUI = async (u) => {
    setUser(u);
    if (u) {
      const events = u.user_metadata?.registered_events || [];
      const hasEadEvent = events.includes('EAD');
      setHasEAD(hasEadEvent);
      if (u.email) {
        queryDatabase('upsertUserRegistration', { email: u.email, registeredEvents: events.join(',') })
          .then(() => {}).catch(e => console.error(e));
      }
      if (hasEadEvent) {
        setShowDraw(true);
        await check24HourLimit(u.email);
      }
    }
  };

  const generateLuckyNumber = async (name, location) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const { error } = await queryDatabase('insertLuckyDraw', {
      name,
      email: user.email,
      eventName: location,
      luckyNumber: randomNum,
    });
    if (error) return { error };
    setDrawText('LUCKY NUMBER: ' + randomNum);
    return { number: randomNum };
  };

  useEffect(() => {
    // 1. Check custom OTP session
    if (typeof window !== 'undefined') {
      const customSession = localStorage.getItem('ead_lsm_session');
      if (customSession) {
        if (!customSession.includes('.')) {
          localStorage.removeItem('ead_lsm_session');
        } else {
          try {
            const payloadPart = customSession.split('.')[0];
            const parsed = JSON.parse(atob(payloadPart));
            const events = JSON.parse(localStorage.getItem('registered_events') || '[]');
            const customUser = {
              email: parsed.email,
              id: parsed.email,
              user_metadata: {
                email: parsed.email,
                registered_events: events
              },
              app_metadata: { provider: 'email-otp' }
            };
            updateAuthUI(customUser);
          } catch (e) {
            localStorage.removeItem('ead_lsm_session');
          }
        }
      }
    }
    // 2. Check Supabase Auth
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        try {
          const res = await fetch('/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: session.access_token }),
          });
          const resData = await res.json();
          if (res.ok && resData.success) {
            localStorage.setItem('ead_lsm_session', resData.token);
          }
        } catch (e) {
          console.error('Supabase session exchange error:', e);
        }
        const latest = await applyPendingMetadata(session.user);
        updateAuthUI(latest);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const res = await fetch('/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: session.access_token }),
          });
          const resData = await res.json();
          if (res.ok && resData.success) {
            localStorage.setItem('ead_lsm_session', resData.token);
          }
        } catch (e) {
          console.error('Supabase session exchange error:', e);
        }
        const latest = await applyPendingMetadata(session.user);
        updateAuthUI(latest);
      } else if (event === 'SIGNED_OUT') {
        const customSession = typeof window !== 'undefined' ? localStorage.getItem('ead_lsm_session') : null;
        if (!customSession) {
          setUser(null);
          setHasEAD(false);
          setShowDraw(false);
          setDrawText('LUCKY DRAW');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user, authOpen, setAuthOpen, luckyOpen, setLuckyOpen, hasEAD,
    showDraw, drawText, sendOTP, verifyOTP, signInWithGoogle, logoutUser, generateLuckyNumber,
    showPopup, handlePopupSelect, handlePopupClose,
    questionnaireOpen, setQuestionnaireOpen, handleQuestionnaireSubmit, questionnaireData,
    profileOpen, setProfileOpen,
  };
}
