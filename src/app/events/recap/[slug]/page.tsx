// TODO: copy review — placeholder recap content, swap when real recaps drop

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { RECAP_PHOTOS, type RecapPhoto } from "@/lib/recap-photos";

type Recap = {
  title: string;
  location: string;
  intro: string;
  body: string[];
  photos: RecapPhoto[];
};

const RECAPS: Record<string, Recap> = {
  "sports-nights": {
    title: "Sports Nights",
    location: "Veterans Park",
    intro:
      "Spikeball, soccer, hoops, the occasional dad-bod football game. We take over the park and run it 'til it's too dark to see the ball.",
    body: [
      "It started small. A couple of us hauling a net to Veterans on a Tuesday. Now half the park belongs to us by 7pm: cleats, jerseys, the smell of grass and Gatorade.",
      "There's something about competing together that strips the walls down. You learn who your people are by who you trust to set the spike. Some of the strongest friendships in this community started in a pickup game nobody planned.",
      "We rotate sports. Never the same week twice. Bring shoes you don't mind getting beat up, and bring a friend.",
    ],
    photos: RECAP_PHOTOS["sports-nights"],
  },
  "grill-sesh": {
    title: "Grill Sesh",
    location: "Veterans Park",
    intro:
      "Charcoal, cheap meat, paper plates, and a hundred people who'd rather eat outside than anywhere else. The original StreetLights move.",
    body: [
      "Started as one grill. Then two. Now there's smoke from the moment we set up until the moment the sun's down.",
      "Bring something to throw on: burgers, dogs, whatever. We figure out the rest. There's always too much food and never any leftovers.",
      "If you've never been, this is the easiest first visit. Show up, eat, meet people. That's it.",
    ],
    photos: RECAP_PHOTOS["grill-sesh"],
  },
  "bible-studies": {
    title: "Bible Studies",
    location: "Downtown Winter Garden",
    intro:
      "Open Bibles, real questions, no script. Rotating spots in Downtown Winter Garden: porch lights, folding chairs, coffee.",
    body: [
      "We meet at one of a few homes around downtown. Whoever's leading picks a passage; the rest of us actually wrestle with it.",
      "These aren't lectures. People interrupt. Questions don't get punted. If you've never opened a Bible before, you're in the right room. Half of us hadn't either.",
      "Bring a Bible if you have one. If not, we've got extras and the YouVersion app works fine.",
    ],
    photos: RECAP_PHOTOS["bible-studies"],
  },
  "worship-nights": {
    title: "Worship Nights",
    location: "Downtown Winter Garden",
    intro:
      "Acoustic guitars, a couple hundred voices, a stretch of sidewalk in Downtown Winter Garden. Candles, scripture, harmonies that mostly land.",
    body: [
      "Once a month we set up in the heart of downtown after the shops close. No stage, no production. Just the songs we sing on a normal Monday, louder, longer, outside.",
      "Locals stop in. Some sing. Some just sit. Half the time we end up in conversation with strangers about what we believe and why.",
      "Bring a friend. Bring a chair. Bring nothing. That works too.",
    ],
    photos: RECAP_PHOTOS["worship-nights"],
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
                    {recap.location}
                  </p>
                </Reveal>

                <Reveal delay={180} className="mt-8">
                  <p className="text-2xl sm:text-3xl lg:text-4xl leading-[1.3] font-light max-w-4xl text-bone/90">
                    {recap.intro}
                  </p>
                </Reveal>

                <Reveal delay={240} className="mt-16 sm:mt-20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                    {recap.photos.map((p, i) => (
                      <div
                        key={p.src}
                        className={`relative overflow-hidden bg-ash ${
                          i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                        }`}
                      >
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
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
