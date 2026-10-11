import { legal } from "@/lib/site";

/** Shared shell for legal pages: title, last-updated date and readable prose. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-h2">{title}</h1>
      <p className="mt-4 text-[0.9rem] text-neutral-500">Última actualización: {legal.updated}</p>
      <div className="mt-12 space-y-10 text-[1rem] leading-relaxed text-pretty text-neutral-700 [&_a]:text-neutral-950 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-brand [&_li]:pl-1 [&_p+p]:mt-3 [&_strong]:font-medium [&_strong]:text-neutral-950 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-[1.45rem] leading-snug text-neutral-950">{title}</h2>
      {children}
    </section>
  );
}
