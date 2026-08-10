import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";

const rows = [
  { name: "Northline Creative", avg: "3 days", score: "On time", tone: "good" },
  { name: "Vertex Labs", avg: "9 days", score: "On time", tone: "good" },
  { name: "Patel & Sons", avg: "24 days", score: "Slow", tone: "warn" },
  { name: "Mira Interiors", avg: "41 days", score: "Risky", tone: "bad" },
] as const;

export function ClientScores() {
  const { ref, inView } = useInView<HTMLElement>(0.25);

  return (
    <section ref={ref} aria-labelledby="scores-heading" className="border-b border-border py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div>
          <h2 id="scores-heading" className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Know who pays late.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">Tagada learns how your clients pay.</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-[1.4fr_1fr_auto] gap-4 border-b border-border px-6 py-3 text-xs tracking-[0.12em] text-muted-foreground uppercase">
            <span>Client</span>
            <span>Avg. payment time</span>
            <span>Score</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.name}
              style={{ animation: inView ? `row-in 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 130}ms both` : undefined }}
              className={cn(
                "grid grid-cols-[1.4fr_1fr_auto] items-center gap-4 border-b border-border px-6 py-4 text-sm transition-colors last:border-0 hover:bg-surface-2",
                inView ? "" : "opacity-0",
              )}
            >
              <span className="font-medium tracking-tight">{r.name}</span>
              <span className="text-muted-foreground tabular-nums">{r.avg}</span>
              <span
                className={cn(
                  "justify-self-end rounded px-2 py-0.5 text-xs font-medium",
                  r.tone === "good" && "text-success",
                  r.tone === "warn" && "text-muted-foreground",
                  r.tone === "bad" && "bg-primary text-primary-foreground",
                )}
              >
                {r.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
