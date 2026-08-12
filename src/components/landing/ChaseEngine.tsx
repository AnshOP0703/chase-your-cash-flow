import { useEffect, useState } from "react";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView, useTypewriter } from "./usePointer";
import { INVOICE } from "./story";

const tones = [
  {
    id: "Gentle",
    text: `Hi ${INVOICE.contact} — just a quick reminder that invoice ${INVOICE.number} is due.`,
    time: "Day 7 · 10:02",
  },
  {
    id: "Standard",
    text: `Hi ${INVOICE.contact}, invoice ${INVOICE.number} is now overdue. You can pay here.`,
    time: "Day 14 · 09:30",
  },
  {
    id: "Firm",
    text: `Invoice ${INVOICE.number} is 14 days overdue. Please arrange payment today.`,
    time: "Day 21 · 09:00",
  },
];

export function ChaseEngine() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const [tone, setTone] = useState(0);
  const [typing, setTyping] = useState(true);
  const [delivered, setDelivered] = useState(false);
  const active = tones[tone]!;

  // typing indicator → message → delivered
  useEffect(() => {
    if (!inView) return;
    setTyping(true);
    setDelivered(false);
    const t = setTimeout(() => setTyping(false), 900);
    return () => clearTimeout(t);
  }, [tone, inView]);

  const { out, done } = useTypewriter(active.text, inView && !typing, 16);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDelivered(true), 700);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <section
      ref={ref}
      id="product"
      aria-labelledby="chase-heading"
      className="scroll-mt-20 border-t border-border section-y"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div>
          <h2 id="chase-heading" className="text-3xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem]">
            Friendly first.
            <span className="block font-normal text-muted-foreground">Firmer when needed.</span>
          </h2>
          <p className="mt-6 max-w-xs text-muted-foreground">Pick the tone. Tagada writes and sends it.</p>

          <div
            role="tablist"
            aria-label="Message tone"
            className="mt-8 inline-flex rounded-full border border-border bg-surface p-1"
          >
            {tones.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tone === i}
                onClick={() => setTone(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  tone === i ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.id}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface card-lift">
          <div className="flex items-center gap-3 border-b border-border px-6 py-4">
            <span className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-semibold">P</span>
            <div>
              <p className="text-sm font-medium tracking-tight">
                {INVOICE.contact} · {INVOICE.client}
              </p>
              <p className="text-xs text-muted-foreground">{typing ? "typing…" : "online"}</p>
            </div>
          </div>

          <div className="min-h-[300px] space-y-3 bg-surface-2 px-6 py-7">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3 text-sm">
              Invoice {INVOICE.number} · {INVOICE.amount} · due {INVOICE.due}
              <span className="mt-1 block text-[0.7rem] text-muted-foreground">Day 0 · 11:15</span>
            </div>

            {typing ? (
              <div className="ml-auto flex w-fit items-center gap-1.5 rounded-2xl rounded-tr-sm bg-soft px-4 py-4">
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className="size-1.5 rounded-full bg-deep"
                    style={{ animation: `typing-dot 1.1s ease-in-out ${n * 0.16}s infinite` }}
                  />
                ))}
              </div>
            ) : (
              <div
                key={active.id}
                className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-soft px-4 py-3 text-sm text-foreground"
                style={{ animation: "slide-in-up 0.45s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                {out}
                {!done && (
                  <span
                    className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-deep"
                    style={{ animation: "caret 1s steps(1) infinite" }}
                  />
                )}
                <span className="mt-1.5 flex items-center justify-end gap-1 text-[0.7rem] text-muted-foreground">
                  {active.time}
                  {delivered ? (
                    <CheckCheck aria-hidden="true" strokeWidth={2.4} className="size-3.5 text-primary" />
                  ) : (
                    <Check aria-hidden="true" strokeWidth={2.4} className="size-3 text-muted-foreground/40" />
                  )}
                </span>
              </div>
            )}

            {delivered && (
              <div
                className="ml-auto flex w-fit items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs"
                style={{ animation: "slide-in-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                <span className="size-1.5 rounded-full bg-primary" />
                Pay {INVOICE.amount}
                <span className="text-muted-foreground">· UPI, card, bank transfer</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
