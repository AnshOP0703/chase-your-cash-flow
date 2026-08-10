import { useEffect, useRef, useState } from "react";

/** True when the device has a fine pointer and motion is allowed. */
export function useInteractive() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOk(fine && !reduced);
  }, []);
  return ok;
}

/**
 * Tracks the cursor inside an element and exposes it as CSS vars:
 * --px/--py (-1..1 from centre) and --cx/--cy (px, for spotlights).
 */
export function usePointerVars<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const active = useInteractive();

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.setProperty("--px", String(((x / r.width) * 2 - 1).toFixed(3)));
        el.style.setProperty("--py", String(((y / r.height) * 2 - 1).toFixed(3)));
        el.style.setProperty("--cx", `${x}px`);
        el.style.setProperty("--cy", `${y}px`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active]);

  return { ref, active };
}

/** Fires once the element scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Counts up to `to` once started. */
export function useCountUp(to: number, start: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);
  return value;
}

/** Cycles 0..steps-1 on an interval, pausing when reduced motion is requested. */
export function useCycle(steps: number, ms = 1800) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(steps - 1);
      return;
    }
    const id = setInterval(() => setI((n) => (n + 1) % steps), ms);
    return () => clearInterval(id);
  }, [steps, ms]);
  return i;
}
