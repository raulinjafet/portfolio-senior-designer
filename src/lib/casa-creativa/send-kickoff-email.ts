import nodemailer from "nodemailer";
import { Resend } from "resend";

export type KickoffEmailAttachment = {
  filename: string;
  content: Buffer;
};

export type KickoffEmailMessage = {
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  attachments: KickoffEmailAttachment[];
};

export function isKickoffEmailConfigured(): boolean {
  if (process.env.RESEND_API_KEY?.trim()) return true;
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  return Boolean(host && user && pass);
}

function getDefaultFromAddress(): string {
  return (
    process.env.SMTP_FROM?.trim() ||
    process.env.RESEND_FROM?.trim() ||
    "Casa Creativa Kickoff <hi@raulyn.com>"
  );
}

async function sendWithResend(message: KickoffEmailMessage): Promise<string | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return "Resend no configurado.";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: getDefaultFromAddress(),
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    attachments: message.attachments.map((file) => ({
      filename: file.filename,
      content: file.content,
    })),
  });

  if (error) {
    console.error("Resend error:", error);
    return "No pudimos enviar el correo. Intenta de nuevo en unos minutos.";
  }

  return null;
}

async function sendWithSmtp(message: KickoffEmailMessage): Promise<string | null> {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass) {
    return "SMTP no configurado.";
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE !== "false" && port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: getDefaultFromAddress(),
      to: message.to.join(", "),
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      attachments: message.attachments.map((file) => ({
        filename: file.filename,
        content: file.content,
      })),
    });
  } catch (err) {
    console.error("SMTP error:", err);
    return "No pudimos enviar el correo (SMTP). Revisa la configuración del buzón.";
  }

  return null;
}

/** Resend si hay API key; si no, SMTP de Private Email (Namecheap). */
export async function sendKickoffEmail(message: KickoffEmailMessage): Promise<string | null> {
  if (process.env.RESEND_API_KEY?.trim()) {
    return sendWithResend(message);
  }
  return sendWithSmtp(message);
}