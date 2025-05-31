import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
// import axios from 'axios'; // Note: Replace with fetch or your preferred HTTP client

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
    // Replace axios with fetch - update this to match your actual API call
    fetch('http://localhost:8000/students/')
      .then(response => response.json())
      .then(data => {
        const studentsData = data.results;
        setStudents(studentsData);
        setTotalImages(studentsData.length);
        console.log(data.results);
        
        // Start preloading images after we have the student data
        preloadImages(studentsData);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false); // Stop loading on error
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
          resolve(student.image_url); // Resolve anyway to continue loading
        };
        img.src = student.image_url;
      });
    });

    Promise.allSettled(imagePromises).then(() => {
      // Add a small delay to show completion
      setTimeout(() => {
        setLoading(false);
        // Trigger animations after loading is complete
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

  // Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#7FB3A7] via-[#6BA396] to-[#5A9386] flex items-center justify-center z-50">
        <div className="text-center max-w-md mx-auto px-8">
          {/* Loading Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto border-4 border-white/20 rounded-full animate-spin border-t-white"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-emerald-300/30 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-4 animate-pulse font-[Delius]">
            Loading Yearbook
          </h1>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Progress Text */}
          <p className="text-white/80 text-lg mb-2 font-[Quicksand]">
            Loading student memories...
          </p>
          <p className="text-white/60 text-sm font-[Quicksand]">
            {loadedImageCount} of {totalImages} photos loaded
          </p>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-20 right-16 w-12 h-12 bg-emerald-300/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-16 left-20 w-16 h-16 bg-teal-300/20 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-10 right-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-700"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#7FB3A7] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error Loading Yearbook</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-white text-[#7FB3A7] rounded-full hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#7FB3A7] font-[Quicksand] mt-[60px]">
      <Header />
      
      {/* Topic Section with Search */}
      <div className={`py-8  px-4 bg-white/60 backdrop-blur-sm shadow-md transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left font-[Delius]">
            <h2 className="text-3xl font-bold text-emerald-600">THE CLASS OF 2025</h2>
            <p className="text-[#688bac] mt-1 font-bold">Memories To Last A Lifetime</p>
          </div>
          
          {/* Search Box */}
          <div className="mt-4 md:mt-0 relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full py-2 px-4 pr-10 rounded-full bg-white text-gray-800 placeholder-gray-400 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 mb-7">
        {/* Student Cards Grid */}
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
                  } ${
                    animate && 
                    `transform transition-opacity duration-700 ${
                      visibleCards[student.id] 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
                    }`
                  }`}
                >
                  <StudentCard student={student} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center py-20 transform transition-all duration-1000 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
          }`}>
            <p className="text-xl text-gray-600">No students found matching "{searchTerm}"</p>
            <button 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Student Card Component
function StudentCard({ student }) {
  return (
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
        
        <div className="mt-4 space-y-1.5 text-[#778899]">
          <DetailItem label="Favorite Sport" value={student.favorite_sport} />
          <DetailItem label="Hobbies" value={student.hobbies} />
          <DetailItem label="Ambition" value={student.ambitions} />
        </div>
      </div>
    </div>
  );
}

// Detail Item Component
function DetailItem({ label, value }) {
  return (
    <div className="flex text-sm">
      <span className="font-semibold text-gray-600 w-24">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}