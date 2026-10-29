import Link from "next/link";
import { Lock, Ticket } from "lucide-react";

const LoginPrompt = () => (
  <main className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 px-4 py-16">
    <section className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-2xl shadow-cyan-300/50 ring-1 ring-cyan-100 sm:p-10">
      <span className="pointer-events-none absolute -left-12 -top-12 size-44 rounded-full bg-cyan-100/80 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-12 -right-12 size-44 rounded-full bg-orange-100/90 blur-2xl" />

      <div className="relative mx-auto mb-6 flex size-20 w-fit items-center justify-center">
        <span className="flex size-20 rotate-3 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-xl shadow-cyan-300/60">
          <Ticket className="size-9" />
        </span>
        <span className="absolute -bottom-2 -right-3 flex size-9 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-lg ring-4 ring-white">
          <Lock className="size-4" />
        </span>
      </div>

      <h1 className="relative text-2xl font-extrabold tracking-tight text-slate-900">
        Log in to see your bookings
      </h1>
      <p className="relative mt-2 text-sm font-medium text-slate-500">
        Your trips are saved to your account.
      </p>

      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          Log in
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-cyan-700 shadow-sm ring-1 ring-cyan-200 transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
        >
          Create account
        </Link>
      </div>
    </section>
  </main>
);

export default LoginPrompt;
