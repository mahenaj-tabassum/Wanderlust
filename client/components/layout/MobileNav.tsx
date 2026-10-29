"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Compass, LogOut, Menu } from "lucide-react";
import { toast } from "react-toastify";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { getInitials, isActivePath, navLinks } from "./nav-config";

export default function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // isPending avoids flashing the "Log in" buttons while the session loads
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!");
          setOpen(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-cyan-50 text-cyan-700 transition-colors hover:bg-cyan-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-72 flex-col border-l border-cyan-100 bg-linear-to-b from-cyan-50 via-white to-orange-50 p-0 sm:w-80"
      >
        <div className="h-1 bg-linear-to-r from-cyan-400 via-amber-300 to-orange-400" />

        <SheetHeader className="px-6 pb-3 pt-5 text-left">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 rotate-3 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-cyan-300/60">
              <Compass className="size-5" />
            </span>
            <SheetTitle className="text-xl font-extrabold tracking-tight text-slate-900">
              Wanderlust<span className="text-orange-500">.</span>
            </SheetTitle>
          </div>
          <SheetDescription className="text-sm text-slate-500">
            Discover your next adventure.
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-1.5 px-4 py-3">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  active
                    ? "bg-white text-cyan-700 shadow-sm ring-1 ring-cyan-100"
                    : "text-slate-600 hover:bg-white/80 hover:text-cyan-700",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-xl transition-colors",
                    active
                      ? "bg-linear-to-br from-cyan-400 to-sky-500 text-white"
                      : "bg-cyan-100/70 text-cyan-600",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-cyan-100" />

        {/* Account area: loading, signed in, or signed out */}
        {isPending ? (
          <div className="px-4 py-5">
            <div className="h-14 animate-pulse rounded-2xl bg-cyan-100/60" />
          </div>
        ) : user ? (
          <div className="flex flex-col gap-3 px-4 py-5">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-cyan-100 transition-all hover:ring-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name ?? "Profile photo"}
                  referrerPolicy="no-referrer"
                  className="size-11 shrink-0 rounded-full object-cover ring-2 ring-cyan-200"
                />
              ) : (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-amber-400 text-sm font-bold text-white ring-2 ring-orange-200">
                  {getInitials(user.name)}
                </span>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
            </Link>

            <Button
              type="button"
              variant="outline"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full cursor-pointer rounded-full border-rose-200 bg-white font-semibold text-rose-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="size-4" />
              {isSigningOut ? "Logging out..." : "Log out"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-4 py-5">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full rounded-full border-cyan-200 bg-white font-semibold text-cyan-700 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800",
              )}
            >
              Log in
            </Link>

            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants(),
                "w-full rounded-full bg-linear-to-r from-orange-500 to-amber-400 font-bold text-white shadow-md shadow-orange-300/50 hover:brightness-105",
              )}
            >
              Sign up
            </Link>
          </div>
        )}

        <div className="mt-auto px-6 pb-6 pt-2">
          <p className="text-center text-xs font-medium text-slate-500">
            Your next journey starts here ✈️
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
