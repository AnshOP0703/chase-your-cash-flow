import { Check, MessageCircle, Send, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticCta } from "./MagneticCta";
import { usePointerVars, useCycle } from "./usePointer";

const steps = [
  { icon: Send, label: "Invoice sent", meta: "Email + WhatsApp" },
  { icon: Bell, label: "Reminder sent", meta: "Day 7 · gentle" },
  { icon: MessageCircle, label: "WhatsApp follow-up", meta: "Day 14 · pay link" },
  { icon: Check, label: "Payment received", meta: "₹48,000 · UPI" },
];

export function Hero() {
  const { ref, active } = usePointerVars<HTMLElement>();
  const step = useCycle(steps.length, 2000);
  const paid = step === steps.length - 1;

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden border-b border-border"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
      {active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(420px circle at var(--cx, 50%) var(--cy, 30%), color-mix(in oklab, var(--primary) 9%, transparent), transparent 70%)",
          }}
        />
      )}

      <div className="container-page relative grid gap-16 pt-20 pb-24 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:pt-28 lg:pb-32">
        <div className="parallax max-w-xl" style={{ ["--depth" as string]: "-6px" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs tracking-tight text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" style={{ animation: "tag-pulse 2.4s ease-in-out infinite" }} />
            Now in private beta
          </span>
          <h1 className="mt-6 text-[3rem] leading-[0.98] font-semibold tracking-[-0.04em] sm:text-[4.25rem]">
            Send the invoice.
            <span className="block text-muted-foreground">We chase the payment.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Tagada automatically follows up until you're paid.
          </p>
          <div id="waitlist" className="mt-9 flex flex-wrap items-center gap-3 scroll-mt-28">
            <MagneticCta href="#early-access">Get early access</MagneticCta>
            <MagneticCta href="#how-it-works" variant="ghost">
              See how it works
            </MagneticCta>
          </div>
        </div>

        <div className="parallax relative" style={{ ["--depth" as string]: "14px" }}>
          <div
            className="tilt-3d relative rounded-xl border border-border bg-surface p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">Invoice #0042</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight tabular-nums">₹48,000</p>
                <p className="mt-1.5 text-sm text-muted-foreground">Northline Creative · Due 14 March</p>
              </div>
              <span
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-semibold tracking-tight transition-colors duration-500",
                  paid ? "bg-success text-success-foreground" : "border border-border text-muted-foreground",
                )}
              >
                {paid ? "PAID" : "Sent"}
              </span>
            </div>

            <ol className="mt-6 space-y-1">
              {steps.map((s, i) => {
                const done = i <= step;
                const current = i === step;
                return (
                  <li
                    key={s.label}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-2.5 transition-all duration-500",
                      current ? "bg-surface-2" : "bg-transparent",
                      done ? "opacity-100" : "opacity-35",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors duration-500",
                        i === steps.length - 1 && done
                          ? "border-transparent bg-success text-success-foreground"
                          : done
                            ? "border-border bg-surface-2 text-foreground"
                            : "border-border text-muted-foreground",
                      )}
                    >
                      <s.icon aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
                    </span>
                    <span className="flex-1 text-sm font-medium tracking-tight">{s.label}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{s.meta}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div
            className="parallax absolute -top-6 -left-6 hidden rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-xs text-muted-foreground sm:block"
            style={{ ["--depth" as string]: "26px", animation: "float-soft 7s ease-in-out infinite" }}
          >
            <span className="text-foreground">3</span> reminders sent this week
          </div>
          <div
            className="parallax absolute -right-4 -bottom-6 hidden rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-xs sm:block"
            style={{ ["--depth" as string]: "34px", animation: "float-soft 9s ease-in-out infinite" }}
          >
            <span className="text-success">●</span>{" "}
            <span className="text-muted-foreground">₹48,000 received · UPI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
