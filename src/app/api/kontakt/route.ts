import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_EMAIL!;

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, telefon, unternehmen, projektart, nachricht } = body;

  try {
    // 1. Benachrichtigung an Treventi
    await resend.emails.send({
      from: "Treventi Kontakt <onboarding@resend.dev>",
      to: TO,
      subject: `Neue Anfrage von ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#7a1020;padding:24px 32px">
            <h1 style="color:white;font-size:20px;margin:0">Neue Projektanfrage</h1>
          </div>
          <div style="padding:32px;background:#f7f3ee">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#7a1020;font-size:11px;text-transform:uppercase;letter-spacing:0.15em">Name</td><td style="padding:8px 0">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#7a1020;font-size:11px;text-transform:uppercase;letter-spacing:0.15em">E-Mail</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#7a1020">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#7a1020;font-size:11px;text-transform:uppercase;letter-spacing:0.15em">Telefon</td><td style="padding:8px 0">${telefon || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#7a1020;font-size:11px;text-transform:uppercase;letter-spacing:0.15em">Unternehmen</td><td style="padding:8px 0">${unternehmen || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#7a1020;font-size:11px;text-transform:uppercase;letter-spacing:0.15em">Projektart</td><td style="padding:8px 0">${projektart || "—"}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #d4c9c0;margin:24px 0" />
            <p style="color:#7a1020;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 8px">Nachricht</p>
            <p style="white-space:pre-wrap;margin:0">${nachricht}</p>
          </div>
        </div>
      `,
    });

    // 2. Bestätigung an den Absender
    await resend.emails.send({
      from: "Treventi <onboarding@resend.dev>",
      to: email,
      subject: "Wir haben deine Anfrage erhalten — Treventi",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#7a1020;padding:24px 32px">
            <h1 style="color:white;font-size:20px;margin:0">Vielen Dank, ${name}.</h1>
          </div>
          <div style="padding:32px;background:#f7f3ee">
            <p style="margin:0 0 16px">Wir haben deine Anfrage erhalten und melden uns innerhalb von <strong>24 Stunden</strong> mit einem konkreten Angebot zurück.</p>
            <p style="margin:0;color:#7a7a7a;font-size:13px">Treventi Group · Premium Innentüren · Made in Europe</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
