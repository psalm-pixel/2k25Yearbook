import { useState, useEffect } from "react";
import { Heart, BookOpen, Star, Smile, Mail } from "lucide-react";
import { Link } from 'react-router-dom';
// import { useLocation } from "react-router-dom";

// TikTok Icon Component
const TikTokIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const [emailValue, setEmailValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSubscribe = () => {
    if (emailValue.includes("@")) {
      setSubscribed(true);
      setEmailValue("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  return (
    <footer className="bg-gradient-to-br bg-[#E8F4F1] font-[Quicksand] text-[#A3BFD9] pt-12 pb-8 border-t border-amber-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top content */}
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          {/* Left side / Branding */}
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-[#7FB3A7] mr-2" />
              <h2 className="text-2xl font-medium text-[#2C3E50]">
                Cherished Memories
              </h2>
            </div>
            <p className="text-[#34495E] font-light mb-6 max-w-md">
              We believe that every moment shared together becomes a page in our
              collective story. Thank you for being part of our journey.
            </p>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
          </div>

          {/* Middle / Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-[#2C3E50]">
              Our Story
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Our Class", href: "/Legacy" },
                { label: "Class Gallery", href: "/memories" },
                { label: "Teacher Tributes", href: "#" },
                { label: "Class Mugshots", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center font-semibold text-[#34495E] opacity-80 hover:opacity-100 hover:text-[#5A8A7D] transition-colors"
                  >
                    <span className="mr-2">•</span> {link.label}
                  </Link>
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
          <blockquote className="italic text-[#2C3E50] font-medium text-lg md:text-xl mb-4">
            "The best memories we collect are the ones we create together."
          </blockquote>
          <p className="text-[#2C3E50] font-light">Class of 2025</p>
        </div>

        {/* TikTok Link at Bottom */}
        <div className="mt-6 pt-4 text-center">
          <a
            href="https://www.tiktok.com/@oakfield.016"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold text-[#34495E] hover:text-[#7FB3A7] transition-all duration-300 group bg-white/50 hover:bg-white/80 px-6 py-3 rounded-full shadow-sm hover:shadow-md"
          >
            <TikTokIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Follow Our Class on TikTok
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </a>
        </div>
        {/* Bottom / Legal */}
        <div className="border-t border-amber-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center font-bold text-sm text-gray-500">
          <div className="order-2 md:order-1 mt-4 md:mt-0">
            <p>
              &copy; {currentYear} Class of 2025. All memories treasured
              forever.
            </p>
          </div>

          <div className="flex items-center font-bold order-1 md:order-2">
            <span className="mr-2">Made with</span>
            <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
            <span className="mx-2">and</span>
            <span className="text-[#5A8A7D]">nostalgia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
