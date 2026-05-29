// TODO: copy review — placeholder handles and email, swap with real ones

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Give — StreetLights Community",
  description:
    "Donations fund retreats, scholarships, and the everyday costs of community life.",
};

// TODO: replace with real giving handles
const VENMO_HANDLE = "@streetlights";
const VENMO_URL = "https://venmo.com/streetlights";
const ZELLE_EMAIL = "give@streetlightscommunity.com";

export default function GivePage() {
  return (
    <>
      <Nav />

      <main>
        <PageHeader eyebrow="Support the mission">Give.</PageHeader>

        {/* Why give */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <Reveal className="col-span-12 lg:col-span-4">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                  Why Give
                </p>
              </Reveal>

              <Reveal delay={120} className="col-span-12 lg:col-span-8">
                <div className="space-y-7 text-xl sm:text-2xl lg:text-3xl leading-[1.35] text-bone/90 font-light">
                  <p>
                    Every dollar goes back into the community.
                  </p>
                  <p>
                    Retreats, scholarships for anyone who can&apos;t cover the cost,
                    grills and food for hangouts, supplies for evangelism nights,
                    rent on the Streetlights House — the boring necessary stuff
                    that keeps everything else running.
                  </p>
                  <p className="text-bone/70 text-lg sm:text-xl">
                    No one on staff takes a salary from this. It&apos;s people
                    funding people.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Three giving options */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                Three Ways
              </p>
              <h2 className="mt-5 sm:mt-7 font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                Pick One.
              </h2>
            </Reveal>

            <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/15">
              {/* VENMO */}
              <Reveal className="bg-night p-8 sm:p-10 flex flex-col">
                <p className="text-xs uppercase tracking-[0.32em] text-smoke">
                  01 / Venmo
                </p>
                <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
                  Venmo
                </h3>
                <p className="mt-6 text-base text-bone/80 leading-relaxed">
                  Quickest path. Tap the button and it opens straight in the app.
                </p>
                <p className="mt-8 font-display text-2xl sm:text-3xl uppercase tracking-tight text-bone">
                  {VENMO_HANDLE}
                </p>
                <Button
                  href={VENMO_URL}
                  variant="filled"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-0 self-start !mt-7"
                >
                  Open Venmo
                </Button>
              </Reveal>

              {/* ZELLE */}
              <Reveal delay={100} className="bg-night p-8 sm:p-10 flex flex-col">
                <p className="text-xs uppercase tracking-[0.32em] text-smoke">
                  02 / Zelle
                </p>
                <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
                  Zelle
                </h3>
                <p className="mt-6 text-base text-bone/80 leading-relaxed">
                  Send to the email below from your bank&apos;s Zelle screen.
                </p>
                <p className="mt-8 break-all text-lg sm:text-xl text-bone leading-tight">
                  {ZELLE_EMAIL}
                </p>
                <CopyButton
                  value={ZELLE_EMAIL}
                  label="Copy Email"
                  className="mt-7 self-start"
                />
              </Reveal>

              {/* IN PERSON */}
              <Reveal delay={200} className="bg-night p-8 sm:p-10 flex flex-col">
                <p className="text-xs uppercase tracking-[0.32em] text-smoke">
                  03 / In Person
                </p>
                <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
                  In the
                  <br />
                  Basket
                </h3>
                <p className="mt-6 text-base text-bone/80 leading-relaxed">
                  Drop in the basket Monday at 6:45.
                </p>
                <p className="mt-auto pt-8 text-sm uppercase tracking-[0.22em] text-bone/60">
                  Cash or check.
                </p>
              </Reveal>
            </div>

            <p className="mt-16 sm:mt-20 text-xs uppercase tracking-widest text-smoke max-w-2xl leading-relaxed">
              StreetLights Community is currently a non-501(c)(3) ministry.
              Donations are not tax-deductible at this time.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
