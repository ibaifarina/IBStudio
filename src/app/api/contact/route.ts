import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  plan?: string;
  message?: string;
  website?: string;
  company?: string; // honeypot
};

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim().slice(0, 120);
  const email = body.email?.trim().slice(0, 200);
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Revisa tu nombre y correo electrónico." }, { status: 400 });
  }

  const fields = {
    Nombre: name,
    Email: email,
    Teléfono: body.phone ? `+34 ${body.phone}` : "—",
    Plan: body.plan ?? "—",
    "Web actual": body.website || "—",
    Mensaje: body.message || "—",
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // No email provider configured (e.g. local dev): log the lead so nothing is lost.
    console.info("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set — lead:", fields);
    return NextResponse.json({ ok: true });
  }

  const html = Object.entries(fields)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${escape(String(v)).replace(/\n/g, "<br>")}</p>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "ib.studio <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `Nuevo contacto web — ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "No se pudo enviar. Escríbeme por WhatsApp." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
