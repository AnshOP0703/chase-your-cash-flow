import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInteractive } from "./usePointer";

/** Amber primary link with a subtle magnetic pull toward the cursor. */
export function MagneticCta({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
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
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
      }}
      className={cn(
        "magnetic inline-flex h-12 items-center justify-center rounded-md px-6 text-[0.95rem] font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:brightness-110"
          : "border border-border text-foreground hover:border-foreground/40 hover:bg-surface",
        className,
      )}
    >
      {children}
    </a>
  );
}
