import { useState } from "react";
import { cn } from "@/lib/utils";

const worlds = {
  India: ["₹", "GST", "UPI", "WhatsApp"],
  Global: ["$", "VAT", "Stripe", "Email"],
};

export function Markets() {
  const [side, setSide] = useState<"India" | "Global">("India");

  return (
    <section aria-labelledby="markets-heading" className="border-t border-border py-24 sm:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <h2 id="markets-heading" className="text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
          Built for India.
          <span className="block text-muted-foreground">Ready for the world.</span>
        </h2>

        <div>
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {(Object.keys(worlds) as (keyof typeof worlds)[]).map((k) => (
              <button
                key={k}
                onClick={() => setSide(k)}
                aria-pressed={side === k}
                className={cn(
                  "rounded-full px-5 py-2 text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  side === k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {worlds[side].map((t, i) => (
              <div
                key={`${side}-${t}`}
                className="grid h-24 place-items-center rounded-xl border border-border bg-surface text-lg font-medium tracking-tight card-soft"
                style={{ animation: `slide-in-up 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both` }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
