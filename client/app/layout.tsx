import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import { cn } from "@/lib/utils";

import "react-toastify/dist/ReactToastify.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Wanderlust | Discover Your Next Adventure",
  description: "Find and book unforgettable travel experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}
