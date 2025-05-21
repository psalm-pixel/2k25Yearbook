import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

// Sample student data
const students = [
  {
    id: 1,
    name: "Alex Johnson",
    nickname: "Oriyomi",
    quote: "Make money, don't make noise",
    sport: "Basketball",
    hobbies: "Photography, Hiking",
    ambition: "Software Engineer",
    image: "../src/assets/img/student_template/img1.jpg"
  },
  {
    id: 2,
    name: "Jamie Smith",
    nickname: "Psalm",
    quote: "Stay hungry, stay foolish.",
    sport: "Soccer",
    hobbies: "Guitar, Gaming",
    ambition: "Graphic Designer",
    image: "../src/assets/img/student_template/img2.avif"
  },
  {
    id: 3,
    name: "Taylor Wright",
    nickname: "Akay Money",
    quote: "Life is what happens when you're busy making other plans.",
    sport: "Swimming",
    hobbies: "Reading, Cooking",
    ambition: "Doctor",
    image: "../src/assets/img/student_template/img3.avif"
  },
  {
    id: 4,
    name: "Morgan Lee",
    nickname: "Lil Rex",
    quote: "The only way to do great work is to love what you do.",
    sport: "Tennis",
    hobbies: "Chess, Volunteering",
    ambition: "Teacher",
    image: "../src/assets/img/student_template/img4.avif"
  },
  {
    id: 5,
    name: "Riley Chen",
    nickname: "Big Wanger",
    quote: "Be the change you wish to see in the world.",
    sport: "Volleyball",
    hobbies: "Painting, Dance",
    ambition: "Architect",
    image: "/api/placeholder/300/300"
  },
  {
    id: 6,
    name: "Jordan Patel",
    nickname: "Jo",
    quote: "Yesterday is history, tomorrow is a mystery, but today is a gift.",
    sport: "Track",
    hobbies: "Poetry, Robotics",
    ambition: "Journalist",
    image: "/api/placeholder/300/300"
  },
  {
    id: 7,
    name: "Casey Wilson",
    nickname: "Case",
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    sport: "Baseball",
    hobbies: "Film, Debate",
    ambition: "Lawyer",
    image: "/api/placeholder/300/300"
  },
  {
    id: 8,
    name: "Quinn Murphy",
    nickname: "Q",
    quote: "Do what you can, with what you have, where you are.",
    sport: "Hockey",
    hobbies: "Astronomy, Music",
    ambition: "Scientist",
    image: "/api/placeholder/300/300"
  }
];

export default function YearbookPage() {

      const [loading, setLoading] = useState(true);
      const [animate, setAnimate] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [visibleCards, setVisibleCards] = useState({});
      const cardRefs = useRef([]);
  
      const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      );
        
    
         useEffect(() => {
    // Short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);


  
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
      { threshold: 0.2 } // 20% of the card needs to be visible
    );

    // Reset card refs when filtered students change
    cardRefs.current = cardRefs.current.slice(0, filteredStudents.length);

    // Get all card elements and observe them
    cardRefs.current.forEach(cardEl => {
      if (cardEl) observer.observe(cardEl);
    });

    return () => {
      cardRefs.current.forEach(cardEl => {
        if (cardEl) observer.unobserve(cardEl);
      });
    };
  }, [filteredStudents.length]); // Re-run when the number of filtered students changes


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


  
  // Filter students based on search term

  return (
    <div className="min-h-screen bg-[#7FB3A7] font-[Quicksand] mt-[60px]">
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
            {/* Topic Section with Search */}
        <div className={`py-8 px-4 bg-white/60 backdrop-blur-sm shadow-md transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
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
       <main className="container mx-auto py-8 px-4">
         {/* Student Cards Grid */}
         {filteredStudents.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredStudents.map((student, index) => {
               // Set up ref for the card element
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
                     // Apply scroll animations after initial load animation
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
          src={student.image} 
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
          <DetailItem label="Favorite Sport" value={student.sport} />
          <DetailItem label="Hobbies" value={student.hobbies} />
          <DetailItem label="Ambition" value={student.ambition} />
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

