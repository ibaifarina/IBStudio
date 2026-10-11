import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <div className="v2 flex min-h-dvh flex-col bg-white font-ui text-[0.98rem] text-neutral-950">
      <header className="container-x flex h-16 items-center md:h-[72px]">
        <Link href="/" className="text-[1.35rem]" aria-label="IB Studio — inicio">
          <Logo />
        </Link>
      </header>
      <main className="container-x flex flex-1 flex-col items-center justify-center pb-24 text-center">
        <p className="text-[0.9rem] text-neutral-500">Error 404</p>
        <h1 className="mt-3 text-h2">Esta página no existe</h1>
        <p className="mt-4 max-w-sm text-pretty text-neutral-500">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-neutral-950 px-6 text-[0.95rem] font-medium text-white transition-colors duration-300 hover:bg-brand"
        >
          Volver al inicio
        </Link>
      </main>
    </div>
  );
}
