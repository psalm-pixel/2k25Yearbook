import { useState, useEffect, useRef } from 'react';

export default function YearbookTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);
  
  const timelineItems = [
    {
      name: "Jane Doe",
      quote: "The beginning of our final name together. Let's make every moment count!",
      image: "../src/assets/img/student_template/img1.jpg",
      alt: "First day of school"
    },
    {
      name: "John Doe",
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      image: "../src/assets/img/student_template/img2.avif",
      alt: "Homecoming dance"
    },
    {
      name: "Mary Smith",
      quote: "We didn't realize we were making memories, we just knew we were having fun.",
      image: "../src/assets/img/student_template/img3.avif",
      alt: "Football game victory"
    },
    {
      name: "Bob Johnson",
      quote: "Winter came with both frost and warmth – the cold outside, but friendship inside.",
      image: "../src/assets/img/student_template/img4.avif",
      alt: "Winter formal"
    },
    {
      name: "Sarah Williams",
      quote: "New name, same us – just a little wiser and a lot more ready to graduate.",
      image: "../src/assets/img/student_template/img5.avif",
      alt: "New Year celebration"
    },
    {
      name: "David Brown",
      quote: "It takes courage to grow up and become who you really are.",
      image: "../src/assets/img/student_template/img1.jpg",
      alt: "Valentine's day event"
    },
    {
      name: "Emily Davis",
      quote: "The best way to predict the future is to create it.",
      image: "../src/assets/img/student_template/img3.avif",
      alt: "Career day"
    },
    {
      name: "Michael Wilson",
      quote: "We may not have it all together, but together we have it all.",
      image: "../src/assets/img/student_template/img4.avif",
      alt: "Spring break trip"
    },
    {
      name: "Olivia Taylor",
      quote: "As we go on, we remember, all the times we had together.",
      image: "../src/assets/img/student_template/img5.avif",
      alt: "Graduation ceremony"
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      const triggerBottom = window.innerHeight * 0.8;
      
      timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < triggerBottom) {
          item.classList.add('show');
          setActiveIndex(index);
        } else {
          item.classList.remove('show');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans p-3">
      <header className="text-[#FDF6E3] py-8 text-center">
        <h1 className="text-4xl font-bold font-[Amarante] text-shadow-2xs">Echos Of Wisdom</h1>
      </header>
      
      <div className="container mx-auto px-4 py-12">
        <div className="relative" ref={timelineRef}>
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#A3BFD9]"></div>
          
          {timelineItems.map((item, index) => (
            <div 
              key={index}
              className={`timeline-item flex flex-col md:flex-row items-center mb-16 opacity-0 transition-all duration-1000 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Year marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#7FB3A7] border-4 border-[#A3BFD9] z-10"></div>
              
              {/* Content container */}
              <div className="w-full md:w-5/12 mb-8 md:mb-0">
                <div className={`bg-[#FDF6E3] font-[Quicksand] p-6 rounded-lg shadow-lg transform transition-transform duration-500 ${
                  activeIndex === index ? 'scale-105' : 'scale-100'
                }`}>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{item.name}</h3>
                  <p className="text-[#9bbee0] font-bold italic">"{item.quote}"</p>
                </div>
              </div>
              
              {/* Spacer for alignment */}
              <div className="w-full md:w-2/12"></div>
              
              {/* Image container */}
              <div className="w-full md:w-5/12">
                <div className={`overflow-hidden rounded-lg shadow-lg transform transition-transform duration-500 ${
                  activeIndex === index ? 'scale-105' : 'scale-100'
                }`}>
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className="w-full h-[400px] transition-transform duration-700 hover:scale-110 md:w-full md:h-[400px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
     
      
      <style jsx>{`
        .timeline-item {
          transform: translateY(50px);
        }
        
        .timeline-item.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}