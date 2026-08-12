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
 * Tracks the cursor inside an element with spring smoothing and exposes it as
 * CSS vars: --px/--py (-1..1 from centre) and --cx/--cy (px, for spotlights).
 */
export function usePointerVars<T extends HTMLElement>(stiffness = 0.09) {
  const ref = useRef<T | null>(null);
  const active = useInteractive();

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    let raf = 0;
    let running = false;
    const target = { px: 0, py: 0, cx: 0, cy: 0 };
    const cur = { px: 0, py: 0, cx: 0, cy: 0 };

    const loop = () => {
      let moving = false;
      (Object.keys(cur) as (keyof typeof cur)[]).forEach((k) => {
        const d = target[k] - cur[k];
        if (Math.abs(d) > 0.0008) moving = true;
        cur[k] += d * stiffness;
      });
      el.style.setProperty("--px", cur.px.toFixed(4));
      el.style.setProperty("--py", cur.py.toFixed(4));
      el.style.setProperty("--cx", `${cur.cx.toFixed(1)}px`);
      el.style.setProperty("--cy", `${cur.cy.toFixed(1)}px`);
      if (moving) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      target.px = (x / r.width) * 2 - 1;
      target.py = (y / r.height) * 2 - 1;
      target.cx = x;
      target.cy = y;
      start();
    };
    const onLeave = () => {
      target.px = 0;
      target.py = 0;
      start();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [active, stiffness]);

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

/** 0..1 progress of an element travelling through the viewport. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      const seen = window.innerHeight - r.top;
      setP(Math.min(1, Math.max(0, seen / total)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, progress: p };
}

/** Types out a string, character by character. Restarts whenever `text` changes. */
export function useTypewriter(text: string, start: boolean, speed = 22) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut("");
    setDone(false);
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return { out, done };
}

/** Raw window scroll position, throttled to animation frames. */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setY(window.scrollY);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

/**
 * Steps through a sequence once started, holding on the last step before
 * looping. `hold` lets the finished state breathe.
 */
export function useSequence(count: number, start: boolean, step = 1400, hold = 3200) {
  const [i, setI] = useState(-1);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(count - 1);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const run = (n: number) => {
      t = setTimeout(
        () => {
          const next = n >= count - 1 ? 0 : n + 1;
          setI(next);
          run(next);
        },
        n >= count - 1 ? hold : step,
      );
    };
    setI(0);
    run(0);
    return () => clearTimeout(t);
  }, [count, start, step, hold]);
  return i;
}
