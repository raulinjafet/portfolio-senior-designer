export const KICKOFF_MAX_FILES = 6;
export const KICKOFF_MAX_FILE_BYTES = 8 * 1024 * 1024;
export const KICKOFF_MAX_TOTAL_BYTES = 24 * 1024 * 1024;

export const KICKOFF_FILE_ACCEPT =
  "image/*,.pdf,.svg,.ai,.eps,.zip,application/pdf,application/zip,application/postscript";

export type KickoffAttachmentPayload = {
  filename: string;
  contentType: string;
  /** Base64-encoded file bytes */
  data: string;
  size: number;
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function decodeAttachmentPayload(payload: KickoffAttachmentPayload): Buffer {
  return Buffer.from(payload.data, "base64");
}

export function validateAttachmentPayloads(
  attachments: KickoffAttachmentPayload[] | undefined,
): { ok: true } | { ok: false; message: string } {
  if (!attachments?.length) return { ok: true };

  if (attachments.length > KICKOFF_MAX_FILES) {
    return { ok: false, message: `Máximo ${KICKOFF_MAX_FILES} archivos por envío.` };
  }

  let total = 0;
  for (const file of attachments) {
    if (!file.filename || !file.data) {
      return { ok: false, message: "Uno de los archivos adjuntos no es válido." };
    }
    if (file.size > KICKOFF_MAX_FILE_BYTES) {
      return {
        ok: false,
        message: `${file.filename} supera el límite de ${formatFileSize(KICKOFF_MAX_FILE_BYTES)}.`,
      };
    }
    total += file.size;
  }

  if (total > KICKOFF_MAX_TOTAL_BYTES) {
    return {
      ok: false,
      message: `El total de adjuntos supera ${formatFileSize(KICKOFF_MAX_TOTAL_BYTES)}.`,
    };
  }

  return { ok: true };
}

export async function filesToAttachmentPayloads(files: File[]): Promise<KickoffAttachmentPayload[]> {
  const payloads: KickoffAttachmentPayload[] = [];

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]!);
    }

    payloads.push({
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      data: btoa(binary),
      size: file.size,
    });
  }

  return payloads;
}