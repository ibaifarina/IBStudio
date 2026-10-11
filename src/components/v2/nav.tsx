"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand";
import { ease } from "@/components/motion";
import { cn } from "@/lib/utils";

export const navV2 = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#precios" },
  { label: "FAQ", href: "#faq" },
];

export function NavV2() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <a href="#inicio" className="text-[1.35rem]" aria-label="ib.studio — inicio" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navV2.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.92rem] text-neutral-600 transition-colors hover:bg-black/[0.04] hover:text-neutral-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="hidden h-10 items-center rounded-full bg-neutral-950 px-5 text-[0.92rem] font-medium text-white transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            Hablemos
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-10 place-items-center rounded-full hover:bg-black/[0.04] md:hidden"
          >
            <span className="relative block h-2.5 w-[18px]">
              <span className={cn("absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300", open ? "top-1/2 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300", open ? "top-1/2 -rotate-45" : "top-full")} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden md:hidden"
            aria-label="Móvil"
          >
            <ul className="container-x flex flex-col gap-1 pt-2 pb-6">
              {[...navV2, { label: "Contacto", href: "#contacto" }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-3xl hover:bg-black/[0.04]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
