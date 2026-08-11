import { useState } from "react";
import { Mail, MessageCircle, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";

const channels = [
  { id: "Email", icon: Mail, preview: "Reminder: invoice #0042 is due today.", meta: "Day 7" },
  { id: "WhatsApp", icon: MessageCircle, preview: "Hi Priya — quick nudge on #0042.", meta: "Day 14" },
  { id: "SMS", icon: Smartphone, preview: "#0042 is overdue. Pay: tgd.to/9f2", meta: "Day 21" },
];

export function Channels() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section ref={ref} aria-labelledby="channels-heading" className="border-t border-border py-24 sm:py-36">
      <div className="container-page">
        <h2 id="channels-heading" className="max-w-lg text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
          One invoice.
          <span className="block text-muted-foreground">Every channel.</span>
        </h2>

        <div className="relative mt-16">
          <div className="mx-auto w-fit rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium tracking-tight card-soft">
            Tagada
          </div>

          <svg
            viewBox="0 0 600 120"
            className="mx-auto mt-2 h-[120px] w-full max-w-[640px]"
            aria-hidden="true"
            fill="none"
          >
            {[110, 300, 490].map((x, i) => (
              <g key={x}>
                <path
                  d={`M300 4 C300 60, ${x} 60, ${x} 116`}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                <path
                  d={`M300 4 C300 60, ${x} 60, ${x} 116`}
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeDasharray="4 20"
                  className={cn("transition-opacity duration-500", hover === null || hover === i ? "opacity-100" : "opacity-20")}
                  style={{ animation: inView ? `dash-flow ${1.6 + i * 0.25}s linear infinite` : undefined }}
                />
              </g>
            ))}
          </svg>

          <div className="grid gap-4 sm:grid-cols-3">
            {channels.map((c, i) => (
              <div
                key={c.id}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={cn(
                  "rounded-2xl border border-border bg-surface p-5 transition-all duration-500",
                  hover === i ? "-translate-y-1.5 border-foreground/15 card-lift" : "card-soft",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-secondary">
                    <c.icon aria-hidden="true" strokeWidth={1.75} className="size-4" />
                  </span>
                  <span className="text-sm font-medium tracking-tight">{c.id}</span>
                  <span className="num ml-auto text-xs text-muted-foreground">{c.meta}</span>
                </div>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hover === i ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="rounded-lg bg-surface-2 px-3 py-3 text-xs leading-relaxed text-muted-foreground">
                      {c.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
