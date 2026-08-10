const quotes = [
  { q: "Tagada got rid of the part of my job I hated most.", by: "Founder, Studio Kadak" },
  { q: "Our average payment time dropped from 34 days to 11.", by: "Ops lead, Vertex Labs" },
  { q: "I stopped writing reminder emails entirely.", by: "Independent consultant, Pune" },
];

export function Testimonials() {
  return (
    <section aria-labelledby="proof-heading" className="border-b border-border py-20 sm:py-24">
      <div className="container-page">
        <h2 id="proof-heading" className="sr-only">
          What early users say
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {quotes.map((t) => (
            <li key={t.by} className="bg-background p-7 transition-colors hover:bg-surface">
              <p className="text-base leading-relaxed tracking-tight">"{t.q}"</p>
              <p className="mt-5 text-sm text-muted-foreground">— {t.by}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
