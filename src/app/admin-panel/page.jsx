'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import WinnersModal from '@/components/admin/WinnersModal';

export default function AdminPage() {
  const [admin, setAdmin] = useState(null);
  const [entries, setEntries] = useState([]);
  const [drawOpen, setDrawOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async (ead) => {
    setLoading(true);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from('lucky_draws')
      .select('*')
      .ilike('event_name', ead)
      .gte('created_at', oneDayAgo)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      alert('Error fetching entries.');
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const handleLogin = (adminData) => {
    setAdmin(adminData);
    sessionStorage.setItem('admin_session', JSON.stringify(adminData));
    fetchEntries(adminData.ead);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    setAdmin(null);
    setEntries([]);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAdmin(parsed);
      fetchEntries(parsed.ead);
    }
  }, []);

  return (
    <div className="admin-container">
      <div className="container">
        {!admin ? (
          <AdminLogin onLogin={handleLogin} />
        ) : (
          <>
            <AdminDashboard
              location={admin.ead}
              entries={entries}
              onLogout={handleLogout}
              onOpenDrawModal={() => setDrawOpen(true)}
              loading={loading}
            />
            <WinnersModal
              isOpen={drawOpen}
              onClose={() => setDrawOpen(false)}
              entries={entries}
            />
          </>
        )}
      </div>
    </div>
  );
}
