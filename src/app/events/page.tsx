// TODO: copy review — placeholder schedule, swap with real upcoming events when ready

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import EventRow from "@/components/EventRow";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Events — StreetLights Community",
  description: "Upcoming events and recaps from StreetLights Community.",
};

const UPCOMING_MONTH = { month: "MAY", year: "2026" };

// TODO: replace with real upcoming events
const UPCOMING = [
  { slug: "grill-sesh", day: "04", month: "MAY", title: "Grill Sesh", location: "Veterans Park" },
  { slug: "sports-night", day: "11", month: "MAY", title: "Sports Night", location: "Veterans Park" },
  { slug: "bible-study", day: "18", month: "MAY", title: "Bible Study", location: "Streetlights House" },
  { slug: "worship-night", day: "25", month: "MAY", title: "Worship Night", location: "Downtown Wintergarden" },
  { slug: "spikeball-tourney", day: "30", month: "MAY", title: "Spikeball Tourney", location: "Veterans Park" },
];

// Past events drawn from real April / March 2026 schedules
const RECAPS = [
  {
    slug: "q2-retreat",
    title: "Q2 Retreat",
    when: "April 4 · 2026",
    summary: "A weekend in Daytona Beach. Bonfire on the sand, scripture under the stars, 60+ students.",
  },
  {
    slug: "evangelism-april",
    title: "Evangelism — Downtown Orlando",
    when: "April 13 · 2026",
    summary: "Teaming up with The Spot to share the gospel downtown. Conversations, prayer, late-night tacos.",
  },
  {
    slug: "ucf-hangout",
    title: "UCF Hangout",
    when: "April 27 · 2026",
    summary: "Memory Mall takeover — pickleball, spikeball, and a few hundred students figuring out who StreetLights is.",
  },
  {
    slug: "prayer-walk",
    title: "Prayer Walk — UCF Memory Mall",
    when: "March 9 · 2026",
    summary: "Walking campus and praying for students and staff by name. Quiet, serious, and good for the soul.",
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
                  <Link
                    key={e.slug}
                    href={`/events/${e.slug}`}
                    className="block group"
                  >
                    <EventRow
                      day={e.day}
                      month={e.month}
                      title={e.title}
                      location={e.location}
                    />
                  </Link>
                ))}
                <div className="border-t border-bone/15" />
              </div>

              <p className="mt-10 text-sm uppercase tracking-[0.22em] text-smoke">
                Monday events start at 6:45 — Veterans Park unless noted.
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
              {RECAPS.map((r, i) => (
                <Reveal key={r.slug} delay={i * 80}>
                  <Link
                    href={`/events/recap/${r.slug}`}
                    className="block group"
                  >
                    {/* TODO: replace with real recap photo grid for /photos/recap/{slug}/ */}
                    <div className="grid grid-cols-3 gap-1 aspect-[3/2] mb-6 transition-opacity group-hover:opacity-80">
                      <div className="bg-ash row-span-2" />
                      <div className="bg-ash" />
                      <div className="bg-ash" />
                      <div className="bg-ash" />
                      <div className="bg-ash" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-smoke mb-3">
                      {r.when}
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
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
