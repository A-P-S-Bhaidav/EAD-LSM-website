'use client';

export default function AdminDashboard({ location, onLogout, onOpenDrawModal, entries }) {
  return (
    <div id="dashboard-section" className="block">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="m-0 text-3xl font-extrabold text-[#333]">Admin Dashboard</h1>
          <p className="text-neutral-500 mt-[-10px] text-sm">
            Managing <strong>{location}</strong>
          </p>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={onOpenDrawModal} 
            className="bg-[#0A0A0A] text-white border-none py-3.5 px-6 text-base rounded-md cursor-pointer font-bold transition-colors duration-200 hover:bg-neutral-800 w-auto"
          >
            Finalise Lucky Draw
          </button>
          <button 
            onClick={onLogout} 
            className="bg-white text-[#0A0A0A] border border-neutral-300 py-3.5 px-6 text-base rounded-md cursor-pointer font-bold transition-colors duration-200 hover:bg-neutral-50 w-auto"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)] mb-8 inline-block">
        <h3 className="m-0 mb-2.5 text-neutral-500 text-[0.9em] uppercase font-bold">Total Generated Today (24h)</h3>
        <p className="text-4xl font-black m-0 text-[#0A0A0A]">{entries.length}</p>
      </div>
      
      <table className="w-full border-collapse bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="p-4 text-left border-b border-neutral-100 bg-neutral-100 font-bold text-neutral-600">Email</th>
            <th className="p-4 text-left border-b border-neutral-100 bg-neutral-100 font-bold text-neutral-600">Name</th>
            <th className="p-4 text-left border-b border-neutral-100 bg-neutral-100 font-bold text-neutral-600">Lucky Number</th>
            <th className="p-4 text-left border-b border-neutral-100 bg-neutral-100 font-bold text-neutral-600">Location</th>
            <th className="p-4 text-left border-b border-neutral-100 bg-neutral-100 font-bold text-neutral-600">Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-neutral-400">No entries found.</td>
            </tr>
          ) : (
            entries.map((row) => (
              <tr key={row.id || row.created_at} className="border-b border-neutral-100 last:border-b-0">
                <td className="p-4 text-left text-neutral-700">{row.email || <em className="text-neutral-300">N/A</em>}</td>
                <td className="p-4 text-left text-neutral-700">{row.name}</td>
                <td className="p-4 text-left text-neutral-900"><strong>{row.lucky_number}</strong></td>
                <td className="p-4 text-left text-neutral-700">{row.event_name}</td>
                <td className="p-4 text-left text-[0.85em] text-neutral-500">
                  {new Date(row.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
