import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView, useTypewriter } from "./usePointer";

const tones = [
  {
    id: "Gentle",
    text: "Hi Priya — just a quick reminder that invoice #0042 is due.",
    time: "Day 7 · 10:02",
  },
  {
    id: "Standard",
    text: "Hi Priya, invoice #0042 is now overdue. You can pay here.",
    time: "Day 14 · 09:30",
  },
  {
    id: "Firm",
    text: "Invoice #0042 is 14 days overdue. Please arrange payment today.",
    time: "Day 21 · 09:00",
  },
];

export function ChaseEngine() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const [tone, setTone] = useState(0);
  const active = tones[tone]!;
  const { out, done } = useTypewriter(active.text, inView, 18);

  return (
    <section
      ref={ref}
      id="product"
      aria-labelledby="chase-heading"
      className="scroll-mt-20 border-t border-border py-24 sm:py-36"
    >
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <h2 id="chase-heading" className="text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
            Friendly first.
            <span className="block text-muted-foreground">Firmer when needed.</span>
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Choose the tone. Tagada writes and sends every follow-up.
          </p>

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
                  tone === i
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.id}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 card-lift sm:p-8">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-semibold">P</span>
            <div>
              <p className="text-sm font-medium tracking-tight">Priya · Northline Creative</p>
              <p className="text-xs text-muted-foreground">WhatsApp Business</p>
            </div>
          </div>

          <div className="min-h-[220px] space-y-3 pt-6">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-border bg-surface-2 px-4 py-3 text-sm">
              Invoice #0042 · ₹48,000 · due 14 March
              <span className="mt-1 block text-[0.7rem] text-muted-foreground">Day 0 · 11:15</span>
            </div>

            <div
              key={active.id}
              className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-soft px-4 py-3 text-sm text-foreground"
              style={{ animation: "slide-in-up 0.45s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              {out}
              {!done && (
                <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-deep" style={{ animation: "caret 1s steps(1) infinite" }} />
              )}
              <span className="mt-1.5 flex items-center justify-end gap-1 text-[0.7rem] text-muted-foreground">
                {active.time}
                <Check
                  aria-hidden="true"
                  strokeWidth={2.5}
                  className={cn("size-3 transition-colors duration-500", done ? "text-primary" : "text-muted-foreground/40")}
                />
              </span>
            </div>

            {done && (
              <div
                className="ml-auto w-fit rounded-full border border-border px-3 py-1.5 text-[0.7rem] text-muted-foreground"
                style={{ animation: "slide-in-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                Pay link attached · UPI, card, bank transfer
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
