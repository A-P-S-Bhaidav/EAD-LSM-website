'use client';

import React from 'react';
import IndiaMapPackage from '@/components/landing/IndiaMapPackage';

export default function MapDemoPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0c] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            India Map - @react-map/india Package Demo
          </h1>
          <p className="text-neutral-400">
            Interactive SVG map of India with click and hover functionality
          </p>
        </div>

        {/* Main Map Section */}
        <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-8 mb-8">
          <div className="w-full h-[600px]">
            <IndiaMapPackage />
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Usage */}
          <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">📦</span> Basic Usage
            </h2>
            <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-green-400">{`import India from '@react-map/india';

<India 
  type="select-single"  // Required!
  size={600}
  mapColor="#1a1a1a"
  strokeColor="#a855f7"
  strokeWidth={1}
  hoverColor="#a855f7"
  hints={true}
  onSelect={(state) => console.log(state)}
/>`}</code>
            </pre>
          </div>

          {/* Features */}
          <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">✨</span> Features
            </h2>
            <ul className="space-y-3 text-neutral-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Pre-built SVG:</strong> Accurate India map with all states</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Interactive:</strong> Click and hover handlers for each state</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Customizable:</strong> Colors, borders, and styles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Lightweight:</strong> No external dependencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>TypeScript:</strong> Built-in type declarations</span>
              </li>
            </ul>
          </div>

          {/* Available Props */}
          <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">⚙️</span> Available Props
            </h2>
            <div className="space-y-3 text-sm">
              <PropItem name="type" type="string" desc="Required: 'select-single' or 'select-multiple'" />
              <PropItem name="size" type="number" desc="Map size in pixels (e.g., 600)" />
              <PropItem name="mapColor" type="string" desc="Fill color for states" />
              <PropItem name="strokeColor" type="string" desc="Border color" />
              <PropItem name="strokeWidth" type="number" desc="Border width (e.g., 1)" />
              <PropItem name="hoverColor" type="string" desc="Color on hover" />
              <PropItem name="selectColor" type="string" desc="Color when selected" />
              <PropItem name="hints" type="boolean" desc="Show state name tooltips" />
              <PropItem name="onSelect" type="function" desc="Select handler (state) => {}" />
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">💡</span> Use Cases
            </h2>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">→</span>
                <span>Display EAD expansion across states</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">→</span>
                <span>Show student distribution by region</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">→</span>
                <span>Visualize impact metrics by state</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">→</span>
                <span>Interactive regional statistics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">→</span>
                <span>Geographic data visualization</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Integration Tips */}
        <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>🎯</span> Integration Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-300">
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Replace Custom Map</h3>
              <p>You can replace your custom IndiaImpactMap with this package for a more accurate state-level India map.</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Combine with Data</h3>
              <p>Connect with your cities-data.js to highlight states where EAD has presence.</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Add Animations</h3>
              <p>Use Framer Motion to animate state fills, similar to your existing route animations.</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Custom Tooltips</h3>
              <p>Create custom tooltips showing city-wise statistics when hovering over states.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for prop documentation
function PropItem({ name, type, desc }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <code className="text-purple-400 font-mono text-xs">{name}</code>
        <span className="text-neutral-500 text-xs">({type})</span>
      </div>
      <p className="text-neutral-400 text-xs ml-2">{desc}</p>
    </div>
  );
}
