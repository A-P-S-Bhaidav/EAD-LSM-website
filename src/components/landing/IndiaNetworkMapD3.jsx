'use client';

import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps';
import { cities, originCity } from '@/lib/cities-data';
import { X, MapPin, Users, Calendar, Search, ZoomIn, ZoomOut, RotateCcw, Briefcase, Award } from 'lucide-react';

const GEO_URL = '/india-districts.geojson';

const REGIONS = ['All', 'North', 'South', 'East', 'West', 'Central', 'North East'];

// Mercator projection config — centered on India
const PROJECTION_CONFIG = {
  scale: 750,
  center: [82.5, 27.0],
};

// ── Interactive City Detail Modal ─────────────────────────────────────────────
function CityModal({ city, onClose }) {
  const isOrigin = city?.isOrigin;

  return (
    <AnimatePresence>
      {city && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[340px] sm:w-[400px] bg-[#0F172A] border border-[#7DA6A9]/40
                       rounded-2xl shadow-2xl overflow-hidden text-white"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top Accent Bar */}
            <div className="h-1.5 w-full bg-[#7DA6A9]" />

            <div className="p-6 font-montserrat">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isOrigin ? 'bg-[#7DA6A9]/20 border border-[#7DA6A9]/40' : 'bg-slate-800 border border-slate-700'}`}>
                    <MapPin className={`w-5 h-5 ${isOrigin ? 'text-[#7DA6A9]' : 'text-[#7DA6A9]'}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg font-montserrat leading-tight">
                      {city.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono font-bold text-[#7DA6A9] uppercase tracking-widest">
                        {isOrigin ? 'Origin Hub' : `${city.region} Region`}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#7DA6A9]" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">Students</span>
                    <span className="text-xs font-black font-montserrat text-white">{city.students}</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">Edition</span>
                    <span className="text-xs font-black font-montserrat text-white">{city.edition}</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">Startups Scaled</span>
                    <span className="text-xs font-black font-montserrat text-white">{city.startups || '20+'}</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center gap-3">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">VC Partners</span>
                    <span className="text-xs font-black font-montserrat text-white">{city.vcs || '5+'}</span>
                  </div>
                </div>
              </div>

              {/* Coordinates Footer */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 tracking-wider">COORDINATES</span>
                <span className="text-[11px] font-mono text-slate-300">
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

export default function IndiaNetworkMapD3() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');
  const [position, setPosition] = useState({ coordinates: [82.5, 22.5], zoom: 1 });
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter cities by search query & selected region
  const filteredCities = useMemo(() => {
    return cities.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.shortName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = activeRegion === 'All' || c.region === activeRegion || c.isOrigin;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, activeRegion]);

  const targetCities = useMemo(() => filteredCities.filter(c => !c.isOrigin), [filteredCities]);

  // Zoom handlers
  const handleZoomIn = () => {
    if (position.zoom >= 3) return;
    setPosition(prev => ({ ...prev, zoom: prev.zoom * 1.35 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 0.9) return;
    setPosition(prev => ({ ...prev, zoom: prev.zoom / 1.35 }));
  };

  const handleResetZoom = () => {
    setPosition({ coordinates: [82.5, 22.5], zoom: 1 });
  };

  const handleMarkerClick = useCallback((city) => {
    setSelectedCity(city);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCity(null);
  }, []);

  if (!mounted) {
    return (
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full select-none flex flex-col justify-between font-montserrat">
      
      {/* ── TOP CONTROLS: SEARCH & REGION FILTERS ── */}
      <div className="absolute top-2 left-2 right-2 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* Search Bar */}
        <div className="relative flex items-center bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs w-48 sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search city (e.g. Pune)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-montserrat font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700 text-xs">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Region Filter Chips */}
        <div className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-1 shadow-xs">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-2.5 py-1 rounded-lg text-[0.68rem] font-bold font-montserrat transition-all cursor-pointer ${
                activeRegion === r
                  ? 'bg-[#0F172A] text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-[#7DA6A9]/20'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAP CONTAINER ── */}
      <div className="relative w-full h-full flex-1">
        
        {/* Map Canvas */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={PROJECTION_CONFIG}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={(pos) => setPosition(pos)}
          >
            {/* Geographies (India District Outlines) */}
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
                          fill: isClaimed ? '#1E293B' : '#0F172A',
                          stroke: isClaimed ? '#475569' : '#1E293B',
                          strokeWidth: isClaimed ? 0.8 : 0.4,
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        },
                        hover: {
                          fill: '#1E293B',
                          stroke: '#7DA6A9',
                          strokeWidth: 0.8,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#0F172A',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Connection Arcs (Origin -> Cities) */}
            {isInView &&
              targetCities.map((city) => {
                const isHovered = hoveredCity?.id === city.id;
                const isSelected = selectedCity?.id === city.id;

                return (
                  <Line
                    key={`line-${city.id}`}
                    coordinates={[
                      [originCity.lng, originCity.lat],
                      [city.lng, city.lat],
                    ]}
                    stroke={isHovered || isSelected ? '#FFFFFF' : '#7DA6A9'}
                    strokeWidth={isHovered || isSelected ? 2.5 : 1}
                    strokeLinecap="round"
                    strokeOpacity={isHovered || isSelected ? 1 : 0.45}
                    fill="none"
                    style={{ transition: 'all 0.2s ease' }}
                  />
                );
              })}

            {/* Target City Markers */}
            {targetCities.map((city) => {
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
                  {/* Outer pulse ring on hover */}
                  {isHovered && (
                    <circle r={14} fill="none" stroke="#FFFFFF" strokeWidth={1.5} opacity={0.7} />
                  )}

                  {/* Outer Ring */}
                  <circle
                    r={isHovered || isSelected ? 9 : 6.5}
                    fill="none"
                    stroke={isHovered || isSelected ? '#FFFFFF' : '#7DA6A9'}
                    strokeWidth={1.5}
                    opacity={0.9}
                    style={{ transition: 'all 0.15s ease' }}
                  />

                  {/* Core Dot */}
                  <circle
                    r={isHovered || isSelected ? 4.5 : 3.5}
                    fill={isHovered || isSelected ? '#FFFFFF' : '#7DA6A9'}
                    style={{ transition: 'all 0.15s ease' }}
                  />

                  {/* Hover Label */}
                  {isHovered && (
                    <text
                      textAnchor="middle"
                      y={-14}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '9px',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        pointerEvents: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {city.shortName}
                    </text>
                  )}
                </Marker>
              );
            })}

            {/* Origin Marker — IIT Kharagpur */}
            {originCity && (
              <Marker
                coordinates={[originCity.lng, originCity.lat]}
                onClick={() => handleMarkerClick(originCity)}
                onMouseEnter={() => setHoveredCity(originCity)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle r={20} fill="none" stroke="#7DA6A9" strokeWidth={1.5} opacity={0.35} />
                <circle r={12} fill="none" stroke="#7DA6A9" strokeWidth={2} opacity={0.75} />

                <circle
                  r={hoveredCity?.id === originCity.id || selectedCity?.id === originCity.id ? 8 : 6}
                  fill="#7DA6A9"
                  style={{ transition: 'all 0.15s ease' }}
                />

                <text
                  textAnchor="middle"
                  y={-24}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '10px',
                    fontWeight: 900,
                    fill: '#FFFFFF',
                    pointerEvents: 'none',
                    letterSpacing: '0.08em',
                  }}
                >
                  IIT KHARAGPUR
                </text>
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '8px',
                    fontWeight: 700,
                    fill: '#7DA6A9',
                    pointerEvents: 'none',
                  }}
                >
                  Origin
                </text>
              </Marker>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* ── BOTTOM MAP CONTROLS: ZOOM & NETWORK COUNTER ── */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Zoom Control Buttons */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-1 shadow-xs pointer-events-auto">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-0.5" />
          <button
            onClick={handleResetZoom}
            title="Reset Map View"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Network Badge */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl px-3.5 py-2 text-white shadow-md">
          <div className="text-[9px] font-mono font-bold text-[#7DA6A9] uppercase tracking-widest mb-1">
            Network Reach
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black font-montserrat text-white">{filteredCities.length - 1}</span>
              <span className="text-[10px] text-slate-400 font-montserrat">Cities</span>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black font-montserrat text-white">11+</span>
              <span className="text-[10px] text-slate-400 font-montserrat">States</span>
            </div>
          </div>
        </div>

      </div>

      {/* City Detail Modal */}
      <CityModal city={selectedCity} onClose={handleCloseModal} />
    </div>
  );
}
