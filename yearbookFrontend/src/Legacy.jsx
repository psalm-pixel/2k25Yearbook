import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function YearbookPage() {
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCards, setVisibleCards] = useState({});
  const [student, setStudents] = useState([]);
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);
  const cardRefs = useRef([]);

  // Fetch students from API
  useEffect(() => {
    fetch('http://localhost:8000/students/')
      .then(response => response.json())
      .then(data => {
        const studentsData = data.results;
        setStudents(studentsData);
        setTotalImages(studentsData.length);
        console.log(data.results);
        
        preloadImages(studentsData);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Preload all student images
  const preloadImages = (studentsData) => {
    if (studentsData.length === 0) {
      setLoading(false);
      return;
    }

    let loadedImages = 0;
    setLoadedImageCount(0);

    const imagePromises = studentsData.map((student) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          setLoadedImageCount(loadedImages);
          resolve(student.image_url);
        };
        img.onerror = () => {
          loadedImages++;
          setLoadedImageCount(loadedImages);
          console.warn(`Failed to load image for ${student.name}: ${student.image_url}`);
          resolve(student.image_url);
        };
        img.src = student.image_url;
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

  const students = student || [];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  // Scroll observer effect
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

    cardRefs.current = cardRefs.current.slice(0, filteredStudents.length);

    cardRefs.current.forEach(cardEl => {
      if (cardEl) observer.observe(cardEl);
    });

    return () => {
      cardRefs.current.forEach(cardEl => {
        if (cardEl) observer.unobserve(cardEl);
      });
    };
  }, [filteredStudents.length]);

  const progressPercentage = totalImages > 0 ? (loadedImageCount / totalImages) * 100 : 0;

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
              <span>Loading memories</span>
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
            {loadedImageCount} of {totalImages} portraits loaded
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#7FB3A7] flex items-center justify-center">
        <div className="text-center text-white bg-white/10 backdrop-blur-sm rounded-2xl p-12">
          <h2 className="text-3xl font-light mb-6 font-[Delius]">Unable to Load Yearbook</h2>
          <p className="mb-8 text-lg opacity-80 font-[Quicksand]">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-white text-[#34495E] rounded-full hover:bg-slate-100 transition-all duration-300 font-medium"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#7FB3A7] font-[Quicksand] mt-[60px]">
      <Header />
      
      {/* Compact Header Section */}
      <div className={`relative py-12 px-4 bg-[#caebe3] backdrop-blur-md border-b border-gray-200/50 overflow-hidden transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#5A8A7D] rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5A8A7D] rounded-full translate-x-32 translate-y-32"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extralight text-[#34495E] mb-3 tracking-wider font-[Delius]">
              Class of <span className="font-light text-[#5A8A7D]">2025</span>
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#5A8A7D] to-transparent mx-auto mb-3"></div>
            <p className="text-lg text-[#34495E]/70 font-light tracking-wide">
              Memories that will last forever
            </p>
          </div>
          
          {/* Elegant Search */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-[#5A8A7D]/20 shadow-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search classmates..."
                  className="w-full py-3 px-5 pr-12 bg-transparent text-[#34495E] placeholder-[#34495E]/50 focus:outline-none text-base font-light"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-[#5A8A7D]/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map((student, index) => {
              const setCardRef = el => {
                if (el) {
                  cardRefs.current[index] = el;
                }
              };
              
              return (
                <div 
                  key={student.id} 
                  ref={setCardRef}
                  data-student-id={student.id}
                  className={`transform transition-all duration-1000 ${
                    animate 
                      ? 'translate-x-0 opacity-100' 
                      : index % 2 === 0 
                        ? '-translate-x-full opacity-0' 
                        : 'translate-x-full opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transform: visibleCards[student.id] 
                      ? 'translateY(0px) scale(1)' 
                      : 'translateY(30px) scale(0.95)',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <StudentCard student={student} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center py-16 transform transition-all duration-1000 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
          }`}>
            <div className="text-center bg-[#E8F4F1]/90 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#5A8A7D] to-[#7FB3A7] rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-[#34495E] mb-3 font-[Delius]">No Results Found</h3>
              <p className="text-base text-[#34495E]/70 mb-6">No students match "{searchTerm}"</p>
              <button 
                className="px-6 py-2.5 bg-[#5A8A7D] text-white rounded-full hover:bg-[#5A8A7D]/90 transition-all duration-300 shadow-lg font-medium text-sm"
                onClick={() => setSearchTerm('')}
              >
                Show All Students
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Compact Student Card Component
function StudentCard({ student }) {
  return (
    // #E8F4F1
    <div className="bg-[#FDF6E3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full transform hover:-translate-y-1 transition-transform">
      <div className="relative">
        <img 
          src={student.image_url} 
          alt={student.name} 
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute top-0 right-0 bg-[#307867] text-white rounded-bl-lg px-3 py-1 font-medium">
          {student.nickname}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
        
        <div className="mt-3 bg-blue-50 rounded-lg p-3 italic text-gray-700 relative flex-grow">
          <span className="text-5xl text-blue-200 absolute -top-3 left-1">"</span>
          <p className="relative z-10 text-sm pl-3 font-[Delius]">{student.quote}</p>
          <span className="text-5xl text-blue-200 absolute -bottom-5 right-1">"</span>
        </div>
        
        <div className="mt-4 space-y-1.5">
          <DetailItem label="Favorite Sport" value={student.favorite_sport} />
          <DetailItem label="Hobbies" value={student.hobbies} />
          <DetailItem label="Dreams" value={student.ambitions} />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-lg bg-white/20 backdrop-blur-sm border border-[#5A8A7D]/5 hover:bg-white/30 transition-colors duration-300">
      <div className="flex items-center justify-between p-2">
        <span className="text-[#2C3E50] text-xs font-medium uppercase tracking-wider flex-shrink-0">
          {label}
        </span>
        <span className="text-[#2C3E50]/80 text-xs font-medium text-right ml-2">
          {value}
        </span>
      </div>
    </div>
  );
}