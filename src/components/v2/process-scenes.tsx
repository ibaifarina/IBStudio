"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CalendarCheckIcon, CheckIcon, MicIcon, MousePointer2Icon, PhoneOffIcon, VideoIcon } from "lucide-react";
import { ease } from "@/components/motion";
import { cn } from "@/lib/utils";
import ibAvatar from "../../../public/brand/ib-avatar.png";
import seaside from "../../../public/work/seaside.webp";

/** Scenes for the sticky process panel: 300×380 portrait on phones, 440×320 from sm. The panel scales them to fit. */
export const sceneBox = "relative h-[380px] w-[300px] sm:h-[320px] sm:w-[440px]";

const surface = "rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_20px_40px_-24px_rgba(15,23,42,0.35)]";

const pop = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease },
});

function Check({ delay }: { delay: number }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 400, damping: 18 }}
      className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"
    >
      <CheckIcon className="size-2.5" strokeWidth={3.5} />
    </motion.span>
  );
}

export function CallScene() {
  return (
    <div className={sceneBox}>
      {/* Call window */}
      <motion.div {...pop(0.05)} className={cn(surface, "absolute top-0 left-0 w-full p-4 sm:w-[330px]")}>
        <div className="flex items-center justify-between">
          <span className="text-[0.85rem] font-medium">Llamada inicial</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-0.5 text-[0.68rem] font-medium text-red-500">
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> 12:48
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="relative grid h-24 place-items-center overflow-hidden rounded-xl bg-[#0b0f1f]">
            <Image src={ibAvatar} alt="" className="size-14 rounded-full" sizes="56px" />
            <span className="absolute bottom-1.5 left-2 text-[0.62rem] text-white/80">ib.studio</span>
          </div>
          <div className="relative grid h-24 place-items-center overflow-hidden rounded-xl bg-[#f3eee8]">
            <span className="grid size-14 place-items-center rounded-full bg-[#ffd9c7] text-lg font-semibold text-[#9a3f17]">M</span>
            <span className="absolute bottom-1.5 left-2 text-[0.62rem] text-neutral-500">María · Restaurante</span>
          </div>
        </div>
        <div className="mt-3 flex h-6 items-center gap-[3px]">
          {Array.from({ length: 34 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-full rounded-full bg-brand/70"
              animate={{ height: ["20%", `${30 + ((i * 37) % 70)}%`, "20%"] }}
              transition={{ duration: 1.2 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {[MicIcon, VideoIcon].map((Icon, i) => (
            <span key={i} className="grid size-8 place-items-center rounded-full bg-neutral-100 text-neutral-600">
              <Icon className="size-3.5" />
            </span>
          ))}
          <span className="grid size-8 place-items-center rounded-full bg-red-500 text-white">
            <PhoneOffIcon className="size-3.5" />
          </span>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div {...pop(0.35)} className={cn(surface, "absolute right-0 bottom-0 w-[210px] p-3.5 sm:w-[200px]")}>
        <p className="text-[0.72rem] font-medium text-neutral-400">Objetivos</p>
        <ul className="mt-2 space-y-2 text-[0.78rem]">
          {["Más reservas online", "Carta siempre al día", "WhatsApp directo"].map((t, i) => (
            <li key={t} className="flex items-center gap-2">
              <Check delay={0.8 + i * 0.35} />
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function ProposalScene() {
  return (
    <div className={sceneBox}>
      {/* Artboard */}
      <motion.div {...pop(0.05)} className={cn(surface, "absolute top-0 left-0 w-[232px] overflow-hidden sm:w-[340px]")}>
        <div className="flex items-center gap-1 border-b border-neutral-100 px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-neutral-200" />
          ))}
          <span className="ml-2 text-[0.62rem] text-neutral-400">Propuesta v2 · Inicio</span>
        </div>
        <div className="relative h-36 overflow-hidden sm:h-32">
          <Image src={seaside} alt="" fill sizes="340px" className="object-cover object-[50%_45%]" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-3 left-3 font-display text-[1.25rem] leading-tight text-white">
            Cocina de mar,
            <br />
            <em>frente al mar.</em>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} {...pop(0.3 + i * 0.1)} className="h-12 rounded-lg bg-[#eef2ff]" />
          ))}
        </div>
      </motion.div>

      {/* Palette */}
      <motion.div {...pop(0.2)} className={cn(surface, "absolute top-6 right-0 flex w-[58px] flex-col items-center gap-2 py-3 sm:w-[76px]")}>
        <span className="font-display text-[1.4rem] leading-none">Aa</span>
        {["#3a63ff", "#0f1b3d", "#e9eefc", "#f5c26b"].map((c) => (
          <span key={c} className="size-6 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" style={{ backgroundColor: c }} />
        ))}
      </motion.div>

      {/* Comment */}
      <motion.div {...pop(0.7)} className={cn(surface, "absolute right-0 bottom-2 flex w-[230px] items-start gap-2.5 p-3 sm:right-4 sm:w-[220px]")}>
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#ffd9c7] text-[0.7rem] font-semibold text-[#9a3f17]">M</span>
        <span>
          <span className="block text-[0.7rem] font-medium">María</span>
          <span className="block text-[0.75rem] leading-snug text-neutral-600">¡Me encanta! ¿Probamos el botón en azul?</span>
        </span>
      </motion.div>

      <motion.span
        initial={{ x: 150, y: 120, opacity: 0 }}
        animate={{ x: [150, 236, 222], y: [120, 196, 190], opacity: 1 }}
        transition={{ delay: 0.9, duration: 1.6, ease }}
        className="absolute top-0 left-0 text-neutral-900"
      >
        <MousePointer2Icon className="size-5 fill-neutral-900" />
      </motion.span>
    </div>
  );
}

export function BuildScene() {
  const scores = ["Rendimiento", "SEO", "Accesibilidad", "Buenas prácticas"];
  const log = ["Imágenes optimizadas", "SEO y metadatos listos", "Adaptada a móvil", "Desplegada en 1,2 s"];
  return (
    <div className={sceneBox}>
      <motion.div {...pop(0.05)} className={cn(surface, "grid grid-cols-2 gap-y-4 px-3 py-5 sm:flex sm:justify-between sm:px-5 sm:py-4")}>
        {scores.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <span className="relative grid size-16 place-items-center sm:size-14">
              <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
                <circle cx="20" cy="20" r="17" fill="#ecfdf5" stroke="#d1fae5" strokeWidth="3" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 1.2, ease }}
                />
              </svg>
              <span className="relative text-[0.9rem] font-semibold text-emerald-700 tabular-nums">100</span>
            </span>
            <span className="text-[0.62rem] text-neutral-500">{label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div {...pop(0.25)} className="mt-3 rounded-2xl bg-[#0b0f1f] p-4 font-mono text-[0.72rem] text-white/80 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.6)]">
        <div className="flex items-center gap-1.5 pb-3">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-2 rounded-full" style={{ backgroundColor: c }} />
          ))}
          <span className="ml-2 text-white/40">deploy · tunegocio.es</span>
        </div>
        <ul className="space-y-1.5">
          {log.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.35, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <span className="text-emerald-400">✓</span>
              {line}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function LaunchScene() {
  return (
    <div className={sceneBox}>
      <motion.div {...pop(0.05)} className={cn(surface, "absolute top-0 left-0 w-full overflow-hidden sm:w-[370px]")}>
        <div className="flex items-center gap-2 border-b border-neutral-100 px-3 py-2.5 text-[0.75rem]">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-neutral-200" />
            ))}
          </span>
          <span className="flex flex-1 items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1">
            <svg viewBox="0 0 16 16" className="size-3 text-neutral-400" fill="currentColor" aria-hidden>
              <path d="M5 7V5a3 3 0 0 1 6 0v2h.5A1.5 1.5 0 0 1 13 8.5v5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-5A1.5 1.5 0 0 1 4.5 7H5Zm1.5 0h3V5a1.5 1.5 0 0 0-3 0v2Z" />
            </svg>
            marblau<span className="-ml-1.5 text-neutral-400">.es</span>
          </span>
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 18 }}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700"
          >
            <CheckIcon className="size-3" strokeWidth={3} /> Publicada
          </motion.span>
        </div>
        <div className="relative h-[230px] overflow-hidden sm:h-[190px]">
          <Image src={seaside} alt="" fill sizes="370px" className="object-cover object-[50%_45%]" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/30" />
          <p className="absolute top-3 left-0 w-full text-center font-display text-[0.8rem] tracking-[0.2em] text-white">MAR BLAU</p>
          <div className="absolute bottom-4 left-4">
            <p className="font-display text-[1.5rem] leading-tight text-white">
              Cocina de mar,
              <br />
              <em>frente al mar.</em>
            </p>
            <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[0.65rem] font-semibold">Reservar mesa</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className={cn(surface, "absolute right-0 bottom-0 flex w-[240px] items-center gap-3 p-3 sm:w-[230px]")}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white">
          <CalendarCheckIcon className="size-4" />
        </span>
        <span className="flex-1">
          <span className="flex items-baseline justify-between">
            <span className="text-[0.78rem] font-semibold">Nueva reserva</span>
            <span className="text-[0.62rem] text-neutral-400">ahora</span>
          </span>
          <span className="block text-[0.72rem] text-neutral-500">Mesa para 2 · Hoy 21:00</span>
        </span>
      </motion.div>
    </div>
  );
}
