import { useState, useEffect } from 'react';

export default function MemoriesSection() {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-16 px-4" style={{backgroundColor: '#7FB3A7'}}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <span className="text-white/80 text-lg font-light tracking-wider">Our Journey</span>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wider font-[Delius]">
            Memories <span className="text-white/80">That</span> <span className="text-emerald-200">Matter</span>
          </h2>
          
          <p className="text-white/80 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed font-[Quicksand]">
            Every moment shared, every laugh exchanged, every challenge conquered together has become 
            part of our collective story that will live on forever.
          </p>
        </div>

        {/* Memory Cards Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Graduation Day */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">🎓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[Delius]">Graduation Day</h3>
            <p className="text-gray-600 leading-relaxed font-[Quicksand]">
              The culmination of years of hard work, dedication, and growth. A day of celebration, 
              tears of joy, and new beginnings.
            </p>
          </div>

          {/* Friendships */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">💝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[Delius]">Lasting Friendships</h3>
            <p className="text-gray-600 leading-relaxed font-[Quicksand]">
              Bonds forged in laughter, strengthened through challenges, and destined to last 
              a lifetime. These are the treasures we carry forward.
            </p>
          </div>

          {/* Academic Excellence */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[Delius]">Academic Journey</h3>
            <p className="text-gray-600 leading-relaxed font-[Quicksand]">
              From first lessons to final exams, every assignment completed and every concept 
              mastered brought us closer to our dreams.
            </p>
          </div>

          {/* School Spirit */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[Delius]">School Spirit</h3>
            <p className="text-gray-600 leading-relaxed font-[Quicksand]">
              United we stood, in competitions, celebrations, and challenges. Our school pride 
              and unity made every victory sweeter.
            </p>
          </div>

          {/* Growth & Learning */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">🌱</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[Delius]">Personal Growth</h3>
            <p className="text-gray-600 leading-relaxed font-[Quicksand]">
              We entered as children and emerged as young adults, shaped by experiences, 
              challenges, and the wisdom of our journey.
            </p>
          </div>

          {/* Future Dreams */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[Delius]">Future Dreams</h3>
            <p className="text-gray-600 leading-relaxed font-[Quicksand]">
              Armed with knowledge, friendships, and memories, we step into the future 
              ready to make our mark on the world.
            </p>
          </div>
        </div>

        {/* Closing Message */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/30 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-light text-white mb-6 font-[Delius]">
              Class of 2025
            </h3>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed font-[Quicksand]">
              Though our paths may diverge, the memories we've created and the bonds we've formed 
              will forever connect us. Here's to the journey we've shared and the adventures yet to come.
            </p>
            <div className="flex justify-center items-center space-x-4 mt-8 text-white/60">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <span className="text-sm font-light tracking-wider">Forever Connected</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
