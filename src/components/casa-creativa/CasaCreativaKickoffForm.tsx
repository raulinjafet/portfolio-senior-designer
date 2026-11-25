"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  findAdjacentStepIndex,
  findLastQuestionIndex,
  getVisibleQuestionSteps,
  kickoffSteps,
  Q27_CRM_OPTION,
  type KickoffAnswers,
  type KickoffStep,
} from "@/data/casa-creativa-kickoff";
import {
  filesToAttachmentPayloads,
  formatFileSize,
  KICKOFF_FILE_ACCEPT,
  KICKOFF_MAX_FILE_BYTES,
  KICKOFF_MAX_FILES,
} from "@/lib/casa-creativa/kickoff-attachments";

function getQuestionNumber(step: KickoffStep, answers: KickoffAnswers): number | null {
  if (step.kind !== "question") return null;
  const visible = getVisibleQuestionSteps(answers);
  return visible.findIndex((q) => q.id === step.id) + 1;
}

function isStepValid(step: KickoffStep, answers: KickoffAnswers): boolean {
  if (step.kind !== "question") return true;

  const value = answers[step.id];

  if (step.required) {
    if (value === undefined || value === "" || (Array.isArray(value) && !value.length)) {
      return false;
    }
  }

  if (step.type === "email" && typeof value === "string" && value.trim()) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  if (step.followUpId && step.followUpWhen?.(value ?? "")) {
    const follow = answers[step.followUpId];
    if (!follow || (typeof follow === "string" && !follow.trim())) {
      return false;
    }
  }

  return true;
}

