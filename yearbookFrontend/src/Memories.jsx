import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import Header from './components/Header'
import Footer from './components/Footer'
const YearbookGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [mediaItems, setMediaItems] = useState([]);
  const [shuffledMediaItems, setShuffledMediaItems] = useState([]);
  const [error, setError] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const videoRef = useRef(null);

  // API configuration
  const API_BASE_URL = 'http://localhost:8000';
  const GALLERY_ENDPOINT = `${API_BASE_URL}/gallery/`;

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetch media items from Django API
  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(GALLERY_ENDPOINT);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Assuming the API returns an array of media items
        // Adjust this based on your actual API response structure
        const items = Array.isArray(data) ? data : data.results || [];
        
        // Shuffle the items randomly
        const shuffled = shuffleArray(items);
        
        setMediaItems(items); // Keep original for counting purposes
        setShuffledMediaItems(shuffled); // Use shuffled version for display
        setTotalImages(items.length);
        
        // Start preloading images after setting the data
        preloadImages(shuffled);
        
      } catch (err) {
        console.error('Error fetching media items:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMediaItems();
  }, []);

  // Update filter options to use original mediaItems for accurate counts
  const filterOptions = [
    { id: 'all', label: 'All', count: mediaItems.length },
    { id: 'image', label: 'Photos', count: mediaItems.filter(item => item.media_type === 'image').length },
    { id: 'video', label: 'Videos', count: mediaItems.filter(item => item.media_type === 'video').length }
  ];

  // Use shuffled items for filtering and display
  const filteredItems = filter === 'all' 
    ? shuffledMediaItems 
    : shuffledMediaItems.filter(item => item.media_type === filter);

  // Preload media items
  const preloadImages = (items) => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    let loadedImages = 0;
    setLoadedImageCount(0);

    const imagePromises = items.map((item) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          setLoadedImageCount(loadedImages);
          resolve(item.thumbnail_url || item.media_url);
        };
        img.onerror = () => {
          loadedImages++;
          setLoadedImageCount(loadedImages);
          console.warn(`Failed to load image: ${item.thumbnail_url || item.media_url}`);
          resolve(item.thumbnail_url || item.media_url);
        };
        img.src = item.thumbnail_url || item.media_url;
      });
    });

    Promise.allSettled(imagePromises).then(() => {
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          setAnimate(true);
        }, 100);
      }, 500);
    });
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play videos when selected
  useEffect(() => {
    if (selectedMedia?.media_type === 'video' && videoRef.current) {
      videoRef.current.play().catch(console.log);
    }
  }, [selectedMedia]);

  const openLightbox = (item, index) => {
    setSelectedMedia(item);
    setSelectedIndex(index);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'unset';
  };

  const navigateMedia = (direction) => {
    const newIndex = direction === 'next' 
      ? (selectedIndex + 1) % filteredItems.length
      : selectedIndex === 0 ? filteredItems.length - 1 : selectedIndex - 1;
    
    setSelectedIndex(newIndex);
    setSelectedMedia(filteredItems[newIndex]);
  };

  const toggleMute = () => {
    setIsVideoMuted(!isVideoMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
    }
  };

  // Enhanced touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;
    
    // Vertical swipe for navigation (like TikTok/Instagram)
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        navigateMedia('next');
      } else {
        navigateMedia('prev');
      }
    }
    // Horizontal swipe still works but with less priority
    else if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        navigateMedia('next');
      } else {
        navigateMedia('prev');
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (selectedMedia) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigateMedia('next');
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigateMedia('prev');
        if (e.key === ' ') {
          e.preventDefault();
          if (selectedMedia.media_type === 'video' && videoRef.current) {
            videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
          }
        }
        if (e.key === 'm' || e.key === 'M') {
          toggleMute();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedMedia, selectedIndex, filteredItems.length]);

  const progressPercentage = totalImages > 0 ? (loadedImageCount / totalImages) * 100 : 0;

  // Error Screen
  if (error) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#7FB3A7] via-[#5A8A7D] to-[#34495E] flex items-center justify-center z-50">
        <div className="text-center max-w-lg mx-auto px-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-light text-[#E8F4F1] mb-4 tracking-wider font-[Delius]">
            Unable to Load Gallery
          </h1>
          <p className="text-[#E8F4F1]/80 text-lg font-light font-[Quicksand] mb-6">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#E8F4F1] text-[#34495E] rounded-full font-medium hover:bg-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Elegant Loading Screen
  if (loading) {
    return (
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

          {/* Minimalist Progress Bar */}
          <div className="w-80 mx-auto mb-8">
            <div className="flex justify-between text-[#E8F4F1]/70 text-sm mb-2 font-[Quicksand]">
              <span>Loading gallery</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-[#34495E]/50 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#E8F4F1] to-white rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[#E8F4F1]/80 text-lg font-light font-[Quicksand]">
            {loadedImageCount} of {totalImages} media loaded
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#7FB3A7]">
      <Header/>
      {/* Header */}
      <div className={`bg-[#caebe3] backdrop-blur-md border-b border-gray-200/50 mt-[57px] transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          {/* Title */}
         <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extralight text-[#34495E] mb-3 tracking-wider font-[Delius]">
              Class of <span className="font-light text-[#5A8A7D]">2025</span>
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#5A8A7D] to-transparent mx-auto mb-3"></div>
            <p className="text-lg text-[#34495E]/70 font-light tracking-wide">
              Memories that will last forever
            </p>
          </div>

          {/* Media Type Filter */}
          <div className="flex gap-2 justify-center">
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={`
                  px-4 py-2 md:px-6 rounded-full text-sm font-medium transition-all duration-300
                  ${filter === option.id
                    ? 'bg-[#7FB3A7] text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                  }
                `}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid - Mobile First */}
      <div className={`max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-8 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
        {shuffledMediaItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No media items found.</p>
          </div>
        ) : (
          <>
            {/* Mobile: Single column with larger cards */}
            <div className="md:hidden space-y-4 max-w-md m-auto">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`bg-[#E8F4F1] rounded-xl shadow-lg overflow-hidden active:scale-95 transition-all duration-300 ${
                    animate 
                      ? 'translate-x-0 opacity-100' 
                      : index % 2 === 0 
                        ? '-translate-x-full opacity-0' 
                        : 'translate-x-full opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => openLightbox(item, index)}
                >
                  <div className="relative">
                    <img
                      src={item.thumbnail_url || item.media_url}
                      alt={item.title || ''}
                      className="w-full h-72 object-cover"
                    />
                    
                    {item.media_type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-white/95 rounded-full p-3 shadow-lg">
                          <Play className="w-6 h-6 text-[#7FB3A7] ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>
                  {item.title && (
                    <div className="p-3">
                      <p className="text-sm text-gray-600">{item.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: CSS Grid */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6 auto-rows-max">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group cursor-pointer transform transition-all duration-1000 ${
                      animate 
                        ? 'translate-x-0 opacity-100' 
                        : index % 2 === 0 
                          ? '-translate-x-full opacity-0' 
                          : 'translate-x-full opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onClick={() => openLightbox(item, index)}
                  >
                    <div className="relative bg-[#FDF6E3] font-[Quicksand] text-center rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-fit">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.thumbnail_url || item.media_url}
                          alt={item.title || ''}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {item.media_type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                            <div className="bg-white/90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-8 h-8 text-[#7FB3A7] ml-1" fill="currentColor" />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {item.title && (
                        <div className="p-4">
                          <p className="text-sm text-gray-600">{item.title}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black z-50 flex">
          {/* Main Content Area - Full Screen Vertical Layout */}
          <div 
            className="flex-1 relative flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button - Top Left */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors safe-area-top"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons - Desktop Only */}
            {!isMobile && (
              <>
                <button
                  onClick={() => navigateMedia('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigateMedia('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Media Container - Full Height */}
            <div className="w-full h-full flex items-center justify-center relative">
              {selectedMedia.media_type === 'image' ? (
                <img
                  src={selectedMedia.media_url}
                  alt={selectedMedia.title || ''}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={selectedMedia.media_url}
                    loop
                    muted={isVideoMuted}
                    playsInline
                    className="max-w-full max-h-full object-contain"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                      }
                    }}
                  />
                  
                  {/* Video Mute Button */}
                  <button
                    onClick={toggleMute}
                    className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    {isVideoMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Info Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pb-8 safe-area-bottom">
            <div className="max-w-sm">
              {/* Caption */}
              {selectedMedia.title && (
                <p className="text-white text-sm md:text-base mb-2 font-medium">
                  {selectedMedia.title}
                </p>
              )}
              
              {/* Progress Indicators */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/70 text-xs">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-white rounded-full h-1 transition-all duration-300"
                    style={{ width: `${((selectedIndex + 1) / filteredItems.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Swipe Hint for Mobile */}
              {isMobile && (
                <p className="text-white/50 text-xs">
                  Swipe up/down to navigate • Tap video to play/pause
                </p>
              )}
            </div>
          </div>

          {/* Desktop Progress Dots */}
          {!isMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredItems.slice(0, Math.min(filteredItems.length, 8)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                    setSelectedMedia(filteredItems[index]);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
              {filteredItems.length > 8 && (
                <span className="text-white/50 text-xs ml-2">
                  +{filteredItems.length - 8}
                </span>
              )}
            </div>
          )}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default YearbookGallery;