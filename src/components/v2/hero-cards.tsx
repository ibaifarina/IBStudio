"use client";

import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/brand";
import { ease } from "@/components/motion";
import { cn } from "@/lib/utils";

/* ── Shell ─────────────────────────────────────────────── */

export const cardShell =
  "rounded-[20px] bg-white/95 backdrop-blur shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_2px_4px_-2px_rgba(15,23,42,0.06),0_30px_60px_-30px_rgba(15,23,42,0.35)]";

function CardHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[0.68rem] font-medium text-neutral-500 sm:text-[0.75rem]">{title}</span>
      <span className="hidden shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[0.62rem] whitespace-nowrap text-neutral-500 lg:inline">{meta}</span>
    </div>
  );
}

function Delta({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-brand/10 px-1.5 py-0.5 text-[0.62rem] font-semibold text-brand sm:text-[0.7rem]">
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
      <CardHeader title="Visitas" meta="30 días" />
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
  { initial: "M", bg: "bg-[#f4ece6] text-[#8c6a56]" },
  { initial: "J", bg: "bg-[#e9edf5] text-[#5a6b8c]" },
  { initial: "L", bg: "bg-[#e8f0ea] text-[#5d7d66]" },
];

export function ReviewsCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardShell, "w-[8rem] p-2.5 text-left sm:w-40 sm:p-3 lg:w-48", className)}>
      <CardHeader title="Reseñas" meta="Google" />

      <div className="mt-2.5 flex items-end gap-2 sm:mt-3">
        <span className="text-[1.25rem] leading-none font-semibold tracking-[-0.045em] tabular-nums sm:text-[1.6rem]">4,9</span>
        <div className="flex gap-[2px] pb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 20 20"
              className="size-3 fill-brand/60 sm:size-3.5"
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
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[0.65rem] text-neutral-500">Pago inicial</span>
      </div>
      <p className="mt-2 text-[1.8rem] leading-none font-semibold tracking-[-0.05em] tabular-nums">
        300<span className="ml-0.5 text-[1.3rem] text-neutral-400">€</span>
      </p>
      <p className="mt-2 text-[0.75rem] text-neutral-500">+ mantenimiento mensual</p>
    </div>
  );
}

export function WhatsAppCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardShell, "w-56 p-3 text-left", className)}>
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-neutral-950 text-white">
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
