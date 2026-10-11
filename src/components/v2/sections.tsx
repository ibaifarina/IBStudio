"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon, SearchIcon, StarIcon } from "lucide-react";
import { Reveal, ease } from "@/components/motion";
import { Phone } from "@/components/v2/phone";
import { BuildScene, CallScene, LaunchScene, ProposalScene } from "@/components/v2/process-scenes";
import { Heading, card } from "@/components/v2/ui";
import { SELECT_PLAN_EVENT, plans, work, type PlanId } from "@/lib/site";
import lumiereFull from "../../../public/work/lumiere-full.webp";
import { cn } from "@/lib/utils";

/* ───────────────────────── Projects ───────────────────────── */

function ProjectMeta({ name, kind, year, href, dark }: { name: string; kind: string; year: string; href?: string; dark?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-4 px-1 pt-5">
      <div>
        <h3 className="text-[1.75rem] leading-none">{name}</h3>
        <p className="mt-1.5 text-[0.9rem] text-neutral-500">
          {kind} · {year}
        </p>
      </div>
      {href ? (
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo",
            dark ? "bg-neutral-950 text-white group-hover:bg-brand" : "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] group-hover:bg-neutral-950 group-hover:text-white",
          )}
        >
          <ArrowUpRightIcon className="size-4.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      ) : (
        <span className="rounded-full bg-[#f5f5f3] px-3 py-1.5 text-[0.75rem] text-neutral-500">Próximamente</span>
      )}
    </div>
  );
}

function Screen({ src, alt, sizes, className }: { src: StaticImageData; alt: string; sizes: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_30px_60px_-30px_rgba(15,23,42,0.4)]", className)}>
      <Image src={src} alt={alt} sizes={sizes} placeholder="blur" className="h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]" />
    </div>
  );
}

