import Link from "next/link";
import { Logo } from "@/components/brand";
import { FooterV2 } from "@/components/v2/closing";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2 min-h-dvh bg-white font-ui text-[0.98rem] text-neutral-950">
      <header className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" className="text-[1.35rem]" aria-label="IB Studio — inicio">
          <Logo />
        </Link>
        <Link href="/" className="text-[0.9rem] text-neutral-500 transition-colors hover:text-neutral-950">
          ← Volver al inicio
        </Link>
      </header>
      <main className="container-x py-16 md:py-24">{children}</main>
      <FooterV2 linkPrefix="/" />
    </div>
  );
}