export default function CasaCreativaKickoffForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<KickoffAnswers>({});
  const [direction, setDirection] = useState<"fwd" | "back">("fwd");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const step = kickoffSteps[stepIndex]!;
  const visibleQuestionCount = getVisibleQuestionSteps(answers).length;
  const questionNumber = step.kind === "question" ? getQuestionNumber(step, answers) : null;
  const progress =
    step.kind === "question" && questionNumber
      ? questionNumber / visibleQuestionCount
      : step.kind === "thanks"
        ? 1
        : stepIndex / (kickoffSteps.length - 1);

  const canContinue = useMemo(() => isStepValid(step, answers), [step, answers]);

  const goNext = useCallback(async () => {
    if (!canContinue) return;

    const isLastQuestion =
      step.kind === "question" && stepIndex === findLastQuestionIndex(answers);

    if (isLastQuestion) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const attachments =
          referenceFiles.length > 0 ? await filesToAttachmentPayloads(referenceFiles) : undefined;

        const res = await fetch("/api/casa-creativa/kickoff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, attachments, website: "" }),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok) {
          setSubmitError(data.error ?? "No se pudo enviar.");
          setSubmitting(false);
          return;
        }
        setDirection("fwd");
        setStepIndex(findAdjacentStepIndex(stepIndex, answers, 1));
      } catch {
        setSubmitError("Error de conexión. Revisa tu red e intenta de nuevo.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (step.kind === "question" && step.id === "q27_funcionalidades") {
      const selected = answers.q27_funcionalidades;
      const needsIntegrationDetails =
        Array.isArray(selected) && selected.includes(Q27_CRM_OPTION);
      if (!needsIntegrationDetails && answers.q28_integraciones) {
        setAnswers((prev) => {
          const { q28_integraciones: _, ...rest } = prev;
          return rest;
        });
      }
    }

    setDirection("fwd");
    setStepIndex(findAdjacentStepIndex(stepIndex, answers, 1));
  }, [answers, canContinue, referenceFiles, step.kind, stepIndex]);

  const goBack = useCallback(() => {
    if (stepIndex === 0 || step.kind === "thanks") return;
    setDirection("back");
    setStepIndex(findAdjacentStepIndex(stepIndex, answers, -1));
  }, [answers, step.kind, stepIndex]);

  const setField = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const addReferenceFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    setFileError(null);

    const next = [...referenceFiles];
    for (const file of Array.from(incoming)) {
      if (next.length >= KICKOFF_MAX_FILES) {
        setFileError(`Máximo ${KICKOFF_MAX_FILES} archivos.`);
        break;
      }
      if (file.size > KICKOFF_MAX_FILE_BYTES) {
        setFileError(`${file.name} supera ${formatFileSize(KICKOFF_MAX_FILE_BYTES)}.`);
        continue;
      }
      const duplicate = next.some(
        (existing) => existing.name === file.name && existing.size === file.size,
      );
      if (!duplicate) next.push(file);
    }
    setReferenceFiles(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeReferenceFile = (index: number) => {
    setReferenceFiles((files) => files.filter((_, i) => i !== index));
    setFileError(null);
  };

  const toggleMulti = (id: string, option: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [id]: next };
    });
  };

  useEffect(() => {
    if (step.kind === "thanks") return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 280);
    return () => window.clearTimeout(t);
  }, [stepIndex, step.kind]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (step.kind === "thanks") return;
      if (e.key === "Enter" && !e.shiftKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "TEXTAREA") return;
        e.preventDefault();
        void goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, step.kind]);

  const renderQuestionInput = (q: Extract<KickoffStep, { kind: "question" }>) => {
    const value = answers[q.id];
    const showFollowUp = q.followUpId && q.followUpWhen?.(value ?? "");

    return (
      <div className="cc-kickoff-fields">
        {(q.type === "short" || q.type === "email" || q.type === "tel") && (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            className="cc-kickoff-input"
            type={q.type === "email" ? "email" : q.type === "tel" ? "tel" : "text"}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => setField(q.id, e.target.value)}
            autoComplete={q.type === "email" ? "email" : "name"}
            placeholder={q.placeholder ?? "Escribe tu respuesta…"}
          />
        )}

        {q.type === "long" && (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            className="cc-kickoff-textarea"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => setField(q.id, e.target.value)}
            rows={5}
            placeholder={q.placeholder ?? "Escribe tu respuesta…"}
          />
        )}

        {q.allowAttachments && (
          <div className="cc-kickoff-upload">
            <input
              ref={fileInputRef}
              type="file"
              className="cc-kickoff-file-input"
              multiple
              accept={KICKOFF_FILE_ACCEPT}
              onChange={(e) => addReferenceFiles(e.target.files)}
            />
            <button
              type="button"
              className="cc-kickoff-upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Adjuntar archivos
            </button>
            <p className="cc-kickoff-upload-meta">
              Imágenes, PDF, .ai, .svg, .zip · hasta {KICKOFF_MAX_FILES} archivos
            </p>
            {fileError && (
              <p className="cc-kickoff-error" role="alert">
                {fileError}
              </p>
            )}
            {referenceFiles.length > 0 && (
              <ul className="cc-kickoff-file-list">
                {referenceFiles.map((file, index) => (
                  <li key={`${file.name}-${file.size}-${index}`}>
                    <span>
                      {file.name}
                      <span className="cc-kickoff-file-size">{formatFileSize(file.size)}</span>
                    </span>
                    <button
                      type="button"
                      className="cc-kickoff-file-remove"
                      onClick={() => removeReferenceFile(index)}
                      aria-label={`Quitar ${file.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {q.type === "single" && q.options && (
          <ul className="cc-kickoff-options" role="listbox">
            {q.options.map((opt) => {
              const selected = value === opt;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`cc-kickoff-option${selected ? " is-selected" : ""}`}
                    onClick={() => setField(q.id, opt)}
                  >
                    <span className="cc-kickoff-option-key" aria-hidden>
                      {String.fromCharCode(65 + q.options!.indexOf(opt))}
                    </span>
                    <span>{opt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {q.type === "multi" && q.options && (
          <ul className="cc-kickoff-options">
            {q.options.map((opt) => {
              const selected = Array.isArray(value) && value.includes(opt);
              return (
                <li key={opt}>
                  <button
                    type="button"
                    className={`cc-kickoff-option${selected ? " is-selected" : ""}`}
                    onClick={() => toggleMulti(q.id, opt)}
                  >
                    <span className="cc-kickoff-check" aria-hidden />
                    <span>{opt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {showFollowUp && q.followUpId && (
          <div className="cc-kickoff-followup">
            <label className="cc-kickoff-followup-label" htmlFor={q.followUpId}>
              {q.followUpLabel}
            </label>
            <input
              id={q.followUpId}
              className="cc-kickoff-input"
              type="text"
              value={typeof answers[q.followUpId] === "string" ? (answers[q.followUpId] as string) : ""}
              onChange={(e) => setField(q.followUpId!, e.target.value)}
              placeholder="Detalle…"
            />
          </div>
        )}
      </div>
    );
  };

  const isLastQuestion =
    step.kind === "question" && stepIndex === findLastQuestionIndex(answers);

  return (
    <div className="cc-kickoff-shell">
      <div className="cc-kickoff-progress" style={{ "--cc-progress": progress } as React.CSSProperties} />

      {step.kind !== "welcome" && step.kind !== "thanks" && (
        <button type="button" className="cc-kickoff-back" onClick={goBack} disabled={stepIndex === 0 || submitting}>
          ←
        </button>
      )}

      <div
        key={stepIndex}
        className={`cc-kickoff-step cc-kickoff-step--${direction}`}
      >
        {step.kind === "welcome" && (
          <div className="cc-kickoff-welcome">
            <p className="cc-kickoff-eyebrow">Casa Creativa</p>
            <h1 className="cc-kickoff-title">
              Brief de Kickoff
              <span className="cc-kickoff-title-sub">Branding y Desarrollo Web</span>
            </h1>
            <p className="cc-kickoff-lead">¡Siéntanse como en casa!</p>
            <p className="cc-kickoff-copy">
              Con este cuestionario queremos tocar el alma de la compañía y encontrar el mejor enfoque
              para el proyecto: objetivo del sitio, estilo gráfico y contenido alineado con su necesidad.
            </p>
            <p className="cc-kickoff-meta">
              Unas 10–15 min · {getVisibleQuestionSteps(answers).length} preguntas
            </p>
          </div>
        )}

        {step.kind === "section" && (
          <div className="cc-kickoff-section">
            <p className="cc-kickoff-section-index">Siguiente sección</p>
            <h2 className="cc-kickoff-section-title">{step.title}</h2>
            {step.subtitle && <p className="cc-kickoff-section-sub">{step.subtitle}</p>}
          </div>
        )}

        {step.kind === "question" && (
          <div className="cc-kickoff-question">
            <p className="cc-kickoff-q-index">
              {questionNumber} <span>→</span> {visibleQuestionCount}
            </p>
            <h2 className="cc-kickoff-q-label">
              {step.label}
              {step.required && <span className="cc-kickoff-required">*</span>}
            </h2>
            {step.hint && <p className="cc-kickoff-hint">{step.hint}</p>}
            {renderQuestionInput(step)}
            {submitError && isLastQuestion && (
              <p className="cc-kickoff-error" role="alert">
                {submitError}
              </p>
            )}
          </div>
        )}

        {step.kind === "thanks" && (
          <div className="cc-kickoff-thanks">
            <h2 className="cc-kickoff-thanks-title">¡Gracias!</h2>
            <p className="cc-kickoff-thanks-copy">
              Gracias por completar el cuestionario. Con sus respuestas prepararemos la propuesta de
              alcance y la cotización de Branding + Desarrollo Web.
            </p>
            <p className="cc-kickoff-thanks-sign">
              Casa Creativa
              <br />
              <a href="mailto:sucasacreativa@gmail.com">sucasacreativa@gmail.com</a>
              {" · "}
              <a href="tel:+573164697003">+57 316 469 7003</a>
            </p>
          </div>
        )}
      </div>

      {step.kind !== "thanks" && (
        <footer className="cc-kickoff-footer">
          <button
            type="button"
            className="cc-kickoff-cta"
            disabled={!canContinue || submitting}
            onClick={() => void goNext()}
          >
            {submitting
              ? "Enviando…"
              : isLastQuestion
                ? "Enviar respuestas"
                : step.kind === "welcome"
                  ? "Comenzar"
                  : "Continuar"}
          </button>
          <p className="cc-kickoff-hint-key">pulsa <kbd>Enter ↵</kbd></p>
        </footer>
      )}

      <input
        type="text"
        name="website"
        className="cc-kickoff-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
    </div>
  );
}