export function ProjectsV2() {
  const l = work.lumiere;
  const b = work.bioacting;
  const a = work.aurelian;
  return (
    <section id="proyectos" className="py-24 md:py-32">
      <div className="container-x">
        <Heading title="Proyectos recientes" sub="Un proyecto para cliente y conceptos de diseño para distintos sectores." />

        <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-16 md:grid-cols-2">
          <Reveal className="md:col-span-2">
            <a href={l.href} target="_blank" rel="noreferrer" className="group block">
              <div className={cn(card, "@container relative flex aspect-[4/5] items-center overflow-hidden bg-[#f1ebe4] sm:aspect-[16/10] md:aspect-[2/1]")}>
                {/* Phones: full-page capture fills the taller card behind the phone */}
                <Screen src={lumiereFull} alt="Web de Lumière" sizes="90vw" className="absolute top-[6%] left-[6%] w-[88%] sm:hidden" />
                <Screen src={l.image} alt="Web de Lumière" sizes="(min-width:768px) 62vw, 90vw" className="absolute left-[6%] hidden w-[64%] sm:block" />
                <div className="absolute right-[6%] bottom-[-16%] sm:right-[3%] sm:bottom-[-26%] md:right-[4%] md:bottom-[-30%]">
                  <Phone src={l.mobile} alt="Lumière en móvil" className="[--w:42cqw] drop-shadow-[0_28px_36px_rgba(40,25,15,0.35)] sm:[--w:24cqw] md:[--w:22cqw] transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-3" />
                </div>
              </div>
              <ProjectMeta name={l.name} kind={l.kind} year={l.year} href={l.href} dark />
            </a>
          </Reveal>

          {[
            { p: b, bg: "bg-[#e3efed]" },
            { p: a, bg: "bg-[#211b17]" },
          ].map(({ p, bg }, i) => {
            const Tag = p.href ? "a" : "div";
            return (
              <Reveal key={p.name} delay={i * 0.1}>
                <Tag {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})} className="group block">
                  <div className={cn(card, "flex aspect-[5/4] items-center justify-center overflow-hidden p-[8%]", bg)}>
                    <Screen src={p.image} alt={`Web de ${p.name}`} sizes="(min-width:768px) 40vw, 85vw" className="w-full" />
                  </div>
                  <ProjectMeta name={p.name} kind={p.kind} year={p.year} href={p.href} />
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Services (bento) ───────────────────────── */

function Bento({ title, line, more, className, children, delay = 0 }: { title: string; line: string; more?: string; className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn(card, "group flex flex-col overflow-hidden", className)}>
      <div className="relative flex h-52 items-center justify-center px-5 pt-5 sm:h-60 sm:px-6 sm:pt-6">{children}</div>
      <div className="px-5 pt-4 pb-6 sm:px-7 sm:pt-5 sm:pb-7">
        <h3 className="text-[1.5rem] leading-tight">{title}</h3>
        <p className="mt-1.5 max-w-xl text-[0.95rem] text-pretty text-neutral-500">
          {line}
          {more && <span className="hidden lg:inline"> {more}</span>}
        </p>
      </div>
    </Reveal>
  );
}

function DesignVisual() {
  const tiles = [
    { src: work.bioacting.image, cls: "w-[42%] -translate-x-[116%] -rotate-6 sm:w-[36%] sm:-translate-x-[118%] group-hover:-translate-x-[122%] sm:group-hover:-translate-x-[130%] group-hover:-rotate-[8deg]" },
    { src: work.aurelian.image, cls: "w-[42%] translate-x-[16%] rotate-6 sm:w-[36%] sm:translate-x-[18%] group-hover:translate-x-[22%] sm:group-hover:translate-x-[30%] group-hover:rotate-[8deg]" },
    { src: work.lumiere.image, cls: "z-10 w-[64%] -translate-x-1/2 sm:w-[36%] group-hover:-translate-y-[54%]" },
  ];
  return (
    <div className="relative h-full w-full">
      {tiles.map((t, i) => (
        <div
          key={i}
          className={cn(
            "absolute top-1/2 left-1/2 max-w-[260px] -translate-y-1/2 transition-[translate,rotate] duration-700 ease-out-expo",
            t.cls,
          )}
        >
          <div className="overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_40px_-20px_rgba(15,23,42,0.35)]">
            <Image src={t.src} alt="" sizes="260px" className="h-auto w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatVisual() {
  const msgs = [
    { me: false, text: "¡Hola! ¿Tenéis hora el sábado?" },
    { me: true, text: "¡Claro! Te reservo a las 11:00 ✓" },
    { me: false, text: "Perfecto, gracias 🙌" },
  ];
  return (
    <div className="flex w-full flex-col gap-2">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.5, duration: 0.6, ease }}
          className={cn(
            "max-w-[78%] rounded-[18px] px-4 py-2.5 text-[0.92rem] shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
            m.me ? "self-end rounded-br-md bg-[#d9fdd3]" : "self-start rounded-bl-md bg-white",
          )}
        >
          {m.text}
        </motion.div>
      ))}
    </div>
  );
}

function GoogleVisual() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-[0.85rem] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
        <SearchIcon className="size-4 text-neutral-400" />
        <span>peluquería en Gràcia</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.7, ease }}
        className="mt-3 rounded-2xl bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_16px_32px_-20px_rgba(15,23,42,0.3)]"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-[#836656] text-[0.7rem] font-semibold text-white">L</span>
          <span className="text-[0.72rem] text-neutral-500">lumiere.es</span>
        </div>
        <p className="mt-2 text-[0.95rem] leading-snug text-[#1a0dab]">Lumière — Salón de belleza</p>
        <p className="mt-1 hidden text-[0.75rem] leading-snug text-neutral-500 lg:block">Peluquería en Gràcia. Coloración, cortes y tratamientos. Reserva tu cita online en un minuto.</p>
        <div className="mt-1.5 flex items-center gap-1 text-[0.72rem] text-neutral-500">
          <span className="font-medium text-neutral-700">4,9</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="size-3 fill-amber-400 text-amber-400" />
          ))}
          <span>· Abierto ahora</span>
        </div>
      </motion.div>
    </div>
  );
}

