import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/v2/legal";
import { legal, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo trata ${site.name} los datos personales que recibe a través de su web, y cómo ejercer tus derechos.`,
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <LegalSection title="Responsable del tratamiento">
        <ul>
          <li>
            <strong>Responsable:</strong> {legal.owner} ({site.name})
          </li>
          <li>
            <strong>Domicilio:</strong> {legal.city}, {legal.country}
          </li>
          <li>
            <strong>Email de contacto:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Qué datos tratamos">
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> nombre, email y, si los indicas, teléfono, web actual, plan que te interesa y el mensaje que escribas.
          </li>
          <li>
            <strong>Contacto directo:</strong> los datos que compartas si escribes por email, WhatsApp o llamas por teléfono.
          </li>
          <li>
            <strong>Datos técnicos:</strong> información anónima y agregada sobre las visitas a la web, y la verificación anti-spam del formulario.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Para qué los usamos y con qué base legal">
        <ul>
          <li>
            <strong>Responder a tu solicitud y preparar un presupuesto</strong>, con tu consentimiento al enviar el formulario y para aplicar medidas
            precontractuales a petición tuya (art. 6.1.a y 6.1.b del RGPD).
          </li>
          <li>
            <strong>Prestar el servicio contratado</strong>, si llegamos a trabajar juntos (art. 6.1.b del RGPD).
          </li>
          <li>
            <strong>Proteger el formulario frente a spam y conocer el uso de la web de forma agregada</strong>, por interés legítimo (art. 6.1.f del RGPD).
          </li>
        </ul>
        <p>No se toman decisiones automatizadas ni se elaboran perfiles con tus datos.</p>
      </LegalSection>

      <LegalSection title="Cuánto tiempo los conservamos">
        <p>
          Mientras sea necesario para atender tu solicitud. Si no llegamos a trabajar juntos, se eliminan como máximo 12 meses después del último contacto. Si
          contratas un servicio, se conservan durante la relación comercial y los plazos que exija la ley.
        </p>
      </LegalSection>

      <LegalSection title="Con quién se comparten">
        <p>No se ceden datos a terceros salvo obligación legal. Para funcionar, la web utiliza estos proveedores, que tratan datos por cuenta del responsable:</p>
        <ul>
          <li>
            <strong>Vercel</strong>: alojamiento de la web y estadísticas anónimas de visitas.
          </li>
          <li>
            <strong>Resend</strong>: envío de los mensajes del formulario por email.
          </li>
          <li>
            <strong>Cloudflare</strong>: verificación anti-spam del formulario (Turnstile).
          </li>
          <li>
            <strong>Google</strong>: gestión del correo electrónico.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, con las garantías previstas por el RGPD, como el Marco de
          Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo de la Comisión Europea.
        </p>
      </LegalSection>

      <LegalSection title="Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento en
          cualquier momento, escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          Si consideras que no se han tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
