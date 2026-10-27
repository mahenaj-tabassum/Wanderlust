import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        <Image
          src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=80"
          alt="Northern lights over mountains"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center text-white sm:py-24">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-3 max-w-lg text-white/80">
            Join thousands of travelers and plan your dream trip in minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full px-8">
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
