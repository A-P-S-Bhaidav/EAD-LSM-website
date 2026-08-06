'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Users, Calendar, Briefcase, Award, TrendingUp, Globe, Target, Zap, Building, GraduationCap, MapPin, Lightbulb, Rocket } from 'lucide-react';

const IndiaNetworkMapD3 = dynamic(() => import('./IndiaNetworkMapD3'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const leftMatrixData = [
  { icon: Globe, label: 'Cities', value: '25+', color: 'text-indigo-500' },
  { icon: Users, label: 'Students', value: '50k+', color: 'text-blue-500' },
  { icon: Building, label: 'Colleges', value: '150+', color: 'text-emerald-500' },
  { icon: GraduationCap, label: 'Alumni', value: '10k+', color: 'text-teal-500' },
  { icon: Award, label: 'Mentors', value: '100+', color: 'text-purple-500' },
  { icon: Calendar, label: 'Events', value: '50+', color: 'text-cyan-500' },
];

const rightMatrixData = [
  { icon: Briefcase, label: 'Startups', value: '2k+', color: 'text-amber-500' },
  { icon: Rocket, label: 'Early-stage Startups', value: '500+', color: 'text-rose-500' },
  { icon: TrendingUp, label: 'Investors', value: '50+', color: 'text-green-500' },
  { icon: Target, label: 'Growth', value: '3x', color: 'text-orange-500' },
  { icon: Lightbulb, label: 'Ideas', value: '5k+', color: 'text-yellow-500' },
  { icon: Zap, label: 'Reach', value: '1M+', color: 'text-red-500' },
];

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:bg-white/60 transition-all cursor-pointer group"
  >
    <div className={`p-2.5 rounded-xl bg-slate-50/50 mb-2 group-hover:scale-110 transition-transform ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-xl font-black font-montserrat text-slate-800 leading-tight">
      {value}
    </div>
    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
      {label}
    </div>
  </motion.div>
);

export default function Impact() {
  return (
    <section
      id="impact"
      className="w-full min-h-screen pt-36 pb-16 lg:pt-48 bg-[#F4F7F9] flex flex-col items-center justify-start overflow-hidden font-montserrat"
    >
      <div className="u-container max-w-[1400px] mx-auto w-full px-4 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
        >
          <div className="intro_main_bottom_cpt text-xs font-mono font-bold mb-3 text-[#0F172A]/60 tracking-widest uppercase">
            03 — IMPACT SCRIPT
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
            Empowering change across the startup ecosystem.
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Through strategic milestones, we capture metrics that matter: student exposure, capital deployment, and early stage scaling. Our drives create structural networks that empower regional innovation hubs.
          </p>
        </motion.div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full">
          
          {/* Left Column: 2x3 Matrix */}
          <div className="order-2 lg:order-1 lg:col-span-3 grid grid-cols-2 grid-rows-3 gap-4 h-full content-center">
            {leftMatrixData.map((stat, idx) => (
              <StatCard key={stat.label} {...stat} delay={0.1 * idx} />
            ))}
          </div>

          {/* Center Column: India Network Map (D3) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex items-center justify-center min-h-[450px] lg:min-h-[550px] h-full bg-white/30 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-sm p-4 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full h-full"
            >
              <IndiaNetworkMapD3 />
            </motion.div>
          </div>

          {/* Right Column: 2x3 Matrix */}
          <div className="order-3 lg:order-3 lg:col-span-3 grid grid-cols-2 grid-rows-3 gap-4 h-full content-center">
            {rightMatrixData.map((stat, idx) => (
              <StatCard key={stat.label} {...stat} delay={0.1 * idx + 0.3} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
