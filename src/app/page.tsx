import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import EventRow from "@/components/EventRow";
import Reveal from "@/components/Reveal";
import ConnectCards from "@/components/ConnectCards";
import HeroSection from "@/components/motion/HeroSection";
import HeroHeadline from "@/components/motion/HeroHeadline";
import HeroShaderClient from "@/components/motion/HeroShaderClient";
import PhotoGrid from "@/components/motion/PhotoGrid";

// TODO: replace with real GroupMe invite URL
const GROUPME_URL = "https://groupme.com/join_group/107504026/haDaHAWT";
const INSTAGRAM_URL = "https://instagram.com/streetlightscommunity";

const HERO_LINES = [
  "Everyday Fellowship.",
  "Everyday Outreach.",
  "Everyday Encouragement.",
] as const;

// TODO: replace placeholder events with real schedule
const EVENTS = [
  { day: "04", month: "MAY", title: "Grill Sesh", location: "Veterans Park" },
  { day: "11", month: "MAY", title: "Sports Night", location: "Veterans Park" },
  { day: "18", month: "MAY", title: "Bible Study", location: "Streetlights House" },
  { day: "25", month: "MAY", title: "Worship Night", location: "Downtown Wintergarden" },
  { day: "30", month: "MAY", title: "Spikeball Tourney", location: "Veterans Park" },
];

// 8 community photos, uniform square grid. Alternates candid / collage for rhythm.
const PHOTOS = [
  { src: "/photos/bonfire-night.png", alt: "Beach bonfire at night with the community" },
  { src: "/photos/beach-trip.png", alt: "Beach trip — surfboards and spikeball" },
  { src: "/photos/bible-study-house.png", alt: "Bible study at the Streetlights House" },
  { src: "/photos/ucf-night.png", alt: "UCF night collage" },
  { src: "/photos/bible-study-1.png", alt: "Open Bibles during study" },
  { src: "/photos/worship-guitar.png", alt: "Worship night with guitar" },
  { src: "/photos/beach-pair-1.png", alt: "Two students at the beach" },
  { src: "/photos/sunset-collage.png", alt: "Summer sunset hangout" },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* ============================================================
            HERO — exactly one viewport, vertically centered.
            HEADLINE SCALE RULE (see SectionHeading.tsx for full notes):
            sized to fit "EVERYDAY ENCOURAGEMENT." (longest line) inside
            the container at every width from 320px to 1920px+.
            ============================================================ */}
        <HeroSection className="relative min-h-screen w-full overflow-hidden flex items-center pt-24 sm:pt-28 pb-20 sm:pb-24">
          <Image
            src="/photos/hero-speaking.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Grayscale noise shader — film-grain atmosphere over the photo.
              Lazy-loaded with SSR off; renders nothing if reduced-motion is on. */}
          <HeroShaderClient />

          {/* Dark wash so headline always reads */}
          <div
            aria-hidden
            className="absolute inset-0 bg-night/60"
            style={{ zIndex: 2 }}
          />
          {/* Bottom-up gradient for headline legibility */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/20"
            style={{ zIndex: 2 }}
          />

          <div
            data-hero-content
            className="relative z-10 w-full mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12"
          >
            {/* Location / time label — sits above the headline, in flow */}
            <p className="text-xs sm:text-sm uppercase tracking-widest text-bone/60 mb-5 sm:mb-7">
              Orlando, FL · Mondays at 6:45pm
            </p>

            <HeroHeadline lines={HERO_LINES} />

            <p className="mt-6 sm:mt-8 text-xs sm:text-sm uppercase tracking-widest text-smoke">
              — Acts 2:42–47
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button href="#whats-on" variant="filled">
                Pull Up Monday
              </Button>
              <Button
                href={GROUPME_URL}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the GroupMe
              </Button>
            </div>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-smoke z-10">
            <span className="text-[10px] uppercase tracking-widest">
              Scroll
            </span>
            <span className="block h-10 w-px bg-bone/30" />
          </div>
        </HeroSection>

        {/* ============================================================
            WHO WE ARE
            ============================================================ */}
        <section
          id="about"
          className="relative border-t border-bone/10 py-24 sm:py-36 lg:py-48"
        >
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
              <Reveal className="col-span-12 lg:col-span-5">
                <SectionHeading kicker="Who we are">
                  A community,
                  <br />
                  not a service.
                </SectionHeading>
              </Reveal>

              <Reveal
                delay={120}
                className="col-span-12 lg:col-span-6 lg:col-start-7 self-end"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl leading-[1.25] tracking-tight text-bone/90 font-light">
                  StreetLights is a college community in Orlando — students
                  showing up for each other every day of the week.
                </p>
                <p className="mt-8 text-lg sm:text-xl leading-[1.5] text-bone/70">
                  Mondays we gather. The rest of the week we eat together,
                  hoop together, study scripture together, and chase down the
                  city. No stage personalities. No vibes economy. Just people.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHAT'S ON — the schedule
            ============================================================ */}
        <section
          id="whats-on"
          className="relative border-t border-bone/10 py-24 sm:py-36 lg:py-48"
        >
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <SectionHeading kicker="What's on">This Month</SectionHeading>
            </Reveal>

            <Reveal delay={120} className="mt-16 sm:mt-24">
              {/* Month / Year header — mirrors their IG schedule graphic */}
              <div className="flex items-center gap-6 sm:gap-10 pb-6 sm:pb-8 border-b border-bone/30">
                <span className="font-display text-3xl sm:text-5xl uppercase tracking-tight">
                  May
                </span>
                <span className="flex-1 h-px bg-bone/30" />
                <span className="font-display text-3xl sm:text-5xl uppercase tracking-tight">
                  2026
                </span>
              </div>

              <div>
                {EVENTS.map((e, i) => (
                  <EventRow
                    key={`${e.day}-${e.title}`}
                    day={e.day}
                    month={e.month}
                    title={e.title}
                    location={e.location}
                    index={i}
                  />
                ))}
                {/* bottom divider */}
                <div className="border-t border-bone/15" />
              </div>

              <p className="mt-10 text-sm uppercase tracking-[0.22em] text-smoke">
                Monday events start at 6:45 — Veterans Park unless noted.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
            PHOTO GRID — uniform square grid (2 / 3 / 4 cols)
            ============================================================ */}
        <section className="relative pt-20 sm:pt-28 pb-24 sm:pb-36">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal className="mb-10 sm:mb-14 flex items-end justify-between gap-6">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                The Community
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm uppercase tracking-[0.22em] text-bone/80 hover:text-bone transition-colors whitespace-nowrap"
              >
                @streetlightscommunity ↗
              </a>
            </Reveal>

            <PhotoGrid photos={PHOTOS} />
          </div>
        </section>

        {/* ============================================================
            CONNECT — three plug-in points
            ============================================================ */}
        <section
          id="connect"
          className="relative border-t border-bone/10 py-24 sm:py-36 lg:py-48"
        >
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <SectionHeading kicker="Plug in">Connect</SectionHeading>
            </Reveal>

            <ConnectCards />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
