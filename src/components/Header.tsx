"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Inicio ", href: "#" },
    { name: "Servicios", href: "#services" },
    { name: "Galería", href: "#gallery" },
    { name: "Reseñas", href: "#reviews" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-600">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Your Painting Co.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 transition-colors hover:text-accent-600"
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="tel:+15555555555"
            className="items-center hidden gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg md:flex bg-accent-600 hover:bg-accent-700"
          >
            <Phone className="w-5 h-5" />
            (555) 555-5555
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="py-4 border-t md:hidden">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-2 font-medium text-gray-700 hover:text-accent-600"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="tel:+15555555555"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-accent-600 hover:bg-accent-700"
              >
                <Phone className="w-5 h-5" />
                (555) 555-5555
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
