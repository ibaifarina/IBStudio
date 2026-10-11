"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ease } from "@/components/motion";
import { DemoSite } from "@/components/v2/demo-site";
import { AnalyticsCard, PriceCard, ReviewsCard, WhatsAppCard } from "@/components/v2/hero-cards";
import { Phone } from "@/components/v2/phone";
import { PrimaryButton, SecondaryButton } from "@/components/v2/ui";
import { cn } from "@/lib/utils";


function Float({ children, className, delay, y }: { children: React.ReactNode; className?: string; delay: number; y: MotionValue<number> }) {
  return (
    <motion.div style={{ y }} className={cn("absolute z-20", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroV2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const slow = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section id="inicio" ref={ref} className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-[62%] justify-center">
        <div className="absolute bottom-0 aspect-[2/1] w-[min(620px,110vw)] rounded-t-full bg-[radial-gradient(ellipse_50%_100%_at_50%_100%,rgba(0,0,0,0.07),rgba(0,0,0,0.025)_55%,transparent_75%)]" />
      </div>

      <div className="container-x flex flex-col items-center text-center">
        <h1 className="text-hero max-w-4xl">
          {["Webs que convierten", "visitas en clientes"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease }}
              >
                {i === 1 ? (
                  <>
                    visitas en <em className="text-brand">clientes</em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="mt-5 max-w-md text-[1.08rem] text-pretty text-neutral-600 sm:text-lg"
        >
          Diseño web para negocios locales en Barcelona. Pago único, sin cuotas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.62, ease }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <PrimaryButton href="#contacto">Cuéntame tu proyecto</PrimaryButton>
          <SecondaryButton href="#proyectos">Ver proyectos</SecondaryButton>
        </motion.div>
      </div>

      {/* Stage */}
      <div className="relative mx-auto mt-12 h-[330px] max-w-5xl [clip-path:inset(-100vh_-100vw_0_-100vw)] sm:h-[380px] md:mt-14 md:h-[400px]">
        <motion.div
          style={{ y: phoneY }}
          className="absolute top-0 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.45, ease }}>
            <Phone statusBg="transparent" statusFg="#ffffff" className="[--w:220px] sm:[--w:250px] md:[--w:268px]">
              <DemoSite />
            </Phone>
          </motion.div>
        </motion.div>

        <Float delay={0.95} y={slow} className="top-28 -left-2 sm:top-24 sm:left-[9%] lg:top-16 lg:left-[6%]">
          <AnalyticsCard className="-rotate-[3deg]" />
        </Float>

        <Float delay={1.05} y={fast} className="top-40 -right-2 sm:top-40 sm:right-[9%] lg:top-24 lg:right-[6%]">
          <ReviewsCard className="rotate-[3deg]" />
        </Float>

        <Float delay={1.15} y={fast} className="bottom-12 left-[3%] hidden lg:block">
          <PriceCard className="rotate-[2deg]" />
        </Float>

        <Float delay={1.25} y={slow} className="right-[3%] bottom-16 hidden lg:block">
          <WhatsAppCard className="-rotate-[2deg]" />
        </Float>

        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-black/[0.06]" />
      </div>
    </section>
  );
}
