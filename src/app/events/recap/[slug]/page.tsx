// TODO: copy review — placeholder recap content, swap when real recaps drop

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

type Recap = {
  title: string;
  when: string;
  intro: string;
  body: string[];
  photoCount: number; // grid placeholder count
};

const RECAPS: Record<string, Recap> = {
  "q2-retreat": {
    title: "Q2 Retreat",
    when: "April 4 · 2026 · Daytona Beach",
    intro:
      "60+ students. One weekend. A bonfire on the sand and a worship set that ran past midnight.",
    body: [
      "We rented a stretch of beach houses, ate too much, slept too little, and spent two days going hard after Jesus together. Mornings started with breakfast and quiet time. Afternoons were the ocean. Evenings were teaching, worship, and the kind of conversations you don't get on a normal Monday.",
      "The bonfire on Saturday night is the moment most of us are still talking about. Guitars, scripture passed around, hands raised against the dark — the whole thing felt like something out of Acts. Several students put their faith in Christ. Others recommitted. We came home different.",
      "Photos and video coming soon. If you missed it — we're already planning the next one.",
    ],
    photoCount: 8,
  },
  "evangelism-april": {
    title: "Evangelism — Downtown Orlando",
    when: "April 13 · 2026 · Downtown Orlando",
    intro:
      "We took a Sunday evening, partnered up with The Spot, and walked downtown with one job: share the gospel.",
    body: [
      "Forty-something of us split into pairs and spread out across Lake Eola and Church Street. The plan: meet people, listen, ask good questions, share Jesus when the door opens.",
      "Some conversations were short. A few went over an hour. Two students prayed to receive Christ. We ended the night at a taco place comparing stories — what we'd been afraid of, what surprised us, where God showed up.",
    ],
    photoCount: 6,
  },
};

export default async function RecapDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recap = RECAPS[slug];
  const title = recap?.title ?? "Recap";

  return (
    <>
      <Nav />

      <main>
        <PageHeader eyebrow="Recap">{title}.</PageHeader>

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

            {recap ? (
              <>
                <Reveal delay={100} className="mt-10 sm:mt-14">
                  <p className="text-xs uppercase tracking-widest text-smoke">
                    {recap.when}
                  </p>
                </Reveal>

                <Reveal delay={180} className="mt-8">
                  <p className="text-2xl sm:text-3xl lg:text-4xl leading-[1.3] font-light max-w-4xl text-bone/90">
                    {recap.intro}
                  </p>
                </Reveal>

                {/* TODO: swap placeholder grid with real recap photos at /photos/recap/{slug}/ */}
                <Reveal delay={240} className="mt-16 sm:mt-20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                    {Array.from({ length: recap.photoCount }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-ash ${
                          i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                        }`}
                      />
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={300} className="mt-16 sm:mt-24">
                  <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3 space-y-7 text-lg sm:text-xl leading-[1.6] text-bone/85">
                      {recap.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </>
            ) : (
              <Reveal delay={100} className="mt-12 sm:mt-16">
                <p className="text-xl sm:text-2xl leading-[1.4] text-bone/75 font-light max-w-2xl">
                  Recap coming soon.
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
