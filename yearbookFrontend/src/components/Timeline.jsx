import { useState, useEffect, useRef } from 'react';

export default function YearbookTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const timelineRef = useRef(null);
  
  // Gradients array to assign to each quote
  const gradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-teal-500',
    'from-green-500 to-blue-500',
    'from-yellow-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-green-500',
    'from-orange-500 to-yellow-500'
  ];
  
  useEffect(() => {
    fetchPrefectQuotes();
  }, []);

  const fetchPrefectQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/prefect-quotes/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch prefect quotes');
      }
      
      const data = await response.json();
      console.log('API Response:', data.results);
      
      // Transform the data to include gradients and handle missing images
      const transformedQuotes = data.results.map((quote, index) => ({
        ...quote,
        gradient: gradients[index % gradients.length],
        // Fallback image if student_image is null/empty
        student_image: quote.student_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(quote.student_name)}&background=random&size=400`
      }));
      
      setQuotes(transformedQuotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || quotes.length === 0) return;
      
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      const triggerBottom = window.innerHeight * 0.75;
      
      timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < triggerBottom) {
          item.classList.add('show');
          setActiveIndex(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [quotes]); // Add quotes dependency

  if (loading) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center" style={{backgroundColor: '#7FB3A7'}}>
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading memories...</p>
        </div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center" style={{backgroundColor: '#7FB3A7'}}>
        <div className="text-center text-white">
          <p className="text-xl">No quotes available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans" style={{backgroundColor: '#7FB3A7'}}>
      <header className="relative overflow-hidden py-20 px-6">
       
        <div className="relative text-center text-white">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Voices of Tomorrow
          </h1>
          <p className="text-xl md:text-xl  opacity-90 max-w-2xl mx-auto leading-relaxed font-[Quicksand] font-bold">
            The words that defined us, the memories that shaped us, the dreams that drive us forward
          </p>
        </div>
        
        {/* Floating orbs decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
      </header>
      
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-12 md:py-16 max-w-6xl">
        <div className="relative" ref={timelineRef}>
          {/* Modern timeline line */}
          <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 md:w-1 rounded-full shadow-lg" style={{backgroundColor: '#5A8E85'}}></div>
          
          {quotes.map((item, index) => (
            <div 
              key={item.id}
              className={`timeline-item relative mb-8 sm:mb-12 md:mb-20 opacity-0 transition-all duration-1000 ease-out ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } md:flex md:items-center`}
            >
              {/* Timeline marker */}
              <div className={`absolute left-3 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r ${item.gradient} border-2 md:border-4 border-white shadow-lg z-10 flex items-center justify-center`}>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
              </div>
              
              {/* Content container - Full width on mobile */}
              <div className="w-full md:w-5/12 pl-8 sm:pl-10 md:pl-0 pr-2 sm:pr-4 md:pr-0 mt-2 md:mt-0">
                <div className={`group bg-white/90 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-white/50 transform transition-all duration-700 hover:shadow-2xl md:hover:-translate-y-2 ${
                  activeIndex === index ? 'md:scale-105 shadow-2xl' : 'scale-100'
                }`}>
                  {/* Student info */}
                  <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg mr-2 sm:mr-3 md:mr-4 shadow-lg flex-shrink-0`}>
                      {item.student_name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 leading-tight truncate">{item.student_name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 font-medium truncate">{item.role}</p>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="relative">
                    <div className={`absolute -left-1 md:-left-2 -top-1 md:-top-2 text-lg sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent opacity-50`}>
                      "
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed italic font-medium pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
                      {item.quote}
                    </p>
                    <div className={`absolute -right-1 md:-right-2 -bottom-1 md:-bottom-2 text-lg sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent opacity-50 transform rotate-180`}>
                      "
                    </div>
                  </blockquote>
                </div>
              </div>
              
              {/* Spacer */}
              <div className="hidden md:block w-2/12"></div>
              
              {/* Image container - Only on desktop */}
              <div className="hidden md:block w-5/12">
                <div className={`overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl transform transition-all duration-700 ${
                  activeIndex === index ? 'scale-105 shadow-2xl' : 'scale-100'
                } relative group`}>
                  <img 
                    src={item.student_image} 
                    alt={`${item.student_name} - ${item.role}`}
                    className="w-full h-32 md:h-56 lg:h-72 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.student_name)}&background=random&size=400`;
                    }}
                  />
                {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 lg:p-4">
                    <p className="text-white font-semibold text-sm lg:text-base">{item.student_name}</p>
                    <p className="text-white/80 text-xs lg:text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer section */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 py-6 sm:py-8 md:py-12 lg:py-16 px-2">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-white/50 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6">
              Class of 2025
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
              These voices represent just a glimpse of the incredible individuals who have walked these halls. 
              Each story, each dream, each friendship has woven together to create the tapestry of our shared experience.
            </p>
            <div className="flex justify-center items-center space-x-2 sm:space-x-4 text-gray-500">
              <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Forever Connected</span>
              <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .timeline-item {
          transform: translateY(40px);
        }
        
        .timeline-item.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .group:hover {
          animation: float 3s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .timeline-item {
            transform: translateY(20px);
          }
        }
      `}</style>
    </div>
  );
}