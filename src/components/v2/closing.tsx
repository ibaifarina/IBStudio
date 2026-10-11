"use client";

import { Accordion } from "@base-ui/react/accordion";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, MailIcon, PhoneIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { InstagramIcon, Logo, WhatsAppIcon } from "@/components/brand";
import { Reveal, ease } from "@/components/motion";
import { Checkbox } from "@/components/ui/checkbox";
import { navV2 } from "@/components/v2/nav";
import { Turnstile, turnstileSiteKey } from "@/components/v2/turnstile";
import { Heading } from "@/components/v2/ui";
import { SELECT_PLAN_EVENT, faqs, plans, site, type PlanId } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FaqV2() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-x">
        <Heading title="Preguntas frecuentes" />
        <Reveal className="mx-auto mt-12 max-w-3xl md:mt-14">
          <Accordion.Root defaultValue={[0]} className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <Accordion.Item key={f.q} value={i} className="group rounded-[22px] bg-[#f5f5f3] transition-colors data-open:bg-[#efefec]">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded-[22px] md:px-7 md:py-6">
                    <span className="font-display text-[1.3rem] leading-snug md:text-[1.45rem]">{f.q}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out-expo group-data-open:rotate-45 group-data-open:bg-neutral-950 group-data-open:text-white">
                      <PlusIcon className="size-4" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-500 ease-out-expo data-ending-style:h-0 data-starting-style:h-0">
                  <p className="max-w-2xl px-6 pb-6 text-pretty text-neutral-600 md:px-7">{f.a}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}

type PlanChoice = PlanId | "otro";

const field =
  "h-12 w-full rounded-xl border border-transparent bg-[#f5f5f3] px-4 text-[0.95rem] outline-none transition-colors placeholder:text-neutral-400 hover:bg-[#efefec] focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";

function FormField({ label, htmlFor, optional, className, children }: { label: string; htmlFor: string; optional?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-[0.85rem] font-medium text-neutral-700">
        {label}
        {optional && <span className="font-normal text-neutral-400"> · opcional</span>}
      </label>
      {children}
    </div>
  );
}

export function ContactV2() {
  const [plan, setPlan] = useState<PlanChoice>("otro");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  useEffect(() => {
    const onSelect = (e: Event) => setPlan((e as CustomEvent<PlanId>).detail);
    window.addEventListener(SELECT_PLAN_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PLAN_EVENT, onSelect);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return void toast.error("Acepta la política de privacidad para continuar.");
    if (turnstileSiteKey && !captcha) return void toast.error("Espera a que se complete la verificación anti-spam.");
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), plan, turnstileToken: captcha }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error);
      form.reset();
      setConsent(false);
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      toast.error(err instanceof Error && err.message ? err.message : "No se pudo enviar. Escríbeme por WhatsApp.");
    } finally {
      // Turnstile tokens are single-use: get a fresh one for the next attempt.
      setCaptcha(null);
      setCaptchaKey((k) => k + 1);
    }
  }

  const options: { id: PlanChoice; label: string }[] = [
    ...plans.map((p) => ({ id: p.id, label: `${p.name} · ${p.price} €` })),
    { id: "otro", label: "No lo sé" },
  ];

  const direct = [
    { icon: <WhatsAppIcon className="size-4" />, label: "WhatsApp", value: "Escríbeme ahora", href: site.whatsapp, external: true },
    { icon: <MailIcon className="size-4" />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: <PhoneIcon className="size-4" />, label: "Teléfono", value: site.phone, href: site.phoneHref },
    { icon: <InstagramIcon className="size-4" />, label: "Instagram", value: "@ib.webs", href: site.instagram, external: true },
  ];

  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="container-x">
