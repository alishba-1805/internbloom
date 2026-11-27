import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { navLinks } from "@/data/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "InternBloom",
    template: "%s | InternBloom",
  },
  description:
    "Discover demo internships for university students in Pakistan with InternBloom.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-30 focus:rounded-lg focus:bg-sage focus:px-4 focus:py-2 focus:font-semibold focus:text-forest"
        >
          Skip to content
        </a>
        <Navbar links={navLinks} />
        <main id="main-content" className="flex-1 pb-16">
          {children}
        </main>
        <Footer links={navLinks} />
      </body>
    </html>
  );
}
