import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import TiltTile from "@/components/motion/TiltTile";

export const metadata = {
  title: "Shop — StreetLights Community",
  description:
    "Limited drops. DM us on Instagram to grab one. All proceeds go back into the community.",
};

const INSTAGRAM_URL = "https://instagram.com/streetlightscommunity";

// Product photos live at /photos/{slug}.jpg
type Product = {
  slug: string;
  name: string;
  price: string;
  sizes: string;
  alt: string;
};

const PRODUCTS: Product[] = [
  {
    slug: "black-tee",
    name: "StreetLights Tee",
    price: "$25",
    sizes: "S / M / L / XL",
    alt: "StreetLights black tee, front view",
  },
  {
    slug: "black-hoodie",
    name: "StreetLights Hoodie",
    price: "$50",
    sizes: "S / M / L / XL",
    alt: "StreetLights black hoodie, front view",
  },
  {
    slug: "black-trucker",
    name: "Black Rope Trucker",
    price: "$30",
    sizes: "One Size",
    alt: "Black rope trucker hat with StreetLights mark",
  },
  {
    slug: "blue-trucker",
    name: "Sky Rope Trucker",
    price: "$30",
    sizes: "One Size",
    alt: "Sky blue rope trucker hat with StreetLights mark",
  },
];

export default function ShopPage() {
  return (
    <>
      <Nav />

      <main>
        <PageHeader eyebrow="Wear the name">Shop.</PageHeader>

        <section className="py-20 sm:py-28 lg:py-36 border-b border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="max-w-2xl text-xl sm:text-2xl leading-[1.4] text-bone/85 font-light">
                Limited drops. DM us on Instagram to grab one. All proceeds go
                back into the community.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-16 sm:mt-24">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
                {PRODUCTS.map((p) => (
                  <article key={p.slug} className="group flex flex-col">
                    <TiltTile
                      src={`/photos/${p.slug}.jpg`}
                      alt={p.alt}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />

                    <div className="mt-5 sm:mt-6 flex flex-col flex-1">
                      <h3 className="font-display text-2xl sm:text-3xl uppercase leading-[1.05] tracking-tight">
                        {p.name}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm uppercase tracking-[0.18em]">
                        <span className="text-bone">{p.price}</span>
                        <span className="text-smoke">·</span>
                        <span className="text-bone/70">{p.sizes}</span>
                      </div>

                      <Button
                        href={INSTAGRAM_URL}
                        variant="outline"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 sm:mt-7 self-start !h-12 !px-6 !text-xs"
                      >
                        DM to Order
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
