const quotes = [
  { q: "I stopped writing awkward follow-up emails entirely.", n: "Ananya Rao", r: "Brand designer", c: "Freelance" },
  { q: "Our average payment time went from 38 days to 11.", n: "Marcus Feld", r: "Founder", c: "Vertex Labs" },
  { q: "It's the first invoicing tool that does something after sending.", n: "Ritu Shah", r: "Ops lead", c: "Northline Creative" },
  { q: "Clients pay faster and nobody feels chased.", n: "Dan Okoro", r: "Consultant", c: "Okoro & Co" },
];

export function Testimonials() {
  const loop = [...quotes, ...quotes];

  return (
    <section aria-labelledby="proof-heading" className="overflow-hidden border-t border-border py-24 sm:py-36">
      <div className="container-page">
        <h2 id="proof-heading" className="eyebrow">
          From early users
        </h2>
      </div>

      <div className="group mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="flex w-max gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animation: "marquee 46s linear infinite" }}
        >
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-[320px] shrink-0 rounded-2xl border border-border bg-surface p-7 sm:w-[380px]"
            >
              <blockquote className="text-lg leading-snug tracking-[-0.015em]">&ldquo;{t.q}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="text-foreground">{t.n}</span> · {t.r}, {t.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
