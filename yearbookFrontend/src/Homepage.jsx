import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MemoriesSection from './components/Timeline'
import Slider from './components/Slideshow'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';

export default function Homepage() {
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

   // Handle loading state with progress simulation
  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      setTimeout(() => setLoading(false), 1500);
    } else {
      // Add event listener for when page loads
      const handleLoad = () => {
        setTimeout(() => {
          setLoading(false);
        }, 1500); // Extra delay for smoother transition
      };
      
      window.addEventListener('load', handleLoad);
      
      // Cleanup
      return () => {
        window.removeEventListener('load', handleLoad);
        clearInterval(progressInterval);
      };
    }
  }, []);

  return (
    <div className='h-full bg-[#7FB3A7]'>
       {loading && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#7FB3A7] via-[#5A8A7D] to-[#34495E] flex items-center justify-center z-50">
          <div className="text-center max-w-lg mx-auto px-8">
            {/* Sophisticated Loading Animation */}
            <div className="relative mb-12">
              <div className="w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-2 border-[#E8F4F1]/30 rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute inset-2 border-2 border-[#E8F4F1]/50 rounded-full animate-spin border-t-transparent" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
                <div className="absolute inset-4 border-2 border-[#E8F4F1]/70 rounded-full animate-spin border-t-transparent" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#E8F4F1] to-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-light text-[#E8F4F1] mb-8 tracking-wider font-[Delius]">
              Class of 2025
            </h1>

            <p className="text-[#E8F4F1]/80 text-lg font-light font-[Quicksand]">
              Loading your yearbook...
            </p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(270deg); }
        }
        
        @keyframes float-card {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-8px) rotate(18deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-float-card { animation: float-card 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
      `}</style>
    
      <Header />
      <Hero/>
      <Slider/>
      <MemoriesSection/>
      <Footer/>
    </div>
  )
}