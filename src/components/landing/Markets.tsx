import { useState } from "react";
import { cn } from "@/lib/utils";

const worlds = {
  India: ["₹", "GST", "UPI", "WhatsApp"],
  Global: ["$", "VAT", "Stripe", "Email"],
};

export function Markets() {
  const [side, setSide] = useState<"India" | "Global">("India");

  return (
    <section aria-labelledby="markets-heading" className="border-t border-border py-16">
      <div className="container-page flex flex-wrap items-center justify-between gap-8">
        <h2 id="markets-heading" className="text-2xl leading-tight font-semibold tracking-[-0.035em] sm:text-3xl">
          Built for India.
          <span className="block font-normal text-muted-foreground">Ready for the world.</span>
        </h2>

        <div className="flex flex-wrap items-center gap-5">
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {(Object.keys(worlds) as (keyof typeof worlds)[]).map((k) => (
              <button
                key={k}
                onClick={() => setSide(k)}
                aria-pressed={side === k}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  side === k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {worlds[side].map((t, i) => (
              <span
                key={`${side}-${t}`}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium tracking-tight"
                style={{ animation: `chip-in 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
