import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import ReduxProvider from "./redux/ReduxProvider";
import { Toaster } from "sonner";


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Classic Clean Laundry – Affordable Laundry Services in Windhoek",
  description:
    "Laundry washing, ironing, bedding cleaning, and pickup & delivery services in Windhoek, Namibia.",
  keywords: [
    "Laundry",
    "Laundry Washing",
    "Ironing",
    "Pickup and Delivery",
    "Commercial Laundry",
    "Beddings",
    "Laundry Services Windhoek",
    "Namibia Laundry",
  ],
  authors: [
    {
      name: "Classic Clean Laundry",
      url: "https://scc-laundry.com",
    },
  ],
  creator: "Classic Clean Laundry",
  publisher: "Classic Clean Laundry",
  metadataBase: new URL("https://scc-laundry.com"),
  alternates: { canonical: "https://scc-laundry.com" },
  openGraph: {
    title: "Classic Clean Laundry – Windhoek, Namibia",
    description:
      "Professional laundry washing, ironing, bedding cleaning, and pickup & delivery services in Windhoek, Namibia.",
    url: "https://scc-laundry.com",
    siteName: "Classic Clean Laundry",
    locale: "en-NA",
    type: "website",
    images: [
    {
      url: "https://scc-laundry.com/assets/ccl.logo.png",
      width: 1200,
      height: 630,
      alt: "Classic Clean Laundry",
    },
  ],
  },
  other: {
    facebook: "https://facebook.com/classiccleanlaundry",
    instagram: "https://instagram.com/classiccleanlaundry",
  },
  icons: {
    icon: [
      { url: "favicon.png", media: "(prefers-color-scheme: light)" },
      { url: "favicon.png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.png", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#003262" />
        <link rel="apple-touch-icon" href="/assets/ccl.logo.png" />
      </head>
      <body className={`${poppins.variable} antialiased`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
        <ServiceWorkerRegister />
       

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-TRC50EZZJH`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TRC50EZZJH');
            `,
          }}
        />

        {/* JSON-LD Schema */}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LaundryService",
              name: "Classic Clean Laundry",
              image: "https://scc-laundry.com/assets/ccl.logo.png",
              url: "https://scc-laundry.com",
              telephone: "+264813388933",
              priceRange: "N$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "John Meinert Street",
                addressLocality: "Windhoek",
                addressRegion: "Khomas",
                postalCode: "9000",
                addressCountry: "NA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 22.565115,
                longitude: 17.070159,
              },
              openingHours: ["Mo-Sa 08:00-19:00", "Su Closed"],
              sameAs: [
                "https://facebook.com/classiccleanlaundry",
                "https://instagram.com/classiccleanlaundry",
              ],
            }),
          }}
        />
       <ReduxProvider>
        {children}
      </ReduxProvider>
      <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
