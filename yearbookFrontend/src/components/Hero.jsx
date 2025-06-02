import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative md:h-screen h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 mt-[57px]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Main Background Image with Parallax */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-out ${
            isLoaded ? 'scale-100 opacity-70' : 'scale-110 opacity-0'
          }`}
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>

        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-emerald-900/20"></div>
        
        {/* Animated Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-emerald-400/25 to-teal-400/25 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Decorative Top Element */}
        <div 
          className={`mb-8 transition-all duration-1500 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          </div>
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">Class of Excellence</p>
        </div>

        {/* Main Title with Gradient Text */}
        <h1 
          className={`hero-title bg-gradient-to-r font-[Space Grotesk] from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent text-4xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight transition-all duration-1500 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ 
            transitionDelay: '0.8s',
            textShadow: '0 0 40px rgba(255,255,255,0.3)'
          }}
        >
          Oakfield
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Graduating Class
          </span>
          <br />
          <span className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            2024/2025
          </span>
        </h1>

        {/* Subtitle with Enhanced Styling */}
        <div 
          className={`hero-subtitle font-[Inter] mb-12 transition-all duration-1500 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1.1s' }}
        >
          <p className="text-white/90 text-xl md:text-2xl font-light mb-2 leading-relaxed">
            The Photos May Fade,
          </p>
          <p className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              But the Memories Never Will.
            </span>
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1500 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1.4s' }}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
          <Link to ="/Legacy">
              <span className="relative z-10">Student profiles</span>
      </Link>  
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="group px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-emerald-400/50">
            View Gallery 
          </button>
        </div>

        {/* Bottom Decorative Element */}
        <div 
          className={`mt-16 transition-all duration-1500 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1.7s' }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-400/70 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
          <p className="text-white/60 text-sm mt-4">Scroll to explore</p>
        </div>
      </div>

      {/* Enhanced Wave SVG with Gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="relative block w-full h-32 md:h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >

         
          <path
            fill="#7FB3A7"
            fillOpacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,229.3C672,256,768,256,864,229.3C960,203,1056,149,1152,144C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div> */}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}