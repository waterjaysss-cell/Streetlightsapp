// TODO: copy review — placeholder voice, swap with real story when ready

import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About · StreetLights Community",
  description:
    "A young adult community in Orlando, FL. A community, not a service.",
};

const PILLARS = [
  {
    n: "01",
    title: "Fellowship",
    body: "We don't just meet on Mondays. We do life together: meals, hangouts, study sessions, the messy stuff in between.",
  },
  {
    n: "02",
    title: "Outreach",
    body: "Loving the city outside our walls. Showing up downtown, on campus, wherever the people are.",
  },
  {
    n: "03",
    title: "Encouragement",
    body: "We're better together. Speaking life into each other when it's easy and when it isn't.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main>
        <PageHeader eyebrow="Who we are">
          A community,
          <br />
          not a service.
        </PageHeader>

        {/* Story / mission */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <Reveal className="col-span-12 lg:col-span-4">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                  The Story
                </p>
              </Reveal>

              <Reveal delay={120} className="col-span-12 lg:col-span-8">
                <div className="space-y-7 text-xl sm:text-2xl lg:text-3xl leading-[1.35] text-bone/90 font-light">
                  <p>
                    StreetLights started simple: a handful of young adults in
                    Orlando who didn&apos;t want church to be a once-a-week thing.
                    Today it&apos;s ~350+ people who show up for each other every
                    day of the week.
                  </p>
                  <p>
                    Mondays we gather. The rest of the week we eat together, hoop
                    together, study scripture together, and chase down the city.
                    Orlando-anchored but open to anyone: students, post-grads,
                    working in the city, just visiting. Whoever finds us.
                  </p>
                  <p className="text-bone/70 text-lg sm:text-xl">
                    We&apos;re after the real thing: the everyday discipleship Acts 2
                    talks about. Not a stage. Not a brand. People.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Acts 2:42–47 pull-quote */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke mb-10 sm:mb-14">
                Acts 2:42–47
              </p>
            </Reveal>

            <Reveal delay={120}>
              <blockquote className="grid grid-cols-12 gap-x-6">
                <div
                  aria-hidden
                  className="col-span-1 hidden md:block w-px bg-bone/30 justify-self-end"
                />
                <p
                  className="col-span-12 md:col-span-11 italic font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] text-bone/90 max-w-5xl"
                  style={{ fontVariantLigatures: "common-ligatures" }}
                >
                  They devoted themselves to the apostles&apos; teaching and to
                  fellowship, to the breaking of bread and to prayer …
                  <span className="text-bone/55">
                    {" "}All the believers were together and had everything in
                    common. They sold property and possessions to give to anyone
                    who had need. Every day they continued to meet together in
                    the temple courts. They broke bread in their homes and ate
                    together with glad and sincere hearts, praising God …
                  </span>
                </p>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* Photo band */}
        <section className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-neutral-900 border-b border-bone/10 overflow-hidden">
          <Image
            src="/photos/praying-bibles.png"
            alt="Students praying with Bibles outdoors at night"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </section>

        {/* Pillars: Fellowship / Outreach / Encouragement */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                What We&apos;re About
              </p>
              <h2 className="mt-5 sm:mt-7 font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                Three Things.
              </h2>
            </Reveal>

            <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/15">
              {PILLARS.map((p, i) => (
                <Reveal
                  key={p.n}
                  delay={i * 100}
                  className="bg-night p-8 sm:p-10 flex flex-col"
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-smoke">
                    {p.n} / {p.title}
                  </p>
                  <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
                    {p.title}.
                  </h3>
                  <p className="mt-6 text-base text-bone/80 leading-relaxed">
                    {p.body}
                  </p>
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
