"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion";
import { WhatsAppIcon } from "@/components/brand";
import { cn } from "@/lib/utils";

/* ── Logos ─────────────────────────────────────────────── */

export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

export function AnalyticsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="15.5" y="2" width="6" height="20" rx="3" fill="#F9AB00" />
      <rect x="8.5" y="9" width="6" height="13" rx="3" fill="#E37400" />
      <circle cx="4.5" cy="19" r="3" fill="#E37400" />
    </svg>
  );
}

/* ── Shell ─────────────────────────────────────────────── */

export const cardShell =
  "rounded-[20px] bg-white/95 backdrop-blur shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_-2px_rgba(15,23,42,0.06),0_30px_60px_-30px_rgba(15,23,42,0.35)]";

function CardHeader({ logo, title, meta }: { logo: React.ReactNode; title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-md bg-neutral-50 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] sm:size-7">{logo}</span>
        <span className="text-[0.68rem] font-medium text-neutral-800 sm:text-[0.75rem]">{title}</span>
      </span>
      <span className="hidden shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[0.62rem] whitespace-nowrap text-neutral-500 lg:inline">{meta}</span>
    </div>
  );
}

function Delta({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[0.62rem] font-semibold text-emerald-600 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.15)] sm:text-[0.7rem]">
      <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {value}
    </span>
  );
}

/* ── Cards ─────────────────────────────────────────────── */

export function AnalyticsCard({ className }: { className?: string }) {
  const d = "M0 27 C 12 26, 18 21.5, 30 22.5 S 48 18, 60 19 S 78 11, 92 13 S 112 5, 128 4";
  return (
    <div className={cn(cardShell, "w-[8rem] p-2.5 text-left sm:w-40 sm:p-3 lg:w-48", className)}>
      <CardHeader logo={<AnalyticsLogo className="size-3.5 sm:size-4" />} title="Analytics" meta="30 días" />
      <div className="mt-2.5 flex items-center gap-2 sm:mt-3">
        <span className="text-[1.25rem] leading-none font-semibold tracking-[-0.045em] tabular-nums sm:text-[1.6rem]">2.481</span>
        <Delta value="24%" />
      </div>

      <div className="relative mt-2">
        <svg viewBox="0 0 128 30" className="block w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="ga-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3a63ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3a63ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${d} L128 30 L0 30 Z`}
            fill="url(#ga-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke="#3a63ff"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.3, duration: 1.5, ease }}
          />
        </svg>
      </div>
    </div>
  );
}

const reviewers = [
  { initial: "M", bg: "bg-[#ffe1d6] text-[#b4441b]" },
  { initial: "J", bg: "bg-[#dbe7ff] text-[#2348c4]" },
  { initial: "L", bg: "bg-[#dcf5e6] text-[#17784a]" },
];

export function ReviewsCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardShell, "w-[8rem] p-2.5 text-left sm:w-40 sm:p-3 lg:w-48", className)}>
      <CardHeader logo={<GoogleLogo className="size-3.5 sm:size-4" />} title="Google" meta="Reseñas" />

      <div className="mt-2.5 flex items-end gap-2 sm:mt-3">
        <span className="text-[1.25rem] leading-none font-semibold tracking-[-0.045em] tabular-nums sm:text-[1.6rem]">4,9</span>
        <div className="flex gap-[2px] pb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 20 20"
              className="size-3 fill-[#FBBC04] sm:size-3.5"
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.4 + i * 0.08, type: "spring", stiffness: 420, damping: 14 }}
              aria-hidden
            >
              <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
            </motion.svg>
          ))}
        </div>
      </div>


      <div className="mt-2.5 flex items-center justify-between border-t border-neutral-100 pt-2.5">
        <span className="flex -space-x-1.5">
          {reviewers.map((r) => (
            <span
              key={r.initial}
              className={cn("grid size-5 place-items-center rounded-full text-[0.6rem] font-semibold ring-2 ring-white sm:size-6 sm:text-[0.65rem]", r.bg)}
            >
              {r.initial}
            </span>
          ))}
        </span>
        <span className="text-[0.62rem] text-neutral-400 sm:text-[0.7rem]">230 reseñas</span>
      </div>
    </div>
  );
}

export function PriceCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardShell, "w-44 p-3.5 text-left", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[0.75rem] text-neutral-400">Desde</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[0.65rem] text-neutral-500">Pago único</span>
      </div>
      <p className="mt-2 text-[1.8rem] leading-none font-semibold tracking-[-0.05em] tabular-nums">
        300<span className="ml-0.5 text-[1.3rem] text-neutral-400">€</span>
      </p>
      <p className="mt-2 text-[0.75rem] text-neutral-500">Sin cuotas mensuales</p>
    </div>
  );
}

export function WhatsAppCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardShell, "w-56 p-3 text-left", className)}>
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-[#25D366] text-white shadow-[0_6px_14px_-6px_rgba(37,211,102,0.8)]">
          <WhatsAppIcon className="size-[18px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between">
            <span className="text-[0.8rem] font-semibold">Nuevo mensaje</span>
            <span className="text-[0.65rem] text-neutral-400">ahora</span>
          </span>
          <span className="mt-0.5 block text-[0.76rem] leading-snug text-neutral-600">¿Tenéis mesa para 4 esta noche?</span>
        </span>
      </div>
    </div>
  );
}
