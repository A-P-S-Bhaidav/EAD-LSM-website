'use client';
import { useState } from 'react';

export default function EadTab({ entries, onLoadData, onExport, loading }) {
  const [location, setLocation] = useState('');
  const [cols, setCols] = useState([true, true, true, true, true]); // Email, Name, Num, Loc, Time
  const [hiddenRows, setHiddenRows] = useState([]);

  const toggleCol = (index, value) => {
    const updated = [...cols];
    updated[index] = value;
    setCols(updated);
  };

  const handleReset = () => {
    setCols([true, true, true, true, true]);
    setHiddenRows([]);
  };

  const labelClass = "block font-bold mb-2 text-[0.9em] text-[#333]";
  const thClass = "p-4 text-left border-b border-neutral-100 bg-neutral-100 font-bold text-neutral-600";
  const tdClass = "p-4 text-left border-b border-neutral-100 text-neutral-700";

  return (
    <div id="view-ead" className="block">
      <div className="bg-white p-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)] mb-5 flex gap-4 items-end flex-wrap">
        <div className="mb-0 flex-1 max-w-[300px]">
          <label className={labelClass}>Filter by Location (EAD)</label>
          <input 
            type="text" 
            placeholder="e.g. Delhi" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && onLoadData(location)} 
            className="w-full p-3 border border-neutral-300 rounded-md box-border text-base outline-none focus:border-black"
          />
        </div>
        <button 
          onClick={() => onLoadData(location)} 
          className="bg-[#0A0A0A] text-white border-none px-6 text-base rounded-md cursor-pointer font-bold transition-colors duration-200 hover:bg-neutral-800 h-[46px] w-auto"
        >
          Load Data
        </button>
      </div>
      
      <div className="bg-[#f9f9f9] border border-dashed border-neutral-300 p-5 rounded-lg mb-5 flex items-center gap-4 flex-wrap shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <strong className="text-neutral-600">Toggle Columns:</strong>
        <div className="flex gap-4 items-center text-[0.9em]">
          {['Email', 'Name', 'Lucky Number', 'Location', 'Time'].map((name, i) => (
            <label key={name} className="flex items-center gap-1.5 cursor-pointer text-neutral-700">
              <input 
                type="checkbox" 
                checked={cols[i]} 
                onChange={(e) => toggleCol(i, e.target.checked)} 
                className="w-4 h-4 cursor-pointer accent-[#0A0A0A]"
              />
              {name}
            </label>
          ))}
        </div>
        <button 
          onClick={handleReset} 
          className="bg-[#2196F3] text-white border-none py-2 px-4 rounded text-[0.9em] font-medium cursor-pointer w-auto ml-auto hover:bg-[#1e88e5]"
        >
          Reset View
        </button>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)] mb-8 inline-block">
        <h3 className="m-0 mb-2.5 text-neutral-500 text-[0.9em] uppercase font-bold">Historical Records Found</h3>
        <p className="text-4xl font-black m-0 text-[#0A0A0A]">{entries.filter(r => !hiddenRows.includes(r.id)).length}</p>
      </div>
      
      <table id="ead-table" className="w-full border-collapse bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-lg overflow-hidden">
        <thead>
          <tr>
            {cols[0] && <th className={thClass}>Email</th>}
            {cols[1] && <th className={thClass}>Name</th>}
            {cols[2] && <th className={thClass}>Lucky Number</th>}
            {cols[3] && <th className={thClass}>Location</th>}
            {cols[4] && <th className={thClass}>Time</th>}
            <th className={thClass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6" className="p-4 text-center text-neutral-500">Loading...</td></tr>
          ) : entries.length === 0 ? (
            <tr><td colSpan="6" className="p-4 text-center text-neutral-400">Enter a location and click Load Data.</td></tr>
          ) : (
            entries.filter(r => !hiddenRows.includes(r.id)).map((row) => (
              <tr key={row.id} className="border-b border-neutral-100 last:border-b-0">
                {cols[0] && <td className={tdClass}>{row.email || <em className="text-neutral-300">N/A</em>}</td>}
                {cols[1] && <td className={tdClass}>{row.name}</td>}
                {cols[2] && <td className={tdClass}><strong>{row.lucky_number}</strong></td>}
                {cols[3] && <td className={tdClass}>{row.event_name}</td>}
                {cols[4] && <td className={`${tdClass} text-[0.85em] text-neutral-500`}>{new Date(row.created_at).toLocaleString()}</td>}
                <td className={tdClass}>
                  <button 
                    className="bg-[#f44336] text-white border-none py-1.5 px-3 rounded text-[0.8em] cursor-pointer w-auto hover:bg-[#d32f2f]" 
                    onClick={() => setHiddenRows([...hiddenRows, row.id])}
                  >
                    Hide
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <button 
        className="bg-[#4CAF50] text-white border-none py-3.5 px-6 text-base rounded-md cursor-pointer font-bold transition-colors duration-200 hover:bg-[#45a049] w-full block text-center mt-5" 
        onClick={() => onExport(cols, hiddenRows)}
      >
        Download to Excel (.XLSX)
      </button>
    </div>
  );
}
