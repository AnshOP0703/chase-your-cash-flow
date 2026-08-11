import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView, useCountUp } from "./usePointer";

const rows = [
  { name: "Northline Creative", due: "14 Mar", amount: "₹48,000", state: "Paid" },
  { name: "Vertex Labs", due: "02 Mar", amount: "₹1,20,000", state: "Reminder sent" },
  { name: "Patel & Sons", due: "18 Feb", amount: "₹86,500", state: "WhatsApp sent" },
  { name: "Mira Interiors", due: "31 Jan", amount: "₹2,12,167", state: "Overdue" },
];

const bars = [38, 52, 44, 66, 58, 79, 92];

export function Dashboard() {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const outstanding = useCountUp(466667, inView);
  const received = useCountUp(48000, inView);
  const [flip, setFlip] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const a = setTimeout(() => setFlip(true), 2400);
    const b = setTimeout(() => setToast(true), 2600);
    const c = setTimeout(() => setToast(false), 7200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, [inView]);

  return (
    <section ref={ref} aria-labelledby="dash-heading" className="border-t border-border py-24 sm:py-36">
      <div className="container-page">
        <h2 id="dash-heading" className="max-w-xl text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
          Everything after the invoice.
          <span className="block text-muted-foreground">Handled.</span>
        </h2>

        <div className="relative mt-14 overflow-hidden rounded-2xl border border-border bg-surface card-lift">
          <div className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-surface p-6">
              <p className="eyebrow">Outstanding</p>
              <p className="num mt-3 text-3xl font-semibold">₹{outstanding.toLocaleString("en-IN")}</p>
              <p className="mt-2 text-sm text-muted-foreground">12 invoices · 3 overdue</p>
            </div>
            <div className="bg-surface p-6">
              <p className="eyebrow">Received today</p>
              <p className="num mt-3 text-3xl font-semibold text-primary">₹{received.toLocaleString("en-IN")}</p>
              <p className="mt-2 text-sm text-muted-foreground">Northline Creative · UPI</p>
            </div>
            <div className="bg-surface p-6">
              <p className="eyebrow">Collection rate</p>
              <div className="mt-4 flex h-9 items-end gap-1.5">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={cn("w-full rounded-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", i === bars.length - 1 ? "bg-primary" : "bg-secondary")}
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
                  const paid = r.state === "Paid" || (flip && r.name === "Patel & Sons");
                  return (
                    <tr
                      key={r.name}
                      className="border-t border-border transition-colors hover:bg-surface-2"
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
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="num">₹86,500</span>
              <span className="text-muted-foreground">received · Patel &amp; Sons</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
