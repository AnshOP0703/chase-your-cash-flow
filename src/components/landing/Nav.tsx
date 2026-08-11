import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticCta } from "./MagneticCta";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#product", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          solid
            ? "border-b border-border bg-background/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "container-page flex items-center justify-between gap-4 transition-all duration-500",
            solid ? "h-14" : "h-20",
          )}
        >
          <a
            href="#top"
            className="flex items-center gap-2 rounded text-[1.05rem] font-semibold tracking-[-0.035em] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="grid size-6 place-items-center rounded-md bg-foreground text-[0.7rem] font-semibold text-background">
              T
            </span>
            Tagada
          </a>

          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="mr-3 hidden items-center gap-1 text-sm md:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-3 py-2 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      active === l.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-left bg-foreground/30 transition-transform duration-300",
                        active === l.href ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#early-access"
              className="hidden rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:inline-block"
            >
              Sign in
            </a>
            <MagneticCta href="#early-access" size="sm">
              Get early access
            </MagneticCta>
          </div>
        </nav>
      </div>
    </header>
  );
}
