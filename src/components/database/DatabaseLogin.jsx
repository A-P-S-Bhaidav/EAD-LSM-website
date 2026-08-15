'use client';
import { useState } from 'react';

export default function DatabaseLogin({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      setError(false);
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('ead_lsm_session', data.token);
        onLogin({ name, email });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const inputClass = "w-full p-3 border border-neutral-300 rounded-md box-border text-base outline-none focus:border-black";
  const labelClass = "block font-bold mb-2 text-[0.9em] text-[#333]";

  return (
    <div className="bg-white p-10 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] max-w-[400px] my-20 mx-auto font-inter">
      <h1 className="text-center mb-8 text-2xl font-bold text-[#333]">Database Access</h1>
      <div className="mb-5">
        <label className={labelClass}>Admin Name</label>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className={inputClass}
        />
      </div>
      <div className="mb-5">
        <label className={labelClass}>Admin Email</label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className={inputClass}
        />
      </div>
      <button 
        onClick={handleSubmit}
        className="bg-[#0A0A0A] text-white border-none py-3.5 px-6 text-base rounded-md cursor-pointer w-full font-bold transition-colors duration-200 hover:bg-neutral-800"
      >
        Access Database
      </button>
      {error && (
        <div className="text-[#d32f2f] mt-4 text-center text-[0.9em]">
          Invalid credentials.
        </div>
      )}
    </div>
  );
}
