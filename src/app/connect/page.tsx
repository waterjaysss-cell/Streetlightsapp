// TODO: copy review — placeholder email + FAQ answers, swap when real ones land

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ConnectCards from "@/components/ConnectCards";
import FAQItem from "@/components/FAQItem";
import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Connect — StreetLights Community",
  description: "How to plug into StreetLights — Mondays, GroupMe, IG, and FAQ.",
};

const GROUPME_URL = "https://groupme.com/join_group/107504026/haDaHAWT";
const INSTAGRAM_URL = "https://instagram.com/streetlightscommunity";
// TODO: confirm real contact email
const CONTACT_EMAIL = "hi@streetlightscommunity.com";

export default function ConnectPage() {
  return (
    <>
      <Nav />

      <main>
        <PageHeader eyebrow="Plug in">Connect.</PageHeader>

        {/* Three plug-in cards */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                Three Doors In
              </p>
              <h2 className="mt-5 sm:mt-7 font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                Pick One.
              </h2>
            </Reveal>

            <ConnectCards />
          </div>
        </section>

        {/* Questions block */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
              <Reveal className="col-span-12 lg:col-span-5">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                  Questions
                </p>
                <h2 className="mt-5 sm:mt-7 font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl">
                  Reach Out.
                </h2>
              </Reveal>

              <Reveal delay={120} className="col-span-12 lg:col-span-7">
                <p className="text-xl sm:text-2xl leading-[1.4] text-bone/85 font-light max-w-2xl">
                  No contact form. Just three ways to actually reach a human.
                </p>

                <ul className="mt-12 sm:mt-14 space-y-8 sm:space-y-10">
                  <li>
                    <p className="text-xs uppercase tracking-widest text-smoke mb-3">
                      Email
                    </p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-display text-2xl sm:text-3xl uppercase tracking-tight hover:text-bone/70 transition-colors break-all"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      <CopyButton
                        value={CONTACT_EMAIL}
                        label="Copy"
                        className="!h-10 !px-5 !text-[10px]"
                      />
                    </div>
                  </li>

                  <li>
                    <p className="text-xs uppercase tracking-widest text-smoke mb-3">
                      Instagram DM
                    </p>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-2xl sm:text-3xl uppercase tracking-tight hover:text-bone/70 transition-colors"
                    >
                      @streetlightscommunity ↗
                    </a>
                  </li>

                  <li>
                    <p className="text-xs uppercase tracking-widest text-smoke mb-3">
                      GroupMe
                    </p>
                    <a
                      href={GROUPME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-2xl sm:text-3xl uppercase tracking-tight hover:text-bone/70 transition-colors"
                    >
                      Join the Group ↗
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke">
                FAQ
              </p>
              <h2 className="mt-5 sm:mt-7 font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl">
                Common Stuff.
              </h2>
            </Reveal>

            <Reveal delay={120} className="mt-16 sm:mt-20 max-w-5xl">
              <FAQItem question="I've never been to a Bible study. Will I feel out of place?">
                <p>
                  No. Most Mondays we&apos;re not a study at all — we eat, hang out,
                  hear a short word, and worship. Even on Bible-Study Mondays
                  it&apos;s casual and conversational. Bring a Bible if you have one;
                  if not we&apos;ve got extras and the YouVersion app works fine.
                </p>
              </FAQItem>

              <FAQItem question="Do I have to be a UCF student to come?">
                <p>
                  Not at all. We&apos;re UCF-anchored but anyone college-aged is
                  welcome — Valencia, Rollins, FCC, students from out of state,
                  recent grads. If you&apos;re finding us, you&apos;re invited.
                </p>
              </FAQItem>

              <FAQItem question="What should I bring?">
                <p>
                  A friend if you can. A folding chair if you have one
                  (especially for outdoor nights at Veterans Park). A Bible
                  if you own one — not required. That&apos;s it.
                </p>
              </FAQItem>

              <FAQItem question="Is there a cost?">
                <p>
                  Mondays are free. Retreats and special events sometimes have a
                  cost — we keep it as low as possible and we have scholarships
                  for anyone who needs one. Money should never be the reason
                  someone misses out. DM us.
                </p>
              </FAQItem>

              <FAQItem question="How do I get involved beyond Mondays?">
                <p>
                  Join the GroupMe — that&apos;s where every spontaneous beach trip,
                  prayer request, and pickup hoop session gets posted. Show up to
                  one of our hangouts during the week. From there, ask us about
                  serving on a team — worship, tech, evangelism, hospitality.
                </p>
              </FAQItem>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
