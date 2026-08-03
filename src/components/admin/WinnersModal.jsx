'use client';
import { useState } from 'react';

export default function WinnersModal({ isOpen, onClose, entries }) {
  const [count, setCount] = useState(1);
  const [winners, setWinners] = useState([]);

  if (!isOpen) return null;

  const handlePickWinners = () => {
    if (isNaN(count) || count < 1) {
      alert("Please enter a valid number of winners.");
      return;
    }
    if (count > entries.length) {
      alert(`Not enough entries to select ${count} winners. Total is ${entries.length}.`);
      return;
    }

    // Shuffle pool
    const pool = [...entries];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    setWinners(pool.slice(0, count));
  };

  return (
    <div id="draw-modal" className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-xl w-[90%] max-w-[500px] max-h-[80vh] overflow-y-auto relative font-inter">
        <button className="absolute top-4 right-5 bg-none border-none text-2xl text-neutral-400 cursor-pointer hover:text-black" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-2 text-[#333]">Finalise Lucky Draw</h2>
        <p className="text-neutral-500 mb-6">How many winners would you like to select at random?</p>
        <div className="flex gap-2.5 mb-6">
          <input 
            type="number" 
            value={count} 
            min="1" 
            max={entries.length}
            onChange={(e) => setCount(parseInt(e.target.value) || 0)} 
            className="w-full p-3 border border-neutral-300 rounded-md box-border text-base outline-none focus:border-black flex-1" 
          />
          <button 
            onClick={handlePickWinners} 
            className="bg-[#0A0A0A] text-white border-none py-3.5 px-6 text-base rounded-md cursor-pointer font-bold transition-colors duration-200 hover:bg-neutral-800 flex-1"
          >
            Pick Winners!
          </button>
        </div>
        <ul className="list-none p-0 mt-5 flex flex-col gap-2.5">
          {winners.map((w, i) => (
            <li key={w.id || w.created_at} className="p-4 bg-neutral-50 rounded-md border border-neutral-100 text-[1.1em] font-medium text-neutral-800">
              Winner #{i + 1}: {w.name}
              <br />
              <span className="font-black text-[1.2em] block mt-1 text-[#0A0A0A]">Ticket: {w.lucky_number}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
