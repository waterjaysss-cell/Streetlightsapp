/**
 * Shared photo arrays for event recaps.
 *
 * Imported by both the recap card on /events and the recap detail page at
 * /events/recap/[slug] so the two views stay in sync — adding/removing a
 * photo here updates both places.
 *
 * Slugs without a 5-photo set (e.g. sports-nights, grill-sesh) intentionally
 * have no entry here — the card falls back to its single-image/placeholder
 * behavior in that case.
 */

export type RecapPhoto = { src: string; alt: string };

export const RECAP_PHOTOS: Record<string, RecapPhoto[]> = {
  "grill-sesh": [
    {
      src: "/photos/grill-sesh-group.jpg",
      alt: "The whole community gathered around the grills at Veterans Park",
    },
    {
      src: "/photos/grill-sesh-grilling.jpg",
      alt: "Someone flipping food over open flame at the cookout",
    },
    {
      src: "/photos/grill-sesh-grill.jpg",
      alt: "Close-up of the grill packed with burgers and dogs",
    },
    {
      src: "/photos/grill-sesh-burger.jpg",
      alt: "Fresh-off-the-grill burger ready to eat",
    },
    {
      src: "/photos/grill-sesh-serving.jpg",
      alt: "Serving food out to the crowd at Veterans Park",
    },
  ],
  "sports-nights": [
    {
      src: "/photos/sports-nights-group.jpg",
      alt: "The whole sports-night crew gathered on the field at Veterans Park",
    },
    {
      src: "/photos/sports-nights-field.jpg",
      alt: "Wide shot of the field mid-game at sunset",
    },
    {
      src: "/photos/sports-nights-friends.jpg",
      alt: "Friends hanging out on the sidelines between games",
    },
    {
      src: "/photos/sports-nights-paddles.jpg",
      alt: "Pickleball paddles and gear at the edge of the court",
    },
    {
      src: "/photos/sports-nights-pair.jpg",
      alt: "Two friends catching their breath after a pickup game",
    },
  ],
  "bible-studies": [
    {
      src: "/photos/bible-studies-group.jpg",
      alt: "The whole community studying Scripture together in a living room",
    },
    {
      src: "/photos/bible-studies-pair.jpg",
      alt: "Two people studying side by side on the couch, a Lectio Bible on the coffee table",
    },
    {
      src: "/photos/bible-studies-bible.jpg",
      alt: "Close-up of a heavily marked-up Bible during study",
    },
    {
      src: "/photos/bible-studies-discussion.jpg",
      alt: "Someone gesturing mid-discussion about a passage",
    },
    {
      src: "/photos/bible-studies-night.jpg",
      alt: "A packed living room studying late into the night",
    },
  ],
  "worship-nights": [
    {
      src: "/photos/worship-nights-group.jpg",
      alt: "The whole community gathered at night under string-lit trees in Downtown Winter Garden",
    },
    {
      src: "/photos/worship-nights-teaching.jpg",
      alt: "Speaker preaching on the Winter Garden city hall steps with an open Bible",
    },
    {
      src: "/photos/worship-nights-guitar.jpg",
      alt: "Worship leader singing with an acoustic guitar in the courtyard",
    },
    {
      src: "/photos/worship-nights-prayer.jpg",
      alt: "Someone kneeling with hands raised in prayer at twilight",
    },
    {
      src: "/photos/worship-nights-hands.jpg",
      alt: "Hands raised in worship along the sidewalk at dusk",
    },
  ],
};
