import { cn } from "@/lib/utils";
import { useScrollProgress } from "./usePointer";

const manual = ["Invoice sent", "7 days", "Reminder", "14 days", "WhatsApp", "21 days", "Still waiting"];
const tagada = ["Invoice sent", "Reminder", "WhatsApp", "Paid"];

export function Problem() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  // 0.25 → 0.75 of the section drives the manual timeline, then Tagada resolves.
  const p = Math.min(1, Math.max(0, (progress - 0.28) / 0.34));
  const resolved = progress > 0.62;

  return (
    <section ref={ref} aria-labelledby="problem-heading" className="border-t border-border py-24 sm:py-36">
      <div className="container-page">
        <h2
          id="problem-heading"
          className="max-w-2xl text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl"
        >
          Getting paid shouldn&rsquo;t
          <span className="block text-muted-foreground">require chasing.</span>
        </h2>

        <div className="mt-16 space-y-10">
          {/* Manual */}
          <div className="relative">
            <p className="eyebrow">Without Tagada</p>
            <div className="relative mt-6 overflow-hidden">
              <div className="absolute top-[26px] right-0 left-0 h-px bg-border" />
              <div
                className="absolute top-[26px] left-0 h-px bg-foreground/40 transition-[width] duration-300 ease-out"
                style={{ width: `${p * 100}%` }}
              />
              <ol className="relative flex items-start justify-between gap-2 overflow-x-auto pb-2">
                {manual.map((label, i) => {
                  const on = p >= (i + 0.4) / manual.length;
                  const last = i === manual.length - 1;
                  return (
                    <li key={label} className="flex min-w-[74px] flex-1 flex-col items-center gap-4 text-center">
                      <span
                        className={cn(
                          "mt-[19px] size-[15px] rounded-full border-2 bg-background transition-all duration-500",
                          on
                            ? last
                              ? "scale-110 border-foreground bg-foreground"
                              : "border-foreground/50"
                            : "border-border",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs tracking-tight transition-all duration-500",
                          on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                          i % 2 === 1 ? "num text-muted-foreground" : "font-medium",
                          last && on && "text-foreground",
                        )}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Tagada */}
          <div
            className={cn(
              "rounded-2xl border border-border bg-surface p-7 transition-all duration-700 sm:p-9",
              resolved ? "translate-y-0 opacity-100 card-soft" : "translate-y-4 opacity-40",
            )}
          >
            <p className="eyebrow text-deep">With Tagada</p>
            <div className="relative mt-6">
              <div className="absolute top-[7px] right-0 left-0 h-px bg-border" />
              <div
                className="absolute top-[7px] left-0 h-px bg-primary transition-[width] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: resolved ? "100%" : "0%" }}
              />
              <ol className="relative flex items-start justify-between gap-2">
                {tagada.map((label, i) => {
                  const last = i === tagada.length - 1;
                  return (
                    <li key={label} className="flex flex-1 flex-col items-center gap-4 text-center">
                      <span
                        className={cn(
                          "size-[15px] rounded-full border-2 bg-surface transition-all duration-700",
                          resolved
                            ? last
                              ? "scale-125 border-transparent bg-primary"
                              : "border-primary"
                            : "border-border",
                        )}
                        style={
                          resolved && last ? { transitionDelay: "900ms", animation: "pulse-ring 2s ease-out 1.1s 2" } : { transitionDelay: `${i * 220}ms` }
                        }
                      />
                      <span
                        className={cn(
                          "text-xs font-medium tracking-tight transition-colors duration-500",
                          last && resolved ? "text-deep" : "text-foreground",
                        )}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="mt-8 max-w-md text-sm text-muted-foreground">
              Same invoice. No calendar reminders, no awkward messages, no spreadsheet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
