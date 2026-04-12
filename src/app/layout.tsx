import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Instrument_Serif } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import "./globals.css";

const sans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap" 
});

const display = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-display",
  display: "swap" 
});

const serif = Instrument_Serif({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--font-serif",
  display: "swap" 
});

export const metadata: Metadata = {
  title: "Luisbety Protocol | High-Performance Coating",
  description: "Servicios de ingeniería de superficies y recubrimientos en Florida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${serif.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen">
     
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}