"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    title: "Welcome back",
    subtitle: "Sign in to pick up your trip planning.",
    submit: "Sign in",
    submitting: "Signing in...",
    switchText: "New to Wanderlust?",
    switchLink: "Create an account",
    switchHref: "/sign-up",
  },
  up: {
    title: "Create your account",
    subtitle: "Save destinations and plan your next trip.",
    submit: "Create account",
    submitting: "Creating account...",
    switchText: "Already have an account?",
    switchLink: "Sign in",
    switchHref: "/sign-in",
  },
} as const;

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

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      {/* Soft emerald glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <Link
          href="/"
          className="mx-auto mb-6 flex w-fit items-center gap-2 text-slate-900"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <MapPin className="size-5" />
          </span>
          <span className="text-xl font-semibold tracking-tight">
            Wanderlust
          </span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {text.title}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">{text.subtitle}</p>
          </div>

          {/* OAuth */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isBusy}
              onClick={() => handleOAuth("google")}
              className="h-11 cursor-pointer gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              {pending === "google" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isBusy}
              onClick={() => handleOAuth("github")}
              className="h-11 cursor-pointer gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              {pending === "github" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <GitHubIcon />
              )}
              GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-500">or use your email</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Email + password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Full name
                </Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-11 border-slate-200 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 border-slate-200 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </Label>
              <div className="relative">
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
                  className="h-11 border-slate-200 pr-11 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isBusy}
              className="h-11 w-full cursor-pointer rounded-xl bg-emerald-600 text-base font-semibold text-white hover:bg-emerald-700"
            >
              {pending === "email" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {text.submitting}
                </>
              ) : (
                text.submit
              )}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          {text.switchText}{" "}
          <Link
            href={text.switchHref}
            className="font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            {text.switchLink}
          </Link>
        </p>
      </div>
    </main>
  );
};

export default AuthStyle;
