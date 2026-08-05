'use client';
import { motion } from 'framer-motion';
import { Globe, Sparkles, Coins, Handshake, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCountUp, parseNumericValue, formatCountValue } from '@/hooks/useCountUp';

const IndiaNetworkMapD3 = dynamic(() => import('./IndiaNetworkMapD3'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

// Metric Card Component with count-up animation
function MetricCard({ metric, index }) {
  const Icon = metric.icon;
  const numericValue = parseNumericValue(metric.value);
  const { count, ref } = useCountUp(numericValue, 2000);
  const displayValue = formatCountValue(count, metric.value);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
        delay: index * 0.12
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      whileHover={{ 
        y: -6, 
        borderColor: "rgba(0, 0, 0, 0.15)",
        boxShadow: '0 12px 24px rgba(0,0,0,0.08)'
      }}
      className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div>
        {/* Top Row: Icon + Arrow */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 group-hover:border-gray-300 transition-colors">
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </div>

        {/* Metric Value with count-up animation */}
        <h3 className={`text-3xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent font-montserrat tracking-tight mb-2`}>
          {displayValue}
        </h3>
        
        {/* Metric Label */}
        <h4 className="text-sm font-bold text-gray-900 font-montserrat tracking-wide mb-3">
          {metric.label}
        </h4>
      </div>

      {/* Metric Description */}
      <p className="text-xs text-gray-500 font-inter leading-relaxed mt-2">
        {metric.description}
      </p>
    </motion.div>
  );
}

export default function Impact() {
  const metrics = [
    {
      value: "30+",
      label: "Cities",
      description: "Traversing the length and breadth of India to establish entrepreneurial hubs in Tier-2 and Tier-3 cities.",
      icon: Globe,
      color: "from-blue-500 to-indigo-600",
    },
    {
      value: "30K+",
      label: "Students",
      description: "Conducting targeted workshops, case studies, and lectures to ignite startup curiosity in young minds.",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
    },
    {
      value: "₹10Cr+",
      label: "Capital",
      description: "Direct investment pipelines connecting promising local startups with active early-stage term sheets.",
      icon: Coins,
      color: "from-emerald-500 to-teal-600",
    },
    {
      value: "50+",
      label: "Investors",
      description: "Curating high-value pitch decks for strategic feedback and follow-on institutional rounds.",
      icon: Handshake,
      color: "from-orange-500 to-rose-600",
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <div id="impact" className="py-[12vh] border-t-0 relative overflow-hidden" style={{ backgroundColor: '#eef0f4' }}>

      <div className="u-container">
        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-16 mb-8">
          
          {/* Left Column: Context Narrative */}
          <div className="col-span-full lg:col-span-5 flex flex-col justify-center">
            <div className="intro_main_bottom_cpt u-text-sm is-d mb-6 text-gray-400 tracking-widest font-mono uppercase">
              03 — IMPACT SCRIPT
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight font-montserrat tracking-tight mb-6">
              Empowering change across the startup ecosystem.
            </h2>
            <p className="text-gray-500 font-inter text-[0.98rem] leading-relaxed mb-8">
              Through strategic milestones, we capture metrics that matter: student exposure, capital deployment, and early stage scaling. Our drives create structural networks that empower regional innovation hubs.
            </p>
            
            {/* Minimalist interactive legend / quote */}
            <div className="border-l-2 border-blue-400/50 pl-6 py-2 bg-blue-50/40 rounded-r-lg border-y border-r border-blue-100/50">
              <span className="text-sm font-semibold text-gray-600 font-inter italic">
                &ldquo;We don't just host events; we coordinate the building blocks of regional startup economies.&rdquo;
              </span>
              <div className="text-xs font-mono font-bold text-blue-600 mt-2 uppercase tracking-wider">
                — E-Cell, IIT Kharagpur
              </div>
            </div>
          </div>

          {/* Right Column: India Network Map (D3) */}
          <div className="col-span-full lg:col-span-7 flex items-center justify-center">
            <div className="w-full h-full min-h-[400px] lg:min-h-[600px]">
              <IndiaNetworkMapD3 />
            </div>
          </div>

        </div>

        {/* Metric Cards Grid - Below the map */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {metrics.map((m, idx) => (
            <MetricCard key={idx} metric={m} index={idx} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
