'use client';
import { useState } from 'react';

export default function LuckyDrawModal({ isOpen, onClose, onGenerate }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [step, setStep] = useState('form');
  const [luckyNum, setLuckyNum] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name || !location) {
      setMsg({ text: 'Please fill in both fields.', type: 'error' });
      return;
    }
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const res = await onGenerate(name, location);
      if (res.error) {
        setMsg({ text: res.error, type: 'error' });
      } else {
        setLuckyNum(res.number);
        setStep('success');
      }
    } catch (e) {
      setMsg({ text: 'Error generating number. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "block text-[0.75rem] font-bold mb-1.5 text-gray-500 uppercase tracking-wide";
  const inputClass = "w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-[0.95rem] font-montserrat outline-none transition-colors duration-200 text-gray-900 bg-gray-50 focus:border-blue-500 focus:bg-white placeholder-gray-400";

  return (
    <div id="lucky-modal" className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-2xl p-10 md:p-12 w-full max-w-[420px] relative shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
        <button 
          className="absolute top-4 right-5 bg-none border-none text-2xl text-gray-400 cursor-pointer hover:text-gray-700 font-montserrat" 
          onClick={onClose}
        >
          &times;
        </button>
        {step === 'form' ? (
          <div>
            <h2 className="font-montserrat text-[1.3rem] font-extrabold text-gray-900 m-0 mb-2 uppercase tracking-widest">Lucky Draw</h2>
            <p className="font-montserrat text-gray-500 text-[0.85rem] m-0 mb-7">Enter your details to generate your unique number.</p>
            <div className="mb-4">
              <label className={labelClass}>Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className={inputClass}
              />
            </div>
            <div className="mb-6">
              <label className={labelClass}>Which EAD are you attending?</label>
              <input 
                type="text" 
                placeholder="e.g. Kolkata, Delhi..." 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                className={inputClass}
              />
            </div>
            <button 
              className="w-full p-3.5 bg-gray-900 text-white border-none rounded-xl font-montserrat font-bold text-[0.85rem] tracking-wider uppercase cursor-pointer mt-3 transition-colors duration-200 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed" 
              disabled={loading} 
              onClick={handleSubmit}
            >
              {loading ? 'Generating...' : 'Generate Number ➔'}
            </button>
            <div className={`font-montserrat text-[0.8rem] mt-3 text-center min-h-[20px] ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="font-montserrat text-[1.3rem] font-extrabold text-gray-900 m-0 mb-2 uppercase tracking-widest">Success!</h2>
            <p className="font-montserrat text-gray-500 text-[0.85rem] m-0 mb-3">Your unique lucky draw number has been generated!</p>
            <div className="text-[2.5rem] font-black tracking-widest text-gray-900 my-6 bg-gray-50 p-5 border-2 border-dashed border-gray-300 rounded-xl">
              {luckyNum}
            </div>
            <button 
              className="w-full p-[13px] bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-montserrat font-semibold text-[0.85rem] cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 mt-6" 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
