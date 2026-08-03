'use client';

import React, { useState } from 'react';
import India from '@react-map/india';
import { motion } from 'framer-motion';
import { cities } from '@/lib/cities-data';

/**
 * Enhanced India Map integrating @react-map/india with EAD cities data
 * 
 * Features:
 * - Official India state boundaries from @react-map/india
 * - EAD city markers overlaid on the map
 * - Interactive tooltips showing city data
 * - State highlighting with EAD presence indicators
 * - Smooth animations and hover effects
 */

// Map cities to their corresponding states
const cityStateMapping = {
  'Kharagpur': 'West Bengal',
  'Kolkata': 'West Bengal',
  'Bhubaneswar': 'Odisha',
  'Delhi': 'Delhi',
  'Jaipur': 'Rajasthan',
  'Ahmedabad': 'Gujarat',
  'Mumbai': 'Maharashtra',
  'Pune': 'Maharashtra',
  'Hyderabad': 'Telangana',
  'Bengaluru': 'Karnataka',
  'Chennai': 'Tamil Nadu',
  'Guwahati': 'Assam'
};

// Get states where EAD is present
const eadStates = [...new Set(Object.values(cityStateMapping))];

export default function IndiaMapEnhanced() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  // Get cities in a particular state
  const getCitiesInState = (stateName) => {
    return cities.filter(city => cityStateMapping[city.shortName] === stateName);
  };

  // Handle state click
  const handleStateClick = (stateName) => {
    const citiesInState = getCitiesInState(stateName);
    if (citiesInState.length > 0) {
      setSelectedCity(null);
      setHoveredState(stateName);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Base India Map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <India
          type="select-single"
          size={600}
          mapColor="#1a1a1a"
          strokeColor="#333333"
          strokeWidth={1}
          hoverColor="#2a2a2a"
          selectColor="#3a3a3a"
          hints={true}
          hintTextColor="#ffffff"
          hintBackgroundColor="rgba(0, 0, 0, 0.9)"
          hintBorderRadius={8}
          onSelect={(stateName) => {
            if (stateName) {
              handleStateClick(stateName);
            }
          }}
        />
      </div>

      {/* SVG Overlay for City Markers */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter for city nodes */}
          <filter id="glow-enhanced">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Pulse animation filter */}
          <filter id="pulse-enhanced">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* City Markers */}
        {cities.map((city, index) => (
          <g key={city.id}>
            {/* Pulsing outer circle */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={city.isOrigin ? 3 : 2}
              fill="none"
              stroke="#a855f7"
              strokeWidth="0.3"
              opacity={0.4}
              animate={{
                r: city.isOrigin ? [3, 5, 3] : [2, 3.5, 2],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />

            {/* Main city node */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={city.isOrigin ? 2 : 1.5}
              fill={city.isOrigin ? '#a855f7' : '#8b5cf6'}
              stroke="#ffffff"
              strokeWidth="0.3"
              filter="url(#glow-enhanced)"
              className="pointer-events-auto cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              whileHover={{
                scale: 1.5,
                fill: '#c084fc',
              }}
              onMouseEnter={() => setSelectedCity(city)}
              onMouseLeave={() => setSelectedCity(null)}
            />

            {/* City label for origin */}
            {city.isOrigin && (
              <motion.text
                x={city.x}
                y={city.y - 4}
                textAnchor="middle"
                className="text-[2px] font-semibold pointer-events-none"
                fill="#a855f7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {city.shortName}
              </motion.text>
            )}
          </g>
        ))}
      </svg>

      {/* City Tooltip */}
      {selectedCity && (
        <motion.div
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${selectedCity.x}%`,
            top: `${selectedCity.y}%`,
            transform: 'translate(-50%, -120%)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-black/95 backdrop-blur-md border border-purple-500/30 rounded-lg px-4 py-3 shadow-2xl min-w-[180px]">
            <div className="text-white text-sm font-semibold mb-1">
              {selectedCity.name}
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Edition:</span>
                <span className="text-purple-400 font-medium">{selectedCity.edition}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Students:</span>
                <span className="text-white font-medium">{selectedCity.students}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Year:</span>
                <span className="text-neutral-300">{selectedCity.year}</span>
              </div>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-black/95 border-b border-r border-purple-500/30 rotate-45"></div>
        </motion.div>
      )}

      {/* State Info Panel */}
      {hoveredState && eadStates.includes(hoveredState) && !selectedCity && (
        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-black/90 backdrop-blur-md border border-purple-500/40 rounded-lg px-5 py-3 shadow-2xl">
            <div className="text-white text-sm font-semibold mb-2">{hoveredState}</div>
            <div className="space-y-1">
              {getCitiesInState(hoveredState).map(city => (
                <div key={city.id} className="text-xs text-neutral-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  {city.shortName} ({city.students})
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-lg p-3 space-y-2 text-xs">
        <p className="text-white font-semibold mb-2">EAD Presence</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
          <span className="text-neutral-400">Origin (KGP)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <span className="text-neutral-400">EAD Cities</span>
        </div>
        <div className="text-neutral-500 text-[10px] mt-2 pt-2 border-t border-neutral-700">
          {cities.length} cities • {eadStates.length} states
        </div>
      </div>
    </div>
  );
}
