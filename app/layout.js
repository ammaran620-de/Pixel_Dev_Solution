import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import DataTicker from "@/components/DataTicker";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["600", "700", "800"], // Preload above-the-fold weights
  preload: true,
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
  weight: ["400", "600"],
  preload: true,
});

export const metadata = {
  title: {
    template: "%s | Pixel-Dev Solution",
    default: "Pixel-Dev Solution | Computer Vision Studio",
  },
  description: "Vision systems that count, inspect and measure.",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pixel-Dev Solution",
    "url": "https://pixel-dev.com",
    "logo": "https://pixel-dev.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+923304070719",
      "contactType": "customer service"
    }
  };

  return (
    <html lang="en" className={`${bricolage.variable} ${publicSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Script
          strategy="afterInteractive"
          src="https://plausible.io/js/script.js"
          data-domain="pixel-dev.com"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main className="flex-grow">{children}</main>
          <Footer />
          <DataTicker />
        </SmoothScroll>
      </body>
    </html>
  );
}
