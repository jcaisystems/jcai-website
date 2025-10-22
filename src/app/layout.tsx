import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// UPDATED: Replaced with the SEO-optimized metadata object
export const metadata: Metadata = {
  title: {
    template: '%s | JCAI Consulting',
    default: 'Custom AI & Automation Solutions to Scale Your Business | JCAI Consulting',
  },
  description: "Wasting time on repetitive tasks? JCAI builds bespoke AI and automation systems to streamline operations, eliminate costly errors, and future-proof your business. Discover your potential.",
  icons: {
    icon: '/jcaifavicon-white.png', // Using the favicon from your project
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-700 text-slate-200 overflow-x-hidden`}
      >
        <Header />
        <main>{children}</main>
        <GoogleAnalytics gaId="G-ESR47ZW55J" />
        <Footer />
      </body>
    </html>
  );
}
