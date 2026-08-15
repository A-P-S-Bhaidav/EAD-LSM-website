export async function queryDatabase(action, params = {}) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('ead_lsm_session') || sessionStorage.getItem('ead_lsm_session');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const res = await fetch('/api/db', {
      method: 'POST',
      headers,
      body: JSON.stringify({ action, ...params }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { data: null, error: data.error || 'Database operation failed' };
    }
    return { data: data.data, error: null };
  } catch (err) {
    console.error('queryDatabase error:', err);
    return { data: null, error: err.message };
  }
}
