import { ArrowDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticCta } from "./MagneticCta";
import { usePointerVars, useSequence, useScrollY } from "./usePointer";
import { INVOICE, COLLECTION } from "./story";

/** Where each collection event floats around the invoice, and how deep it sits. */
const orbits = [
  { top: "6%", left: "-4%", depth: 30, delay: "0s" },
  { top: "26%", right: "-6%", depth: 44, delay: "1.2s" },
  { bottom: "22%", left: "-8%", depth: 38, delay: "0.6s" },
  { bottom: "2%", right: "-2%", depth: 26, delay: "1.8s" },
  { top: "48%", left: "50%", depth: 0, delay: "0s" },
];

export function Hero() {
  const { ref, active } = usePointerVars<HTMLElement>();
  const step = useSequence(COLLECTION.length, true, 1500, 3600);
  const paid = step === COLLECTION.length - 1;
  const y = useScrollY();

  // The invoice recedes as the page scrolls — it becomes the invoice discussed
  // in the problem section below.
  const t = Math.min(1, y / 700);

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-12%] h-[560px]"
        style={{
          background:
            "radial-gradient(58% 58% at 50% 0%, color-mix(in oklab, var(--primary) 9%, transparent), transparent 72%)",
        }}
      />
      {active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(380px circle at var(--cx, 50%) var(--cy, 30%), color-mix(in oklab, var(--primary) 8%, transparent), transparent 70%)",
          }}
        />
      )}

      <div className="container-page relative pt-14 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label-xs inline-flex items-center gap-2 text-muted-foreground">
            <span
              className="size-1.5 rounded-full bg-primary"
              style={{ animation: "tag-pulse 2.6s ease-in-out infinite" }}
            />
            Automated collections
          </p>
          <h1 className="mt-5 text-[2.9rem] leading-[0.95] font-semibold tracking-[-0.048em] sm:text-[4.75rem]">
            Send the invoice.
            <span className="block font-normal text-muted-foreground">We chase the payment.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[1.0625rem] leading-relaxed text-muted-foreground">
            Tagada follows up until you&rsquo;re paid — then stops.
          </p>
          <div id="waitlist" className="mt-8 flex flex-wrap items-center justify-center gap-3 scroll-mt-28">
            <MagneticCta href="#early-access">Get early access</MagneticCta>
            <MagneticCta href="#how-it-works" variant="quiet">
              See how it works <ArrowDown aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </MagneticCta>
          </div>
        </div>

        {/* Product theatre — the invoice, floating in its collection system. */}
        <div
          className="relative mx-auto mt-16 max-w-3xl sm:mt-20"
          style={{
            transform: `translate3d(0, ${-t * 60}px, 0) scale(${1 - t * 0.07})`,
            opacity: 1 - t * 0.45,
          }}
        >
          <div
            aria-hidden="true"
            className="parallax pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] blur-3xl transition-colors duration-1000"
            style={{
              ["--depth" as string]: "-14px",
              background: paid
                ? "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)"
                : "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--foreground) 6%, transparent), transparent 70%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-md">
            {/* Invoice */}
            <div
              className={cn(
                "tilt-3d relative z-10 rounded-2xl border bg-surface p-7 card-lift transition-colors duration-700",
                paid ? "border-primary/30" : "border-border",
              )}
              style={{ ["--depth" as string]: "10px" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-secondary text-xs font-semibold">
                    {INVOICE.initials}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium tracking-tight">{INVOICE.client}</p>
                    <p className="num text-xs text-muted-foreground">Invoice {INVOICE.number}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all duration-700",
                    paid ? "bg-soft text-deep" : "border border-border text-muted-foreground",
                  )}
                >
                  {paid ? "Paid" : "Awaiting payment"}
                </span>
              </div>

              <p
                key={paid ? "paid" : "open"}
                className={cn(
                  "num mt-8 font-display text-[3.5rem] leading-none font-semibold transition-colors duration-700",
                  paid ? "text-primary" : "text-foreground",
                )}
                style={paid ? { animation: "amount-pop 0.9s cubic-bezier(0.16,1,0.3,1)" } : undefined}
              >
                {INVOICE.amount}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Due {INVOICE.due} · {INVOICE.note}
              </p>

              <div className="mt-7 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    paid ? "bg-primary" : "bg-foreground/25",
                  )}
                  style={{ width: `${((step + 1) / COLLECTION.length) * 100}%` }}
                />
              </div>

              <div className="mt-5 flex h-6 items-center gap-2 text-sm">
                {paid ? (
                  <>
                    <span className="grid size-5 place-items-center rounded-full bg-soft text-deep">
                      <svg viewBox="0 0 24 24" className="draw-check size-3" fill="none" aria-hidden="true">
                        <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-deep">Settled in 16 days · 2 reminders</span>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {COLLECTION[Math.max(0, step)]?.label} · {COLLECTION[Math.max(0, step)]?.meta}
                  </span>
                )}
              </div>

              {/* particles travelling into the invoice as payment lands */}
              {paid &&
                [0, 1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 size-1.5 rounded-full bg-primary"
                    style={{
                      ["--fx" as string]: `${[-160, 150, -130, 170, 40][n]}px`,
                      ["--fy" as string]: `${[-120, -90, 110, 80, -150][n]}px`,
                      animation: `particle-fly ${1 + n * 0.14}s cubic-bezier(0.16,1,0.3,1) ${n * 0.09}s both`,
                    }}
                  />
                ))}
            </div>

            {/* Floating events, at different depths */}
            {COLLECTION.slice(0, 4).map((e, i) => {
              const shown = step >= i;
              const o = orbits[i]!;
              return (
                <div
                  key={e.key}
                  aria-hidden="true"
                  className={cn(
                    "parallax absolute hidden items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs whitespace-nowrap card-soft transition-all duration-700 lg:flex",
                    shown ? "opacity-100" : "translate-y-2 opacity-0",
                  )}
                  style={{
                    ...o,
                    ["--depth" as string]: `${o.depth}px`,
                    animation: shown ? `float-soft ${7 + i}s ease-in-out ${o.delay} infinite` : undefined,
                  }}
                >
                  <Check
                    strokeWidth={2.5}
                    className={cn("size-3", shown ? "text-primary" : "text-muted-foreground/40")}
                  />
                  <span className="text-foreground">{e.label}</span>
                  <span className="num text-muted-foreground">{e.meta}</span>
                </div>
              );
            })}
          </div>

          {/* Mobile / tablet: the same events, as a compact list */}
          <ol className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden">
            {COLLECTION.slice(0, 4).map((e, i) => (
              <li
                key={e.key}
                className={cn(
                  "rounded-full border border-border px-3 py-1.5 text-xs transition-all duration-500",
                  step >= i ? "bg-surface text-foreground" : "text-muted-foreground/50",
                )}
              >
                {e.label}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
