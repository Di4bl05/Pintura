import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  title: {
    default: "Professional Painting Services | Your Painting Company",
    template: "%s | Your Painting Company"
  },
  description: "Expert residential and commercial painting services. Licensed, insured painters with 15+ years of experience. Free estimates. Serving [Your City] and surrounding areas.",
  keywords: ["painting services", "house painters", "interior painting", "exterior painting", "commercial painters", "residential painting"],
  authors: [{ name: "Your Painting Company" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Your Painting Company",
    title: "Professional Painting Services",
    description: "Expert residential and commercial painting services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Painting Company"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Painting Services",
    description: "Expert residential and commercial painting services",
    images: ["/og-image.jpg"]
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
              "name": "Your Painting Company",
              "image": "https://yoursite.com/logo.jpg",
              "telephone": "+1-555-555-5555",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Main St",
                "addressLocality": "Your City",
                "addressRegion": "Your State",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 0.0,
                "longitude": 0.0
              },
              "url": "https://yoursite.com",
              "areaServed": ["Your City", "Nearby City 1", "Nearby City 2"],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
