import { WaitlistForm } from "./WaitlistForm";

export function FinalCta() {
  return (
    <section
      id="early-access"
      aria-labelledby="cta-heading"
      className="scroll-mt-20 bg-primary py-24 text-primary-foreground sm:py-28"
    >
      <div className="container-page max-w-2xl text-center">
        <h2 id="cta-heading" className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Stop chasing.
          <span className="block opacity-70">Start collecting.</span>
        </h2>
        <p className="mt-5 text-lg opacity-80">
          Your invoices should follow a process — not your calendar.
        </p>
        <div className="mx-auto mt-9 max-w-md text-left">
          <WaitlistForm id="cta" variant="onAccent" submitLabel="Get early access" microcopy={null} />
        </div>
      </div>
    </section>
  );
}
