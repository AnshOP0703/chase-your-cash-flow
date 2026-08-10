import { useState } from "react";
import { cn } from "@/lib/utils";

const tones = {
  Gentle: {
    channel: "WhatsApp · Day 7",
    msg: "Hi Priya, just a quick reminder that invoice #0042 is due.",
  },
  Standard: {
    channel: "WhatsApp · Day 14",
    msg: "Hi Priya, invoice #0042 is now overdue. You can pay here.",
  },
  Firm: {
    channel: "WhatsApp · Day 21",
    msg: "Invoice #0042 is 14 days overdue. Please arrange payment today.",
  },
} as const;

type Tone = keyof typeof tones;
const keys = Object.keys(tones) as Tone[];

export function ChaseEngine() {
  const [tone, setTone] = useState<Tone>("Gentle");
  const active = tones[tone];

  return (
    <section id="product" aria-labelledby="chase-heading" className="scroll-mt-20 border-b border-border py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <h2 id="chase-heading" className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Friendly first.
            <span className="block text-muted-foreground">Firmer when needed.</span>
          </h2>
          <div role="tablist" aria-label="Reminder tone" className="mt-9 inline-flex rounded-md border border-border p-1">
            {keys.map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tone === k}
                onClick={() => setTone(k)}
                className={cn(
                  "rounded px-4 py-2 text-sm font-medium tracking-tight transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  tone === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 sm:p-7">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">
              P
            </span>
            <div>
              <p className="text-sm font-medium tracking-tight">Priya · Northline Creative</p>
              <p className="text-xs text-muted-foreground">{active.channel}</p>
            </div>
          </div>
          <div key={tone} className="mt-6" style={{ animation: "row-in 0.35s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p className="max-w-sm rounded-lg rounded-bl-sm bg-surface-2 px-4 py-3 text-sm leading-relaxed">
              {active.msg}
            </p>
            <div className="mt-3 max-w-sm rounded-lg border border-border px-4 py-3">
              <p className="text-xs text-muted-foreground">Invoice #0042 · ₹48,000</p>
              <p className="mt-1 text-sm font-medium text-primary">Pay now →</p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Delivered · 09:14</p>
          </div>
        </div>
      </div>
    </section>
  );
}
