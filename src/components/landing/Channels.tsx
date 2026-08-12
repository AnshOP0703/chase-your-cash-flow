import { useState } from "react";
import { Mail, MessageCircle, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView, useSequence } from "./usePointer";
import { INVOICE } from "./story";

const channels = [
  { id: "Email", icon: Mail, status: "Reminder sent", preview: `Invoice ${INVOICE.number} is due today.`, meta: "Day 7" },
  { id: "WhatsApp", icon: MessageCircle, status: "Delivered", preview: `Hi ${INVOICE.contact} — quick nudge on ${INVOICE.number}.`, meta: "Day 14" },
  { id: "SMS", icon: Smartphone, status: "Sent", preview: `${INVOICE.number} overdue. Pay: tgd.to/9f2`, meta: "Day 21" },
];

export function Channels() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const pulse = useSequence(channels.length, inView, 1500, 1500);
  const [hover, setHover] = useState<number | null>(null);
  const live = hover ?? pulse;

  return (
    <section ref={ref} aria-labelledby="channels-heading" className="border-t border-border section-y">
      <div className="container-page">
        <h2 id="channels-heading" className="max-w-lg text-3xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem]">
          One invoice.
          <span className="block font-normal text-muted-foreground">Every channel.</span>
        </h2>

        <div className="relative mt-12">
          <div className="mx-auto w-fit rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium tracking-tight card-soft">
            Tagada
          </div>

          <svg viewBox="0 0 600 110" className="mx-auto h-[110px] w-full max-w-[660px]" aria-hidden="true" fill="none">
            {[110, 300, 490].map((x, i) => (
              <g key={x}>
                <path d={`M300 2 C300 55, ${x} 55, ${x} 108`} stroke="var(--border)" strokeWidth="1.5" />
                <path
                  d={`M300 2 C300 55, ${x} 55, ${x} 108`}
                  stroke="var(--primary)"
                  strokeWidth="1.75"
                  strokeDasharray="5 22"
                  className={cn("transition-opacity duration-500", live === i ? "opacity-100" : "opacity-15")}
                  style={{ animation: inView ? `dash-flow ${1.3 + i * 0.2}s linear infinite` : undefined }}
                />
              </g>
            ))}
          </svg>

          <div className="grid gap-4 sm:grid-cols-3">
            {channels.map((c, i) => {
              const on = live === i;
              return (
                <div
                  key={c.id}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className={cn(
                    "rounded-xl border bg-surface p-5 transition-all duration-500",
                    on ? "-translate-y-1.5 border-primary/30 card-lift" : "border-border card-soft",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-lg transition-colors duration-500",
                        on ? "bg-soft text-deep" : "bg-secondary text-foreground",
                      )}
                    >
                      <c.icon aria-hidden="true" strokeWidth={1.75} className="size-4" />
                    </span>
                    <span className="text-sm font-medium tracking-tight">{c.id}</span>
                    <span className="num ml-auto text-xs text-muted-foreground">{c.meta}</span>
                  </div>

                  <p
                    className={cn(
                      "mt-4 flex items-center gap-1.5 text-xs transition-colors duration-500",
                      on ? "text-deep" : "text-muted-foreground/50",
                    )}
                  >
                    {on && (
                      <svg viewBox="0 0 24 24" className="draw-check size-3" fill="none" aria-hidden="true">
                        <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {c.status}
                  </p>

                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      on ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="rounded-lg bg-surface-2 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                        {c.preview}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
