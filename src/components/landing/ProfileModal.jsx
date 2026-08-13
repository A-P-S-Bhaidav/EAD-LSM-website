'use client';
import { motion, AnimatePresence } from 'framer-motion';

function EventBadge({ label, color }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-wider"
      style={{ background: color + '15', color }}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      {label}
    </span>
  );
}

export default function ProfileModal({ isOpen, onClose, user, onLogout }) {
  if (!isOpen || !user) return null;

  const email = user.email || '';
  const initials = email ? email[0].toUpperCase() : '?';
  const events = user.user_metadata?.registered_events || [];
  const registeredAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99998] flex items-start justify-end bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, x: 80, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 80, y: -20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.2)] w-full max-w-[340px] mt-[72px] mr-4 overflow-hidden border border-slate-200/60"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top gradient accent */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563eb, #7DA6A9)' }} />

          {/* Profile header */}
          <div className="p-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-md flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7DA6A9)' }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                {displayName && (
                  <p className="font-black text-gray-900 text-base leading-tight truncate">{displayName}</p>
                )}
                <p className="text-gray-500 text-[0.8rem] font-medium truncate">{email}</p>
                {registeredAt && (
                  <p className="text-gray-400 text-[0.68rem] mt-0.5">Joined {registeredAt}</p>
                )}
              </div>
            </div>
          </div>

          {/* Registered events */}
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3">Registered Events</p>
            {events.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {events.includes('EAD') && <EventBadge label="EAD" color="#2563eb" />}
                {events.includes('LSM') && <EventBadge label="LSM" color="#7c3aed" />}
                {events.includes('Pitching') && <EventBadge label="Pitching" color="#059669" />}
              </div>
            ) : (
              <p className="text-gray-400 text-[0.8rem]">No events registered yet.</p>
            )}
          </div>

          {/* Account info */}
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3">Account</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[0.8rem] font-semibold text-gray-600">Active Session</span>
            </div>
            <p className="text-gray-400 text-[0.72rem] mt-1">Logged in via {user.app_metadata?.provider || 'email'}</p>
          </div>

          {/* Logout */}
          <div className="p-4">
            <button
              onClick={() => { onLogout(); onClose(); }}
              className="w-full py-2.5 rounded-xl text-[0.8rem] font-bold uppercase tracking-wider transition-all duration-200 bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
