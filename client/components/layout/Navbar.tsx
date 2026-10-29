"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Compass,
  LogOut,
  PlusCircle,
  Plane,
  Sparkles,
  Ticket,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import { getInitials, isActivePath, navLinks } from "./nav-config";

// Re-exported so any file that imported it from here keeps working
export { navLinks };

// Shortcuts shown inside the account dropdown
const accountLinks = [
  {
    label: "My Profile",
    hint: "Your details & photo",
    href: "/profile",
    icon: User,
    tone: "bg-cyan-100 text-cyan-600",
  },
  {
    label: "My Bookings",
    hint: "Trips you've booked",
    href: "/my-booking",
    icon: Ticket,
    tone: "bg-orange-100 text-orange-500",
  },
  {
    label: "Add Destination",
    hint: "Share a new place",
    href: "/addPackage",
    icon: PlusCircle,
    tone: "bg-amber-100 text-amber-600",
  },
];

function UserAvatar({
  name,
  image,
  className = "size-9",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "Profile photo"}
        referrerPolicy="no-referrer"
        className={cn(
          "shrink-0 rounded-full object-cover ring-2 ring-cyan-200",
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-amber-400 text-sm font-bold text-white ring-2 ring-orange-200",
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("Could not sign out. Please try again.");
        },
      },
    });

    setIsSigningOut(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
      {/* Energetic colour strip */}
      <div className="h-1 bg-linear-to-r from-cyan-400 via-amber-300 to-orange-400" />

      <div className="border-b border-cyan-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl"
          >
            <span className="flex size-9 rotate-3 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-cyan-300/60 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
              <Compass className="size-5" />
            </span>
            <span>
              Wanderlust<span className="text-orange-500">.</span>
            </span>
          </Link>

          {/* Center: pill navigation (lg and up) */}
          <nav className="hidden items-center gap-1 rounded-full bg-cyan-50/80 p-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all",
                    active
                      ? "bg-white text-cyan-700 shadow-sm ring-1 ring-cyan-100"
                      : "text-slate-600 hover:bg-white/70 hover:text-cyan-700",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: account area (lg and up) + mobile menu (below lg) */}
          <div className="flex shrink-0 items-center justify-end gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              {isPending ? (
                <div className="size-9 animate-pulse rounded-full bg-cyan-100" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    aria-label="Open account menu"
                    className="group flex cursor-pointer items-center gap-2 rounded-full bg-cyan-50/70 p-1 pr-3 transition-all hover:bg-cyan-100 hover:shadow-md hover:shadow-cyan-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span className="relative">
                      <UserAvatar name={user.name} image={user.image} />
                      {/* online dot */}
                      <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-emerald-400" />
                    </span>
                    <span className="hidden max-w-24 truncate text-sm font-bold text-slate-800 xl:block">
                      {user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="size-4 text-cyan-600 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-popup-open:rotate-180" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="w-72 overflow-hidden rounded-3xl border-cyan-100 bg-white p-0 shadow-2xl shadow-cyan-200/60"
                  >
                    {/* Banner */}
                    <div className="relative h-20 overflow-hidden bg-linear-to-r from-cyan-400 via-sky-400 to-orange-300">
                      <span className="absolute -right-5 -top-8 size-24 rounded-full bg-amber-200/70" />
                      <span className="absolute right-10 top-9 size-10 rounded-full bg-white/25" />
                      <span className="absolute -left-6 top-8 size-20 rounded-full bg-white/20" />
                      <Plane className="absolute right-5 top-4 size-6 -rotate-12 text-white/90" />
                    </div>

                    {/* Profile */}
                    <div className="px-4 pb-3">
                      <div className="mt-2 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-base font-extrabold text-slate-900">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                        <span className="mt-0.5 flex shrink-0 items-center gap-1 rounded-full bg-linear-to-r from-orange-100 to-amber-100 px-2.5 py-1 text-[11px] font-bold text-orange-600">
                          <Sparkles className="size-3" />
                          Traveler
                        </span>
                      </div>
                    </div>

                    <div className="space-y-0.5 px-2 pb-2">
                      {accountLinks.map(
                        ({ label, hint, href, icon: Icon, tone }) => (
                          <DropdownMenuItem
                            key={href}
                            onClick={() => router.push(href)}
                            className="group/item cursor-pointer gap-3 rounded-2xl px-2.5 py-2 focus:bg-cyan-50"
                          >
                            <span
                              className={cn(
                                "flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover/item:scale-110 group-focus/item:scale-110",
                                tone,
                              )}
                            >
                              <Icon className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-slate-800">
                                {label}
                              </span>
                              <span className="block text-xs text-slate-500">
                                {hint}
                              </span>
                            </span>
                            <ChevronRight className="size-4 text-slate-300 transition-all group-hover/item:translate-x-0.5 group-hover/item:text-cyan-500" />
                          </DropdownMenuItem>
                        ),
                      )}
                    </div>

                    <DropdownMenuSeparator className="m-0 bg-cyan-100" />

                    <div className="bg-linear-to-r from-cyan-50/60 to-orange-50/60 p-2">
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="cursor-pointer justify-center gap-2 rounded-2xl py-2.5 font-bold text-rose-600 focus:bg-rose-100 focus:text-rose-700"
                      >
                        <LogOut className="size-4" />
                        {isSigningOut ? "Logging out..." : "Log out"}
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "rounded-full font-semibold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700",
                    )}
                  >
                    Log in
                  </Link>

                  <Link
                    href="/sign-up"
                    className={cn(
                      buttonVariants(),
                      "rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-5 font-bold text-white shadow-md shadow-orange-300/50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/60 hover:brightness-105",
                    )}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
