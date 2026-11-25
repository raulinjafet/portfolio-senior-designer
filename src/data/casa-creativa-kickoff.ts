export type KickoffAnswers = Record<string, string | string[]>;

export type KickoffFieldType = "short" | "long" | "email" | "tel" | "single" | "multi";

export type KickoffStep =
  | { kind: "welcome" }
  | { kind: "section"; title: string; subtitle?: string }
  | {
      kind: "question";
      id: string;
      label: string;
      hint?: string;
      placeholder?: string;
      type: KickoffFieldType;
      required?: boolean;
      allowAttachments?: boolean;
      options?: string[];
      followUpId?: string;
      followUpLabel?: string;
      followUpWhen?: (value: string | string[]) => boolean;
      showWhen?: (answers: KickoffAnswers) => boolean;
    }
  | { kind: "thanks" };

export const Q27_CRM_OPTION = "Integración con CRM o herramientas";

export function isKickoffStepVisible(step: KickoffStep, answers: KickoffAnswers): boolean {
  if (step.kind !== "question") return true;
  if (!step.showWhen) return true;
  return step.showWhen(answers);
}

export function getVisibleQuestionSteps(answers: KickoffAnswers) {
  return kickoffSteps.filter(
    (s): s is Extract<KickoffStep, { kind: "question" }> =>
      s.kind === "question" && isKickoffStepVisible(s, answers),
  );
}

export function findAdjacentStepIndex(
  currentIndex: number,
  answers: KickoffAnswers,
  direction: 1 | -1,
): number {
  let index = currentIndex + direction;
  while (index >= 0 && index < kickoffSteps.length) {
    if (isKickoffStepVisible(kickoffSteps[index]!, answers)) {
      return index;
    }
    index += direction;
  }
  return direction > 0 ? kickoffSteps.length - 1 : 0;
}

export function findLastQuestionIndex(answers: KickoffAnswers): number {
  const thanksIndex = kickoffSteps.findIndex((s) => s.kind === "thanks");
  for (let index = thanksIndex - 1; index >= 0; index -= 1) {
    const step = kickoffSteps[index];
    if (step?.kind === "question" && isKickoffStepVisible(step, answers)) {
      return index;
    }
  }
  return Math.max(0, thanksIndex - 1);
}

export function getKickoffExportLabels(answers: KickoffAnswers): { id: string; label: string }[] {
  return kickoffQuestionLabels.filter(({ id }) => {
    const asQuestion = kickoffSteps.find(
      (s): s is Extract<KickoffStep, { kind: "question" }> => s.kind === "question" && s.id === id,
    );
    if (asQuestion) return isKickoffStepVisible(asQuestion, answers);

    if (id === "q9_marca_archivos") {
      return true;
    }

    const parent = kickoffSteps.find(
      (s): s is Extract<KickoffStep, { kind: "question" }> =>
        s.kind === "question" && s.followUpId === id,
    );
    if (parent) return isKickoffStepVisible(parent, answers);

    return true;
  });
}

export const KICKOFF_NOTIFY_EMAILS = [
  "hi@raulyn.com",
  "sucasacreativa@gmail.com",
  "isusanarincond@gmail.com",
] as const;

