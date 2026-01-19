import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Clock } from 'lucide-react';
import ShopifyBuyButton from './ShopifyBuyButton';

interface Watch {
  id: number;
  name: string;
  tagline: string;
  price: number;
  image: string;
  description: string;
}

// Mock Data for Watches
const WATCHES: Watch[] = [
  {
    id: 101,
    name: "The Midnight Chronograph",
    tagline: "Precision in Darkness",
    price: 12500,
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80",
    description: "Forged from asteroid carbon and sapphire crystal. A tribute to the void."
  },
  {
    id: 102,
    name: "Royal Aviator Gold",
    tagline: "Ascend Beyond",
    price: 18900,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    description: "18k gold casing with a perpetual calendar movement. Designed for the elite."
  },
  {
    id: 103,
    name: "Obsidian Diver",
    tagline: "Depth Defying",
    price: 8400,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    description: "Water resistant to 1000m. Black luminescent markers for the deepest dives."
  },
  {
    id: 104,
    name: "Celestial Tourbillon",
    tagline: "Gravity Mastered",
    price: 45000,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80",
    description: "Exposed tourbillon mechanism floating in a void of anti-reflective glass."
  }
];

const FogLayer = ({ delay, duration, opacity }: { delay: number; duration: number; opacity: number }) => (
  <motion.div
    initial={{ x: "-10%" }}
    animate={{ x: "10%" }}
    transition={{
      repeat: Infinity,
      repeatType: "reverse",
      duration: duration,
      ease: "easeInOut",
      delay: delay
    }}
    // OPTIMIZATION: Changed absolute to fixed to reduce paint area from full scroll height to viewport height.
    // Added will-change to promote to GPU layer.
    className="fixed inset-0 pointer-events-none z-0"
    style={{ opacity, willChange: 'transform' }}
  >
    <div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/40 to-transparent transform scale-150 blur-3xl"
    />
    <div 
      className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]" 
    />
    <div 
      className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gray-800/30 rounded-full blur-[120px]" 
    />
  </motion.div>
);

const LuxuryCard: React.FC<{ watch: Watch, index: number }> = ({ watch, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full h-[600px] perspective-[1000px]"
    >
      <div className="relative w-full h-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 group-hover:border-red-500/40 transition-colors duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_50px_rgba(185,28,28,0.25)] transition-shadow">
        
        {/* Inset Metallic Rim - Adds that extra pop */}
        <div className="absolute inset-2 rounded-xl border border-white/5 group-hover:border-red-500/20 z-20 pointer-events-none transition-colors duration-500" />
        
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={watch.image} 
            alt={watch.name} 
            // OPTIMIZATION: Removed transition-all, specific properties only.
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-[transform,opacity] duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end items-center text-center">
          
          {/* Floating Tagline */}
          <div className="absolute top-8 left-0 w-full flex justify-center overflow-hidden">
             <motion.span 
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + index * 0.2 }}
               className="text-[10px] uppercase tracking-[0.4em] text-red-500 font-bold border border-red-900/30 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full"
             >
               {watch.tagline}
             </motion.span>
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 group-hover:text-red-100 transition-colors duration-500 drop-shadow-lg">
            {watch.name}
          </h3>
          
          <div className="w-12 h-[1px] bg-red-600/50 my-4 group-hover:w-24 transition-[width] duration-700" />
          
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-700 delay-100">
            {watch.description}
          </p>

          <div className="flex flex-col items-center gap-4">
            <span className="font-serif text-2xl text-mondera-gold italic">
              ${watch.price.toLocaleString()}
            </span>
            
            <button className="relative overflow-hidden px-8 py-3 bg-red-950/30 border border-red-900/50 text-red-100 hover:text-white hover:bg-red-900/50 hover:border-red-500 transition-colors duration-300 uppercase tracking-widest text-xs font-semibold backdrop-blur-sm group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] rounded-full">
              <span className="relative z-10 flex items-center gap-2">
                Reserve Timepiece
              </span>
            </button>
          </div>

        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      </div>
    </motion.div>
  );
};

const WatchesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#020202] overflow-hidden text-white pt-32 pb-20">
      
      {/* --- Mist & Fog Background Layers --- */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black opacity-80" />
      
      {/* Animated Fog Layers */}
      <FogLayer delay={0} duration={20} opacity={0.6} />
      <FogLayer delay={10} duration={25} opacity={0.4} />
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-50 pointer-events-none" />

      {/* --- Content --- */}
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{ willChange: 'transform, opacity' }} // OPTIMIZATION
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-red-900/20 blur-[100px] pointer-events-none"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-red-100 via-red-200 to-red-950 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] mb-6"
          >
            CHRONOGRAPHS
          </motion.h1>
        </div>

        {/* Watches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {WATCHES.map((watch, index) => (
            <LuxuryCard key={watch.id} watch={watch} index={index} />
          ))}
        </div>

        {/* Bottom Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-32 text-center"
        >
          <p className="text-gray-500 italic font-serif text-lg mb-8">
            "Time is the only true luxury."
          </p>
          <div className="w-1 h-24 bg-gradient-to-b from-red-900 to-transparent mx-auto" />
        </motion.div>

      </div>
    </div>
  );
};

export default WatchesPage;