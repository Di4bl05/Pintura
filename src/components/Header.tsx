"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Side Navigation */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-8">
          <Link href="#home" className="group flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'} group-hover:w-12`}></div>
            <span className={`text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>Home</span>
          </Link>
          <Link href="#work" className="group flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'} group-hover:w-12`}></div>
            <span className={`text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>Work</span>
          </Link>
          <Link href="#about" className="group flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'} group-hover:w-12`}></div>
            <span className={`text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>About</span>
          </Link>
          <Link href="#contact" className="group flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'} group-hover:w-12`}></div>
            <span className={`text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>Contact</span>
          </Link>
        </div>
      </nav>

      {/* Minimal Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="flex justify-between items-center px-8 lg:px-16 py-6">
          <Link href="/" className={`text-2xl font-bold tracking-tighter transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            PAINT<span className="font-light">.</span>
          </Link>
          
          <a 
            href="tel:+15555555555" 
            className={`px-6 py-3 text-sm font-medium tracking-wide transition-all ${
              scrolled 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            CALL NOW
          </a>
        </div>
      </header>

      {/* Mobile Menu Button */}
      <button className="fixed bottom-8 right-8 z-50 lg:hidden w-14 h-14 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <line x1="0" y1="1" x2="20" y2="1" stroke="white" strokeWidth="2"/>
          <line x1="0" y1="6" x2="20" y2="6" stroke="white" strokeWidth="2"/>
          <line x1="0" y1="11" x2="20" y2="11" stroke="white" strokeWidth="2"/>
        </svg>
      </button>
    </>
  );
}
