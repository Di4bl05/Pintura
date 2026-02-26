import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://luisbety.com'),
  title: {
    default: "LUISBETY INC - Best House Painters Florida | Top-Rated Painting Company",
    template: "%s | LUISBETY INC - Florida's Premier Painting Company"
  },
  description: "LUISBETY INC - Best house painters Florida - Professional interior & exterior painting, commercial painting, deck staining, pressure washing. Licensed & insured. Serving Longwood, Orlando and all Florida. Free quotes! Competitive prices.",
  keywords: [
    "best house painters Florida",
    "interior painting Florida",
    "exterior painting Florida",
    "commercial painting Florida",
    "deck staining Florida",
    "pressure washing Florida",
    "Longwood painters",
    "Orlando painting companies",
    "professional painters near me",
    "licensed and insured painters",
    "LUISBETY INC",
    "competitive painting prices Florida"
  ],
  authors: [{ name: "LUISBETY INC" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luisbety.com",
    siteName: "LUISBETY INC",
    title: "Professional Painting Services Florida",
    description: "Expert residential and commercial painting services in Florida",
    images: [
      {
        url: "/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "LUISBETY INC Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Painting Services Florida",
    description: "Expert residential and commercial painting services in Florida",
    images: ["/images/logo/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PaintingContractor",
              "name": "LUISBETY INC",
              "image": "https://luisbety.com/images/logo/logo.png",
              "telephone": "+1-786-350-6367",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2381 Westwood Dr",
                "addressLocality": "Longwood",
                "addressRegion": "FL",
                "postalCode": "32779",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.7004,
                "longitude": -81.3384
              },
              "url": "https://luisbety.com",
              "areaServed": [
                "Longwood",
                "Orlando",
                "Winter Park",
                "Altamonte Springs",
                "Lake Mary",
                "Sanford",
                "Central Florida",
                "Florida"
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "6"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
