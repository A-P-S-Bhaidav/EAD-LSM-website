'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EadLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Softlock from view: redirect to homepage immediately
    router.replace('/');
  }, [router]);

  return null;
}

/*
================================================================================
PREVIOUS EAD LOGIN FORM (COMMENTED OUT / SOFTLOCKED FROM VIEW)
================================================================================
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import useLandingState from '@/hooks/useLandingState';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileMenu from '@/components/landing/MobileMenu';

function OldEadLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // ...
}
================================================================================
*/
