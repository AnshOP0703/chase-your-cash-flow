import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";

const chasing = ["Invoice sent", "7 days", "Reminder", "14 days", "WhatsApp", "21 days", "Still waiting…"];
const handled = ["Invoice sent", "Reminder", "WhatsApp", "Paid"];

export function Problem() {
  const { ref, inView } = useInView<HTMLElement>(0.3);

  return (
    <section ref={ref} aria-labelledby="problem-heading" className="border-b border-border py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="problem-heading" className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Still chasing invoices?
          </h2>
          <ol className="mt-10 space-y-0">
            {chasing.map((t, i) => {
              const isGap = /days/.test(t);
              return (
                <li
                  key={t}
                  style={{ animation: inView ? `row-in 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms both` : undefined }}
                  className={cn("flex items-center gap-4", inView ? "" : "opacity-0")}
                >
                  <span aria-hidden="true" className="flex w-3 justify-center">
                    <span className={cn("h-9 w-px", isGap ? "bg-border" : "bg-transparent")} />
                    {!isGap && <span className="size-2 rounded-full border border-border bg-surface-2" />}
                  </span>
                  <span
                    className={cn(
                      "py-1 text-sm tracking-tight",
                      isGap ? "text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase" : "font-medium",
                      t === "Still waiting…" && "text-destructive",
                    )}
                  >
                    {t}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative rounded-xl border border-border bg-surface p-8">
          <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Tagada handles it.</h3>
          <ol className="mt-10 space-y-4">
            {handled.map((t, i) => {
              const paid = t === "Paid";
              return (
                <li
                  key={t}
                  style={{
                    animation: inView ? `row-in 0.5s cubic-bezier(0.16,1,0.3,1) ${600 + i * 220}ms both` : undefined,
                  }}
                  className={cn("flex items-center gap-3", inView ? "" : "opacity-0")}
                >
                  <span
                    className={cn(
                      "flex size-2 rounded-full",
                      paid ? "bg-success" : "bg-muted-foreground",
                    )}
                  />
                  <span className={cn("text-sm font-medium tracking-tight", paid && "text-success")}>
                    {t}
                    {paid && " ✓"}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">
            Zero follow-ups written by you.
          </p>
        </div>
      </div>
    </section>
  );
}