<Reveal className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            <h2 className="text-h2">
              Hablemos de <em>tu web</em>
            </h2>
            <p className="mt-4 mb-10 max-w-md text-[1.05rem] text-pretty text-neutral-500 md:mb-12">Cuéntame tu idea. Sin compromiso.</p>
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_-10px_rgba(16,185,129,0.7)]"
                >
                  <CheckIcon className="size-6" strokeWidth={2.5} />
                </motion.span>
                <p className="mt-6 font-display text-[1.9rem] leading-tight">Mensaje recibido</p>
                <p className="mt-2 max-w-xs text-neutral-500">Gracias. Te escribo muy pronto con una propuesta.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[0.9rem] font-medium text-brand hover:underline">
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                <FormField label="Nombre" htmlFor="c-name">
                  <input id="c-name" name="name" required autoComplete="name" placeholder="María García" className={field} />
                </FormField>
                <FormField label="Email" htmlFor="c-email">
                  <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="maria@tunegocio.es" className={field} />
                </FormField>
                <FormField label="Teléfono" htmlFor="c-phone" optional>
                  <input id="c-phone" name="phone" type="tel" autoComplete="tel-national" placeholder="600 00 00 00" className={field} />
                </FormField>
                <FormField label="Web actual" htmlFor="c-web" optional>
                  <input id="c-web" name="website" placeholder="tunegocio.es" className={field} />
                </FormField>

                <fieldset className="sm:col-span-2">
                  <legend className="text-[0.85rem] font-medium text-neutral-700">¿Qué plan te interesa?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {options.map((o) => {
                      const on = plan === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setPlan(o.id)}
                          className={cn(
                            "h-10 rounded-full px-4 text-[0.9rem] font-medium transition-colors duration-200",
                            on ? "bg-neutral-950 text-white" : "bg-[#f5f5f3] text-neutral-700 hover:bg-[#efefec]",
                          )}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <FormField label="Cuéntame tu proyecto" htmlFor="c-msg" className="sm:col-span-2">
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={5}
                    placeholder="Tengo un restaurante y quiero que la gente pueda reservar desde la web…"
                    className={cn(field, "h-auto resize-none py-3 leading-relaxed")}
                  />
                </FormField>

                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                {turnstileSiteKey && (
                  <div className="-mt-5 sm:col-span-2">
                    <Turnstile onToken={setCaptcha} resetKey={captchaKey} />
                  </div>
                )}

                <label className="flex items-start gap-3 text-[0.85rem] text-neutral-500 sm:col-span-2">
                  <Checkbox checked={consent} onCheckedChange={(v) => setConsent(!!v)} className="mt-0.5 size-[18px] rounded-[5px]" />
                  <span>
                    He leído y acepto la{" "}
                    <a href="/privacidad" className="text-neutral-800 underline underline-offset-2 hover:text-brand">
                      política de privacidad
                    </a>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-neutral-950 text-[0.95rem] font-medium text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-brand hover:shadow-[0_12px_30px_-10px_var(--brand)] disabled:opacity-60 sm:col-span-2"
                >
                  {status === "sending" ? (
                    "Enviando…"
                  ) : (
                    <>
                      Enviar mensaje
                      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          </div>

          <aside className="lg:sticky lg:top-28">
            <p className="font-display text-[1.6rem] leading-tight">¿Prefieres hablar directamente?</p>
            <p className="mt-2 flex items-center gap-2 text-[0.9rem] text-neutral-500">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              Respondo en menos de 24&nbsp;h
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {direct.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    {...(d.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl bg-[#f5f5f3] p-3 pr-4 transition-colors duration-300 hover:bg-neutral-950 hover:text-white"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-neutral-900">{d.icon}</span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[0.78rem] text-neutral-500 transition-colors group-hover:text-white/60">{d.label}</span>
                      <span className="truncate text-[0.95rem] font-medium">{d.value}</span>
                    </span>
                    <ArrowUpRightIcon className="size-4 shrink-0 text-neutral-400 transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

/** `linkPrefix="/"` makes the section links work from pages other than the homepage. */
export function FooterV2({ linkPrefix = "" }: { linkPrefix?: string }) {
  return (
    <footer className="container-x pt-6 pb-10">
      <div className="flex flex-col gap-8 border-t border-black/[0.06] pt-10 md:flex-row md:items-center md:justify-between">
        <Logo className="text-xl" />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-neutral-500" aria-label="Pie">
          {navV2.map((n) => (
            <a key={n.href} href={`${linkPrefix}${n.href}`} className="hover:text-neutral-950">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          {[
            { icon: <InstagramIcon className="size-4" />, href: site.instagram, label: "Instagram" },
            { icon: <WhatsAppIcon className="size-4" />, href: site.whatsapp, label: "WhatsApp" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid size-10 place-items-center rounded-full bg-[#f5f5f3] text-neutral-600 transition-colors hover:bg-neutral-950 hover:text-white"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 text-[0.8rem] text-neutral-400 sm:flex-row sm:justify-between">
        <p>© 2026 IB Studio · Barcelona</p>
        <div className="flex gap-5">
          <a href="/privacidad" className="hover:text-neutral-950">Privacidad</a>
          <a href="/aviso-legal" className="hover:text-neutral-950">Aviso legal</a>
          <a href="/cookies" className="hover:text-neutral-950">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
