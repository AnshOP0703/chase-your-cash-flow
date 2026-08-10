import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#product", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-border bg-background/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="text-[1.05rem] font-semibold tracking-[-0.03em] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Tagada
        </a>
        <div className="flex items-center gap-1 sm:gap-7">
          <ul className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#early-access"
            className="hidden rounded px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:inline-block"
          >
            Sign in
          </a>
          <a
            href="#early-access"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Get early access
          </a>
        </div>
      </nav>
    </header>
  );
}
