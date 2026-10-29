"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CircleAlert,
  Compass,
  Eye,
  EyeOff,
  Heart,
  Loader2,
  Lock,
  Mail,
  Plane,
  ShieldCheck,
  Ticket,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Adjust this path to wherever you created your Better Auth client:
// export const authClient = createAuthClient({ baseURL: ... })
import { authClient } from "@/lib/auth-client";

type Mode = "in" | "up";
type Provider = "google" | "github";

interface AuthStyleProps {
  mode: Mode;
}

// Everything that changes between the two modes lives here.
const content = {
  in: {
    emoji: "👋",
    title: "Welcome back",
    subtitle: "Sign in to pick up your trip planning.",
    submit: "Sign in",
    submitting: "Signing in...",
    switchText: "New to Wanderlust?",
    switchLink: "Create an account",
    switchHref: "/sign-up",
    panelTag: "Good to see you again",
    panelTitle: "Your next adventure is waiting.",
    panelText: "Sign in to see your bookings and keep exploring new places.",
  },
  up: {
    emoji: "✈️",
    title: "Create your account",
    subtitle: "Save destinations and plan your next trip.",
    submit: "Create account",
    submitting: "Creating account...",
    switchText: "Already have an account?",
    switchLink: "Sign in",
    switchHref: "/sign-in",
    panelTag: "Join Wanderlust",
    panelTitle: "Start planning your dream trip.",
    panelText:
      "Create a free account and turn your travel wishlist into plans.",
  },
} as const;

const perks: { icon: LucideIcon; label: string }[] = [
  { icon: Heart, label: "Save places you love" },
  { icon: Zap, label: "Book trips in minutes" },
  { icon: Ticket, label: "Manage bookings in one place" },
];

const strengthLabels = ["Too short", "Weak", "Okay", "Good", "Strong"];
const strengthColors = [
  "bg-rose-400",
  "bg-rose-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-emerald-500",
];

// Shared field styles (matches the add-package form)
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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"
      />
    </svg>
  );
}

const AuthStyle = ({ mode }: AuthStyleProps) => {
  const router = useRouter();
  const text = content[mode];
  const isSignUp = mode === "up";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // Which button is busy: the email form or one OAuth provider.
  const [pending, setPending] = useState<"email" | Provider | null>(null);

  const isBusy = pending !== null;

  // Simple password strength (sign up only): length, capital, number, symbol
  const strength = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((rule) =>
    rule.test(password),
  ).length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setPending("email");

    try {
      const { error } = isSignUp
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (error) {
        setError(error.message ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setPending(null);
    }
  };

  const handleOAuth = async (provider: Provider) => {
    setError("");
    setPending(provider);

    try {
      // Redirects to the provider, then back to callbackURL.
      await authClient.signIn.social({ provider, callbackURL: "/" });
    } catch {
      setError("Could not start sign in. Please try again.");
      setPending(null);
    }
  };

  const oauthButton =
    "flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white text-sm font-bold text-slate-700 shadow-sm ring-1 ring-cyan-100 transition-all hover:-translate-y-0.5 hover:bg-cyan-50 hover:ring-cyan-300 disabled:pointer-events-none disabled:opacity-60";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-cyan-50 via-white to-orange-50 px-4 py-10">
      {/* Background blobs */}
      <span className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-cyan-200/50 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-orange-200/60 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-cyan-300/50 ring-1 ring-cyan-100 lg:grid-cols-[1fr_1.05fr]">
        {/* ---------- Left: brand panel (desktop) ---------- */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 p-10 text-white lg:flex">
          <span className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -right-12 top-16 size-48 rounded-full bg-linear-to-br from-amber-200 to-orange-300 opacity-90" />
          <span className="pointer-events-none absolute left-1/2 top-10 size-2.5 rounded-full bg-amber-200" />
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full"
            viewBox="0 0 400 180"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 120C80 160 140 80 220 110S340 150 400 100V180H0Z"
              fill="#fff"
              fillOpacity=".1"
            />
            <path
              d="M20 150 C90 170 120 70 210 95 S320 60 372 38"
              stroke="#fff"
              strokeOpacity=".85"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 10"
            />
          </svg>
          <Plane className="pointer-events-none absolute bottom-28 right-8 size-10 -rotate-12 text-white" />

          <Link
            href="/"
            className="group relative flex w-fit items-center gap-2.5 text-xl font-extrabold tracking-tight"
          >
            <span className="flex size-10 rotate-3 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
              <Compass className="size-5" />
            </span>
            <span>
              Wanderlust<span className="text-amber-200">.</span>
            </span>
          </Link>

          <div className="relative">
            <span className="inline-flex rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider ring-1 ring-white/40 backdrop-blur">
              {text.panelTag}
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight">
              {text.panelTitle}
            </h2>
            <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-white/90">
              {text.panelText}
            </p>

            <ul className="mt-7 space-y-3">
              {perks.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm font-bold"
                >
                  <span className="flex size-9 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                    <Icon className="size-4.5" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative flex items-center gap-2 text-xs font-bold text-white/90">
            <ShieldCheck className="size-4" />
            Your details are kept safe and secure.
          </p>
        </aside>

        {/* ---------- Right: form ---------- */}
        <section className="p-6 sm:p-10">
          {/* Brand (mobile only) */}
          <Link
            href="/"
            className="mx-auto mb-6 flex w-fit items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 lg:hidden"
          >
            <span className="flex size-10 rotate-3 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-cyan-300/60">
              <Compass className="size-5" />
            </span>
            <span>
              Wanderlust<span className="text-orange-500">.</span>
            </span>
          </Link>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {text.title} <span aria-hidden="true">{text.emoji}</span>
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {text.subtitle}
            </p>
          </div>

          {/* OAuth */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleOAuth("google")}
              className={oauthButton}
            >
              {pending === "google" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Google
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleOAuth("github")}
              className={oauthButton}
            >
              {pending === "github" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <GitHubIcon />
              )}
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-0.5 flex-1 rounded-full bg-cyan-100" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              or use your email
            </span>
            <div className="h-0.5 flex-1 rounded-full bg-cyan-100" />
          </div>

          {/* Email + password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1.5">
                <Label htmlFor="name" className={labelClass}>
                  Full name
                </Label>
                <div className="relative">
                  <IconTile icon={User} />
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className={labelClass}>
                Email
              </Label>
              <div className="relative">
                <IconTile icon={Mail} />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className={labelClass}>
                Password
              </Label>
              <div className="relative">
                <IconTile icon={Lock} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  minLength={isSignUp ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    isSignUp ? "At least 8 characters" : "Your password"
                  }
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white hover:text-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {/* Strength meter (sign up) */}
              {isSignUp && password && (
                <div className="pt-1">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          strength >= step
                            ? strengthColors[strength]
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Password strength: {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200"
              >
                <CircleAlert className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isBusy}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-amber-400 text-base font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105 disabled:pointer-events-none disabled:opacity-70"
            >
              {pending === "email" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {text.submitting}
                </>
              ) : (
                text.submit
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-slate-500">
            {text.switchText}{" "}
            <Link
              href={text.switchHref}
              className="font-extrabold text-cyan-700 underline-offset-4 hover:text-orange-500 hover:underline"
            >
              {text.switchLink}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default AuthStyle;
