import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorTrail from "./components/CursorTrail";
import BackToTop from "./components/BackToTop";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Revamp 180° – Digital Agency",
  description:
    "Website revamping, web & app design, branding, social media management, and video editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png"></link>
        <link rel="manifest" href="/favicon_io/site.webmanifest"></link>
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-poppins)]">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
