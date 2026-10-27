"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  LogOut,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

interface ProfileUser {
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date | string;
}

export function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-44 rounded-3xl bg-slate-200 sm:h-56" />
        <div className="mt-6 h-40 rounded-3xl bg-slate-200" />
      </div>
    </main>
  );
}

export default function ProfileContent({ user }: { user: ProfileUser }) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isDirty =
    name.trim() !== user.name || image.trim() !== (user.image ?? "");

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim() || undefined,
    });

    setIsSaving(false);

    if (error) {
      toast.error(error.message ?? "Could not update your profile.");
      return;
    }

    toast.success("Profile updated!");
    router.refresh();
  };

  const handleReset = () => {
    setName(user.name);
    setImage(user.image ?? "");
  };

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
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Cover + identity */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div
            aria-hidden="true"
            className="h-40 mb-5 bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-400 sm:h-48"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0, transparent 40%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.14) 0, transparent 35%), linear-gradient(135deg, #047857, #059669 55%, #34d399)",
            }}
          />

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="size-28 shrink-0 rounded-full border-4 border-white bg-white object-cover shadow-sm sm:size-32"
                  />
                ) : (
                  <span className="flex size-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-4xl font-semibold text-white shadow-sm sm:size-32">
                    {getInitials(user.name)}
                  </span>
                )}

                <div className="min-w-0 pb-1">
                  <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {user.name}
                  </h1>
                  <p className="mt-1 truncate text-slate-500">{user.email}</p>
                </div>
              </div>

              {user.emailVerified ? (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                  <BadgeCheck className="size-4" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                  <CircleAlert className="size-4" />
                  Email not verified
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Left: account at a glance */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Account
            </h2>

            <dl className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 text-emerald-600" />
                <div className="min-w-0">
                  <dt className="text-sm text-slate-500">Email</dt>
                  <dd className="mt-0.5 truncate font-medium text-slate-900">
                    {user.email}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-5 text-emerald-600" />
                <div>
                  <dt className="text-sm text-slate-500">Member since</dt>
                  <dd className="mt-0.5 font-medium text-slate-900">
                    {memberSince}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 size-5 text-emerald-600" />
                <div>
                  <dt className="text-sm text-slate-500">Email status</dt>
                  <dd className="mt-0.5 font-medium text-slate-900">
                    {user.emailVerified ? "Verified" : "Not verified"}
                  </dd>
                </div>
              </div>
            </dl>
          </aside>

          {/* Right: edit + sign out */}
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">
                Personal information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Update how your name and photo appear across Wanderlust.
              </p>

              <form onSubmit={handleSave} className="mt-6 space-y-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Full name
                  </Label>
                  <Input
                    id="name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 border-slate-200 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    readOnly
                    className="h-11 border-slate-200 bg-slate-50 text-slate-500"
                  />
                  <p className="text-xs text-slate-500">
                    Your email is used to sign in and cannot be changed here.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="image"
                    className="text-sm font-medium text-slate-700"
                  >
                    Photo URL
                  </Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="h-11 border-slate-200 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleReset}
                    disabled={!isDirty || isSaving}
                    className="cursor-pointer"
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isDirty || isSaving}
                    className="cursor-pointer bg-emerald-600 px-6 text-white hover:bg-emerald-700"
                  >
                    {isSaving ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </section>

            <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Sign out
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  End your session on this device.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="cursor-pointer border-slate-200 text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="size-4" />
                {isSigningOut ? "Logging out..." : "Log out"}
              </Button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

