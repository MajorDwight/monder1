import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 400]);
  
  // Disable parallax on mobile to allow for h-full (zoomed out) sizing without gaps
  const y = isMobile ? 0 : parallaxY;

  // Using the provided Google Drive ID. 
  const bgImage = "https://lh3.googleusercontent.com/d/1LkNAv8Osk1gSVGIA76LowgJ-9GttkF38";
  
  const fallbackImage = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-mondera-black">
      {/* Background Image with Parallax and Zoom */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <motion.img
          // Start slightly larger (1.15) and zoom out to 1.0 (natural size)
          // Speed up: Reduced duration to 3s (was 5s)
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            scale: { duration: 3, ease: "easeOut" }, 
            opacity: { duration: 1.5, ease: "easeOut" } 
          }}
          src={bgImage}
          onError={(e) => {
            console.warn("Hero image failed to load, switching to fallback.");
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
          alt="Mondera Hero Model"
          // CRITICAL FIX: Removed 'transition-all duration-300' to prevent conflict with Framer Motion animations.
          style={{ willChange: 'transform, opacity' }}
          className={`w-full object-cover object-center ${isMobile ? 'h-full' : 'h-[120%] -mt-[10%]'}`}
        />
        {/* Darker overlay for better text readability on various backgrounds */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-light text-white/90"
        >
          Est. 2024 • Milan
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif mb-10 tracking-wide text-white drop-shadow-lg"
        >
          MONDERA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-lg md:text-xl font-light mb-12 text-white/90 leading-relaxed drop-shadow-md"
        >
          Redefining modern elegance through timeless silhouettes and sustainable luxury.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#1a1a1a" }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 border border-white text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
        >
          Explore Collection
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={32} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;