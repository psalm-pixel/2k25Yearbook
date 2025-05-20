import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";



export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Creates a GSAP context scoped to heroRef
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power3.out" },
      });

      // Animate the background: subtle zoom effect
      tl.fromTo(".background", { scale: 1.1 }, { scale: 1, duration: 1.5 })
        // Animate the dark overlay fading in to 50% opacity
        .fromTo(
          ".overlay",
          { opacity: 0 },
          { opacity: 0.5, duration: 1 },
          "-=1.5"
        )
        // Animate the hero title sliding in from below
        .from(".hero-title", { opacity: 0, y: 50 }, "-=0.75")
        // Animate the subtitle with a slight delay
        .from(".hero-subtitle", { opacity: 0, y: 20 }, "-=0.5")
  
        // Optional: Log when the animation completes
        .eventCallback("onComplete", () => console.log("Animation finished"));
    }, heroRef);

    // Cleanup on component unmount
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="background absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('../src/assets/img/142544.jpg')" }}
      ></div>

      {/* Dark Overlay */}
      <div className="overlay absolute inset-0 bg-black"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 font-[Amarante]">
        <h1 className="hero-title text-white text-2xl md:text-5xl font-bold mb-4">
          Oakfield Graduating Class Of 2024/2025{" "}
        </h1>
        <p className="hero-subtitle text-white text-lg mb-8">
          The Photos May Fade, <span className="text-[#50C878]">But the Memories Never Will.</span>{" "}
        </p>

        
      </div>
       <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="relative block w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#7FB3A7"
            fillOpacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,229.3C672,256,768,256,864,229.3C960,203,1056,149,1152,144C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

    </section>
    //     <div className='hero background bg-[url(../src/assets/img/142544.jpg)] flex justify-center items-center bg-cover bg-center h-[90%]'>
    //     <div class="overlay absolute inset-0 bg-black/50 h-full"></div>

    //  <div class="hero-content relative z-10 flex flex-col items-center justify-center h-full font-[Amarante]">
    //     <h1 class="hero-title text-white md:text-4xl font-bold">Oakfield Academic Set Of 2024/2025</h1>
    //     <h2 className='hero-subtitle text-white font-bold'>The Photos May Fade, But the Memories Never Will.</h2>
    //   </div>
    //     </div>
  );
}
