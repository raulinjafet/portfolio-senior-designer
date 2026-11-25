import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  formatAnswerValue,
  KICKOFF_NOTIFY_EMAILS,
} from "@/data/casa-creativa-kickoff";
import {
  buildKickoffBaseName,
  buildKickoffPdf,
  buildKickoffWorkbook,
} from "@/lib/casa-creativa/kickoff-export";
import {
  kickoffPayloadSchema,
  validateKickoffAnswers,
} from "@/lib/casa-creativa/kickoff-validate";

export const runtime = "nodejs";

function getNotifyEmails(): string[] {
  const fromEnv = process.env.KICKOFF_NOTIFY_EMAILS;
  if (fromEnv?.trim()) {
    return fromEnv.split(",").map((e) => e.trim()).filter(Boolean);
  }
  return [...KICKOFF_NOTIFY_EMAILS];
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = kickoffPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const validation = validateKickoffAnswers(parsed.data.answers);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "El envío por correo no está configurado todavía." },
        { status: 503 },
      );
    }

    const answers = validation.answers;
    const baseName = buildKickoffBaseName(answers);
    const [xlsx, pdf] = await Promise.all([
      buildKickoffWorkbook(answers),
      buildKickoffPdf(answers),
    ]);

    const brand = formatAnswerValue(answers.q5_nombre_marca);
    const contact = formatAnswerValue(answers.q1_nombre_responsable);
    const email = formatAnswerValue(answers.q3_email);

    const resend = new Resend(apiKey);
    const from =
      process.env.RESEND_FROM?.trim() ||
      "Casa Creativa Kickoff <kickoff@raulyn.com>";

    const summaryRows = [
      ["Marca", brand],
      ["Responsable", contact],
      ["Email", email],
      ["Teléfono", formatAnswerValue(answers.q4_telefono)],
    ]
      .map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #e8dfd3"><strong>${k}</strong></td><td style="padding:6px 12px;border:1px solid #e8dfd3">${v}</td></tr>`)
      .join("");

    const { error } = await resend.emails.send({
      from,
      to: getNotifyEmails(),
      replyTo: typeof answers.q3_email === "string" ? answers.q3_email : undefined,
      subject: `Kickoff Casa Creativa — ${brand}`,
      html: `
        <div style="font-family:system-ui,sans-serif;color:#1a1410;max-width:560px">
          <h1 style="font-size:20px;margin:0 0 8px">Nuevo brief de kickoff</h1>
          <p style="margin:0 0 16px;color:#5c4f45">Branding y desarrollo web — Casa Creativa</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px">${summaryRows}</table>
          <p style="margin:24px 0 0;font-size:13px;color:#5c4f45">
            Respuestas completas en los adjuntos <strong>.xlsx</strong> y <strong>.pdf</strong>.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `${baseName}.xlsx`,
          content: xlsx,
        },
        {
          filename: `${baseName}.pdf`,
          content: pdf,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "No pudimos enviar el correo. Intenta de nuevo en unos minutos." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kickoff submit error:", err);
    return NextResponse.json(
      { error: "Error inesperado al procesar el formulario." },
      { status: 500 },
    );
  }
}