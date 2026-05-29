import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreetLights Community",
  description:
    "Everyday fellowship. Everyday outreach. Everyday encouragement. A young adult community in Orlando, FL — Mondays at 6:45pm.",
  openGraph: {
    title: "StreetLights Community",
    description:
      "Everyday fellowship. Everyday outreach. Everyday encouragement.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-bone font-body">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
