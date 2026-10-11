import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Host_Grotesk, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/motion-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import "./globals.css";

const host = Host_Grotesk({ variable: "--font-host", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const lora = Lora({
  variable: "--font-site-serif",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "IB Studio | Diseño web para negocios locales en Barcelona",
    template: "%s | IB Studio",
  },
  description:
    "Diseño y desarrollo de páginas web rápidas, modernas y optimizadas para móvil. Más llamadas, reservas y clientes para tu negocio, con mantenimiento mensual incluido.",
  applicationName: site.name,
  openGraph: {
    title: "IB Studio — Webs que convierten visitas en clientes",
    description: "Webs rápidas y bonitas para negocios locales, con mantenimiento mensual.",
    url: site.url,
    siteName: site.name,
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: "ib.studio",
  url: site.url,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  telephone: site.phone.replace(/\s/g, ""),
  areaServed: "ES",
  address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${host.variable} ${mono.variable} ${geist.variable} ${lora.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
        <Toaster theme="light" position="bottom-center" />
        <Analytics />
      </body>
    </html>
  );
}
