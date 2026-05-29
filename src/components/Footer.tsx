import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiGroupme } from "react-icons/si";

// TODO: replace with real GroupMe invite URL
const GROUPME_URL = "https://groupme.com/join_group/107504026/haDaHAWT";
const INSTAGRAM_URL = "https://instagram.com/streetlightscommunity";

export default function Footer() {
  return (
    <footer className="border-t border-bone/10">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link href="/" aria-label="StreetLights — home" className="block">
            <Image
              src="/brand/streetlights-logo.jpg"
              alt="StreetLights"
              width={72}
              height={72}
              // Same trick as the nav logo — `screen` blends the JPG's baked
              // black background to transparent against the night-colored footer.
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain mix-blend-screen"
            />
          </Link>

          <div className="flex items-center gap-6 md:self-end text-bone/80">
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="StreetLights on Instagram"
              className="hover:text-bone transition-colors"
            >
              <SiInstagram className="h-6 w-6" aria-hidden />
            </Link>
            <Link
              href={GROUPME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the StreetLights GroupMe"
              className="hover:text-bone transition-colors"
            >
              <SiGroupme className="h-6 w-6" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p className="uppercase tracking-[0.18em]">
            Acts 2:42–47 · Orlando, FL
          </p>
          <p className="uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} StreetLights Community
          </p>
        </div>
      </div>
    </footer>
  );
}
