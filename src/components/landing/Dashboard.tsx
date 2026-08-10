import { useState } from "react";
import { cn } from "@/lib/utils";
import { useInView, useCountUp } from "./usePointer";

const clients = [
  { name: "Northline Creative", days: 3, amount: "₹48,000", state: "Sent" },
  { name: "Vertex Labs", days: 9, amount: "₹1,20,000", state: "Reminder" },
  { name: "Patel & Sons", days: 24, amount: "₹86,500", state: "WhatsApp" },
  { name: "Mira Interiors", days: 41, amount: "₹2,12,167", state: "Overdue" },
];

export function Dashboard() {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const outstanding = useCountUp(466667, inView);
  const [row, setRow] = useState<number | null>(null);

  return (
    <section ref={ref} aria-labelledby="dash-heading" className="border-b border-border py-24 sm:py-32">
      <div className="container-page">
        <h2 id="dash-heading" className="max-w-xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Everything after the invoice. Handled.
        </h2>

        <div className="mt-14 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-surface p-6">
              <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">Outstanding</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
                ₹{outstanding.toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">12 invoices · 3 overdue</p>
            </div>
            <div className="bg-surface p-6">
              <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">Upcoming</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">₹1,84,000</p>
              <p className="mt-2 text-sm text-muted-foreground">Due in the next 14 days</p>
            </div>
            <div className="bg-surface p-6">
              <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">Collected · March</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-success tabular-nums">₹7,40,000</p>
              <p className="mt-2 text-sm text-muted-foreground">28 invoices paid</p>
            </div>
          </div>

          <div className="grid gap-px border-t border-border bg-border lg:grid-cols-[1.6fr_1fr]">
            <div className="bg-surface p-6">
              <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">Open invoices</p>
              <table className="mt-4 w-full text-sm">
                <thead className="text-xs text-muted-foreground">
                  <tr className="text-left">
                    <th scope="col" className="pb-2 font-medium">Client</th>
                    <th scope="col" className="pb-2 font-medium">Overdue</th>
                    <th scope="col" className="pb-2 text-right font-medium">Amount</th>
                    <th scope="col" className="pb-2 text-right font-medium">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr
                      key={c.name}
                      onMouseEnter={() => setRow(i)}
                      onMouseLeave={() => setRow(null)}
                      style={{ animation: inView ? `row-in 0.5s ease-out ${i * 110}ms both` : undefined }}
                      className={cn(
                        "border-t border-border transition-colors",
                        row === i ? "bg-surface-2" : "bg-transparent",
                      )}
                    >
                      <td className="py-3 font-medium tracking-tight">{c.name}</td>
                      <td className="py-3 text-muted-foreground tabular-nums">{c.days} days</td>
                      <td className="py-3 text-right tabular-nums">{c.amount}</td>
                      <td className={cn("py-3 text-right", c.state === "Overdue" ? "text-primary" : "text-muted-foreground")}>
                        {c.state}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-surface p-6">
              <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">Recent activity</p>
              <ul className="mt-4 space-y-4 text-sm">
                {[
                  { t: "Reminder sent to Vertex Labs", m: "2h ago" },
                  { t: "WhatsApp follow-up · Patel & Sons", m: "6h ago" },
                  { t: "₹48,000 received · Northline", m: "Yesterday", ok: true },
                  { t: "Invoice #0051 sent", m: "2 days ago" },
                ].map((a) => (
                  <li key={a.t} className="flex items-start gap-3">
                    <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", a.ok ? "bg-success" : "bg-muted-foreground")} />
                    <span className="flex-1 tracking-tight">{a.t}</span>
                    <span className="text-xs text-muted-foreground">{a.m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
