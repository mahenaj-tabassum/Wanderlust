"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { toast } from "sonner";

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

const links = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destinations", href: "/addPackage" },
  { label: "About", href: "/about" },
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

export default function MobileNav() {
  const router = useRouter();
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
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-slate-900 transition-colors hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-70 flex-col border-l border-slate-200 bg-white p-0 sm:w-80"
      >
        <SheetHeader className="border-b border-slate-200 bg-slate-50 px-6 py-5 text-left">
          <SheetTitle className="text-xl font-bold tracking-tight text-slate-900">
            Wanderlust
            <span className="text-emerald-600">.</span>
          </SheetTitle>
          <SheetDescription className="text-sm text-slate-500">
            Discover your next adventure.
          </SheetDescription>
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

        {/* Account area: loading, signed in, or signed out */}
        {isPending ? (
          <div className="px-4 py-5">
            <div className="h-14 animate-pulse rounded-xl bg-slate-100" />
          </div>
        ) : user ? (
          <div className="flex flex-col gap-3 px-4 py-5">
            {/* Profile card */}
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name ?? "Profile photo"}
                  referrerPolicy="no-referrer"
                  className="size-11 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                  {getInitials(user.name)}
                </span>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
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
              className="w-full cursor-pointer border-slate-200 bg-white text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
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
                "w-full border-slate-200 bg-white text-slate-900 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700",
              )}
            >
              Log in
            </Link>

            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants(),
                "w-full bg-emerald-600 text-white hover:bg-emerald-700",
              )}
            >
              Sign up
            </Link>
          </div>
        )}

        <div className="mt-auto px-6 pb-6 pt-2">
          <p className="text-center text-xs text-slate-500">
            Your next journey starts here.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
