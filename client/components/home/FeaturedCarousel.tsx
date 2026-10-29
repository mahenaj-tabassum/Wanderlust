"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GAP = 24; // keep in sync with gap-6

export default function FeaturedCarousel({
  children,
}: {
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [thumb, setThumb] = useState({ width: 100, left: 0 });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 8);
    setThumb({
      width: (clientWidth / scrollWidth) * 100,
      left: (scrollLeft / scrollWidth) * 100,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") scrollByCard(1);
    if (e.key === "ArrowLeft") scrollByCard(-1);
  };

  const arrow =
    "absolute top-[42%] z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-cyan-700 shadow-xl shadow-cyan-200/70 ring-1 ring-cyan-100 transition-all hover:scale-110 hover:bg-cyan-500 hover:text-white disabled:pointer-events-none disabled:scale-75 disabled:opacity-0 md:flex";

  return (
    <div className="relative mt-8">
      <button
        type="button"
        aria-label="Previous destinations"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        className={`${arrow} -left-3 lg:-left-6`}
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Next destinations"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        className={`${arrow} -right-3 lg:-right-6`}
      >
        <ChevronRight className="size-6" />
      </button>

      <div
        ref={trackRef}
        onScroll={update}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured destinations"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-8 pt-3 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-cyan-400 [&::-webkit-scrollbar]:hidden"
      >
        {Children.toArray(children).map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            className="flex shrink-0 basis-[84%] snap-start sm:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-48px)/3)]"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Scroll progress */}
      {thumb.width < 99 && (
        <div className="mx-auto h-1.5 w-40 overflow-hidden rounded-full bg-cyan-100">
          <div
            className="relative h-full rounded-full bg-linear-to-r from-cyan-400 to-orange-400 transition-[margin,width] duration-150"
            style={{ width: `${thumb.width}%`, marginLeft: `${thumb.left}%` }}
          />
        </div>
      )}
    </div>
  );
}