function StatsVisual() {
  const bars = [32, 44, 38, 56, 50, 68, 92];
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  return (
    <div className="flex h-full w-full flex-col justify-end px-2 sm:px-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-[2.6rem] leading-none tracking-[-0.02em]">+38 %</p>
        <p className="text-[0.8rem] text-neutral-400">contactos esta semana</p>
      </div>
      <div className="mt-5 flex h-32 items-end gap-2 sm:gap-3">
        {bars.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center gap-2">
            <div className="relative w-full flex-1">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.9, ease }}
                className={cn("absolute inset-x-0 bottom-0 rounded-lg", i === bars.length - 1 ? "bg-brand" : "bg-neutral-200")}
              />
            </div>
            <span className="text-[0.68rem] text-neutral-400">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesV2() {
  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="container-x">
        <Heading title="Todo lo que tu web necesita" />
        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-5">
          <Bento className="md:col-span-3" title="Diseño a medida" line="Pensada primero para el móvil." more="Cada web se diseña desde cero con la personalidad de tu negocio, tus colores y tus fotos.">
            <DesignVisual />
          </Bento>
          <Bento className="md:col-span-2" delay={0.08} title="WhatsApp y reservas" line="Tus clientes contactan en un toque." more="Sin formularios eternos ni llamadas perdidas.">
            <ChatVisual />
          </Bento>
          <Bento className="md:col-span-2" title="Aparece en Google" line="Para que te encuentren cuando te buscan cerca." more="Ficha de Google optimizada y una web rápida que posiciona.">
            <GoogleVisual />
          </Bento>
          <Bento className="md:col-span-3" delay={0.08} title="Sabes qué funciona" line="Visitas, llamadas y formularios en un panel sencillo." more="Sabrás de dónde vienen tus clientes y qué páginas los convencen.">
            <StatsVisual />
          </Bento>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Process ───────────────────────── */

const processSteps = [
  { title: "Llamada", day: "Día 1", body: "Conocemos tu negocio y lo que necesitas.", visual: <CallScene /> },
  { title: "Propuesta", day: "Día 3", body: "Diseño a medida que revisamos juntos.", visual: <ProposalScene /> },
  { title: "Desarrollo", day: "Semana 1–2", body: "Rápida, móvil y lista para Google.", visual: <BuildScene /> },
  { title: "Online", day: "Día 14", body: "Publicada, con dominio y hosting incluidos.", visual: <LaunchScene /> },
];

/** One segment of the mobile stepper: full when done, filling while active, empty when upcoming. */
function Segment({ state, progress }: { state: "done" | "active" | "next"; progress: MotionValue<number> }) {
  return (
    <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-black/[0.08]">
      {state === "done" && <span className="absolute inset-0 rounded-full bg-neutral-900" />}
      {state === "active" && <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left rounded-full bg-neutral-900" />}
    </span>
  );
}

function CompactStepper({ active, progress, onSelect }: { active: number; progress: MotionValue<number>; onSelect: (i: number) => void }) {
  const step = processSteps[active];
  return (
    <div className="mt-6 lg:hidden">
      <div className="flex items-center justify-between text-[0.8rem] text-neutral-500">
        <span>
          Paso <span className="text-neutral-950 tabular-nums">{active + 1}</span> de {processSteps.length}
        </span>
        <span>{step.day}</span>
      </div>
      <div className="mt-2 flex gap-1.5">
        {processSteps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Paso ${i + 1}: ${s.title}`}
            aria-current={i === active ? "step" : undefined}
            onClick={() => onSelect(i)}
            className="flex flex-1 cursor-pointer py-2"
          >
            <Segment state={i < active ? "done" : i === active ? "active" : "next"} progress={progress} />
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          className="mt-2"
        >
          <span className="font-display text-[1.6rem] leading-tight">{step.title}</span>
          <p className="mt-1 text-[0.95rem] text-neutral-500">{step.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Small ring that fills until the next step. */
function StepTimer({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 -rotate-90" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <motion.circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
    </svg>
  );
}

function StepRow({
  step,
  index,
  active,
  progress,
  onSelect,
}: {
  step: (typeof processSteps)[number];
  index: number;
  active: boolean;
  progress: MotionValue<number>;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? "step" : undefined}
        className="relative isolate w-full cursor-pointer overflow-hidden rounded-[22px] px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {active && (
          <motion.span
            layoutId="process-active-step"
            transition={{ duration: 0.5, ease }}
            className="absolute inset-0 -z-10 rounded-[22px] bg-[#f5f5f3]"
          />
        )}
        <span className="flex items-baseline gap-4">
          <span className={cn("w-6 text-[0.8rem] tabular-nums transition-colors duration-500", active ? "text-brand" : "text-neutral-300")}>
            0{index + 1}
          </span>
          <span className="flex-1">
            <span className="flex items-baseline justify-between gap-4">
              <span
                className={cn(
                  "font-display text-[1.5rem] leading-tight transition-colors duration-500 lg:text-[1.75rem]",
                  active ? "text-neutral-950" : "text-neutral-300",
                )}
              >
                {step.title}
              </span>
              <span className={cn("flex items-center gap-2 text-[0.8rem] transition-colors duration-500", active ? "text-neutral-500" : "text-neutral-300")}>
                {step.day}
                {active && <StepTimer progress={progress} />}
              </span>
            </span>
            <AnimatePresence initial={false}>
              {active && (
                <motion.span
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="block overflow-hidden"
                >
                  <span className="block pt-1.5 text-[0.95rem] text-neutral-500">{step.body}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </span>
      </button>
    </li>
  );
}

const STEP_SECONDS = 4.5;

export function ProcessV2() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const progress = useMotionValue(0);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const playing = inView && !hovered && !reduce;
  const n = processSteps.length;

  const panelRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);
  // Scale the 440×320 scenes to fill the panel, whatever its size.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scene = el.querySelector<HTMLElement>("[data-scene]");
      const sw = scene?.offsetWidth || 440;
      const sh = scene?.offsetHeight || 320;
      setFit(Math.min((width * 0.92) / sw, (height * 0.88) / sh, 1.5));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Each new step starts its timer from zero (or shows as complete when autoplay is off).
  useEffect(() => {
    progress.set(reduce ? 1 : 0);
  }, [active, progress, reduce]);

  // Autoplay: fill the active step's bar, then move on. Pausing keeps the bar where it is.
  useEffect(() => {
    if (!playing) return;
    const controls = animate(progress, 1, {
      duration: STEP_SECONDS * (1 - progress.get()),
      ease: "linear",
      onComplete: () => setActive((a) => (a + 1) % n),
    });
    return () => controls.stop();
  }, [playing, active, progress, n]);

  return (
    <section id="proceso" ref={ref} className="py-24 md:py-32">
      <div
        className="container-x grid w-full items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div>
          <h2 className="text-h2">Online en dos semanas</h2>
          <p className="mt-3 text-[1.05rem] text-neutral-500">Cuatro pasos, sin sorpresas.</p>
          <CompactStepper active={active} progress={progress} onSelect={setActive} />
          <ol className="-mx-5 mt-8 hidden flex-col gap-1 lg:flex">
            {processSteps.map((step, i) => (
              <StepRow key={step.title} step={step} index={i} active={i === active} progress={progress} onSelect={() => setActive(i)} />
            ))}
          </ol>
        </div>

        <div
          ref={panelRef}
          className={cn(card, "relative flex aspect-[300/360] w-full items-center justify-center overflow-hidden sm:aspect-auto sm:h-[440px] lg:h-[480px]")}
        >
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,white_0%,transparent_70%)] opacity-70" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.5, ease }}
              className="relative flex w-full justify-center"
            >
              <div data-scene className="flex shrink-0 origin-center justify-center" style={{ transform: `scale(${fit})` }}>
                {processSteps[active].visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Pricing ───────────────────────── */

export function PricingV2() {
  return (
    <section id="precios" className="py-24 md:py-32">
      <div className="container-x">
        <Heading title="Precios claros" sub="Un pago inicial por la web y una cuota mensual de mantenimiento." />
        <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:mt-16 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const f = plan.featured;
            return (
              <Reveal
                key={plan.id}
                delay={i * 0.08}
                className={cn(
                  "flex flex-col rounded-[28px] p-8",
                  f ? "bg-neutral-950 text-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.6)]" : "bg-[#f5f5f3]",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.6rem] leading-none">{plan.name}</h3>
                  {f && <span className="rounded-full bg-white/10 px-3 py-1 text-[0.75rem] text-white/80">Más elegido</span>}
                </div>
                <p className="mt-8 font-display text-[3.8rem] leading-none tracking-[-0.03em]">
                  {plan.price} <span className="text-[2rem]">€</span>
                </p>
                <p className={cn("mt-2 text-[0.85rem]", f ? "text-white/50" : "text-neutral-400")}>Pago inicial + mantenimiento mensual</p>
                <p className={cn("mt-3 text-[0.95rem]", f ? "text-white/60" : "text-neutral-500")}>{plan.description}</p>

                <a
                  href="#contacto"
                  onClick={() => window.dispatchEvent(new CustomEvent<PlanId>(SELECT_PLAN_EVENT, { detail: plan.id }))}
                  className={cn(
                    "mt-8 inline-flex h-12 items-center justify-center rounded-full text-[0.95rem] font-medium transition-all duration-300",
                    f ? "bg-white text-neutral-950 hover:bg-brand hover:text-white" : "bg-white text-neutral-950 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] hover:bg-neutral-950 hover:text-white",
                  )}
                >
                  Empezar
                </a>

                <ul className="mt-8 space-y-3 text-[0.92rem]">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", f ? "bg-white/10" : "bg-white")}>
                        <CheckIcon className={cn("size-3", f ? "text-white" : "text-brand")} strokeWidth={3} />
                      </span>
                      <span className={f ? "text-white/85" : "text-neutral-700"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
