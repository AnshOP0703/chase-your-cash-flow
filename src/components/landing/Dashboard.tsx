import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";
import { INVOICE } from "./story";

const OUTSTANDING = 514667;
const bars = [38, 52, 44, 66, 58, 79, 92];

/** Tweens toward a target whenever it changes. */
function useTween(target: number, start: boolean, duration = 1100) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setV(target);
      return;
    }
    const a = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const val = Math.round(a + (target - a) * (1 - Math.pow(1 - p, 3)));
      setV(val);
      from.current = val;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return v;
}

const rows = [
  { name: INVOICE.client, due: "14 Mar", amount: INVOICE.amount, state: "Overdue", hero: true },
  { name: "Vertex Labs", due: "02 Mar", amount: "₹1,20,000", state: "Reminder sent" },
  { name: "Patel & Sons", due: "18 Feb", amount: "₹86,500", state: "WhatsApp sent" },
  { name: "Mira Interiors", due: "31 Jan", amount: "₹2,12,167", state: "Overdue" },
];

export function Dashboard() {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const [landed, setLanded] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const a = setTimeout(() => setLanded(true), 2200);
    const b = setTimeout(() => setToast(true), 2400);
    const c = setTimeout(() => setToast(false), 7400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, [inView]);

  const outstanding = useTween(landed ? OUTSTANDING - INVOICE.amountValue : OUTSTANDING, inView);
  const received = useTween(landed ? INVOICE.amountValue : 0, inView, 900);

  return (
    <section ref={ref} aria-labelledby="dash-heading" className="border-t border-border section-y">
      <div className="container-page">
        <h2 id="dash-heading" className="max-w-xl text-3xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem]">
          Everything after the invoice.
          <span className="block font-normal text-muted-foreground">Handled.</span>
        </h2>

        <div
          className={cn(
            "relative mt-12 overflow-hidden rounded-2xl border bg-surface transition-colors duration-1000 card-lift",
            landed ? "border-primary/25" : "border-border",
          )}
        >
          <div className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-surface p-6">
              <p className="eyebrow">Outstanding</p>
              <p className="num mt-3 text-3xl font-semibold">₹{outstanding.toLocaleString("en-IN")}</p>
              <p className="mt-2 text-sm text-muted-foreground">{landed ? "11 invoices · 2 overdue" : "12 invoices · 3 overdue"}</p>
            </div>
            <div className={cn("p-6 transition-colors duration-1000", landed ? "bg-soft/50" : "bg-surface")}>
              <p className="eyebrow">Received today</p>
              <p
                className={cn("num mt-3 text-3xl font-semibold transition-colors duration-700", landed ? "text-primary" : "text-muted-foreground/40")}
                style={landed ? { animation: "amount-pop 0.9s cubic-bezier(0.16,1,0.3,1)" } : undefined}
              >
                ₹{received.toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{INVOICE.client} · UPI</p>
            </div>
            <div className="bg-surface p-6">
              <p className="eyebrow">Collection rate</p>
              <div className="mt-4 flex h-9 items-end gap-1.5">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-full rounded-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      i === bars.length - 1 && landed ? "bg-primary" : "bg-secondary",
                    )}
                    style={{ height: inView ? `${h}%` : "4%", transitionDelay: `${i * 70}ms` }}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">92% within 30 days</p>
            </div>
          </div>

          <div className="border-t border-border p-6">
            <p className="eyebrow">Open invoices</p>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th scope="col" className="pb-3 font-normal">Client</th>
                  <th scope="col" className="pb-3 font-normal">Due</th>
                  <th scope="col" className="pb-3 text-right font-normal">Amount</th>
                  <th scope="col" className="pb-3 text-right font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const paid = Boolean(r.hero) && landed;
                  return (
                    <tr
                      key={r.name}
                      className={cn("border-t border-border transition-colors duration-700", paid ? "bg-soft/40" : "hover:bg-surface-2")}
                      style={{ animation: inView ? `row-in 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms both` : undefined }}
                    >
                      <td className="py-3.5 font-medium tracking-tight">{r.name}</td>
                      <td className="num py-3.5 text-muted-foreground">{r.due}</td>
                      <td className="num py-3.5 text-right">{r.amount}</td>
                      <td className="py-3.5 text-right">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all duration-700",
                            paid ? "bg-soft text-deep" : "text-muted-foreground",
                          )}
                        >
                          {paid && (
                            <svg viewBox="0 0 24 24" className="draw-check size-3" fill="none" aria-hidden="true">
                              <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {paid ? "Paid" : r.state}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {toast && (
            <div
              className="absolute right-5 bottom-5 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm card-lift"
              style={{ animation: "slide-in-up 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <span className="size-1.5 rounded-full bg-primary" style={{ animation: "tag-pulse 2s ease-in-out infinite" }} />
              <span className="num">{INVOICE.amount}</span>
              <span className="text-muted-foreground">received · {INVOICE.client}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
