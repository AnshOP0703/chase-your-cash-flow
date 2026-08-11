import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInteractive } from "./usePointer";

/** Link/button with a subtle magnetic pull toward the cursor. */
export function MagneticCta({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  size?: "sm" | "md";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const active = useInteractive();

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.2;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
      }}
      className={cn(
        "magnetic inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        size === "md" ? "h-12 px-6 text-[0.95rem]" : "h-10 px-5 text-sm",
        variant === "primary"
          ? "bg-primary text-primary-foreground shadow-[0_8px_20px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:bg-deep"
          : variant === "ghost"
            ? "border border-border bg-surface text-foreground hover:border-foreground/25"
            : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </a>
  );
}
