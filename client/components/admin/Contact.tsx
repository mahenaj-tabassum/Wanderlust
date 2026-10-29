"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleCheck,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Send,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { toast } from "react-toastify";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

// TODO: replace these placeholders with your real contact details
const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "wanderlust.agency@gmail.com",
    hint: "Send us a note any time",
    href: "mailto:wanderlust.agency@gmail.com",
    tone: "from-cyan-400 to-sky-500",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (555) 123-4567",
    hint: "Mon to Fri, 9am to 6pm",
    href: "tel:+15551234567",
    tone: "from-orange-500 to-amber-400",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "123 Travel Street, Your City",
    hint: "Come say hello",
    href: undefined,
    tone: "from-amber-400 to-yellow-400",
  },
  {
    icon: Clock,
    label: "Opening hours",
    value: "Mon to Fri · 9:00 AM to 6:00 PM",
    hint: "Closed on public holidays",
    href: undefined,
    tone: "from-rose-400 to-pink-500",
  },
];

const topics = [
  { label: "General", emoji: "💬" },
  { label: "Booking help", emoji: "🎫" },
  { label: "Partnership", emoji: "🤝" },
  { label: "Feedback", emoji: "⭐" },
];

const socials = [
  { icon: BsFacebook, label: "Facebook", hover: "hover:bg-sky-500" },
  { icon: FaInstagram, label: "Instagram", hover: "hover:bg-pink-500" },
  { icon: IoLogoTwitter, label: "Twitter", hover: "hover:bg-cyan-500" },
  { icon: FaYoutube, label: "YouTube", hover: "hover:bg-red-500" },
];

const faqs = [
  {
    q: "How do I cancel a booking?",
    a: "Open My Booking, find the trip under Upcoming and press Cancel booking. Trips that have already departed can't be cancelled.",
  },
  {
    q: "Where can I see my trips?",
    a: "Log in and open My Booking. Your upcoming and past trips are listed there, each with a booking reference.",
  },
  {
    q: "Can I add my own destination?",
    a: "Yes. Log in, open Add Destination, fill in the details and watch the live preview as you type.",
  },
];

// Shared field styles (same as the other forms)
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

