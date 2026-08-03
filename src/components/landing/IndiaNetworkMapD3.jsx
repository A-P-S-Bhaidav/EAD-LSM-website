'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import { cities, originCity } from '@/lib/cities-data';
import { X, MapPin, Users, Calendar, Zap } from 'lucide-react';

const GEO_URL = '/india-districts.geojson';

// Mercator projection config — centred on India including PoK & Aksai Chin
const PROJECTION_CONFIG = {
  scale: 1050,
  center: [82.5, 22.5], // [lng, lat]
};

// ── Click-detail modal ─────────────────────────────────────────────────────────
function CityModal({ city, onClose }) {
  const isOrigin = city?.isOrigin;

  return (
    <AnimatePresence>
      {city && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[320px] sm:w-[380px] bg-[#0e0e0e] border border-purple-500/20
                       rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Purple accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isOrigin ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-neutral-800 border border-neutral-700'}`}>
                    <MapPin className={`w-4 h-4 ${isOrigin ? 'text-purple-400' : 'text-neutral-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base font-montserrat leading-tight">
                      {city.name}
                    </h3>
                    {isOrigin && (
                      <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                        Origin Hub
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <StatItem
                  icon={<Calendar className="w-3.5 h-3.5" />}
                  label="Edition"
                  value={city.edition}
                  highlight={isOrigin}
                />
                <StatItem
                  icon={<Users className="w-3.5 h-3.5" />}
                  label="Students"
                  value={city.students}
                  highlight={isOrigin}
                />
                <StatItem
                  icon={<Zap className="w-3.5 h-3.5" />}
                  label="Year"
                  value={city.year}
                  highlight={isOrigin}
                />
              </div>

              {/* Coordinates */}
              <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider">COORDS</span>
                <span className="text-[11px] font-mono text-neutral-400 ml-auto">
                  {city.lat.toFixed(4)}°N, {city.lng.toFixed(4)}°E
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StatItem({ icon, label, value, highlight }) {
  return (
    <div className={`flex flex-col gap-1 p-3 rounded-xl border ${
      highlight
        ? 'bg-purple-500/10 border-purple-500/20'
        : 'bg-neutral-900 border-neutral-800'
    }`}>
      <div className={`${highlight ? 'text-purple-400' : 'text-neutral-500'}`}>{icon}</div>
      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">{label}</span>
      <span className={`text-xs font-bold font-montserrat ${highlight ? 'text-purple-300' : 'text-white'}`}>
        {value}
      </span>
    </div>
  );
}

// ── Network stats badge ────────────────────────────────────────────────────────
function NetworkBadge({ isInView }) {
  const uniqueStates = new Set(
    cities.map(c => {
      // rough state lookup by lat band / known state
      return c.id;
    })
  ).size;

  return (
    <motion.div
      className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-xl
                 border border-neutral-800 rounded-xl px-4 py-3 pointer-events-none"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
        Network
      </div>
      <div className="flex gap-4">
        <div>
          <span className="text-lg font-black text-white font-montserrat">
            {cities.length - 1}
          </span>
          <span className="text-[10px] text-neutral-400 ml-1">Cities</span>
        </div>
        <div className="w-px bg-neutral-800" />
        <div>
          <span className="text-lg font-black text-white font-montserrat">11</span>
          <span className="text-[10px] text-neutral-400 ml-1">States</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function IndiaNetworkMapD3() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleMarkerClick = useCallback((city) => {
    setSelectedCity(city);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCity(null);
  }, []);

  const targetCities = useMemo(() => cities.filter(c => !c.isOrigin), []);

  return (
    <div ref={containerRef} className="relative w-full h-full select-none">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[420px] h-[420px] bg-purple-500/[0.05] rounded-full blur-[90px]" />
      </div>

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* ── Map ── */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        width={600}
        height={660}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Map fill */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isClaimed = geo.properties?.claimed === true;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isClaimed ? '#1e1535' : '#1a1a1a',
                      stroke: isClaimed ? '#7c3aed' : '#2e2e2e',
                      strokeWidth: isClaimed ? 0.8 : 0.5,
                      strokeDasharray: isClaimed ? '3 2' : 'none',
                      outline: 'none',
                    },
                    hover: {
                      fill: isClaimed ? '#1e1535' : '#1a1a1a',
                      stroke: isClaimed ? '#7c3aed' : '#2e2e2e',
                      strokeWidth: isClaimed ? 0.8 : 0.5,
                      strokeDasharray: isClaimed ? '3 2' : 'none',
                      outline: 'none',
                    },
                    pressed: {
                      fill: isClaimed ? '#1e1535' : '#1a1a1a',
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* ── Connection lines (origin → each city via great-circle arc) ── */}
        {isInView &&
          targetCities.map((city) => (
            <Line
              key={`line-${city.id}`}
              coordinates={[
                [originCity.lng, originCity.lat],
                [city.lng, city.lat],
              ]}
              stroke={hoveredCity?.id === city.id ? '#c084fc' : '#7c3aed'}
              strokeWidth={hoveredCity?.id === city.id ? 1.5 : 0.8}
              strokeLinecap="round"
              strokeOpacity={hoveredCity?.id === city.id ? 0.9 : 0.45}
              fill="none"
              style={{ transition: 'stroke 0.15s, stroke-width 0.15s, stroke-opacity 0.15s' }}
            />
          ))}

        {/* ── Target city markers ── */}
        {cities
          .filter(c => !c.isOrigin)
          .map((city, index) => {
            const isHovered = hoveredCity?.id === city.id;
            const isSelected = selectedCity?.id === city.id;

            return (
              <Marker
                key={city.id}
                coordinates={[city.lng, city.lat]}
                onClick={() => handleMarkerClick(city)}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Animated rings on hover */}
                {isHovered && (
                  <>
                    <circle r={18} fill="none" stroke="#a855f7" strokeWidth={1} opacity={0.25} />
                    <circle r={13} fill="none" stroke="#a855f7" strokeWidth={1} opacity={0.35} />
                  </>
                )}

                {/* Outer ring */}
                <circle
                  r={isHovered || isSelected ? 11 : 9}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth={1.2}
                  opacity={isHovered || isSelected ? 0.7 : 0.4}
                  style={{ transition: 'r 0.15s, opacity 0.15s' }}
                />

                {/* Main dot */}
                <circle
                  r={isHovered || isSelected ? 5.5 : 4.5}
                  fill={isSelected ? '#d8b4fe' : '#a855f7'}
                  style={{ transition: 'r 0.15s, fill 0.15s' }}
                />

                {/* Click hint pulse ring (only when not selected) */}
                {isHovered && !isSelected && (
                  <circle
                    r={7}
                    fill="#a855f7"
                    opacity={0.15}
                  />
                )}

                {/* Hover label */}
                {isHovered && (
                  <text
                    textAnchor="middle"
                    y={-16}
                    style={{
                      fontFamily: 'var(--font-inter, sans-serif)',
                      fontSize: '9px',
                      fontWeight: 600,
                      fill: '#d8b4fe',
                      pointerEvents: 'none',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {city.shortName}
                  </text>
                )}
              </Marker>
            );
          })}

        {/* ── Origin marker — IIT Kharagpur ── */}
        {originCity && (
          <Marker
            coordinates={[originCity.lng, originCity.lat]}
            onClick={() => handleMarkerClick(originCity)}
            style={{ cursor: 'pointer' }}
          >
            {/* Pulsing rings */}
            {isInView && (
              <>
                <circle r={22} fill="none" stroke="#a855f7" strokeWidth={1.5} opacity={0.15} />
                <circle r={16} fill="none" stroke="#a855f7" strokeWidth={1.5} opacity={0.25} />
                <circle r={11} fill="none" stroke="#a855f7" strokeWidth={2} opacity={0.5} />
              </>
            )}

            {/* Core dot */}
            <circle
              r={hoveredCity?.id === originCity.id || selectedCity?.id === originCity.id ? 8 : 6.5}
              fill="#a855f7"
              filter="url(#originGlow)"
              style={{ transition: 'r 0.15s' }}
              onMouseEnter={() => setHoveredCity(originCity)}
              onMouseLeave={() => setHoveredCity(null)}
            />

            {/* Label */}
            <text
              textAnchor="middle"
              y={-26}
              style={{
                fontFamily: 'var(--font-montserrat, sans-serif)',
                fontSize: '10px',
                fontWeight: 800,
                fill: '#c084fc',
                pointerEvents: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              IIT KHARAGPUR
            </text>
            <text
              textAnchor="middle"
              y={-14}
              style={{
                fontFamily: 'var(--font-inter, sans-serif)',
                fontSize: '8px',
                fontWeight: 500,
                fill: '#6b7280',
                pointerEvents: 'none',
                letterSpacing: '0.05em',
              }}
            >
              Origin
            </text>

            {/* SVG filter def (only needs to be defined once) */}
            <defs>
              <filter id="originGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </Marker>
        )}
      </ComposableMap>

      {/* Network stats badge */}
      <NetworkBadge isInView={isInView} />

      {/* "Click to explore" hint */}
      <motion.div
        className="absolute bottom-4 left-4 flex items-center gap-1.5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
        <span className="text-[10px] font-mono text-neutral-600 tracking-wider">
          CLICK A CITY TO EXPLORE
        </span>
      </motion.div>

      {/* City detail modal */}
      <CityModal city={selectedCity} onClose={handleClose} />
    </div>
  );
}
