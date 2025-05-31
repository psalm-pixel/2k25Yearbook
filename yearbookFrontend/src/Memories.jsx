import { useState, useEffect } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data - replace with your actual data
const memories = [
  {
    id: 1,
    type: 'image',
    src: '/api/placeholder/800/600'
  },
  {
    id: 2,
    type: 'video',
    src: '/api/placeholder/800/600'
  },
  {
    id: 3,
    type: 'image',
    src: '/api/placeholder/800/600'
  },
  {
    id: 4,
    type: 'image',
    src: '/api/placeholder/800/600'
  },
  {
    id: 5,
    type: 'video',
    src: '/api/placeholder/800/600'
  },
  {
    id: 6,
    type: 'image',
    src: '/api/placeholder/800/600'
  },
  {
    id: 7,
    type: 'image',
    src: '/api/placeholder/800/600'
  },
  {
    id: 8,
    type: 'video',
    src: '/api/placeholder/800/600'
  }
];

export default function Memories() {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateModal = (direction) => {
    const currentIndex = memories.findIndex(memory => memory.id === selectedMemory.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % memories.length;
    } else {
      newIndex = currentIndex === 0 ? memories.length - 1 : currentIndex - 1;
    }
    
    setSelectedMemory(memories[newIndex]);
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight' && isModalOpen) navigateModal('next');
      if (e.key === 'ArrowLeft' && isModalOpen) navigateModal('prev');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedMemory]);

  // Card variations for uniqueness
  const cardVariations = [
    "rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 border-4 border-indigo-200",
    "rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 border-4 border-blue-200", 
    "rounded-3xl shadow-lg hover:shadow-2xl transform hover:rotate-1 border-4 border-purple-200",
    "rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:-rotate-1 border-4 border-pink-200"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Grid - Masonry-style layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory, index) => {
            // Apply different aspect ratios for visual variety
            const aspectClass = index % 3 === 0 ? "aspect-square" : 
                              index % 5 === 0 ? "aspect-[4/5]" : "aspect-[3/4]";
            
            // Select a unique card style
            const cardStyle = cardVariations[index % cardVariations.length];
            
            return (
              <div 
                key={memory.id}
                className={`bg-white overflow-hidden transition-all duration-500 cursor-pointer ${cardStyle}`}
                onClick={() => openModal(memory)}
              >
                <div className={`relative ${aspectClass} bg-gray-200 overflow-hidden`}>
                  <img 
                    src={memory.src} 
                    alt="Yearbook memory"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  {memory.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
                      <div className="w-20 h-20 flex items-center justify-center bg-white bg-opacity-30 rounded-full hover:bg-opacity-50 transition-all">
                        <Play size={36} className="text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for viewing memory */}
      {isModalOpen && selectedMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          {/* Close button */}
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-40 transition-all"
          >
            <X size={28} />
          </button>

          {/* Navigation buttons - always visible */}
          <button 
            onClick={() => navigateModal('prev')}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-40 transition-all focus:outline-none"
            aria-label="Previous"
          >
            <ChevronLeft size={36} className="text-white" />
          </button>
          
          <button 
            onClick={() => navigateModal('next')}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-40 transition-all focus:outline-none"
            aria-label="Next"
          >
            <ChevronRight size={36} className="text-white" />
          </button>
          
          {/* Content */}
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="relative">
              <div className="flex items-center justify-center">
                <div className="w-full max-h-[90vh] flex items-center justify-center">
                  {selectedMemory.type === 'image' ? (
                    <img 
                      src={selectedMemory.src} 
                      alt="Yearbook memory"
                      className="max-w-full max-h-[90vh] object-contain"
                    />
                  ) : (
                    <div className="relative w-full max-h-[90vh] flex items-center justify-center">
                      <img 
                        src={selectedMemory.src} 
                        alt="Yearbook memory"
                        className="max-w-full max-h-[90vh] object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 flex items-center justify-center bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition-all cursor-pointer">
                          <Play size={48} className="text-white ml-2" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}