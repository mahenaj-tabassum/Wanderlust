import Link from "next/link";
import { Compass } from "lucide-react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const columns = [
  { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
  {
    title: "Explore",
    links: ["Destinations", "Tour Packages", "Guides", "Offers"],
  },
  { title: "Support", links: ["Help Center", "Terms", "Privacy", "Contact"] },
];

const socials = [
  { icon: BsFacebook, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: IoLogoTwitter, label: "Twitter" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Compass className="size-5" />
              </span>
              Wanderlust
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              Your passport to unforgettable journeys. Discover, plan and book
              trips with people who love travel as much as you do.
            </p>
            <form className="mt-6 flex max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="transition-colors hover:text-white"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socials.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="#"
                aria-label={label}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
