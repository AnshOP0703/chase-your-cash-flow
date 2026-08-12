import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";
import { WaitlistForm } from "./WaitlistForm";
import { INVOICE, COLLECTION } from "./story";

export function FinalCta() {
  const { ref, inView } = useInView<HTMLElement>(0.3);

  return (
    <section
      ref={ref}
      id="early-access"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-border section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 100%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 72%)",
        }}
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <h2 id="cta-heading" className="text-4xl leading-[1.0] font-semibold tracking-[-0.045em] sm:text-[3.75rem]">
            Stop chasing.
            <span className="block font-normal text-muted-foreground">Start collecting.</span>
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Your invoices should follow a process — not your calendar.
          </p>
          <div className="mt-8 max-w-md">
            <WaitlistForm id="early-access" submitLabel="Get early access" />
          </div>
        </div>

        {/* the same invoice, finally settled */}
        <div
          className={cn(
            "rounded-2xl border border-primary/30 bg-surface p-7 transition-all duration-700 card-lift",
            inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <div className="flex items-center justify-between">
            <p className="num text-xs text-muted-foreground">
              {INVOICE.client} · {INVOICE.number}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1 text-xs text-deep">
              {inView && (
                <svg viewBox="0 0 24 24" className="draw-check size-3" fill="none" aria-hidden="true">
                  <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              Paid
            </span>
          </div>

          <p
            className="num mt-7 font-display text-[3.25rem] leading-none font-semibold text-primary"
            style={inView ? { animation: "amount-pop 1s cubic-bezier(0.16,1,0.3,1) 0.3s both" } : undefined}
          >
            {INVOICE.amount}
          </p>

          <ol className="mt-8 space-y-2.5">
            {COLLECTION.map((c, i) => (
              <li
                key={c.key}
                className="flex items-center gap-3 text-sm"
                style={inView ? { animation: `chip-in 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 140}ms both` } : { opacity: 0 }}
              >
                <span className="grid size-5 place-items-center rounded-full bg-soft text-deep">
                  <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden="true">
                    <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flex-1 text-foreground">{c.label}</span>
                <span className="num text-xs text-muted-foreground">{c.meta}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
