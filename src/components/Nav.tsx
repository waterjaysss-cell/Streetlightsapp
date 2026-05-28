"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Shop", href: "/shop" },
  { label: "Give", href: "/give" },
  { label: "Connect", href: "/connect" },
];

function DesktopNavLink({ label, href }: { label: string; href: string }) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      href={href}
      className="text-sm uppercase tracking-[0.18em] text-bone/80 hover:text-bone transition-colors will-change-transform"
    >
      {label}
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const logoRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("menu-open");
    else root.classList.remove("menu-open");
    return () => root.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
          scrolled
            ? "bg-night/70 backdrop-blur-md border-b border-bone/10"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12 h-16 sm:h-20">
          <Link
            ref={logoRef}
            href="/"
            aria-label="StreetLights — back to top"
            className="block will-change-transform"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/brand/streetlights-logo.jpg"
              alt="StreetLights"
              width={44}
              height={44}
              priority
              // The brand asset is a JPG with a baked-in dark background.
              // `screen` blends pure black to fully transparent, so only the
              // white mark shows over the (transparent or night-tinted) nav.
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain mix-blend-screen"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((l) => (
              <DesktopNavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 -mr-2 flex items-center justify-center"
          >
            <span
              className={[
                "absolute block h-px w-7 bg-bone transition-transform duration-300",
                open ? "translate-y-0 rotate-45" : "-translate-y-2",
              ].join(" ")}
            />
            <span
              className={[
                "absolute block h-px w-7 bg-bone transition-opacity duration-300",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute block h-px w-7 bg-bone transition-transform duration-300",
                open ? "translate-y-0 -rotate-45" : "translate-y-2",
              ].join(" ")}
            />
          </button>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-40 bg-night md:hidden transition-[opacity,visibility] duration-300",
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex h-full flex-col justify-center gap-6 px-6">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-5xl uppercase tracking-tight leading-none text-bone"
              style={{
                transition: "opacity 400ms, transform 400ms",
                transitionDelay: open ? `${100 + i * 50}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
