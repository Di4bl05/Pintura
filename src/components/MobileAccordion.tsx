"use client";

import { useState, ReactNode, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface MobileAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  headerContent?: ReactNode;
}

export default function MobileAccordion({ 
  title, 
  children, 
  defaultOpen = false,
  headerContent 
}: MobileAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const contentHeight = contentRef.current?.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 mb-2 transition-all rounded-lg bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex-1">
          {headerContent ? headerContent : (
            <h3 className="text-lg font-bold text-left text-gray-900">{title}</h3>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div 
        ref={contentRef}
        style={{ height }}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
