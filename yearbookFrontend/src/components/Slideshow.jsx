import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export default function MemoriesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  const sliderRef = useRef(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Homepage slides from database
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://2k25yearbook-production.up.railway.app/homepage-slides/active_slides/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch slides');
        }
        
        const data = await response.json();
        setSlides(data);
        
        // If no slides from API, use fallback data
        if (data.length === 0) {
          setSlides([
            {
              id: 1,
              title: 'Graduation Day Celebrations',
              description: 'Students celebrating graduation',
              optimized_image_url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
            },
            {
              id: 2,
              title: 'Academic Excellence Awards',
              description: 'Awards ceremony',
              optimized_image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
            },
            {
              id: 3,
              title: 'Final Year Project Presentations',
              description: 'Students presenting projects',
              optimized_image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
            },
            {
              id: 4,
              title: 'Class Farewell Moments',
              description: 'Students saying goodbye',
              optimized_image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
            }
          ]);
        }
        
      } catch (err) {
        console.error('Error fetching slides:', err);
        setError(err.message);
        // Use fallback data on error
        setSlides([
          {
            id: 1,
            title: 'Graduation Day Celebrations',
            description: 'Students celebrating graduation',
            optimized_image_url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
          },
          {
            id: 2,
            title: 'Academic Excellence Awards',
            description: 'Awards ceremony',
            optimized_image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
          },
          {
            id: 3,
            title: 'Final Year Project Presentations',
            description: 'Students presenting projects',
            optimized_image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
          },
          {
            id: 4,
            title: 'Class Farewell Moments',
            description: 'Students saying goodbye',
            optimized_image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
          }
        ]);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      }
    };

    fetchSlides();
  }, []);

  const images = slides || [];

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      if (!isDragging) {
        autoPlayRef.current();
      }
    };

    const interval = setInterval(play, 6000);
    return () => clearInterval(interval);
  }, [isDragging]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSlideChange = (newIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const nextSlide = () => {
    if (isDragging || isAnimating) return;
    handleSlideChange((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    if (isDragging || isAnimating) return;
    handleSlideChange((currentIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    if (isAnimating) return;
    handleSlideChange(index);
  };

  // Improved drag handlers with better mobile support
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // More responsive threshold for mobile - reduced from 0.15 to 0.08
    const sliderWidth = sliderRef.current?.offsetWidth || window.innerWidth;
    const threshold = sliderWidth * 0.08; // Reduced threshold for easier swiping
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Improved touch events
  const handleTouchStart = (e) => {
    // Don't prevent default on buttons and interactive elements
    if (e.target.closest('button')) return;
    e.preventDefault(); // Prevent scrolling while swiping
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.target.closest('button')) return;
    e.preventDefault(); // Prevent scrolling while swiping
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (e.target.closest('button')) return;
    e.preventDefault();
    handleDragEnd();
  };

  // Improved transform calculation
  const getTransformValue = () => {
    const sliderWidth = sliderRef.current?.offsetWidth || window.innerWidth;
    const baseTransform = -currentIndex * 100;
    const dragPercent = (dragOffset / sliderWidth) * 100;
    return `translateX(${baseTransform + dragPercent}%)`;
  };

  return (
    <div className="w-full py-8 sm:py-12 lg:py-16 px-3 sm:px-5 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section - Responsive */}
      <div className={`text-center mb-6 sm:mb-8 lg:mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
          <div className="h-px w-8 sm:w-12 lg:w-20 bg-gradient-to-r from-transparent via-[#2F4F4F] to-transparent"></div>
          <Camera className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#2F4F4F]" />
          <div className="h-px w-8 sm:w-12 lg:w-20 bg-gradient-to-r from-transparent via-[#2F4F4F] to-transparent"></div>
        </div>
        
        <h2 className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent text-2xl sm:text-4xl lg:text-6xl font-black mb-3 sm:mb-4 leading-tight">
          Precious Memories
        </h2>
        
        <p className="text-white/80 text-sm sm:text-base lg:text-xl font-light max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto leading-relaxed px-2">
          Capturing the moments that defined our journey together—from first days to final farewells, 
          <span className="text-[#2F4F4F] font-medium"> every memory tells our story</span>
        </p>
      </div>

      {/* Main Content - Show grid on mobile, slider on desktop */}
      {isMobile ? (
        // Mobile Grid View
        <div className={`grid grid-cols-1 gap-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {images.map((image, index) => (
            <div key={index} className="relative bg-gradient-to-br from-gray-900/90 via-slate-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-full object-cover object-center"
                  draggable={false}
                />
                
                {/* Subtle gradient overlay for better image visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Slider
        <div className={`relative bg-gradient-to-br from-gray-900/90 via-slate-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
          {/* Floating Background Elements - Responsive sizes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-xl sm:blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-2xl sm:blur-3xl"></div>
          </div>

          {/* Slider Container - Responsive Heights */}
          <div
            ref={sliderRef}
            className="relative h-64 sm:h-80 md:h-96 lg:h-[36rem] overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }} // Allow vertical scrolling but handle horizontal
          >
            {/* Images */}
            <div 
              className={`h-full flex will-change-transform ${isDragging ? '' : 'transition-transform duration-700 ease-out'}`}
              style={{ 
                transform: isDragging ? getTransformValue() : `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="min-w-full h-full flex-shrink-0 relative">
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />
                  
                  {/* Subtle gradient overlay for better image visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Enhanced Navigation Arrows - Responsive Positioning & Sizing */}
            <button 
              onClick={prevSlide}
              onTouchStart={(e) => e.stopPropagation()}
              className="absolute top-1/2 left-2 sm:left-4 lg:left-6 transform -translate-y-1/2 bg-white/10 hover:bg-emerald-500/20 backdrop-blur-xl text-white p-3 sm:p-4 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:border-emerald-400/50 z-20 group touch-manipulation"
              aria-label="Previous memory"
            >
              <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:text-emerald-300 transition-colors" />
            </button>
            
            <button 
              onClick={nextSlide}
              onTouchStart={(e) => e.stopPropagation()}
              className="absolute top-1/2 right-2 sm:right-4 lg:right-6 transform -translate-y-1/2 bg-white/10 hover:bg-emerald-500/20 backdrop-blur-xl text-white p-3 sm:p-4 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:border-emerald-400/50 z-20 group touch-manipulation"
              aria-label="Next memory"
            >
              <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:text-emerald-300 transition-colors" />
            </button>

            {/* Enhanced Indicators - Responsive */}
            <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  onTouchStart={(e) => e.stopPropagation()}
                  className={`transition-all duration-300 focus:outline-none touch-manipulation ${
                    index === currentIndex 
                      ? 'w-6 sm:w-7 lg:w-8 h-2 sm:h-2.5 lg:h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full' 
                      : 'w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 bg-white/40 hover:bg-white/60 rounded-full'
                  }`}
                  aria-label={`Go to memory ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Enhanced Counter - Responsive */}
            <div className="absolute top-3 sm:top-4 lg:top-8 right-3 sm:right-4 lg:right-8 bg-black/30 backdrop-blur-xl border border-white/20 text-white py-1 sm:py-1.5 lg:py-2 px-2.5 sm:px-3 lg:px-5 rounded-full text-xs sm:text-sm font-medium">
              <span className="text-emerald-400">{currentIndex + 1}</span> / {images.length}
            </div>
          </div>

          {/* Enhanced Thumbnails - Fully Responsive */}
          <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-gray-800/50 via-slate-700/50 to-gray-800/50 backdrop-blur-sm border-t border-white/10">
            <div className="flex justify-center overflow-x-auto pb-2 sm:pb-0">
              <div className="flex space-x-2 sm:space-x-3 lg:space-x-4 min-w-max px-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`group relative flex-shrink-0 h-12 sm:h-16 lg:h-20 xl:h-24 aspect-video rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                      index === currentIndex 
                        ? 'ring-1 sm:ring-2 ring-emerald-400 scale-105 shadow-lg shadow-emerald-400/25' 
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Message - Responsive */}
      <div className={`text-center mt-6 sm:mt-8 lg:mt-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-[#F8F9FA] text-sm sm:text-base lg:text-lg font-light px-4">
          Each photograph is a <span className="text-[#2F4F4F] font-medium">treasure</span>, each moment a 
          <span className="text-[#36454F] font-medium"> legacy</span> of our time together
        </p>
      </div>
    </div>
  );
}