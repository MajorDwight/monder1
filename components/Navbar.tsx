import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPage: 'home' | 'shop' | 'watches';
  onNavigate: (page: 'home' | 'shop' | 'watches', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logic for navbar appearance
  let navClasses = "fixed w-full z-50 transition-all duration-500 ease-in-out ";
  
  if (isScrolled) {
    // Glassmorphism: Semi-transparent dark background with blur. 
    // Removed border-b to eliminate the white line at the bottom.
    navClasses += "bg-black/60 backdrop-blur-xl py-4 text-white shadow-lg";
  } else {
    navClasses += "py-6 ";
    // Transparent background at top
    navClasses += "bg-transparent text-white";
  }

  const handleLinkClick = (e: React.MouseEvent, page: 'home' | 'shop' | 'watches', sectionId?: string) => {
    e.preventDefault();
    onNavigate(page, sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center w-full md:w-auto">
          <button
            className="md:hidden focus:outline-none z-50 relative"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, 'home')}
            className="text-3xl font-serif font-semibold tracking-widest z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:static md:transform-none md:translate-y-0"
          >
            MONDERA
          </a>
        </div>

        {/* Center: Desktop Links (Absolute Centered) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-12 items-center">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'home')}
            className={`text-sm uppercase tracking-widest hover:text-mondera-gold transition-colors duration-300 relative group ${currentPage === 'home' ? 'text-mondera-gold' : ''}`}
          >
            Home
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-mondera-gold transition-all duration-300 ${currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </a>

          <a
            href="#"
            onClick={(e) => handleLinkClick(e, 'shop')}
            className={`text-sm uppercase tracking-widest hover:text-mondera-gold transition-colors duration-300 relative group ${currentPage === 'shop' ? 'text-mondera-gold' : ''}`}
          >
            Shop
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-mondera-gold transition-all duration-300 ${currentPage === 'shop' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </a>

          <a
            href="#"
            onClick={(e) => handleLinkClick(e, 'watches')}
            className={`text-sm uppercase tracking-widest transition-all duration-500 relative group ${currentPage === 'watches' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'text-gray-300 hover:text-red-400 hover:drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]'}`}
          >
            Watches
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 transition-all duration-300 ${currentPage === 'watches' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
          </a>
        </div>

        {/* Right: Icons (Empty now) */}
        <div className="flex items-center space-x-6">
          {/* Shopping Bag icon removed */}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-3xl z-50 flex flex-col items-center justify-center text-white md:hidden"
          >
            <button
              className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col space-y-8 text-center">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, 'home')}
                className="text-2xl font-serif hover:text-mondera-gold transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, 'shop')}
                className="text-2xl font-serif hover:text-mondera-gold transition-colors"
              >
                Shop
              </a>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, 'watches')}
                className="text-2xl font-serif text-red-500 hover:text-red-400 transition-colors drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]"
              >
                Watches
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;