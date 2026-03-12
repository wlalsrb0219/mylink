"use client";

import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white font-sans text-black">
      {/* Background Image with Hover Effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out hover:opacity-0"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2070&auto=format&fit=crop')` 
        }}
      />

      {/* Navigation Bar */}
      <nav className="relative z-20 flex w-full items-center justify-between p-6">
        {/* Left: Nav Buttons */}
        <div className="flex gap-4">
          {["메인", "소개", "직원"].map((item) => (
            <button 
              key={item}
              className="text-sm font-medium text-white mix-blend-difference hover:opacity-70 transition-opacity"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right: Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col gap-1.5 p-2 mix-blend-difference"
          aria-label="Open Menu"
        >
          <span className="h-0.5 w-6 bg-white"></span>
          <span className="h-0.5 w-6 bg-white"></span>
          <span className="h-0.5 w-6 bg-white"></span>
        </button>
      </nav>

      {/* Main Content (Optional placeholder for visibility) */}
      <main className="relative z-10 flex min-h-[calc(100vh-160px)] flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mix-blend-difference opacity-20 mb-8">
          WELCOME
        </h1>
        <a 
          href="/skyline.html" 
          target="_blank"
          className="group relative px-8 py-4 font-bold text-white mix-blend-difference border-2 border-white hover:bg-white hover:text-black transition-all duration-300 rounded-full flex items-center gap-3 pointer-events-auto shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
        >
          <span className="text-xl">🚀</span>
          <span>START SKYLINE RUNNER</span>
          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
        </a>
      </main>

      {/* Side Menu Panel */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full bg-white shadow-2xl transition-transform duration-500 ease-in-out sm:w-1/2 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative flex h-full flex-col items-center justify-center p-12">
          {/* Close Button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 p-2 text-3xl font-light hover:rotate-90 transition-transform duration-300"
            aria-label="Close Menu"
          >
            ✕
          </button>
          
          <h2 className="text-4xl font-bold tracking-tight text-black">안녕하세요</h2>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center z-20">
        <p className="text-[10px] font-bold tracking-widest text-white mix-blend-difference opacity-60 uppercase">
          MADE BY JIMINKYU
        </p>
      </footer>

      {/* Overlay to close menu when clicking outside (on small screens it covers all, on large it's the other half) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm sm:w-1/2"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
