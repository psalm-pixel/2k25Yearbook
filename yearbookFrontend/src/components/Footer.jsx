import { useState } from 'react';
import { Heart, BookOpen, Star, Smile, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [emailValue, setEmailValue] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSubscribe = () => {
    if (emailValue.includes('@')) {
      setSubscribed(true);
      setEmailValue('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br bg-[#FDF6E3] font-[Quicksand] text-[#A3BFD9] pt-12 pb-8 border-t border-amber-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top content */}
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          {/* Left side / Branding */}
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-[#7FB3A7] mr-2" />
              <h2 className="text-2xl font-bold text-slate-500">Cherished Memories</h2>
            </div>
            <p className="text-[#A3BFD9] font-bold mb-6 max-w-md">
              We believe that every moment shared together becomes a page in our collective story.
              Thank you for being part of our journey.
            </p>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>

          {/* Middle / Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-slate-500">Our Story</h3>
            <ul className="space-y-3">
              {[
                { label: "About Our Class", href: "/Legacy" },
                { label: "Teacher Tributes", href: "#" },
                { label: "Class Photos", href: "#" },
                { label: "Class Mugshots", href: "#" },
                { label: "Superlatives", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href} 
                    className="inline-flex items-center font-bold text-[#A3BFD9] hover:text-[#7FB3A7] transition-colors"
                  >
                    <span className="mr-2">•</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        

        {/* Quote */}
        <div className="relative py-8 px-4 md:px-12 mb-8 text-center">
          <div className="absolute inset-0 flex justify-center items-center opacity-10">
            <Heart className="w-32 h-32 text-rose-500" fill="currentColor" />
          </div>
          <blockquote className="italic text-slate-500 font-bold text-lg md:text-xl mb-4">
            "The best memories we collect are the ones we create together."
          </blockquote>
          <p className="text-gray-500 font-medium">Class of 2025</p>
        </div>

        {/* Bottom / Legal */}
        <div className="border-t border-amber-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center font-bold text-sm text-gray-500">
          <div className="order-2 md:order-1 mt-4 md:mt-0">
            <p>&copy; {currentYear} Class of 2025. All memories treasured forever.</p>
          </div>

          <div className="flex items-center font-bold order-1 md:order-2">
            <span className="mr-2">Made with</span>
            <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
            <span className="mx-2">and</span>
            <span className="text-[#7FB3A7]">nostalgia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}