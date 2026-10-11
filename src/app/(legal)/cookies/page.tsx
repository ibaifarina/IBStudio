import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/v2/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: `${site.name} no usa cookies de publicidad ni de seguimiento. Qué tecnologías utiliza la web y por qué.`,
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <LegalSection title="Resumen">
        <p>
          Esta web <strong>no utiliza cookies de publicidad ni de seguimiento</strong>, y no comparte tu navegación con redes publicitarias. Por eso no
          verás un aviso de cookies.
        </p>
      </LegalSection>

      <LegalSection title="Qué es una cookie">
        <p>
          Una cookie es un pequeño archivo que un sitio web guarda en tu navegador. Algunas son necesarias para que la web funcione y otras sirven para
          analizar tu comportamiento o mostrarte publicidad.
        </p>
      </LegalSection>

      <LegalSection title="Tecnologías que usa esta web">
        <ul>
          <li>
            <strong>Estadísticas de visitas (Vercel Web Analytics):</strong> mide de forma anónima y agregada qué páginas se visitan. No usa cookies y no
            permite identificarte.
          </li>
          <li>
            <strong>Protección anti-spam (Cloudflare Turnstile):</strong> comprueba que el formulario de contacto lo envía una persona. Puede usar
            almacenamiento técnico estrictamente necesario para esa comprobación, exento de consentimiento según el artículo 22.2 de la LSSI.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Enlaces a otros sitios">
        <p>
          Si sigues un enlace a WhatsApp, Instagram u otros sitios externos, esos servicios pueden usar sus propias cookies según sus políticas, que te
          recomendamos consultar.
        </p>
      </LegalSection>

      <LegalSection title="Cómo gestionar las cookies">
        <p>
          Puedes ver, bloquear o eliminar las cookies desde la configuración de tu navegador. Si en el futuro esta web incorpora cookies que requieran tu
          consentimiento, se te pedirá antes de usarlas y se actualizará esta política.
        </p>
        <p>
          Si tienes cualquier duda, escribe a <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
