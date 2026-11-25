import { z } from "zod";
import { kickoffSteps, type KickoffAnswers } from "@/data/casa-creativa-kickoff";

const answerSchema = z.union([z.string(), z.array(z.string())]);

export const kickoffPayloadSchema = z.object({
  answers: z.record(z.string(), answerSchema),
  website: z.string().max(0).optional(),
});

export function validateKickoffAnswers(raw: KickoffAnswers): {
  ok: true;
  answers: KickoffAnswers;
} | {
  ok: false;
  message: string;
} {
  const questions = kickoffSteps.filter((s) => s.kind === "question");

  for (const q of questions) {
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