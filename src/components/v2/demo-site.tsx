import Image from "next/image";
import seaside from "../../../public/work/seaside.webp";

/** Coded mobile site shown inside the hero phone. Sized in em (1em ≈ 4% of phone width). */
export function DemoSite() {
  return (
    <div className="relative h-full overflow-hidden bg-[#1c1a17] text-white">
      <Image src={seaside} alt="" fill sizes="300px" priority className="object-cover object-[50%_50%]" />
      {/* Only shade where text sits: top for the header, bottom for the copy */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.1)_14%,rgba(0,0,0,0.45)_26%,rgba(0,0,0,0.65)_45%,rgba(0,0,0,0.8)_100%)]" />

      {/* Site header */}
      <header className="relative flex items-center justify-between px-[1.2em] pt-[3.5em]">
        <span className="flex flex-1 flex-col gap-[0.3em]">
          <span className="h-[0.11em] w-[1.25em] rounded bg-white" />
          <span className="h-[0.11em] w-[1.25em] rounded bg-white" />
        </span>
        <span className="text-center leading-none">
          <span className="block font-serif text-[1.15em] tracking-[0.14em]">MAR BLAU</span>
          <span className="mt-[0.35em] block text-[0.45em] tracking-[0.3em] text-white/75">RESTAURANTE</span>
        </span>
        <span className="flex-1" />
      </header>

      {/* Hero copy, low on the photo */}
      <div className="absolute inset-x-0 top-[27%] px-[1.4em]">
        <p className="font-serif text-[2.55em] leading-[0.98] tracking-[-0.01em]">
          Cocina de mar,
          <br />
          <em>frente al mar.</em>
        </p>
        <p className="mt-[0.7em] max-w-[16em] text-[0.88em] leading-snug text-white/85">
          Pescado del día y arroces con vistas al Mediterráneo.
        </p>
        <div className="mt-[1.3em] flex flex-col gap-[0.55em]">
          <div className="flex h-[3.4em] items-center justify-center rounded-full bg-white text-[0.82em] font-semibold text-[#1c1a17]">Reservar mesa</div>
          <div className="flex h-[3.4em] items-center justify-center rounded-full border border-white/45 bg-white/10 text-[0.82em] font-medium backdrop-blur-sm">Ver la carta</div>
        </div>
      </div>
    </div>
  );
}
