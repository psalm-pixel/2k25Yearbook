import React, { useState, useEffect } from 'react';
import { Search, Users, Camera, Sparkles, Star, Heart, Zap } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import './mugshots.css';

const YearbookMugshots = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  // Fetch students from Django API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://2k25yearbook-production.up.railway.app/mugshot/'); // Fixed endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch mugshots');
        }
        const data = await response.json();
        // Handle paginated response from Django REST framework
        const studentsData = data.results || data;
        // Transform data to match frontend expectations
        const transformedData = studentsData.map(student => ({
          id: student.id,
          name: student.name,
          photo: student.photo_url || student.thumbnail_url,
          created_at: student.created_at
        }));
        setStudents(transformedData);
        setLoading(false);
        setTimeout(() => setAnimate(true), 100);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError(error.message);
        setLoading(false);
        // Fallback to empty array or show error message
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);


  // Handle image loading
  const handleImageLoad = (studentId) => {
    setImageLoaded(prev => ({ ...prev, [studentId]: true }));
  };

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => ({
              ...prev,
              [entry.target.dataset.studentId]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cardElements = document.querySelectorAll('.student-card');
    cardElements.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardElements.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, [students]);

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

          <p className="text-[#E8F4F1]/80 text-lg font-light font-[Quicksand]">
            Loading student photos...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#7FB3A7] font-[Quicksand] mt-[60px]">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center text-white bg-white/10 backdrop-blur-sm rounded-2xl p-12 max-w-lg mx-auto">
            <div className="mb-6">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
            </div>
            <h2 className="text-3xl font-light mb-6 font-[Delius]">Unable to Load Photos</h2>
            <p className="mb-8 text-lg opacity-80 font-[Quicksand]">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-3 bg-white text-[#34495E] rounded-full hover:bg-slate-100 transition-all duration-300 font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Enhanced Skeleton loader component with dynamic shimmer
  const SkeletonCard = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <div className="relative">
        {/* Main image skeleton with wave effect */}
        <div className="w-full h-96 skeleton-wave">
          {/* Additional shimmer overlay for extra effect */}
          <div className="absolute inset-0 skeleton-shimmer opacity-50"></div>
        </div>
        
        {/* Bottom overlay skeleton */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="h-6 bg-white/20 rounded-lg mb-2 skeleton-shimmer"></div>
          <div className="h-4 bg-white/10 rounded-lg w-3/4 mx-auto skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#7FB3A7] font-[Quicksand] mt-[60px]">
      <Header />
      
      {/* Simplified Header Section */}
      <div className={`relative py-16 px-4 bg-gradient-to-br from-[#caebe3] via-[#E8F4F1] to-[#caebe3] backdrop-blur-md border-b border-gray-200/50 overflow-hidden transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        {/* Subtle floating sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-3 h-3 text-[#7FB3A7]/20" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight text-[#34495E] mb-4 tracking-wider font-[Delius]">
            Student <span className="font-light text-[#5A8A7D]">Mugshots</span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#5A8A7D] to-transparent mx-auto mb-4"></div>
          <p className="text-xl text-[#34495E]/70 font-light tracking-wide">
            Class of 2025
          </p>
        </div>
      </div>

      {/* Mugshots Grid */}
      <div className={`max-w-6xl mx-auto px-4 py-12 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
        {students.length === 0 && !loading ? (
          <div className="text-center py-20">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/50 max-w-lg mx-auto">
              <div className="mb-6">
                <Camera className="w-16 h-16 text-[#7FB3A7] mx-auto animate-pulse" />
              </div>
              <h3 className="text-2xl font-light text-[#34495E] mb-4 font-[Delius]">No Mugshots Available</h3>
              <p className="text-[#34495E]/70 text-lg font-light font-[Quicksand]">Student photos will appear here once uploaded.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading ? (
              // Show skeleton loaders while loading
              [...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              students.map((student, index) => {
                const isVisible = visibleCards[student.id] || animate;
                const isImageLoaded = imageLoaded[student.id];
                
                return (
                  <div
                    key={student.id}
                    data-student-id={student.id}
                    className={`student-card group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 transform ${
                      isVisible
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedStudent(student)}
                  >
                    {/* Student Photo with Skeleton Loader */}
                    <div className="relative overflow-hidden">
                      {/* Dynamic Skeleton loader */}
                      {!isImageLoaded && (
                        <div className="absolute inset-0 w-full h-96 skeleton-wave">
                          <div className="absolute inset-0 skeleton-shimmer opacity-70"></div>
                        </div>
                      )}
                      
                      <img
                        src={student.photo}
                        alt={student.name}
                        className={`w-full h-96 object-cover object-center transition-all duration-700 group-hover:scale-110 ${
                          isImageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(student.id)}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&size=400`;
                          handleImageLoad(student.id);
                        }}
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Name overlay - Always visible */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-semibold text-lg font-[Delius] text-center">
                          {student.name}
                        </h3>
                        <p className="text-white/80 text-sm font-[Quicksand] text-center mt-1">
                          Class of 2025
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Modal for detailed view - simplified */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDF6E3] rounded-3xl max-w-2xl w-full shadow-2xl modal-enter">
            <div className="relative">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 z-10 bg-[#5A8A7D] hover:bg-[#34495E] text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-lg"
              >
                ×
              </button>
              
              <div className="p-8">
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src={selectedStudent.photo}
                      alt={selectedStudent.name}
                      className="w-48 h-64 object-cover rounded-2xl mx-auto shadow-lg"
                    />
                  </div>
                  
                  <h2 className="text-3xl font-light text-[#34495E] font-[Delius] tracking-wide">
                    {selectedStudent.name}
                  </h2>
                  
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#5A8A7D] to-transparent mx-auto mt-4"></div>
                  
                  <p className="text-[#34495E]/70 text-sm mt-4 font-[Quicksand]">
                    Class of 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default YearbookMugshots;