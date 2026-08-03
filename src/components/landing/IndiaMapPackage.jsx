'use client';

import React, { useState } from 'react';
import India from '@react-map/india';

/**
 * Interactive India Map using @react-map/india package
 * 
 * Features:
 * - Pre-built accurate SVG India map
 * - Click handlers for each state
 * - Hover effects with state highlighting
 * - Customizable colors and styles
 * - Accessibility support
 */
export default function IndiaMapPackage() {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  // Handle state click
  const handleStateClick = (state) => {
    setSelectedState(state);
    console.log('Selected state:', state);
  };

  // Handle state hover
  const handleStateHover = (state) => {
    setHoveredState(state);
  };

  // Define colors for different states (optional)
  const stateColors = {
    'West Bengal': '#a855f7', // Purple for home state
    'Delhi': '#8b5cf6',
    'Maharashtra': '#7c3aed',
    'Karnataka': '#6d28d9',
    'Tamil Nadu': '#5b21b6',
    // Add more states as needed
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <India
          // Required prop
          type="select-single"
          // Size props
          size={600}
          // Map customization
          mapColor="#1a1a1a" // Dark background for states
          strokeColor="#a855f7" // Purple border color
          strokeWidth={1}
          hoverColor="#a855f7" // Purple on hover
          selectColor="#8b5cf6" // Selected state color
          // Hints/tooltips
          hints={true}
          hintTextColor="#ffffff"
          hintBackgroundColor="#000000"
          hintBorderRadius={8}
          // Click handler for each state
          onSelect={(state) => {
            if (state) {
              handleStateClick(state);
            }
          }}
        />
      </div>

      {/* Selected State Display */}
      {selectedState && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
          <p className="text-white text-sm">
            <span className="text-purple-400 font-semibold">Selected State:</span>{' '}
            {selectedState}
          </p>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredState && !selectedState && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-purple-500/40 rounded-lg px-4 py-2">
          <p className="text-white text-sm font-medium">{hoveredState}</p>
        </div>
      )}

      {/* Legend (Optional) */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-lg p-3 space-y-2">
        <p className="text-white text-xs font-semibold mb-2">Legend</p>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#1a1a1a] border border-purple-500/50 rounded"></div>
          <span className="text-neutral-400 text-xs">States</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-neutral-400 text-xs">Hover/Active</span>
        </div>
      </div>
    </div>
  );
}
