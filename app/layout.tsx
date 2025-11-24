import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Classic Clean Laundry – Affordable Laundry Services in Windhoek",
  description: "Laundry washing, ironing, bedding cleaning, and pickup & delivery services in Windhoek, Namibia.",
  keywords: [
    "Laundry",
    "Laundry Washing",
    "Ironing",
    "Pickup and Delivery",
    "Commercial Laundry",
    "Beddings",
    "Laundry Services Windhoek",
    "Namibia Laundry"
  ],
  authors: [
    {
      name: "Classic Clean Laundry",
      url: "https://scc-laundry.com",
    },
  ],
  creator: "Classic Clean Laundry",
  publisher: "Classic Clean Laundry",

  // Namibia locale
  metadataBase: new URL("https://scc-laundry.com"),
  alternates: {
    canonical: "https://scc-laundry.com",
  },
  openGraph: {
    title: "Classic Clean Laundry – Windhoek, Namibia",
    description:
      "Professional laundry washing, ironing, bedding cleaning, and pickup & delivery services in Windhoek, Namibia.",
    url: "https://scc-laundry.com",
    siteName: "Classic Clean Laundry",
    locale: "en-NA",
    type: "website",
  },

  // Business social links (no Twitter)
  other: {
    facebook: "https://facebook.com/classiccleanlaundry",
    instagram: "https://instagram.com/classiccleanlaundry",
  },

  icons: {
    icon: [
      {
        url: "favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "favicon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
 {/* Google Analytics */}
  <Script
    strategy="afterInteractive"
    src={`https://www.googletagmanager.com/gtag/js?id=G-TRC50EZZJH`}
  />
  {/* Google tag (gtag.js) */}
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

        

        {children}
      </body>
    </html>
  )
}
