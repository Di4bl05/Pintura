"use client";

import { useState, ReactNode } from "react";
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

  return (
    <>
      {/* Mobile: Collapsible */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-4 mb-2 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex-1">
            {headerContent ? headerContent : (
              <h3 className="text-lg font-bold text-left text-gray-900">{title}</h3>
            )}
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ml-2 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="pb-4">
            {children}
          </div>
        </div>
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        {children}
      </div>
    </>
  );
}
