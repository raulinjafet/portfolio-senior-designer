import { z } from "zod";
import { isKickoffStepVisible, kickoffSteps, type KickoffAnswers } from "@/data/casa-creativa-kickoff";
import { KICKOFF_MAX_FILES, type KickoffAttachmentPayload } from "./kickoff-attachments";

const answerSchema = z.union([z.string(), z.array(z.string())]);

const attachmentSchema = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.string().max(120),
  data: z.string().min(1),
  size: z.number().int().positive(),
});

export const kickoffPayloadSchema = z.object({
  answers: z.record(z.string(), answerSchema),
  attachments: z.array(attachmentSchema).max(KICKOFF_MAX_FILES).optional(),
  website: z.string().max(0).optional(),
});

export function withAttachmentAnswerSummary(
  answers: KickoffAnswers,
  attachments: KickoffAttachmentPayload[] | undefined,
): KickoffAnswers {
  if (!attachments?.length) {
    return { ...answers, q9_marca_archivos: "—" };
  }

  const summary = attachments
    .map((file) => `${file.filename} (${Math.round(file.size / 1024)} KB)`)
    .join("\n");

  return { ...answers, q9_marca_archivos: summary };
}

export function validateKickoffAnswers(raw: KickoffAnswers): {
  ok: true;
  answers: KickoffAnswers;
} | {
  ok: false;
  message: string;
} {
  const questions = kickoffSteps.filter((s) => s.kind === "question");

  for (const q of questions) {
    if (!isKickoffStepVisible(q, raw)) {
      continue;
    }

    const value = raw[q.id];

    if (q.required) {
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        return { ok: false, message: `Falta responder: ${q.label}` };
      }
    }

    if (q.type === "email" && typeof value === "string" && value.trim()) {
      const emailOk = z.string().email().safeParse(value.trim());
      if (!emailOk.success) {
        return { ok: false, message: "El email de contacto no es válido." };
      }
    }

    if (q.followUpId && q.followUpWhen?.(value ?? "")) {
      const follow = raw[q.followUpId];
      if (!follow || (typeof follow === "string" && !follow.trim())) {
        return { ok: false, message: `Completa el detalle de: ${q.label}` };
      }
    }
  }

  return { ok: true, answers: raw };
}