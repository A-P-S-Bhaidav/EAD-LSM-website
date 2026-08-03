'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function useLandingState() {
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [luckyOpen, setLuckyOpen] = useState(false);
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
    // Show questionnaire after popup
    setQuestionnaireOpen(true);
  };

  const handlePopupClose = () => {
    if (typeof window !== 'undefined') sessionStorage.setItem('ead_lsm_popup_shown', 'true');
    setShowPopup(false);
  };

  const handleQuestionnaireSubmit = async (data) => {
    setQuestionnaireData(data);
    setQuestionnaireOpen(false);
    // Store questionnaire data in Supabase
    try {
      await supabase.from('questionnaire_responses').insert({
        name: data.name,
        email: data.email,
        college: data.college,
        interest: data.interest,
        experience: data.experience,
        timestamp: new Date().toISOString(),
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
    return await supabase.auth.signInWithOtp({
      email,
      options: { data: { registered_events: finalEvents } }
    });
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
    setUser(null);
    setHasEAD(false);
    setShowDraw(false);
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
    const { data } = await supabase.from('lucky_draws').select('created_at, lucky_number')
      .eq('email', email).order('created_at', { ascending: false }).limit(1);
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
        supabase.from('user_registrations').upsert({ email: u.email, registered_events: events.join(',') })
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
    const { error } = await supabase.from('lucky_draws').insert({
      name, email: user.email, event_name: location, lucky_number: randomNum
    });
    if (error) return { error: error.message };
    setDrawText('LUCKY NUMBER: ' + randomNum);
    return { number: randomNum };
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const latest = await applyPendingMetadata(session.user);
        updateAuthUI(latest);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const latest = await applyPendingMetadata(session.user);
        updateAuthUI(latest);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setHasEAD(false);
        setShowDraw(false);
        setDrawText('LUCKY DRAW');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user, authOpen, setAuthOpen, luckyOpen, setLuckyOpen, hasEAD,
    showDraw, drawText, sendOTP, signInWithGoogle, logoutUser, generateLuckyNumber,
    showPopup, handlePopupSelect, handlePopupClose,
    questionnaireOpen, setQuestionnaireOpen, handleQuestionnaireSubmit, questionnaireData,
  };
}
