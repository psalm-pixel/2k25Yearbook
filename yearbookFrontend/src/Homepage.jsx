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
        <div className="fixed inset-0 bg-gradient-to-br from-[#7FB3A7] via-[#6BA396] to-[#5A9285] flex flex-col items-center justify-center z-50 overflow-hidden">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-float-slow"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-white/3 rounded-full animate-float-medium"></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/4 rounded-full animate-float-fast"></div>
            <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/6 rounded-full animate-float-slow"></div>
            
            {/* Scattered memory icons */}
            <div className="absolute top-1/4 left-1/3 text-white/20 text-2xl animate-pulse">📸</div>
            <div className="absolute top-1/3 right-1/4 text-white/15 text-xl animate-pulse delay-300">🎓</div>
            <div className="absolute bottom-1/3 left-1/5 text-white/20 text-2xl animate-pulse delay-500">📚</div>
            <div className="absolute bottom-1/4 right-1/3 text-white/15 text-xl animate-pulse delay-700">⭐</div>
          </div>

          {/* Main loading content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Enhanced spinner with multiple rings */}
            <div className="relative w-32 h-32 mb-8">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              {/* Middle ring */}
              <div className="absolute inset-2 border-4 border-white/30 rounded-full animate-spin-slow"></div>
              {/* Inner ring */}
              <div className="absolute inset-4 border-4 border-transparent border-t-white border-r-white/70 rounded-full animate-spin"></div>
              {/* Center pulse */}
              <div className="absolute inset-8 bg-white/80 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-[#7FB3A7] text-2xl font-bold">📖</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-80 h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>

            {/* Loading text with typewriter effect */}
            <div className="text-center space-y-3">
              <div className="text-white text-2xl font-bold tracking-wide">
                <span className="inline-block animate-bounce">L</span>
                <span className="inline-block animate-bounce delay-100">o</span>
                <span className="inline-block animate-bounce delay-200">a</span>
                <span className="inline-block animate-bounce delay-300">d</span>
                <span className="inline-block animate-bounce delay-400">i</span>
                <span className="inline-block animate-bounce delay-500">n</span>
                <span className="inline-block animate-bounce delay-600">g</span>
                <span className="inline-block animate-bounce delay-700 ml-2">Y</span>
                <span className="inline-block animate-bounce delay-800">e</span>
                <span className="inline-block animate-bounce delay-900">a</span>
                <span className="inline-block animate-bounce delay-1000">r</span>
                <span className="inline-block animate-bounce delay-1100">b</span>
                <span className="inline-block animate-bounce delay-1200">o</span>
                <span className="inline-block animate-bounce delay-1300">o</span>
                <span className="inline-block animate-bounce delay-1400">k</span>
                <span className="inline-block animate-bounce delay-1500">.</span>
                <span className="inline-block animate-bounce delay-1600">.</span>
                <span className="inline-block animate-bounce delay-1700">.</span>
              </div>
              
              <div className="text-white/80 text-lg font-medium">
                Collecting precious memories
              </div>
              
              <div className="text-white/60 text-sm">
                {Math.round(loadingProgress)}% Complete
              </div>
            </div>

            {/* Memory cards animation */}
            <div className="absolute top-16 flex space-x-4">
              <div className="w-12 h-16 bg-white/10 rounded-lg transform rotate-12 animate-float-card"></div>
              <div className="w-12 h-16 bg-white/15 rounded-lg transform -rotate-6 animate-float-card delay-300"></div>
              <div className="w-12 h-16 bg-white/10 rounded-lg transform rotate-3 animate-float-card delay-600"></div>
            </div>
          </div>

          {/* Bottom decorative elements */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-400"></div>
            </div>
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