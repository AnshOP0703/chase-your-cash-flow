const markets = [
  { title: "India", symbol: "₹", tags: ["GST", "UPI", "WhatsApp", "Razorpay"] },
  { title: "Global", symbol: "$", tags: ["Sales tax", "Stripe", "PayPal", "Email"] },
];

export function Markets() {
  return (
    <section aria-labelledby="markets-heading" className="border-b border-border py-24 sm:py-32">
      <div className="container-page">
        <h2 id="markets-heading" className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Built for India. <span className="text-muted-foreground">Ready for the world.</span>
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {markets.map((m) => (
            <div key={m.title} className="group bg-surface p-8 transition-colors hover:bg-surface-2">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-semibold tracking-tight">{m.symbol}</span>
                <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{m.title}</span>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
