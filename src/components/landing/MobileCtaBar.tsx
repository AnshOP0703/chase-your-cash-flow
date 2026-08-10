import { useEffect, useState } from "react";
import { X } from "lucide-react";

/** Mobile-only sticky CTA; appears past the hero, dismissible, hidden over the footer. */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > window.innerHeight * 0.8 && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
      <a
        href="#early-access"
        className="flex-1 rounded-lg bg-primary px-6 py-3.5 text-center text-base font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        Get early access
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="rounded-lg border border-border p-3 text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  );
}
