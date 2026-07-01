import type { Metadata } from "next";
import { Poppins, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import BackToTop from "@/components/BackToTop";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" className={`${poppins.variable} ${anton.variable} h-full antialiased`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon_io/icon-blue.png" />
        {/* Take scroll handling away from the browser. On slow mobile loads the
            browser's automatic scroll restoration fires late (after the load
            event) and yanks the user back to the top even after they've
            scrolled down. 'manual' stops that jump; Next.js still manages scroll
            for in-app link navigations itself. Runs inline before first paint so
            it beats any scheduled restoration. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history){history.scrollRestoration='manual';}",
          }}
        />
      </head>
      <body className="suppressHydrationWarning min-h-full flex flex-col font-[family-name:var(--font-poppins)]">
        <Navbar />
        <CursorTrail />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
