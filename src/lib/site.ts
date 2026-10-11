import bioacting from "../../public/work/bioacting.webp";
import aurelian from "../../public/work/aurelian.webp";
import lumiere from "../../public/work/lumiere.webp";
import lumiereMobile from "../../public/work/lumiere-mobile.png";

export const site = {
  name: "ib.studio",
  url: "https://www.ibstudio.es",
  email: "ibaifo8@gmail.com",
  phone: "+34 711 55 52 67",
  phoneHref: "tel:+34711555267",
  whatsapp: "https://wa.me/34711555267",
  instagram: "https://www.instagram.com/ib.webs/",
};

/** Dispatched by pricing CTAs so the contact form preselects that plan. */
export const SELECT_PLAN_EVENT = "ibstudio:select-plan";

export const work = {
  lumiere: {
    name: "Lumière",
    kind: "Salón de belleza",
    status: "Concepto",
    year: "2026",
    href: "https://ibstudio.es/hair-salon",
    image: lumiere,
    mobile: lumiereMobile,
    summary: "Reserva de cita a un toque desde el móvil.",
  },
  bioacting: {
    name: "BioActing®",
    kind: "Nuria Martínez Abad · Coach actoral",
    status: "Cliente",
    year: "2025",
    href: "https://nuriamartinezabad.com/",
    image: bioacting,
    summary: "Web y tienda online para una coach actoral y terapeuta.",
  },
  aurelian: {
    name: "Aurelian",
    kind: "Hoteles boutique",
    status: "Concepto",
    year: "2026",
    href: undefined,
    image: aurelian,
    summary: "Reservas para estancias de alto nivel.",
  },
} as const;

export type PlanId = "esencial" | "profesional" | "enterprise";

export const plans: {
  id: PlanId;
  name: string;
  price: number;
  description: string;
  featured?: boolean;
  features: string[];
}[] = [
  {
    id: "esencial",
    name: "Esencial",
    price: 300,
    description: "Una página para empezar a recibir clientes.",
    features: ["Una página", "Diseño moderno y adaptado al móvil", "WhatsApp integrado", "Botón de reservas", "Formulario de contacto", "Google Maps"],
  },
  {
    id: "profesional",
    name: "Profesional",
    price: 550,
    featured: true,
    description: "Web completa para captar más clientes.",
    features: ["Todo lo del plan Esencial", "Hasta 5 páginas", "Páginas personalizadas", "Formularios avanzados", "Optimización de Google My Business", "Más rondas de cambios"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 800,
    description: "Funcionalidades e integraciones a medida.",
    features: ["Todo lo del plan Profesional", "Hasta 8 páginas", "Funcionalidades a medida", "Integraciones con herramientas externas", "Diseño premium", "Automatizaciones con IA"],
  },
];

export const faqs = [
  {
    q: "¿Hay que pagar una cuota mensual?",
    a: "Sí. Además del pago inicial por la web, hay una cuota mensual de mantenimiento para que siga funcionando, segura y al día, con los cambios que necesites.",
  },
  {
    q: "¿Podré editar los textos o imágenes yo mismo?",
    a: "Sí. Me mandas el cambio por WhatsApp y lo actualizo en menos de 24 h, o lo editas tú desde un panel muy sencillo.",
  },
  {
    q: "¿Cuánto tiempo tarda en estar lista mi web?",
    a: "Una web sencilla, 1–2 semanas. Proyectos grandes como un e-commerce, 3–4 semanas.",
  },
  {
    q: "¿Incluyes el dominio y el hosting?",
    a: "Sí, gratis el primer año en todos los planes. Te lo dejo todo configurado.",
  },
  {
    q: "Ya tengo Instagram, ¿para qué necesito una web?",
    a: "Instagram es para quien ya te sigue. Una web te trae clientes nuevos que te buscan en Google; Instagram ahí no aparece.",
  },
];
