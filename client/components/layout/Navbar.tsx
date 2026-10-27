
import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/addPackage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left: Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-emerald-700 sm:text-xl"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Compass className="size-5" />
          </span>

          <span>
            Wanderlust<span className="text-emerald-600">.</span>
          </span>
        </Link>

        {/* Center: Desktop navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Desktop actions + mobile menu */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          {/* Desktop authentication buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              className="text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Link href="/login">Log in</Link>
            </Button>

            <Button
              className="rounded-full bg-emerald-600 px-5 text-white hover:bg-emerald-700"
            >
              <Link href="/register">Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu: visible below md */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
