'use client';

import React, { useState, useMemo } from 'react';
import India from '@react-map/india';
import { motion, useInView } from 'framer-motion';
import { cities, originCity, targetCities } from '@/lib/cities-data';

/**
 * Premium Network Visualization: EAD's Expansion Across India
 * 
 * Design inspired by: Vercel Edge Network, Stripe Atlas, Linear, GitHub
 * 
 * Story: IIT Kharagpur → Nationwide Entrepreneurial Network
 */

// Generate smooth Bezier curve path from origin to target
const generateCurvePath = (from, to) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Control point for smooth curve (more pronounced for longer distances)
  const curvature = distance * 0.35;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  // Perpendicular offset for curve
  const offsetX = -dy / distance * curvature;
  const offsetY = dx / distance * curvature;
  
  const controlX = midX + offsetX;
  const controlY = midY + offsetY;
  
  return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
};

// Calculate path length for animation
const getPathLength = (from, to) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.sqrt(dx * dx + dy * dy) * 1.4; // Approximate curve length
};

export default function IndiaNetworkMap() {
  const [hoveredCity, setHoveredCity] = useState(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Generate all route paths
  const routes = useMemo(() => {
    return targetCities.map((city, index) => ({
      id: city.id,
      path: generateCurvePath(originCity, city),
      length: getPathLength(originCity, city),
      city: city,
      delay: index * 0.15
    }));
  }, []);

  return (
    <div ref={ref} className="relative w-full h-full">
      {/* Background texture - subtle dot matrix */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Radial gradient behind India */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Base India Map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="scale-110 opacity-90">
          <India
            type="select-single"
            size={600}
            mapColor="#1a1a1a"
            strokeColor="#2a2a2a"
            strokeWidth={0.8}
            hoverColor="#1f1f1f"
            disableClick={true}
            hints={false}
          />
        </div>
      </div>

      {/* SVG Network Overlay */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Route gradient */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>

          {/* Origin glow filter */}
          <filter id="originGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* City glow filter */}
          <filter id="cityGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Particle glow */}
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection Routes */}
        {routes.map((route) => (
          <g key={`route-${route.id}`}>
            {/* Base route path */}
            <motion.path
              d={route.path}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="0.15"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { 
                pathLength: 1, 
                opacity: 1 
              } : {}}
              transition={{
                pathLength: { 
                  duration: 1.2, 
                  delay: 0.8 + route.delay,
                  ease: [0.22, 1, 0.36, 1]
                },
                opacity: { 
                  duration: 0.3, 
                  delay: 0.8 + route.delay 
                }
              }}
            />

            {/* Flowing particle */}
            <motion.circle
              r="0.4"
              fill="#a855f7"
              filter="url(#particleGlow)"
              initial={{ opacity: 0 }}
              animate={isInView ? {
                opacity: [0, 1, 1, 0],
                offsetDistance: ['0%', '100%']
              } : {}}
              transition={{
                opacity: {
                  duration: 3,
                  delay: 2 + route.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                  times: [0, 0.1, 0.9, 1]
                },
                offsetDistance: {
                  duration: 3,
                  delay: 2 + route.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "linear"
                }
              }}
              style={{
                offsetPath: `path('${route.path}')`,
              }}
            />
          </g>
        ))}

        {/* City Nodes */}
        {targetCities.map((city, index) => {
          const isHovered = hoveredCity?.id === city.id;
          
          return (
            <g key={`city-${city.id}`}>
              {/* Outer glow ring */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="1.2"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="0.15"
                opacity={0.4}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? {
                  scale: isHovered ? 1.3 : 1,
                  opacity: isHovered ? 0.6 : 0.4
                } : {}}
                transition={{
                  scale: { duration: 0.12 },
                  opacity: { 
                    duration: 0.3, 
                    delay: 1.8 + (index * 0.08) 
                  }
                }}
              />

              {/* Main node */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="0.5"
                fill="#a855f7"
                filter="url(#cityGlow)"
                className="pointer-events-auto cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? {
                  scale: isHovered ? 1.4 : 1,
                  opacity: 1
                } : {}}
                transition={{
                  scale: { duration: 0.12 },
                  opacity: { 
                    duration: 0.4, 
                    delay: 1.8 + (index * 0.08) 
                  }
                }}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              />
            </g>
          );
        })}

        {/* Origin Node - IIT Kharagpur (HERO) */}
        <g>
          {/* Ripple effect - outer */}
          <motion.circle
            cx={originCity.x}
            cy={originCity.y}
            r="3"
            fill="none"
            stroke="#a855f7"
            strokeWidth="0.2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? {
              scale: [1, 2, 2],
              opacity: [0.6, 0.2, 0]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />

          {/* Ripple effect - inner */}
          <motion.circle
            cx={originCity.x}
            cy={originCity.y}
            r="3"
            fill="none"
            stroke="#a855f7"
            strokeWidth="0.25"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? {
              scale: [1, 1.8, 1.8],
              opacity: [0.8, 0.3, 0]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />

          {/* Concentric rings */}
          <motion.circle
            cx={originCity.x}
            cy={originCity.y}
            r="2.5"
            fill="none"
            stroke="#a855f7"
            strokeWidth="0.15"
            opacity={0.4}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.4 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.circle
            cx={originCity.x}
            cy={originCity.y}
            r="1.8"
            fill="none"
            stroke="#a855f7"
            strokeWidth="0.2"
            opacity={0.6}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          {/* Main origin node */}
          <motion.circle
            cx={originCity.x}
            cy={originCity.y}
            r="1.2"
            fill="#a855f7"
            filter="url(#originGlow)"
            initial={{ scale: 0 }}
            animate={isInView ? { 
              scale: 1,
            } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          />

          {/* Always-visible label */}
          <motion.text
            x={originCity.x}
            y={originCity.y - 4.5}
            textAnchor="middle"
            className="text-[2.2px] font-bold tracking-wide pointer-events-none"
            fill="#a855f7"
            initial={{ opacity: 0, y: 2 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 1 }}
          >
            IIT KHARAGPUR
          </motion.text>

          {/* Subtle sub-label */}
          <motion.text
            x={originCity.x}
            y={originCity.y - 3}
            textAnchor="middle"
            className="text-[1.2px] font-medium pointer-events-none"
            fill="#888888"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : {}}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            Origin
          </motion.text>
        </g>
      </svg>

      {/* City Tooltip */}
      {hoveredCity && (
        <motion.div
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${hoveredCity.x}%`,
            top: `${hoveredCity.y}%`,
            transform: 'translate(-50%, calc(-100% - 20px))',
          }}
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.12 }}
        >
          <div className="bg-black/95 backdrop-blur-xl border border-purple-500/20 rounded-xl px-4 py-2.5 shadow-2xl">
            <div className="text-white text-sm font-bold mb-1">
              {hoveredCity.shortName}
            </div>
            <div className="flex gap-3 text-[11px]">
              <div>
                <span className="text-neutral-500">Edition:</span>
                <span className="text-purple-400 font-semibold ml-1">{hoveredCity.edition}</span>
              </div>
              <div>
                <span className="text-neutral-500">Students:</span>
                <span className="text-white font-semibold ml-1">{hoveredCity.students}</span>
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-black/95 border-b border-r border-purple-500/20 rotate-45"></div>
        </motion.div>
      )}

      {/* Minimal Stats Badge */}
      <motion.div
        className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-neutral-800/60 rounded-xl px-4 py-3"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
          Network
        </div>
        <div className="flex items-center gap-3">
          <div>
            <span className="text-white text-lg font-bold">{targetCities.length + 1}</span>
            <span className="text-neutral-400 text-xs ml-1">Cities</span>
          </div>
          <div className="w-px h-4 bg-neutral-700"></div>
          <div>
            <span className="text-purple-400 text-lg font-bold">11</span>
            <span className="text-neutral-400 text-xs ml-1">States</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
