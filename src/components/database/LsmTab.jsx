'use client';

export default function LsmTab({ entries, onRefresh, onExport, loading }) {
  const thClass = "p-4 text-left border-b border-neutral-100 bg-neutral-100 font-bold text-neutral-600";
  const tdClass = "p-4 text-left border-b border-neutral-100 text-neutral-700";

  return (
    <div id="view-lsm" className="block">
      <p className="text-neutral-500 mb-4">Showing all emails of users who registered for LSM.</p>
      <button 
        onClick={onRefresh} 
        disabled={loading}
        className="bg-[#0A0A0A] text-white border-none py-2.5 px-5 rounded text-[0.9em] font-bold cursor-pointer w-auto mb-5 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Refreshing...' : 'Refresh LSM Data'}
      </button>
      
      <table id="lsm-table" className="w-full max-w-[600px] border-collapse bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg overflow-hidden mb-6">
        <thead>
          <tr>
            <th className={thClass}>Email</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td className={`${tdClass} text-center`}>Loading...</td></tr>
          ) : entries.length === 0 ? (
            <tr><td className={`${tdClass} text-center text-neutral-400`}>Click Refresh to load.</td></tr>
          ) : (
            entries.map((row, i) => (
              <tr key={row.email + '-' + i} className="border-b border-neutral-100 last:border-b-0">
                <td className={tdClass}>{row.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <button 
        className="bg-[#4CAF50] text-white border-none py-3.5 px-6 text-base rounded-md cursor-pointer font-bold transition-colors duration-200 hover:bg-[#45a049] w-full max-w-[600px] block text-center mt-5" 
        onClick={onExport}
      >
        Download to Excel (.XLSX)
      </button>
    </div>
  );
}
