// import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Slider from './components/Slideshow'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';


export default function Homepage() {
    const [loading, setLoading] = useState(true);

   // Handle loading state
  useEffect(() => {
    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      // Add event listener for when page loads
      const handleLoad = () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Extra delay for smoother transition
      };
      
      window.addEventListener('load', handleLoad);
      
      // Cleanup
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);


  return (
    <div className='h-full bg-[#7FB3A7]'>
       {loading && (
        <div className="fixed inset-0 bg-[#7FB3A7] flex flex-col items-center justify-center z-100">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-8 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
         
          <div className="mt-6 text-white text-xl font-semibold">Loading Yearbook...</div>
          <div className="mt-2 text-blue-200">Please wait while we collect memories</div>
        </div>
      )}
      
    
      <Header />
      <Hero/>
      <Slider/>
      <Timeline/>
      <Footer/>
      </div>
  )
}
