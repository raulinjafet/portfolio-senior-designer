"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { useCursor } from "@/context/CursorContext";
import { projects, type Project } from "@/data/projects";
import { getColorToken } from "@/lib/tokens";

const PREVIEW_OFFSET_X = 32;
const PREVIEW_OFFSET_Y = -48;

type QuickToFn = (value: number) => void;

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewXToRef = useRef<QuickToFn | null>(null);
  const previewYToRef = useRef<QuickToFn | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { setHoveringProject, setHoveringLink } = useCursor();

  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview) return;

      gsap.set(preview, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0.75,
        force3D: true,
      });

      previewXToRef.current = gsap.quickTo(preview, "x", {
        duration: 0.85,
        ease: "power3.out",
      });

      previewYToRef.current = gsap.quickTo(preview, "y", {
        duration: 0.85,
        ease: "power3.out",
      });

      return () => {
        previewXToRef.current = null;
        previewYToRef.current = null;
        gsap.killTweensOf(preview);
      };
    },
    { scope: previewRef },
  );

  const movePreview = (event: MouseEvent<HTMLElement>) => {
    previewXToRef.current?.(event.clientX + PREVIEW_OFFSET_X);
    previewYToRef.current?.(event.clientY + PREVIEW_OFFSET_Y);
  };

  const handleRowEnter = (project: Project, event: MouseEvent<HTMLElement>) => {
    setActiveProject(project);
    setHoveringLink(false);
    setHoveringProject(true);

    const preview = previewRef.current;
    const title = event.currentTarget.querySelector<HTMLElement>(".project-title");

    if (title) {
      gsap.to(title, {
        x: 16,
        color: getColorToken("primary"),
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    if (preview) {
      gsap.to(preview, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    movePreview(event);
  };

  const handleRowMove = (event: MouseEvent<HTMLElement>) => {
    movePreview(event);
  };

  const handleRowLeave = (event: MouseEvent<HTMLElement>) => {
    setActiveProject(null);
    setHoveringProject(false);

    const preview = previewRef.current;
    const title = event.currentTarget.querySelector<HTMLElement>(".project-title");

    if (title) {
      gsap.to(title, {
        x: 0,
        color: getColorToken("foreground"),
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (preview) {
      gsap.to(preview, {
        opacity: 0,
        scale: 0.75,
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 lg:mb-16">
          <p className="type-eyebrow">Proyectos</p>
          <h2
            id="work-heading"
            className="type-section-title mt-6 max-w-2xl"
          >
            Cada proyecto es una decisión.
            <br />
            No solo una interfaz.
          </h2>
        </div>

        <div className="featured-projects-container border-t border-foreground-divider">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-row group relative cursor-none border-b border-foreground-divider py-12 lg:py-16"
              onMouseEnter={(event) => handleRowEnter(project, event)}
              onMouseMove={handleRowMove}
              onMouseLeave={handleRowLeave}
            >
              <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 lg:gap-12">
                <span className="type-project-index">{project.id}</span>

                <h3 className="type-project-title max-w-3xl will-change-transform">
                  <Link
                    href={`/work/${project.slug}`}
                    className="project-title inline-block transition-colors hover:text-primary"
                  >
                    {project.title}
                  </Link>
                </h3>

                <div className="sm:text-right">
                  <p className="type-project-meta">{project.category}</p>
                  <p className="type-eyebrow mt-1 text-foreground-faint">
                    {project.year}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[400px] w-[320px] overflow-hidden rounded-[40px] bg-preview-bg opacity-0 shadow-2xl pointer-fine:block"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="absolute inset-0 overflow-hidden transition-opacity duration-300"
            style={{
              opacity: activeProject?.id === project.id ? 1 : 0,
            }}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover"
              sizes="320px"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
