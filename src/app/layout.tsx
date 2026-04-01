import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Instrument_Serif } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext"; // <--- Verifica esta ruta
import "./globals.css";

// Configuración de tus 3 fuentes premium
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
        {/* EL PROVIDER DEBE ENVOLVER A LOS CHILDREN */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}