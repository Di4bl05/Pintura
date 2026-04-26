import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import "./globals.css";

const fontVars = {
  "--font-sans": '"Arial", "Helvetica Neue", Helvetica, sans-serif',
  "--font-display": 'Georgia, "Times New Roman", Times, serif',
  "--font-serif": 'Georgia, "Times New Roman", Times, serif',
} as React.CSSProperties;

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
    <html lang="en" style={fontVars}>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen">
     
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}