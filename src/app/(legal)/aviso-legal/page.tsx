import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/v2/legal";
import { legal, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal de ${site.name}: datos del titular y condiciones de uso del sitio web.`,
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <LegalSection title="Datos del titular">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de
          los datos del titular de este sitio web:
        </p>
        <ul>
          <li>
            <strong>Titular:</strong> {legal.owner} ({site.name})
          </li>
          <li>
            <strong>Domicilio:</strong> {legal.city}, {legal.country}
          </li>
          <li>
            <strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <strong>Teléfono:</strong> <a href={site.phoneHref}>{site.phone}</a>
          </li>
          <li>
            <strong>Sitio web:</strong> {site.url.replace("https://", "")}
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Objeto">
        <p>
          Este sitio web presenta los servicios de diseño, desarrollo y mantenimiento de páginas web de {site.name} y permite contactar para solicitar
          información o un presupuesto.
        </p>
      </LegalSection>

      <LegalSection title="Condiciones de uso">
        <p>
          El acceso a este sitio web es gratuito y atribuye la condición de usuario, que acepta este aviso legal. El usuario se compromete a hacer un uso
          adecuado de los contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe.
        </p>
      </LegalSection>

      <LegalSection title="Propiedad intelectual e industrial">
        <p>
          Los textos, diseños, imágenes, logotipos y código de este sitio web pertenecen a {site.name} o se usan con la autorización de sus titulares. Queda
          prohibida su reproducción, distribución o transformación sin autorización expresa.
        </p>
        <p>
          Algunos de los proyectos mostrados son conceptos de diseño creados con fines demostrativos y no corresponden a negocios reales, salvo que se indique
          lo contrario.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilidad">
        <p>
          {site.name} procura que la información de este sitio sea correcta y esté actualizada, pero no garantiza la ausencia de errores ni se hace
          responsable de los daños que pudieran derivarse de su uso. Tampoco se responsabiliza de interrupciones del servicio ajenas a su control.
        </p>
      </LegalSection>

      <LegalSection title="Enlaces externos">
        <p>
          Este sitio puede contener enlaces a sitios de terceros, como WhatsApp o Instagram. {site.name} no controla esos sitios y no se hace responsable de
          sus contenidos ni de sus políticas.
        </p>
      </LegalSection>

      <LegalSection title="Legislación aplicable">
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que
          correspondan conforme a la normativa vigente.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
