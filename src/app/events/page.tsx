// TODO: copy review — placeholder schedule, swap with real upcoming events when ready

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import EventRow from "@/components/EventRow";
import Reveal from "@/components/Reveal";
import { RECAP_PHOTOS } from "@/lib/recap-photos";

export const metadata = {
  title: "Events · StreetLights Community",
  description: "Upcoming events and recaps from StreetLights Community.",
};

const UPCOMING_MONTH = { month: "JUNE", year: "2026" };

// Real June 2026 schedule — all Mondays, doors at 6:45pm.
const UPCOMING = [
  { day: "01", month: "JUNE", title: "Sports Hangout", location: "Veterans Park" },
  { day: "08", month: "JUNE", title: "Grill Sesh", location: "Veterans Park" },
  { day: "15", month: "JUNE", title: "Evangelism Night", location: "Downtown Orlando" },
  { day: "22", month: "JUNE", title: "Putt for a Purpose", location: "Hamlin Popstroke" },
  { day: "29", month: "JUNE", title: "Worship Night", location: "Streetlights House" },
];

// Recurring activities (not one-off dated events) — location stands in for date.
// `preview` is optional — when set, the card shows that image full-bleed;
// when omitted, the card falls back to the gray-ash placeholder grid.
type RecapCard = {
  slug: string;
  title: string;
  location: string;
  summary: string;
  preview?: string;
  previewAlt?: string;
};

const RECAPS: RecapCard[] = [
  {
    slug: "sports-nights",
    title: "Sports Nights",
    location: "Veterans Park",
    summary:
      "Spikeball, soccer, hoops, the occasional dad-bod football game. We take over the park and run it 'til it's too dark to see the ball.",
  },
  {
    slug: "grill-sesh",
    title: "Grill Sesh",
    location: "Veterans Park",
    summary:
      "Charcoal, cheap meat, paper plates. The original StreetLights move. Show up, eat, meet people.",
  },
  {
    // Photo grid pulls from RECAP_PHOTOS["bible-studies"] (shared with the
    // detail page). No `preview` field needed — having 5 photos triggers the
    // mosaic layout below.
    slug: "bible-studies",
    title: "Bible Studies",
    location: "Downtown Winter Garden",
    summary:
      "Open Bibles, real questions, no script. Rotating spots downtown: porch lights, folding chairs, coffee.",
  },
  {
    slug: "worship-nights",
    title: "Worship Nights",
    location: "Downtown Winter Garden",
    summary:
      "Acoustic guitars, a couple hundred voices, a stretch of sidewalk downtown. Candles, scripture, harmonies that mostly land.",
  },
];

export default function EventsPage() {
  return (
    <>
      <Nav />

      <main>
        <PageHeader eyebrow="What's on">Events.</PageHeader>

        {/* UPCOMING */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                Upcoming
              </p>
              <h2 className="mt-5 sm:mt-7 font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                This Month.
              </h2>
            </Reveal>

            <Reveal delay={120} className="mt-16 sm:mt-24">
              {/* Month / Year band */}
              <div className="flex items-center gap-6 sm:gap-10 pb-6 sm:pb-8 border-b border-bone/30">
                <span className="font-display text-3xl sm:text-5xl uppercase tracking-tight">
                  {UPCOMING_MONTH.month}
                </span>
                <span className="flex-1 h-px bg-bone/30" />
                <span className="font-display text-3xl sm:text-5xl uppercase tracking-tight">
                  {UPCOMING_MONTH.year}
                </span>
              </div>

              <div>
                {UPCOMING.map((e) => (
                  <EventRow
                    key={`${e.day}-${e.title}`}
                    day={e.day}
                    month={e.month}
                    title={e.title}
                    location={e.location}
                  />
                ))}
                <div className="border-t border-bone/15" />
              </div>

              <p className="mt-10 text-sm uppercase tracking-[0.22em] text-smoke">
                Monday events start at 6:45, Veterans Park unless noted.
              </p>
            </Reveal>
          </div>
        </section>

        {/* RECAP */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                Recap
              </p>
              <h2 className="mt-5 sm:mt-7 font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                Where We&apos;ve Been.
              </h2>
            </Reveal>

            <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
              {RECAPS.map((r, i) => {
                // Recaps with a full 5-photo set get the 1-tall + 2×2 mosaic.
                // Sources from the shared RECAP_PHOTOS so the card and detail
                // page stay in sync.
                const photos = RECAP_PHOTOS[r.slug];
                const hasFullSet = photos && photos.length >= 5;

                return (
                <Reveal key={r.slug} delay={i * 80}>
                  <Link
                    href={`/events/recap/${r.slug}`}
                    className="block group"
                  >
                    {hasFullSet ? (
                      // 3-col × 2-row grid: hero photo spans the left column
                      // full height; remaining 4 photos fill a 2×2 on the right.
                      <div className="grid grid-cols-3 grid-rows-2 gap-1 aspect-[3/2] mb-6 transition-opacity group-hover:opacity-80">
                        <div className="relative col-span-1 row-span-2 overflow-hidden bg-ash">
                          <Image
                            src={photos[0].src}
                            alt={photos[0].alt}
                            fill
                            sizes="(max-width: 768px) 33vw, 17vw"
                            className="object-cover object-center"
                          />
                        </div>
                        {photos.slice(1, 5).map((p) => (
                          <div
                            key={p.src}
                            className="relative col-span-1 row-span-1 overflow-hidden bg-ash"
                          >
                            <Image
                              src={p.src}
                              alt={p.alt}
                              fill
                              sizes="(max-width: 768px) 33vw, 17vw"
                              className="object-cover object-center"
                            />
                          </div>
                        ))}
                      </div>
                    ) : r.preview ? (
                      <div className="relative aspect-[3/2] mb-6 overflow-hidden bg-ash transition-opacity group-hover:opacity-80">
                        <Image
                          src={r.preview}
                          alt={r.previewAlt ?? r.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-center"
                        />
                      </div>
                    ) : (
                      // TODO: replace with real recap photo when available — add `preview` to the RECAP entry
                      <div className="grid grid-cols-3 gap-1 aspect-[3/2] mb-6 transition-opacity group-hover:opacity-80">
                        <div className="bg-ash row-span-2" />
                        <div className="bg-ash" />
                        <div className="bg-ash" />
                        <div className="bg-ash" />
                        <div className="bg-ash" />
                      </div>
                    )}
                    <p className="text-xs uppercase tracking-widest text-smoke mb-3">
                      {r.location}
                    </p>
                    <h3 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.95] tracking-tight">
                      {r.title}
                    </h3>
                    <p className="mt-4 text-base text-bone/75 leading-relaxed max-w-xl">
                      {r.summary}
                    </p>
                    <span className="mt-5 inline-block text-sm uppercase tracking-[0.22em] text-bone/70 group-hover:text-bone transition-colors">
                      Read recap ↗
                    </span>
                  </Link>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
