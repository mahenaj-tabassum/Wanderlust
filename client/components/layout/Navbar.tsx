"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Compass, LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // npx shadcn@latest add dropdown-menu
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/addPackage" },
  { label: "My Booking", href: "/my-booking" },
  { label: "Contact", href: "/contact" },
];

// "Mahenaj Tabassum" -> "MT"
function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

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
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white",
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}

export default function Navbar() {
  const router = useRouter();
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

        {/* Center: Desktop navigation (lg and up) */}
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

        {/* Right: account area (lg and up) + mobile menu (below lg) */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            {isPending ? (
              <div className="size-9 animate-pulse rounded-full bg-slate-100" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Open account menu"
                  className="flex cursor-pointer items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <UserAvatar name={user.name} image={user.image} />
                  <ChevronDown className="size-4 text-slate-500" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64 p-1.5">
                  {/* Profile summary */}
                  <div className="flex items-center gap-3 px-2 py-2.5">
                    <UserAvatar
                      name={user.name}
                      image={user.image}
                      className="size-10"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="cursor-pointer gap-2"
                  >
                    <User className="size-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-700"
                  >
                    <LogOut className="size-4" />
                    {isSigningOut ? "Logging out..." : "Log out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700",
                  )}
                >
                  Log in
                </Link>

                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants(),
                    "rounded-full bg-emerald-600 px-5 text-white hover:bg-emerald-700",
                  )}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu: visible below lg */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
