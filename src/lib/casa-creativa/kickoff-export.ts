import ExcelJS from "exceljs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  formatAnswerValue,
  kickoffQuestionLabels,
  type KickoffAnswers,
} from "@/data/casa-creativa-kickoff";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function buildKickoffBaseName(answers: KickoffAnswers): string {
  const brand = formatAnswerValue(answers.q5_nombre_marca);
  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(brand === "—" ? "cliente" : brand);
  return `casa-creativa-kickoff-${slug}-${date}`;
}

export async function buildKickoffWorkbook(answers: KickoffAnswers): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Casa Creativa — raulyn.com";
  const sheet = workbook.addWorksheet("Kickoff", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = [
    { header: "Pregunta", key: "question", width: 56 },
    { header: "Respuesta", key: "answer", width: 72 },
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFF3E8DC" },
  };

  for (const { id, label } of kickoffQuestionLabels) {
    sheet.addRow({
      question: label,
      answer: formatAnswerValue(answers[id]),
    });
  }

  sheet.addRow({});
  sheet.addRow({
    question: "Enviado el",
    answer: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

export async function buildKickoffPdf(answers: KickoffAnswers): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 48;
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const contentWidth = pageWidth - margin * 2;
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawLine = (text: string, bold = false, size = 10) => {
    const activeFont = bold ? fontBold : font;
    const lines = wrapText(text, 92);
    for (const line of lines) {
      if (y < margin + 24) {
        page = pdf.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      page.drawText(line, {
        x: margin,
        y,
        size,
        font: activeFont,
        color: rgb(0.12, 0.1, 0.08),
        maxWidth: contentWidth,
      });
      y -= size + 6;
    }
  };

  drawLine("Brief de Kickoff — Branding y Desarrollo Web", true, 16);
  drawLine("Casa Creativa", true, 12);
  y -= 8;
  drawLine(
    `Generado: ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}`,
    false,
    9,
  );
  y -= 12;

  for (const { id, label } of kickoffQuestionLabels) {
    const answer = formatAnswerValue(answers[id]);
    drawLine(label, true, 10);
    drawLine(answer, false, 10);
    y -= 6;
  }

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}