const Contact = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // null means "the user hasn't typed yet", so we can prefill from the session
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [topic, setTopic] = useState(topics[0].label);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const nameValue = name ?? user?.name ?? "";
  const emailValue = email ?? user?.email ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameValue.trim(),
            email: emailValue.trim(),
            topic,
            message: message.trim(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSent(true);
      setMessage("");
      toast.success("Message sent!");
    } catch (error) {
      console.error("Contact error:", error);
      toast.error("Could not send your message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setTopic(topics[0].label);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 pb-20">
      {/* ---------- Header banner ---------- */}
      <section className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 shadow-2xl shadow-cyan-300/50">
          <span className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -right-10 -top-16 size-60 rounded-full bg-linear-to-br from-amber-200 to-orange-300 opacity-90" />
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
          <Plane className="pointer-events-none absolute right-24 top-8 hidden size-10 -rotate-12 text-white/90 md:block" />

          <div className="relative px-6 pb-24 pt-14 text-center sm:px-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white ring-1 ring-white/40 backdrop-blur">
              <Sparkles className="size-3.5" />
              {"We'd love to hear from you"}
            </span>

            <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Let&apos;s plan your next{" "}
              <span className="relative inline-block text-amber-200">
                adventure
                <svg
                  className="absolute -bottom-2 left-0 h-2.5 w-full text-white"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8C30 2 50 12 80 6S130 2 160 8s30 0 38-4"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              together
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-6 text-white/90 sm:text-base">
              Questions about a trip, a booking or a partnership? Send us a
              message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Info + form ---------- */}
      <div className="relative mx-auto -mt-12 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        {/* Left column */}
        <div className="space-y-4">
          {contactInfo.map(({ icon: Icon, label, value, hint, href, tone }) => {
            const body = (
              <>
                <span
                  className={`flex size-12 shrink-0 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-md transition-transform group-hover:rotate-3 group-hover:scale-110 ${tone}`}
                >
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                  </p>
                  <p className="truncate font-extrabold text-slate-900">
                    {value}
                  </p>
                  <p className="text-xs font-medium text-slate-500">{hint}</p>
                </div>
              </>
            );

            const cardClass =
              "group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-200/70";

            return href ? (
              <a key={label} href={href} className={cardClass}>
                {body}
              </a>
            ) : (
              <div key={label} className={cardClass}>
                {body}
              </div>
            );
          })}

          {/* Illustrated "map" card */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100">
            <svg
              viewBox="0 0 400 200"
              className="h-44 w-full"
              role="img"
              aria-label="Illustrated map with a pin"
            >
              <rect width="400" height="200" fill="#e0f7fa" />
              <path
                d="M0 150 C60 120 90 175 160 160 S260 120 330 150 S390 140 400 135 V200 H0Z"
                fill="#a5e8f0"
              />
              <g
                stroke="#fff"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              >
                <path d="M-10 60 L120 40 L230 70 L410 30" />
                <path d="M110 -10 L130 110 L150 210" />
                <path d="M290 -10 L270 90 L300 210" />
              </g>
              <g fill="#fde68a" opacity=".9">
                <rect x="140" y="62" width="40" height="28" rx="6" />
                <rect x="310" y="82" width="46" height="30" rx="6" />
                <rect x="40" y="82" width="38" height="26" rx="6" />
              </g>
              <g fill="#86efac" opacity=".9">
                <circle cx="205" cy="105" r="16" />
                <circle cx="350" cy="40" r="12" />
              </g>
              <path
                d="M30 175 C100 140 150 175 205 120 S300 120 252 78"
                fill="none"
                stroke="#0e7490"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="1 9"
              />
              <ellipse
                cx="252"
                cy="84"
                rx="26"
                ry="9"
                fill="#ff6b4a"
                opacity=".25"
              />
              <ellipse
                cx="252"
                cy="84"
                rx="13"
                ry="4.5"
                fill="#ff6b4a"
                opacity=".35"
              />
              <g transform="translate(252 82)">
                <path d="M-12 -30 L0 0 L12 -30Z" fill="#ff6b4a" />
                <circle
                  cx="0"
                  cy="-38"
                  r="18"
                  fill="#ff6b4a"
                  stroke="#fff"
                  strokeWidth="3"
                />
                <circle cx="0" cy="-38" r="7" fill="#fff" />
              </g>
            </svg>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-orange-500" />
                <span className="text-sm font-extrabold text-slate-900">
                  Find us here
                </span>
              </div>

              <div className="flex gap-2">
                {socials.map(({ icon: Icon, label, hover }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className={`flex size-9 items-center justify-center rounded-full bg-cyan-50 text-slate-500 ring-1 ring-cyan-100 transition-all hover:-translate-y-0.5 hover:text-white hover:ring-transparent ${hover}`}
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: form */}
        <section className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-cyan-200/50 ring-1 ring-cyan-100 sm:p-8">
          <span className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-orange-100/70 blur-2xl" />

          {sent ? (
            <div className="relative flex min-h-96 flex-col items-center justify-center text-center">
              <span className="relative mb-6 flex size-24 rotate-3 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-xl shadow-cyan-300/60">
                <Send className="size-10" />
                <span className="absolute -bottom-3 -right-3 flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-4 ring-white">
                  <CircleCheck className="size-5" />
                </span>
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Message sent! ✈️
              </h2>
              <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500">
                Thanks for reaching out. We&apos;ve received your message and
                will get back to you soon.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-cyan-700 shadow-sm ring-1 ring-cyan-200 transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex size-12 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-md shadow-orange-300/60">
                  <MessageCircle className="size-6" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Send us a message
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Fill in the form and we&apos;ll be in touch.
                  </p>
                </div>
              </div>

              {/* Topic chips */}
              <div className="space-y-2">
                <p className={labelClass}>What is this about?</p>
                <div className="flex flex-wrap gap-2">
                  {topics.map(({ label, emoji }) => {
                    const active = topic === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setTopic(label)}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                          active
                            ? "-translate-y-0.5 bg-linear-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/60"
                            : "bg-white text-slate-600 ring-1 ring-cyan-100 hover:-translate-y-0.5 hover:bg-cyan-50 hover:text-cyan-700"
                        }`}
                      >
                        <span aria-hidden="true">{emoji}</span>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name" className={labelClass}>
                    Your name
                  </Label>
                  <div className="relative">
                    <IconTile icon={User} />
                    <Input
                      id="contact-name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      value={nameValue}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className={labelClass}>
                    Email
                  </Label>
                  <div className="relative">
                    <IconTile icon={Mail} />
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={emailValue}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className={labelClass}>
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  required
                  minLength={10}
                  rows={6}
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-36 resize-none rounded-2xl border-0 bg-cyan-50/70 p-4 text-sm font-medium leading-6 text-slate-800 transition-colors placeholder:text-slate-400 hover:bg-cyan-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-400"
                />
                <p
                  className={`text-right text-xs font-bold ${
                    message.trim().length >= 10
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }`}
                >
                  {message.trim().length} / 10 min
                </p>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-amber-400 text-base font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105 disabled:pointer-events-none disabled:opacity-70"
              >
                {isSending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Send className="size-5" />
                )}
                {isSending ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </section>
      </div>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-600">
            <Sparkles className="size-3.5" />
            Quick answers
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Frequently asked{" "}
            <span className="bg-linear-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl bg-white shadow-md shadow-cyan-100/70 ring-1 ring-cyan-100 transition-shadow open:shadow-lg open:shadow-cyan-200/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-extrabold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 transition-all group-open:rotate-180 group-open:bg-orange-100 group-open:text-orange-500">
                  <ChevronDown className="size-4" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm font-medium leading-6 text-slate-500">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
