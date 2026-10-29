"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  Compass,
  ImageIcon,
  Loader2,
  LogOut,
  Mail,
  Plane,
  PlusCircle,
  RotateCcw,
  Save,
  Ticket,
  User,
  type LucideIcon,
} from "lucide-react";
import { toast } from "react-toastify";

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
    <main className="min-h-screen bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-64 rounded-[2.5rem] bg-cyan-100/70" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="h-80 rounded-3xl bg-cyan-100/50" />
          <div className="h-80 rounded-3xl bg-cyan-100/50" />
        </div>
      </div>
    </main>
  );
}

// Shared field styles (same as the add-package and auth forms)
const inputClass =
  "h-12 rounded-2xl border-0 bg-cyan-50/70 pl-12 text-sm font-semibold text-slate-800 transition-colors placeholder:font-medium placeholder:text-slate-400 hover:bg-cyan-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-400";
const labelClass = "text-sm font-bold text-slate-700";

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="pointer-events-none absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
      <Icon className="size-4" />
    </span>
  );
}

export default function ProfileContent({ user }: { user: ProfileUser }) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  // Remembers a photo URL that failed to load, so we show initials instead
  const [failedUrl, setFailedUrl] = useState("");

  const isDirty =
    name.trim() !== user.name || image.trim() !== (user.image ?? "");

  const previewImage = image.trim();
  const showPreviewImage = previewImage !== "" && failedUrl !== previewImage;

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

  const passRows = [
    {
      icon: Mail,
      label: "Email",
      value: user.email,
      tone: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: CalendarDays,
      label: "Member since",
      value: memberSince,
      tone: "bg-orange-100 text-orange-500",
    },
    {
      icon: BadgeCheck,
      label: "Email status",
      value: user.emailVerified ? "Verified" : "Not verified",
      tone: "bg-amber-100 text-amber-600",
    },
  ];

  const shortcuts = [
    {
      href: "/my-booking",
      icon: Ticket,
      title: "My bookings",
      hint: "See your trips",
      tone: "from-cyan-400 to-sky-500",
    },
    {
      href: "/addPackage",
      icon: PlusCircle,
      title: "Add destination",
      hint: "Share a new place",
      tone: "from-orange-500 to-amber-400",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ---------- Cover + identity ---------- */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 shadow-2xl shadow-cyan-300/50">
          {/* Decoration */}
          <span className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -right-10 -top-14 size-56 rounded-full bg-linear-to-br from-amber-200 to-orange-300 opacity-90" />
          <span className="pointer-events-none absolute left-1/2 top-8 size-2.5 rounded-full bg-amber-200" />
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full"
            viewBox="0 0 800 160"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 130 C200 160 260 40 420 70 S650 20 760 40"
              stroke="#fff"
              strokeOpacity=".8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 10"
            />
          </svg>
          <Plane className="pointer-events-none absolute right-24 top-6 hidden size-9 -rotate-12 text-white/90 md:block" />

          <div className="relative flex flex-col gap-5 px-6 pb-7 pt-28 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pt-32">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="size-28 shrink-0 rounded-full border-4 border-white bg-white object-cover shadow-xl shadow-sky-900/30 sm:size-32"
                />
              ) : (
                <span className="flex size-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-linear-to-br from-orange-400 to-amber-400 text-4xl font-extrabold text-white shadow-xl shadow-sky-900/30 sm:size-32">
                  {getInitials(user.name)}
                </span>
              )}

              <div className="min-w-0 pb-1 text-white">
                <h1 className="truncate text-2xl font-extrabold tracking-tight sm:text-4xl">
                  {user.name}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 truncate text-sm font-semibold text-white/90">
                  <Mail className="size-4 shrink-0" />
                  {user.email}
                </p>
              </div>
            </div>

            {user.emailVerified ? (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-emerald-600 shadow-lg shadow-sky-900/20">
                <BadgeCheck className="size-4" />
                Verified
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-amber-600 shadow-lg shadow-sky-900/20">
                <CircleAlert className="size-4" />
                Email not verified
              </span>
            )}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* ---------- Left: traveler pass ---------- */}
          <aside className="h-fit overflow-hidden rounded-3xl bg-white shadow-xl shadow-cyan-100/70 ring-1 ring-cyan-100">
            <div className="relative flex items-center justify-between overflow-hidden bg-linear-to-r from-cyan-500 to-sky-500 px-6 py-4 text-white">
              <span className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-white/15" />
              <div className="relative">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/80">
                  Traveler pass
                </p>
                <p className="text-lg font-extrabold tracking-tight">
                  Wanderlust<span className="text-amber-200">.</span>
                </p>
              </div>
              <Compass className="relative size-8 text-white/90" />
            </div>

            <div className="relative p-6">
              {/* Stamp */}
              <span
                className={`pointer-events-none absolute right-4 top-4 flex size-20 rotate-12 flex-col items-center justify-center rounded-full border-4 text-[10px] font-extrabold uppercase tracking-wider ${
                  user.emailVerified
                    ? "border-double border-emerald-400/70 text-emerald-500"
                    : "border-dashed border-amber-400/70 text-amber-500"
                }`}
              >
                {user.emailVerified ? (
                  <BadgeCheck className="size-6" />
                ) : (
                  <CircleAlert className="size-6" />
                )}
                {user.emailVerified ? "Verified" : "Pending"}
              </span>

              <dl className="space-y-5">
                {passRows.map(({ icon: Icon, label, value, tone }) => (
                  <div key={label} className="flex items-center gap-3 pr-16">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone}`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {label}
                      </dt>
                      <dd className="truncate text-sm font-extrabold text-slate-900">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          {/* ---------- Right: edit + shortcuts + sign out ---------- */}
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-xl shadow-cyan-100/70 ring-1 ring-cyan-100 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-cyan-300/60">
                  <User className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Personal information
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Update how your name and photo appear across Wanderlust.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSave} className="mt-7 space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className={labelClass}>
                    Full name
                  </Label>
                  <div className="relative">
                    <IconTile icon={User} />
                    <Input
                      id="name"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className={labelClass}>
                    Email
                  </Label>
                  <div className="relative">
                    <IconTile icon={Mail} />
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      readOnly
                      className={`${inputClass} bg-slate-100 text-slate-500 hover:bg-slate-100`}
                    />
                  </div>
                  <p className="text-xs font-medium text-slate-400">
                    Your email is used to sign in and cannot be changed here.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="image" className={labelClass}>
                    Photo URL
                  </Label>
                  <div className="flex items-center gap-3">
                    {/* Live preview of the new photo */}
                    {showPreviewImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewImage}
                        alt="Photo preview"
                        referrerPolicy="no-referrer"
                        onError={() => setFailedUrl(previewImage)}
                        className="size-12 shrink-0 rounded-full object-cover ring-2 ring-cyan-300 ring-offset-2"
                      />
                    ) : (
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-amber-400 text-sm font-extrabold text-white ring-2 ring-orange-200 ring-offset-2">
                        {getInitials(name)}
                      </span>
                    )}

                    <div className="relative flex-1">
                      <IconTile icon={ImageIcon} />
                      <Input
                        id="image"
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t-2 border-dashed border-cyan-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={!isDirty || isSaving}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-rose-50 hover:text-rose-600 hover:ring-rose-200 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <RotateCcw className="size-4" />
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty || isSaving}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    {isSaving ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Save className="size-4" />
                    )}
                    {isSaving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </section>

            {/* Shortcuts */}
            <section className="grid gap-4 sm:grid-cols-2">
              {shortcuts.map(({ href, icon: Icon, title, hint, tone }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 rounded-3xl bg-white p-5 shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-200/70"
                >
                  <span
                    className={`flex size-12 shrink-0 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-md transition-transform group-hover:rotate-3 group-hover:scale-110 ${tone}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-slate-900">{title}</p>
                    <p className="text-xs font-semibold text-slate-500">
                      {hint}
                    </p>
                  </div>
                  <ArrowRight className="size-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-cyan-500" />
                </Link>
              ))}
            </section>

            {/* Sign out */}
            <section className="flex flex-col gap-4 rounded-3xl bg-linear-to-br from-rose-50 to-orange-50 p-6 ring-1 ring-rose-100 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Sign out
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  End your session on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-rose-600 shadow-sm ring-1 ring-rose-200 transition-all hover:bg-rose-500 hover:text-white hover:ring-rose-500 disabled:pointer-events-none disabled:opacity-60"
              >
                {isSigningOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}
                {isSigningOut ? "Logging out..." : "Log out"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
