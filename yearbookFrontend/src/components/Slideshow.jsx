import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef(null);
  const sliderRef = useRef(null);

  // Sample image data - replace with your own
  const images = [
    {
      src: "/api/placeholder/1200/700",
      alt: "Senior class trip to the mountains",
      caption: "Adventures in the great outdoors - Senior Trip 2025"
    },
    {
      src: "/api/placeholder/1200/700",
      alt: "Championship basketball game",
      caption: "The winning moment - State Champions 2025"
    },
    {
      src: "/api/placeholder/1200/700",
      alt: "School dance",
      caption: "Unforgettable nights - Winter Formal"
    },
    {
      src: "/api/placeholder/1200/700", 
      alt: "Graduation ceremony",
      caption: "The beginning of new journeys - Graduation Day"
    },
    {
      src: "/api/placeholder/1200/700",
      alt: "Science fair winners",
      caption: "Innovation and creativity - Science Fair 2025"
    }
  ];

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

    const interval = setInterval(play, 5000);
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

  // Prevent slide change during animation
  const handleSlideChange = (newIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
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

  // Mouse & touch event handlers
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
    
    // Minimum distance required for swipe
    const threshold = sliderRef.current.offsetWidth * 0.15;
    
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }
    
    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
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

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Calculate transform including drag offset
  const getTransformValue = () => {
    const baseTransform = -currentIndex * 100;
    const dragPercent = (dragOffset / sliderRef.current?.offsetWidth) * 100 || 0;
    return `translateX(${baseTransform + dragPercent}%)`;
  };

  return (
    <div className="w-full p-5  max-w-6xl mx-auto"> 
        <h1 className='font-[Amarante] text-center text-4xl font-bold text-[#FDF6E3]  text-shadow-2xs p-3'>HighLights</h1>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        {/* Slider container */}
        <div
          ref={sliderRef}
          className="relative h-56 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images */}
          <div 
            className={`h-full flex ${isDragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
            style={{ transform: isDragging ? getTransformValue() : `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="min-w-full h-full flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <p className="text-white text-lg md:text-2xl font-medium drop-shadow-lg">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Side gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/30 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/30 to-transparent pointer-events-none"></div>

          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Current slide counter */}
          <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-md text-white py-1 px-4 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center p-4 bg-gray-800 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 h-16 sm:h-20 aspect-video mx-1 rounded overflow-hidden transition-all duration-300 ${
                index === currentIndex ? 'ring-2 ring-blue-400 scale-105 z-10' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}