/** Ordered steps: one screen per question (Typeform-style). */
export const kickoffSteps: KickoffStep[] = [
  { kind: "welcome" },
  {
    kind: "section",
    title: "Información general",
    subtitle: "Datos de contacto y contexto de la firma",
  },
  {
    kind: "question",
    id: "q1_nombre_responsable",
    label: "Nombre completo del responsable del proyecto",
    type: "short",
    required: true,
  },
  { kind: "question", id: "q2_cargo", label: "Cargo / Rol", type: "short" },
  {
    kind: "question",
    id: "q3_email",
    label: "Email de contacto",
    type: "email",
    required: true,
  },
  { kind: "question", id: "q4_telefono", label: "Teléfono de contacto", type: "tel" },
  {
    kind: "question",
    id: "q5_nombre_marca",
    label: "Nombre oficial de la firma / marca",
    type: "short",
    required: true,
  },
  {
    kind: "question",
    id: "q6_pais_ciudad",
    label: "País y ciudad de operación principal",
    type: "short",
  },
  {
    kind: "question",
    id: "q7_anos_existencia",
    label: "Años de existencia de la firma",
    type: "short",
  },
  {
    kind: "question",
    id: "q8_identidad_visual",
    label: "¿Ya tienen marca o identidad visual actual?",
    type: "single",
    options: ["No", "Sí, parcial", "Sí, completa"],
  },
  {
    kind: "question",
    id: "q9_marca_descripcion",
    label: "Si ya tienen marca, descríbala o adjunte referencias",
    type: "long",
    allowAttachments: true,
    hint: "Describe el estilo, pega enlaces o adjunta imágenes, PDF, .ai, .svg (máx. 6 archivos, 8 MB c/u).",
  },
  {
    kind: "section",
    title: "Branding — Visión de marca",
    subtitle:
      "El logotipo se incluye por defecto: hasta 2 propuestas + máximo 3 revisiones. Entregables: .ai .png .svg .jpg",
  },
  {
    kind: "question",
    id: "q10_percepcion_marca",
    label: "¿Cómo quieren que se perciba su marca?",
    type: "multi",
    options: [
      "Confiable / prestigiosa",
      "Moderna / innovadora",
      "Cercana / humana",
      "Seria / corporativa",
      "Otra (especificar)",
    ],
    followUpId: "q10_percepcion_otra",
    followUpLabel: "Especifica «Otra»",
    followUpWhen: (v) => Array.isArray(v) && v.includes("Otra (especificar)"),
  },
  {
    kind: "question",
    id: "q11_rubro",
    label: "Rubro o especialidad legal principal",
    type: "short",
  },
  { kind: "question", id: "q12_mision", label: "Misión", type: "long" },
  { kind: "question", id: "q13_vision", label: "Visión", type: "long" },
  {
    kind: "question",
    id: "q14_valores",
    label: "Valores o personalidad de la marca (3-5 palabras)",
    type: "short",
  },
  {
    kind: "question",
    id: "q15_competidores",
    label: "Competidores o referentes que admiran (nombres o links)",
    type: "long",
  },
  {
    kind: "question",
    id: "q16_referentes_visuales",
    label: "Referentes visuales (colores, estilos, marcas que les gusten)",
    type: "long",
  },
  {
    kind: "question",
    id: "q17_no_quieren",
    label: "¿Qué NO quieren en su marca?",
    type: "long",
  },
  {
    kind: "question",
    id: "q18_publico",
    label: "Público objetivo principal",
    type: "multi",
    options: ["Particulares", "Empresas / corporativo", "Ambos", "Otro"],
    followUpId: "q18_publico_otro",
    followUpLabel: "Especifica «Otro»",
    followUpWhen: (v) => Array.isArray(v) && v.includes("Otro"),
  },
  {
    kind: "section",
    title: "Branding — Alcance deseado",
    subtitle: "Opcionales para cotizar",
  },
  {
    kind: "question",
    id: "q19_extras_branding",
    label: "Seleccione los extras de branding que desean cotizar",
    type: "multi",
    options: [
      "Solo logotipo (incluido por defecto)",
      "Papelería básica (sobre carta, sobre ½ carta, hoja membrete, tarjeta personal)",
      "Papelería contable (cotización, factura, cuenta de cobro, recibo de caja)",
      "Manual corporativo (planimetría, colores, tipografías, usos y aplicaciones)",
      "Pack Full Brand (logo + papelería básica + manual)",
      "Otros (especificar)",
    ],
    followUpId: "q19_extras_otros",
    followUpLabel: "Especifica «Otros»",
    followUpWhen: (v) => Array.isArray(v) && v.includes("Otros (especificar)"),
  },
  {
    kind: "question",
    id: "q20_otros_elementos",
    label: "Otros elementos deseados (firma de email, presentaciones, redes, etc.)",
    type: "long",
  },
  {
    kind: "section",
    title: "Diseño y Desarrollo Web",
  },
  {
    kind: "question",
    id: "q21_dominio",
    label: "¿Tienen dominio actual?",
    type: "single",
    options: ["Sí (especificar nombre y proveedor)", "No", "No lo sé"],
    followUpId: "q21_dominio_detalle",
    followUpLabel: "Nombre del dominio y proveedor",
    followUpWhen: (v) => v === "Sí (especificar nombre y proveedor)",
  },
  {
    kind: "question",
    id: "q22_hosting",
    label: "¿Tienen hosting actual?",
    type: "single",
    options: ["Sí (especificar proveedor y tipo)", "No", "No lo sé"],
    followUpId: "q22_hosting_detalle",
    followUpLabel: "Proveedor y tipo de hosting",
    followUpWhen: (v) => v === "Sí (especificar proveedor y tipo)",
  },
  {
    kind: "question",
    id: "q23_sitio_web",
    label: "¿Ya tienen sitio web?",
    type: "single",
    options: ["Sí (indicar URL)", "No", "En desarrollo"],
    followUpId: "q23_sitio_url",
    followUpLabel: "URL del sitio",
    followUpWhen: (v) => v === "Sí (indicar URL)",
  },
  {
    kind: "question",
    id: "q24_objetivo_sitio",
    label: "Objetivo principal del sitio",
    type: "multi",
    options: [
      "Captar clientes / leads",
      "Informar sobre servicios",
      "Generar confianza",
      "Agenda de citas",
      "Otro",
    ],
    followUpId: "q24_objetivo_otro",
    followUpLabel: "Especifica «Otro»",
    followUpWhen: (v) => Array.isArray(v) && v.includes("Otro"),
  },
  {
    kind: "question",
    id: "q25_idiomas",
    label: "Idiomas requeridos",
    type: "multi",
    options: ["Español", "Inglés", "Ambos", "Otro"],
    followUpId: "q25_idiomas_otro",
    followUpLabel: "Especifica otro idioma",
    followUpWhen: (v) => Array.isArray(v) && v.includes("Otro"),
  },
  {
    kind: "question",
    id: "q26_num_paginas",
    label: "Número aproximado de páginas o secciones",
    type: "short",
    hint: "Ejemplo: Home — Servicios — Nuestra historia — Contacto, etc.",
    placeholder: "Lista las secciones que imaginas…",
  },
  {
    kind: "section",
    title: "Funcionalidades Web",
  },
  {
    kind: "question",
    id: "q27_funcionalidades",
    label: "Funcionalidades que necesitan",
    type: "multi",
    options: [
      "Formulario de contacto",
      "Calendario de reservas / citas",
      "Pasarela de pago",
      "Blog / Noticias",
      "Área de clientes / login",
      "Integración con CRM o herramientas",
      "Chat en vivo / WhatsApp",
      "Multilenguaje",
      "Otras (especificar)",
    ],
    followUpId: "q27_funcionalidades_otras",
    followUpLabel: "Especifica otras funcionalidades",
    followUpWhen: (v) => Array.isArray(v) && v.includes("Otras (especificar)"),
  },
  {
    kind: "question",
    id: "q28_integraciones",
    label: "Detalles de integraciones o funcionalidades especiales",
    type: "long",
    hint: "Indique CRM, herramientas y el tipo de integración que necesitan.",
    showWhen: (answers) => {
      const selected = answers.q27_funcionalidades;
      return Array.isArray(selected) && selected.includes(Q27_CRM_OPTION);
    },
  },
  {
    kind: "section",
    title: "Contenido, tiempos y cierre",
  },
  {
    kind: "question",
    id: "q29_textos",
    label: "¿Quién proveerá los textos?",
    type: "single",
    options: ["El cliente", "Casa Creativa", "Mixto"],
  },
  {
    kind: "question",
    id: "q30_imagenes",
    label: "¿Tienen imágenes, fotos del equipo o banco de imágenes?",
    type: "single",
    options: ["Sí", "No", "Parcial"],
  },
  {
    kind: "question",
    id: "q32_plazo",
    label: "Plazo deseado aproximado",
    type: "short",
  },
  {
    kind: "question",
    id: "q35_comentarios",
    label: "Comentarios adicionales",
    type: "long",
  },
  { kind: "thanks" },
];

export const kickoffQuestionLabels: { id: string; label: string }[] = kickoffSteps
  .filter((s): s is Extract<KickoffStep, { kind: "question" }> => s.kind === "question")
  .flatMap((s) => {
    const rows: { id: string; label: string }[] = [{ id: s.id, label: s.label }];
    if (s.followUpId) {
      rows.push({
        id: s.followUpId,
        label: s.followUpLabel ?? `${s.label} (detalle)`,
      });
    }
    if (s.allowAttachments) {
      rows.push({
        id: "q9_marca_archivos",
        label: "Archivos de referencia adjuntos",
      });
    }
    return rows;
  });

export function formatAnswerValue(value: string | string[] | undefined): string {
  if (value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return value;
}