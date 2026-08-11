import { cn } from "@/lib/utils";
import { useInView, useCycle } from "./usePointer";
import { WaitlistForm } from "./WaitlistForm";

const flow = ["Invoice", "Reminder", "WhatsApp", "Paid"];

export function FinalCta() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const step = useCycle(flow.length, 1900);

  return (
    <section
      ref={ref}
      id="early-access"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-border py-28 sm:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 100%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%)",
        }}
      />

      <div className="container-page relative mx-auto max-w-xl text-center">
        <h2 id="cta-heading" className="text-4xl leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl">
          Stop chasing.
          <span className="block text-muted-foreground">Start collecting.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          Your invoices should follow a process — not your calendar.
        </p>

        <div className="mx-auto mt-9 max-w-md text-left">
          <WaitlistForm id="early-access" submitLabel="Get early access" />
        </div>

        {/* the process, one more time */}
        <ol className="mx-auto mt-14 flex max-w-md items-center justify-between">
          {flow.map((f, i) => {
            const done = inView && i <= step;
            const last = i === flow.length - 1;
            return (
              <li key={f} className="flex flex-1 flex-col items-center gap-3">
                <span
                  className={cn(
                    "size-2 rounded-full transition-all duration-500",
                    done ? (last ? "scale-150 bg-primary" : "bg-foreground/40") : "bg-border",
                  )}
                />
                <span className={cn("text-xs transition-colors duration-500", done ? (last ? "text-deep" : "text-foreground") : "text-muted-foreground")}>
                  {f}
                </span>
              </li>
            );
          })}
        </ol>

        <p
          className={cn(
            "num mt-8 text-2xl font-semibold transition-all duration-700",
            step === flow.length - 1 ? "scale-105 text-primary opacity-100" : "opacity-30",
          )}
        >
          ₹48,000 <span className="text-base font-normal">paid</span>
        </p>
      </div>
    </section>
  );
}
