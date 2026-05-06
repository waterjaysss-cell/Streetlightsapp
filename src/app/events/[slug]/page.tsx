// TODO: copy review — placeholder event details, swap when real ones drop

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

// One example with full detail. All other slugs render the lightweight
// fallback view below ("more details soon"). Add real entries here as
// content gets written.
type EventDetail = {
  title: string;
  date: string;
  time: string;
  location: string;
  bring: string[];
  blurb: string;
};

const DETAILS: Record<string, EventDetail> = {
  "worship-night": {
    title: "Worship Night",
    date: "Monday, May 25 · 2026",
    time: "6:45 PM",
    location: "Downtown Wintergarden",
    bring: ["A friend", "Bible (or pull it up on your phone)", "Folding chair if you've got one"],
    blurb:
      "Once a month we trade the usual format for a worship night downtown. Acoustic, outdoors, and loud enough that strangers wander over to see what's happening — which is the whole point.",
  },
};

// Loose lookup for the row info if we don't have full detail (so the page
// at least shows the event title rather than 404'ing).
const KNOWN_TITLES: Record<string, { title: string; location: string; date: string }> = {
  "grill-sesh": { title: "Grill Sesh", location: "Veterans Park", date: "Monday, May 4 · 2026" },
  "sports-night": { title: "Sports Night", location: "Veterans Park", date: "Monday, May 11 · 2026" },
  "bible-study": { title: "Bible Study", location: "Streetlights House", date: "Monday, May 18 · 2026" },
  "spikeball-tourney": { title: "Spikeball Tourney", location: "Veterans Park", date: "Monday, May 30 · 2026" },
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = DETAILS[slug];
  const known = KNOWN_TITLES[slug];
  const title = detail?.title ?? known?.title ?? "Event";

  return (
    <>
      <Nav />

      <main>
        <PageHeader eyebrow="Upcoming">{title}.</PageHeader>

        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <Link
                href="/events"
                className="text-xs uppercase tracking-widest text-bone/60 hover:text-bone transition-colors"
              >
                ← All events
              </Link>
            </Reveal>

            {detail ? (
              <Reveal delay={100} className="mt-12 sm:mt-16">
                <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                  {/* Meta */}
                  <div className="col-span-12 lg:col-span-4 space-y-8">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-smoke mb-2">
                        Date
                      </p>
                      <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
                        {detail.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-smoke mb-2">
                        Time
                      </p>
                      <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
                        {detail.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-smoke mb-2">
                        Where
                      </p>
                      <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
                        {detail.location}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="col-span-12 lg:col-span-8 space-y-10">
                    <p className="text-xl sm:text-2xl leading-[1.4] text-bone/90 font-light">
                      {detail.blurb}
                    </p>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-smoke mb-5">
                        What to bring
                      </p>
                      <ul className="space-y-2">
                        {detail.bring.map((b) => (
                          <li
                            key={b}
                            className="flex items-baseline gap-4 text-lg sm:text-xl text-bone/85"
                          >
                            <span className="font-display text-bone/40 text-base">—</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* TODO: swap with real photos at /photos/events/worship-night/ */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 aspect-[16/5]">
                      <div className="bg-ash" />
                      <div className="bg-ash" />
                      <div className="bg-ash" />
                      <div className="bg-ash" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={100} className="mt-12 sm:mt-16">
                {known && (
                  <div className="space-y-3 mb-10">
                    <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
                      {known.date}
                    </p>
                    <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight">
                      {known.location}
                    </p>
                  </div>
                )}
                <p className="text-xl sm:text-2xl leading-[1.4] text-bone/75 font-light max-w-2xl">
                  Detail page coming soon. For now — pull up Monday at 6:45,
                  bring a friend.
                </p>
              </Reveal>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
