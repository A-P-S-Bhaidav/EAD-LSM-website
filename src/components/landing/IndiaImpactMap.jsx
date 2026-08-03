'use client';
import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cities, originCity, targetCities } from '@/lib/cities-data';

export default function IndiaImpactMap() {
  const [hoveredCity, setHoveredCity] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Generate curved path between two points
  const generateCurvePath = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control point offset (creates the curve)
    const offset = distance * 0.25;
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    const cx = (x1 + x2) / 2 + Math.cos(angle) * offset;
    const cy = (y1 + y2) / 2 + Math.sin(angle) * offset;
    
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  // Memoize paths for performance
  const paths = useMemo(() => {
    if (!originCity) return [];
    return targetCities.map(city => ({
      id: city.id,
      d: generateCurvePath(originCity.x, originCity.y, city.x, city.y),
      city
    }));
  }, []);

  const routeVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: (custom) => ({
      pathLength: 1,
      opacity: 0.6,
      transition: {
        pathLength: {
          duration: shouldReduceMotion ? 0 : 1.2,
          ease: [0.215, 0.61, 0.355, 1],
          delay: shouldReduceMotion ? 0 : custom * 0.15
        },
        opacity: {
          duration: shouldReduceMotion ? 0 : 0.4,
          delay: shouldReduceMotion ? 0 : custom * 0.15
        }
      }
    })
  };

  const nodeVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : custom * 0.15 + 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Subtle background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Main SVG Container */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full max-w-[600px] max-h-[600px]"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Interactive map of India showing EAD locations"
      >
        {/* India Map Outline */}
        <defs>
          {/* Gradient for map fill */}
          <radialGradient id="mapGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0f0f0f" />
          </radialGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Stronger glow for origin */}
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Simplified India Map Path */}
        <motion.path
          d="M 48 15 L 52 15 L 54 18 L 58 20 L 62 22 L 68 24 L 72 28 L 76 32 L 78 36 L 80 40 L 82 45 L 80 50 L 78 54 L 76 58 L 74 62 L 72 66 L 70 70 L 68 72 L 66 74 L 64 76 L 62 78 L 60 80 L 58 82 L 56 83 L 54 84 L 52 85 L 50 86 L 48 86 L 46 85 L 44 84 L 42 82 L 40 80 L 38 76 L 36 72 L 35 68 L 34 64 L 33 60 L 32 56 L 32 52 L 33 48 L 34 44 L 36 40 L 38 36 L 40 32 L 42 28 L 44 24 L 46 20 L 48 15 Z"
          fill="url(#mapGradient)"
          stroke="#333"
          strokeWidth="0.3"
          className="transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Animated Routes */}
        <g className="routes">
          {paths.map((path, index) => (
            <motion.path
              key={path.id}
              d={path.d}
              fill="none"
              stroke="#a855f7"
              strokeWidth="0.3"
              strokeLinecap="round"
              className="transition-all duration-300"
              style={{
                filter: hoveredCity === path.city.id ? 'brightness(1.5)' : 'brightness(1)'
              }}
              variants={routeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
            />
          ))}
        </g>

        {/* City Nodes */}
        <g className="nodes">
          {/* Origin Node (IIT Kharagpur) */}
          {originCity && (
            <g>
              {/* Pulse animation ring */}
              <motion.circle
                cx={originCity.x}
                cy={originCity.y}
                r="2"
                fill="none"
                stroke="#a855f7"
                strokeWidth="0.3"
                opacity="0.6"
                animate={shouldReduceMotion ? {} : {
                  r: [2, 4, 2],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main origin node */}
              <motion.circle
                cx={originCity.x}
                cy={originCity.y}
                r="1.8"
                fill="#a855f7"
                filter="url(#strongGlow)"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCity(originCity.id)}
                onMouseLeave={() => setHoveredCity(null)}
                onFocus={() => setHoveredCity(originCity.id)}
                onBlur={() => setHoveredCity(null)}
                tabIndex={0}
                role="button"
                aria-label={`${originCity.name} - ${originCity.edition}`}
                whileHover={{ scale: 1.3 }}
                variants={nodeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              />

              {/* Origin Label */}
              <motion.text
                x={originCity.x}
                y={originCity.y - 3.5}
                textAnchor="middle"
                className="text-[2.5px] font-mono font-bold fill-purple-400 uppercase tracking-wider pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                IIT KHARAGPUR
              </motion.text>
            </g>
          )}

          {/* Target City Nodes */}
          {targetCities.map((city, index) => (
            <g key={city.id}>
              {/* Pulse ring on hover */}
              {hoveredCity === city.id && (
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r="1.2"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="0.2"
                  initial={{ r: 1.2, opacity: 0.8 }}
                  animate={{ r: 3, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}

              {/* City node */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="1"
                fill="#a855f7"
                filter="url(#glow)"
                className="cursor-pointer transition-all duration-300"
                style={{
                  opacity: hoveredCity === city.id ? 1 : 0.8
                }}
                onMouseEnter={() => setHoveredCity(city.id)}
                onMouseLeave={() => setHoveredCity(null)}
                onFocus={() => setHoveredCity(city.id)}
                onBlur={() => setHoveredCity(null)}
                tabIndex={0}
                role="button"
                aria-label={`${city.name} - ${city.edition} - ${city.students} students`}
                whileHover={{ scale: 1.4 }}
                variants={nodeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index + 1}
              />

              {/* City label - shows on hover */}
              <motion.text
                x={city.x}
                y={city.y - 2.2}
                textAnchor="middle"
                className="text-[1.8px] font-mono font-semibold fill-neutral-300 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCity === city.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {city.shortName}
              </motion.text>
            </g>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredCity && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-xl px-4 py-3 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {(() => {
            const city = cities.find(c => c.id === hoveredCity);
            if (!city) return null;
            return (
              <div className="text-center min-w-[140px]">
                <div className="text-sm font-bold text-white mb-1 font-montserrat">
                  {city.name}
                </div>
                <div className="text-xs text-purple-400 font-mono mb-1">
                  {city.edition}
                </div>
                <div className="text-xs text-neutral-400 font-inter">
                  {city.students} Students
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}
