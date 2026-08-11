import { useEffect, useState } from "react";
import { Send, Bell, MessageCircle, Check, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticCta } from "./MagneticCta";
import { usePointerVars } from "./usePointer";

const steps = [
  { icon: Send, label: "Invoice sent", meta: "Email" },
  { icon: Bell, label: "Reminder", meta: "Day 7" },
  { icon: MessageCircle, label: "WhatsApp", meta: "Day 14" },
  { icon: Check, label: "Payment received", meta: "UPI" },
];

/** Advances through the story, holding on the PAID state before restarting. */
function useStory(count: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(count - 1);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const tick = (n: number) => {
      t = setTimeout(
        () => {
          const next = (n + 1) % count;
          setI(next);
          tick(next);
        },
        n === count - 1 ? 3400 : 2200,
      );
    };
    tick(0);
    return () => clearTimeout(t);
  }, [count]);
  return i;
}

export function Hero() {
  const { ref, active } = usePointerVars<HTMLElement>();
  const step = useStory(steps.length);
  const paid = step === steps.length - 1;

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden">
      {/* background: barely-there grid + green wash + cursor light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-10%] h-[520px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 70%)",
        }}
      />
      {active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(360px circle at var(--cx, 50%) var(--cy, 30%), color-mix(in oklab, var(--primary) 7%, transparent), transparent 72%)",
          }}
        />
      )}

      <div className="container-page relative pt-16 pb-24 sm:pt-24 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center gap-2">
            <span
              className="size-1.5 rounded-full bg-primary"
              style={{ animation: "tag-pulse 2.6s ease-in-out infinite" }}
            />
            Automated collections for modern businesses
          </p>
          <h1 className="mt-6 text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-[4.5rem]">
            Send the invoice.
            <span className="block text-muted-foreground">We chase the payment.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">
            Tagada sends the invoice, follows up automatically, and stops the moment you get paid.
          </p>
          <div id="waitlist" className="mt-9 flex flex-wrap items-center justify-center gap-3 scroll-mt-28">
            <MagneticCta href="#early-access">Get early access</MagneticCta>
            <MagneticCta href="#how-it-works" variant="ghost">
              See how it works <ArrowDown aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </MagneticCta>
          </div>
        </div>

        {/* Product visual */}
        <div className="relative mx-auto mt-16 max-w-4xl sm:mt-20">
          <div
            className="parallax pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-[2rem] bg-soft/60 blur-2xl"
            style={{ ["--depth" as string]: "-10px" }}
            aria-hidden="true"
          />

          <div
            className="tilt-3d grid overflow-hidden rounded-2xl border border-border bg-surface card-lift md:grid-cols-[1.15fr_1fr]"
            style={{ ["--depth" as string]: "8px" }}
          >
            {/* Invoice panel */}
            <div className="border-b border-border p-7 sm:p-9 md:border-r md:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-secondary text-xs font-semibold">
                    NC
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium tracking-tight">Northline Creative</p>
                    <p className="text-xs text-muted-foreground">Invoice #0042</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all duration-700",
                    paid
                      ? "bg-soft text-deep"
                      : "border border-border text-muted-foreground",
                  )}
                >
                  {paid ? "Paid" : "Awaiting payment"}
                </span>
              </div>

              <p
                className={cn(
                  "num mt-8 font-display text-[3.25rem] leading-none font-semibold transition-all duration-700",
                  paid ? "scale-[1.03] text-primary" : "text-foreground",
                )}
              >
                ₹48,000
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Due 14 March · Design retainer</p>

              <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    paid ? "bg-primary" : "bg-foreground/25",
                  )}
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>

              {paid && (
                <div
                  className="mt-6 flex items-center gap-2 text-sm text-deep"
                  style={{ animation: "slide-in-up 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
                >
                  <span className="grid size-6 place-items-center rounded-full bg-soft">
                    <svg viewBox="0 0 24 24" className="draw-check size-3.5" fill="none" aria-hidden="true">
                      <path
                        d="M5 12.5 10 17.5 19 7"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Settled in 16 days · 2 reminders
                </div>
              )}
            </div>

            {/* Collection timeline */}
            <div className="bg-surface-2 p-7 sm:p-9">
              <p className="eyebrow">Collection timeline</p>
              <ol className="mt-6 space-y-1">
                {steps.map((s, i) => {
                  const done = i <= step;
                  const current = i === step;
                  const isPaid = i === steps.length - 1 && done;
                  return (
                    <li
                      key={s.label}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-500",
                        current ? "bg-surface card-soft" : "bg-transparent",
                        done ? "opacity-100" : "opacity-40",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-500",
                          isPaid
                            ? "border-transparent bg-primary text-primary-foreground"
                            : done
                              ? "border-border bg-surface text-foreground"
                              : "border-border text-muted-foreground",
                        )}
                        style={isPaid ? { animation: "pulse-ring 1.8s ease-out 2" } : undefined}
                      >
                        <s.icon aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
                      </span>
                      <span className="flex-1 text-sm tracking-tight">{s.label}</span>
                      <span className="num text-xs text-muted-foreground">{s.meta}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Floating surfaces */}
          <div
            className="parallax absolute -top-7 -left-6 hidden rounded-xl border border-border bg-surface px-4 py-3 text-xs card-soft lg:block"
            style={{ ["--depth" as string]: "26px", animation: "float-soft 8s ease-in-out infinite" }}
          >
            <span className="text-muted-foreground">This week</span>
            <p className="num mt-1 text-sm font-medium">7 reminders sent</p>
          </div>
          <div
            className="parallax absolute -right-6 -bottom-8 hidden items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-xs card-soft lg:flex"
            style={{ ["--depth" as string]: "34px", animation: "float-soft 10s ease-in-out infinite" }}
          >
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">
              <span className="num text-foreground">₹48,000</span> received · UPI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
