"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const links = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destinations", href: "/addPackage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-slate-900 transition-colors hover:bg-emerald-50 hover:text-emerald-700 md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[280px] border-l border-slate-200 bg-white p-0 sm:w-80"
      >
        <SheetHeader className="border-b border-slate-200 bg-slate-50 px-6 py-5 text-left">
          <SheetTitle className="text-xl font-bold tracking-tight text-slate-900">
            Wanderlust
            <span className="text-emerald-600">.</span>
          </SheetTitle>

          <p className="text-sm text-slate-500">
            Discover your next adventure.
          </p>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4 py-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Separator className="bg-slate-200" />

        <div className="flex flex-col gap-3 px-4 py-5">
          <Button
            variant="outline"
            className="w-full border-slate-200 bg-white text-slate-900 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              Log in
            </Link>
          </Button>

          <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
            <Link href="/sign-up" onClick={() => setOpen(false)}>
              Sign up
            </Link>
          </Button>
        </div>

        <div className="px-6 pt-2">
          <p className="text-center text-xs text-slate-500">
            Your next journey starts here.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
