import Reveal from "./Reveal";

// TODO: replace with real GroupMe invite URL
const GROUPME_URL = "https://groupme.com/join_group/107504026/haDaHAWT";
const INSTAGRAM_URL = "https://instagram.com/streetlightscommunity";

/**
 * Three plug-in cards: Pull Up / GroupMe / Follow.
 * Used on the homepage Connect section and on the standalone /connect page.
 */
export default function ConnectCards() {
  return (
    <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/15">
      {/* PULL UP */}
      <Reveal className="bg-night p-8 sm:p-10 flex flex-col">
        <p className="text-xs uppercase tracking-[0.32em] text-smoke">
          01 / Pull Up
        </p>
        <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
          Monday
          <br />
          6:45pm
        </h3>
        <p className="mt-6 text-base text-bone/80 leading-relaxed">
          Show up. Bring a friend. We meet weekly to gather, eat, worship, and
          figure out what it means to follow Jesus together.
        </p>
        <a
          href="/#whats-on"
          className="mt-auto pt-8 text-sm uppercase tracking-[0.22em] text-bone/70 hover:text-bone transition-colors"
        >
          Location varies — check What&apos;s On for this Monday&apos;s spot ↑
        </a>
      </Reveal>

      {/* GROUPME */}
      <Reveal delay={100} className="bg-night p-8 sm:p-10 flex flex-col">
        <p className="text-xs uppercase tracking-[0.32em] text-smoke">
          02 / GroupMe
        </p>
        <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
          Where it
          <br />
          Happens
        </h3>
        <p className="mt-6 text-base text-bone/80 leading-relaxed">
          This is where everything happens. Hangouts, last-minute beach trips,
          prayer requests, who&apos;s bringing the grill — all of it.
        </p>
        <a
          href={GROUPME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-8 text-sm uppercase tracking-[0.22em] text-bone hover:text-bone/70 transition-colors"
        >
          Join the GroupMe ↗
        </a>
      </Reveal>

      {/* INSTAGRAM */}
      <Reveal delay={200} className="bg-night p-8 sm:p-10 flex flex-col">
        <p className="text-xs uppercase tracking-[0.32em] text-smoke">
          03 / Follow
        </p>
        <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
          See What
          <br />
          We&apos;re Up To
        </h3>
        <p className="mt-6 text-base text-bone/80 leading-relaxed">
          Schedule drops, retreat recaps, worship nights, the whole picture —
          posted weekly on Instagram.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-8 text-sm uppercase tracking-[0.22em] text-bone hover:text-bone/70 transition-colors"
        >
          @streetlightscommunity ↗
        </a>
      </Reveal>
    </div>
  );
}
