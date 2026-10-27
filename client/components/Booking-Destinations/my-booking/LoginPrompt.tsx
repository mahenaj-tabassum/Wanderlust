import Link from "next/link";

const LoginPrompt = () => (
  <section className="mx-auto max-w-3xl px-4 py-20 text-center">
    <h1 className="text-2xl font-bold text-slate-900">
      Log in to see your bookings
    </h1>
    <p className="mt-2 text-sm text-slate-500">
      Your trips are saved to your account.
    </p>
    <Link
      href="/login"
      className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
    >
      Log in
    </Link>
  </section>
);

export default LoginPrompt;
