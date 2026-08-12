import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "./usePointer";
import { INVOICE } from "./story";

const without = [
  { label: "Invoice sent", gap: "" },
  { label: "Reminder", gap: "7 days" },
  { label: "WhatsApp", gap: "14 days" },
  { label: "Still waiting", gap: "21 days" },
];

const withTagada = [
  { label: "Invoice sent", gap: "" },
  { label: "Reminder", gap: "auto" },
  { label: "WhatsApp", gap: "auto" },
  { label: "Paid", gap: "day 16" },
];

export function Problem() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const [picked, setPicked] = useState<null | "with" | "without">(null);
  const scrolled = Math.min(1, Math.max(0, (progress - 0.3) / 0.28));
  const mode = picked ?? (progress > 0.62 ? "with" : "without");
  const on = mode === "with";
  const steps = on ? withTagada : without;
  const build = on ? 1 : scrolled;

  return (
    <section ref={ref} aria-labelledby="problem-heading" className="border-t border-border section-y">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="problem-heading"
            className="max-w-xl text-3xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem]"
          >
            Getting paid shouldn&rsquo;t
            <span className="block font-normal text-muted-foreground">require chasing.</span>
          </h2>

          <div role="group" aria-label="Compare" className="inline-flex rounded-full border border-border bg-surface p-1">
            {(["without", "with"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setPicked(k)}
                aria-pressed={mode === k}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  mode === k
                    ? k === "with"
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {k === "with" ? "With Tagada" : "Without Tagada"}
              </button>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "relative mt-12 overflow-hidden rounded-2xl border p-8 transition-all duration-700 sm:p-12",
            on ? "border-primary/25 bg-surface card-lift" : "border-border bg-surface-2",
          )}
        >
          <p className="num text-xs text-muted-foreground">
            {INVOICE.client} · {INVOICE.number} · {INVOICE.amount}
          </p>

          <ol className="relative mt-10 flex items-start">
            {steps.map((s, i) => {
              const reach = build >= (i + 0.35) / steps.length;
              const last = i === steps.length - 1;
              return (
                <li key={`${mode}-${s.label}`} className="relative flex flex-1 flex-col gap-5">
                  {i > 0 && (
                    <span aria-hidden="true" className="absolute top-[7px] right-1/2 left-[-50%] h-px bg-border">
                      <span
                        className={cn(
                          "block h-px origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          on ? "bg-primary" : "bg-foreground/35",
                        )}
                        style={{ transform: `scaleX(${reach ? 1 : 0})`, transitionDelay: `${i * 120}ms` }}
                      />
                    </span>
                  )}
                  <span
                    className={cn(
                      "relative z-10 size-[15px] rounded-full border-2 transition-all duration-500",
                      reach
                        ? last
                          ? on
                            ? "scale-125 border-transparent bg-primary"
                            : "border-foreground bg-foreground"
                          : on
                            ? "border-primary bg-surface"
                            : "border-foreground/45 bg-background"
                        : "border-border bg-background",
                    )}
                    style={reach && last && on ? { animation: "pulse-ring 2s ease-out 1" } : undefined}
                  />
                  <span
                    className={cn(
                      "text-sm tracking-tight transition-all duration-500",
                      reach ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                      last && on ? "font-medium text-deep" : "text-foreground",
                    )}
                  >
                    {last && on ? `${INVOICE.amount} paid` : s.label}
                  </span>
                  {s.gap && (
                    <span
                      className={cn(
                        "num -mt-3 text-xs transition-opacity duration-500",
                        reach ? "opacity-100" : "opacity-0",
                        on ? "text-primary/70" : "text-muted-foreground",
                      )}
                    >
                      {s.gap}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          <p className="mt-12 max-w-sm text-sm text-muted-foreground">
            {on
              ? "Same invoice. No calendar reminders, no awkward messages, no spreadsheet."
              : "Three weeks of admin, and the money still isn't in."}
          </p>
        </div>
      </div>
    </section>
  );
}
