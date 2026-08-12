import { Check, Mail, MessageCircle, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress, useSequence } from "./usePointer";
import { INVOICE } from "./story";

const stages = [
  { n: "01", title: "Send", copy: "Create the invoice. That's your part." },
  { n: "02", title: "Chase", copy: "Tagada follows up until someone pays." },
  { n: "03", title: "Get paid", copy: "The moment money lands, everything stops." },
];

const working = [
  { label: "Invoice sent", icon: Mail },
  { label: "Reminder scheduled", icon: Check },
  { label: "Email reminder sent", icon: Mail },
  { label: "WhatsApp follow-up sent", icon: MessageCircle },
  { label: "Payment link opened", icon: Smartphone },
];

export function HowItWorks() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const p = Math.min(1, Math.max(0, (progress - 0.2) / 0.55));
  const step = p > 0.72 ? 2 : p > 0.34 ? 1 : 0;
  const paid = step === 2;
  const tick = useSequence(working.length, step === 1, 900, 900);

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-heading"
      className="scroll-mt-20 border-t border-border section-y"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-28">
            <h2 id="how-heading" className="text-3xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem]">
              Three steps.
              <span className="block font-normal text-muted-foreground">Then you&rsquo;re done.</span>
            </h2>

            <ol className="mt-10 space-y-1">
              {stages.map((s, i) => (
                <li
                  key={s.n}
                  className={cn(
                    "rounded-xl border-l-2 py-4 pl-5 transition-all duration-500",
                    step === i ? "border-primary" : "border-border",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span className={cn("num text-xs transition-colors", step === i ? "text-primary" : "text-muted-foreground")}>
                      {s.n}
                    </span>
                    <h3
                      className={cn(
                        "text-lg font-medium tracking-tight transition-colors duration-500",
                        step === i ? "text-foreground" : "text-muted-foreground/60",
                      )}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "mt-1 max-w-xs text-sm text-muted-foreground transition-all duration-500",
                      step === i ? "opacity-100" : "opacity-0 lg:h-0 lg:overflow-hidden",
                    )}
                  >
                    {s.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          {/* scroll runway that drives the steps above */}
          <div aria-hidden="true" className="hidden lg:block lg:h-[120vh]" />
        </div>

        {/* One product surface that morphs between the three steps. */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div
            className={cn(
              "overflow-hidden rounded-2xl border bg-surface transition-colors duration-700 card-lift",
              paid ? "border-primary/30" : "border-border",
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <p className="num text-xs text-muted-foreground">
                {INVOICE.client} · {INVOICE.number}
              </p>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs transition-all duration-700",
                  paid ? "bg-soft text-deep" : step === 1 ? "bg-secondary text-foreground" : "border border-border text-muted-foreground",
                )}
              >
                {paid ? "Paid" : step === 1 ? "Chasing" : "Draft"}
              </span>
            </div>

            <div className="px-6 py-7">
              <p
                className={cn(
                  "num font-display text-[2.75rem] leading-none font-semibold transition-colors duration-700",
                  paid ? "text-primary" : step === 0 ? "text-muted-foreground/40" : "text-foreground",
                )}
                style={paid ? { animation: "amount-pop 0.9s cubic-bezier(0.16,1,0.3,1)" } : undefined}
              >
                {INVOICE.amount}
              </p>

              <div className="mt-7 min-h-[232px]">
                {step === 0 && (
                  <div className="space-y-2.5">
                    {[
                      ["Client", INVOICE.client],
                      ["Amount", INVOICE.amount],
                      ["Due date", INVOICE.due],
                    ].map(([k, v], i) => (
                      <div
                        key={k}
                        className="flex items-center justify-between rounded-lg border border-border px-3.5 py-3 text-sm"
                        style={{ animation: `chip-in 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms both` }}
                      >
                        <span className="text-muted-foreground">{k}</span>
                        <span className="num font-medium">{v}</span>
                      </div>
                    ))}
                    <div className="mt-3 rounded-lg bg-foreground px-3 py-3 text-center text-sm font-medium text-background">
                      Send invoice
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <ul className="space-y-2">
                    {working.map((w, i) => {
                      const done = tick >= i;
                      return (
                        <li
                          key={w.label}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm transition-all duration-500",
                            done ? "bg-surface-2 opacity-100" : "opacity-35",
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-6 place-items-center rounded-full transition-colors duration-500",
                              done ? "bg-soft text-deep" : "border border-border text-muted-foreground",
                            )}
                          >
                            {done ? (
                              <svg viewBox="0 0 24 24" className="draw-check size-3" fill="none" aria-hidden="true">
                                <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <w.icon strokeWidth={1.75} className="size-3" aria-hidden="true" />
                            )}
                          </span>
                          {w.label}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {paid && (
                  <div className="grid h-[232px] place-items-center text-center" style={{ animation: "chip-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
                    <div>
                      <span
                        className="mx-auto grid size-14 place-items-center rounded-full bg-soft text-deep"
                        style={{ animation: "pulse-ring 2s ease-out 2" }}
                      >
                        <svg viewBox="0 0 24 24" className="draw-check size-6" fill="none" aria-hidden="true">
                          <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="mt-5 text-sm font-medium tracking-tight">Paid in full · UPI</p>
                      <p className="mt-1 text-sm text-muted-foreground">Reminders stopped automatically.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-1 w-full bg-secondary">
              <div
                className={cn("h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", paid ? "bg-primary" : "bg-foreground/25")}
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
