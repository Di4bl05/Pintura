'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScrollContextType {
  isHeaderOverHero: boolean;
  setIsHeaderOverHero: (value: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [isHeaderOverHero, setIsHeaderOverHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      const headerElement = document.querySelector('header');
      
      if (heroElement && headerElement) {
        const heroRect = heroElement.getBoundingClientRect();
        const headerRect = headerElement.getBoundingClientRect();
        
        // El header está sobre el hero si el bottom del header es menor que el top del hero
        const isOver = headerRect.bottom < heroRect.top;
        setIsHeaderOverHero(isOver);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ isHeaderOverHero, setIsHeaderOverHero }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}
