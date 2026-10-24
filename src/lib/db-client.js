// BACKEND DISABLED - Database client mock
/*
export async function queryDatabase(action, params = {}) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('ead_lsm_session') || sessionStorage.getItem('ead_lsm_session');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch('/api/db', {
      method: 'POST',
      headers,
      body: JSON.stringify({ action, ...params }),
    });
    const data = await res.json();
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}
*/

export async function queryDatabase(action, params = {}) {
  // Backend is disabled; registrations handled via Google Forms
  return { data: [], error: null };
}
