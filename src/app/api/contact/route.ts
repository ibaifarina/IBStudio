import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  plan?: string;
  message?: string;
  website?: string;
  company?: string; // honeypot
  turnstileToken?: string;
};

/** Checks the Cloudflare Turnstile token. Skipped when no secret is configured (e.g. local dev). */
async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verification failed", err);
    return false;
  }
}

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

  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json({ error: "No hemos podido verificar que no eres un robot. Inténtalo de nuevo." }, { status: 400 });
  }

  const name = body.name?.trim().slice(0, 120);
  const email = body.email?.trim().slice(0, 200);
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Revisa tu nombre y correo electrónico." }, { status: 400 });
  }

  const fields = {
    Nombre: name,
    Email: email,
    Teléfono: body.phone ? (body.phone.trim().startsWith("+") ? body.phone.trim() : `+34 ${body.phone.trim()}`) : "—",
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
