import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const quotes = [
  { q: "Clients pay faster and nobody feels chased.", n: "Dan Okoro", r: "Consultant", c: "Okoro & Co." },
  { q: "Our average payment time went from 38 days to 11.", n: "Marcus Feld", r: "Founder", c: "Vertex Labs" },
  { q: "I stopped writing awkward follow-up emails entirely.", n: "Ananya Rao", r: "Brand designer", c: "Freelance" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const t = quotes[i]!;

  return (
    <section
      aria-labelledby="proof-heading"
      className="border-t border-border py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-page">
        <h2 id="proof-heading" className="eyebrow">
          From early users
        </h2>

        <figure key={i} className="mt-8 max-w-3xl" style={{ animation: "quote-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <blockquote className="text-2xl leading-[1.25] font-normal tracking-[-0.03em] sm:text-[2.25rem]">
            &ldquo;{t.q}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted-foreground">
            <span className="text-foreground">{t.n}</span> · {t.r}, {t.c}
          </figcaption>
        </figure>

        <div className="mt-10 flex gap-2">
          {quotes.map((q, n) => (
            <button
              key={q.n}
              type="button"
              aria-label={`Show testimonial ${n + 1}`}
              aria-current={i === n}
              onClick={() => setI(n)}
              className={cn(
                "h-1 rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                i === n ? "w-10 bg-foreground" : "w-5 bg-border hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
