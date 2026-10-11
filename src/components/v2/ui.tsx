"use client";

import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/** Centered section title with an optional one-line subtitle. No eyebrow. */
export function Heading({ title, sub, className }: { title: React.ReactNode; sub?: string; className?: string }) {
  return (
    <Reveal className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2 className="text-h2 text-balance">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-md text-[1.05rem] text-pretty text-neutral-500">{sub}</p>}
    </Reveal>
  );
}

export function PrimaryButton({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex h-12 items-center gap-3 rounded-full bg-neutral-950 pr-1.5 pl-6 text-[0.95rem] font-medium text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-brand hover:shadow-[0_12px_30px_-10px_var(--brand)]",
        className,
      )}
    >
      {children}
      <span className="grid size-9 place-items-center rounded-full bg-white text-neutral-950">
        <span className="relative block size-3.5 overflow-hidden">
          <Arrow className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-[150%]" />
          <Arrow className="absolute inset-0 -translate-x-[150%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
        </span>
      </span>
    </a>
  );
}

export function SecondaryButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-12 items-center rounded-full bg-white px-6 text-[0.95rem] font-medium text-neutral-950 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export const card = "rounded-[28px] bg-[#f5f5f3]";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={className}>
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}
