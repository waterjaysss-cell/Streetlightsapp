"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  isTouchDevice,
  magnetic as magneticConfig,
  prefersReducedMotion,
} from "@/lib/motion";

/**
 * Returns a ref. Attach it to any element you want to behave magnetically —
 * the element will follow the cursor when the cursor enters a rectangular
 * hot-zone around the element (the element's bounds + a few px padding), and
 * springs back on leave. Disabled on touch devices and reduced motion.
 *
 * Why a rectangle (not a circle): a circular radius based on the element's
 * longest dimension was too generous for nav links — adjacent links would
 * both activate at the same cursor position and visibly drift into each
 * other. A small rectangular padding gives each element its own predictable
 * activation zone.
 *
 * Why we subtract the current GSAP transform when reading rect: when we
 * apply x/y via gsap, `getBoundingClientRect()` returns the transformed
 * position. If we used that directly to compute the cursor offset, the
 * element would chase its own transform — feedback loop — and drift away
 * from its natural position. Subtracting the current x/y restores the
 * natural center so the math is stable.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isTouchDevice() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: magneticConfig.duration,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: magneticConfig.duration,
      ease: "power3.out",
    });

    const padding = magneticConfig.radius;

    const onMove = (e: MouseEvent) => {
      // Read the rect, then back out the current GSAP transform so we work
      // against the element's natural (untransformed) bounds.
      const currentX = (gsap.getProperty(el, "x") as number) || 0;
      const currentY = (gsap.getProperty(el, "y") as number) || 0;
      const rect = el.getBoundingClientRect();
      const naturalLeft = rect.left - currentX;
      const naturalTop = rect.top - currentY;
      const naturalRight = naturalLeft + rect.width;
      const naturalBottom = naturalTop + rect.height;
      const naturalCx = naturalLeft + rect.width / 2;
      const naturalCy = naturalTop + rect.height / 2;

      const inHotZone =
        e.clientX >= naturalLeft - padding &&
        e.clientX <= naturalRight + padding &&
        e.clientY >= naturalTop - padding &&
        e.clientY <= naturalBottom + padding;

      if (inHotZone) {
        xTo((e.clientX - naturalCx) * magneticConfig.strength);
        yTo((e.clientY - naturalCy) * magneticConfig.strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, []);

  return ref;
}
