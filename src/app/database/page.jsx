'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { supabase } from '@/lib/supabase';
import DatabaseLogin from '@/components/database/DatabaseLogin';
import EadTab from '@/components/database/EadTab';
import LsmTab from '@/components/database/LsmTab';

export default function DatabasePage() {
  const [admin, setAdmin] = useState(null);
  const [tab, setTab] = useState('ead');
  const [eadEntries, setEadEntries] = useState([]);
  const [lsmEntries, setLsmEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (adminData) => {
    setAdmin(adminData);
    sessionStorage.setItem('db_admin_session', JSON.stringify(adminData));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('db_admin_session');
    setAdmin(null);
    setEadEntries([]);
    setLsmEntries([]);
  };

  const fetchEadData = async (loc) => {
    if (!loc) { alert("Please enter a location to filter."); return; }
    setLoading(true);
    const { data, error } = await supabase.from('lucky_draws').select('*').ilike('event_name', loc).order('created_at', { ascending: false });
    if (error) { alert('Error fetching EAD entries.'); } else { setEadEntries(data || []); }
    setLoading(false);
  };

  const fetchLsmData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('user_registrations').select('email').ilike('registered_events', '%LSM%');
    if (error) { alert('Error fetching LSM entries.'); } else { setLsmEntries(data || []); }
    setLoading(false);
  };

  const handleTabChange = (t) => {
    setTab(t);
    if (t === 'lsm') fetchLsmData();
  };

  const exportEad = (cols, hiddenRows) => {
    if (!window.XLSX) return alert("Excel library is loading, please try again in a moment.");
    const visible = eadEntries.filter(r => !hiddenRows.includes(r.id)).map(r => {
      const item = {};
      if (cols[0]) item['Email'] = r.email || 'N/A';
      if (cols[1]) item['Name'] = r.name;
      if (cols[2]) item['Lucky Number'] = r.lucky_number;
      if (cols[3]) item['Location'] = r.event_name;
      if (cols[4]) item['Time'] = new Date(r.created_at).toLocaleString();
      return item;
    });
    if (visible.length === 0) return alert("No data to export.");
    const ws = window.XLSX.utils.json_to_sheet(visible);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "EAD Database");
    window.XLSX.writeFile(wb, "EAD_Database_Export.xlsx");
  };

  const exportLsm = () => {
    if (!window.XLSX) return alert("Excel library is loading, please try again in a moment.");
    if (lsmEntries.length === 0) return alert("No data to export.");
    const ws = window.XLSX.utils.json_to_sheet(lsmEntries);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "LSM Database");
    window.XLSX.writeFile(wb, "LSM_Database_Export.xlsx");
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('db_admin_session');
    if (saved) setAdmin(JSON.parse(saved));
  }, []);

  return (
    <div className="database-container">
      <Script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js" strategy="afterInteractive" />
      <div className="container">
        {!admin ? (
          <DatabaseLogin onLogin={handleLogin} />
        ) : (
          <div id="dashboard-section" style={{ display: 'block' }}>
            <div className="header-row">
              <div>
                <h1>Master Database Portal</h1>
                <p style={{ color: '#666', marginTop: '-10px' }}>View complete historical data across all locations.</p>
              </div>
              <button onClick={handleLogout} style={{ background: '#fff', color: '#0A0A0A', border: '1px solid #ccc', width: 'auto' }}>Logout</button>
            </div>
            <div className="tabs">
              <button className={`tab-btn ${tab === 'ead' ? 'active' : ''}`} onClick={() => handleTabChange('ead')}>EAD Database</button>
              <button className={`tab-btn ${tab === 'lsm' ? 'active' : ''}`} onClick={() => handleTabChange('lsm')}>LSM Database</button>
            </div>
            {tab === 'ead' ? (
              <EadTab entries={eadEntries} onLoadData={fetchEadData} onExport={exportEad} loading={loading} />
            ) : (
              <LsmTab entries={lsmEntries} onRefresh={fetchLsmData} onExport={exportLsm} loading={loading} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
