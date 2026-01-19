import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import AboutSection from './components/AboutSection';
import ShopPage from './components/ShopPage';
import WatchesPage from './components/WatchesPage';
import Footer from './components/Footer';
import ShopifyCart from './components/ShopifyCart';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'watches'>('home');

  const handleNavigate = (page: 'home' | 'shop' | 'watches', sectionId?: string) => {
    setCurrentPage(page);
    
    // Use setTimeout to allow the view to update before scrolling
    setTimeout(() => {
      if (page === 'home' && sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="font-sans text-mondera-black min-h-screen flex flex-col">
      <ShopifyCart />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <FeaturedCollection />
            <AboutSection />
          </>
        ) : currentPage === 'watches' ? (
          <WatchesPage />
        ) : (
          <ShopPage />
        )}
      </main>
      
      {currentPage === 'home' && <Footer />}
    </div>
  );
}

export default App;