import type { Metadata } from "next";
import { ContactV2, FaqV2, FooterV2 } from "@/components/v2/closing";
import { HeroV2 } from "@/components/v2/hero";
import { NavV2 } from "@/components/v2/nav";
import { PricingV2, ProcessV2, ProjectsV2, ServicesV2 } from "@/components/v2/sections";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <div className="v2 min-h-dvh bg-white font-ui text-[0.98rem] text-neutral-950">
      <NavV2 />
      <main>
        <HeroV2 />
        <ProjectsV2 />
        <ServicesV2 />
        <ProcessV2 />
        <PricingV2 />
        <ContactV2 />
        <FaqV2 />
      </main>
      <FooterV2 />
    </div>
  );
}
