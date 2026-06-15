"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { useCursor } from "@/context/CursorContext";
import { projects, type Project } from "@/data/projects";
import { getColorToken } from "@/lib/tokens";

gsap.registerPlugin(ScrollTrigger);

type QuickToFn = (value: number) => void;

function getPreviewOffset() {
  if (typeof document === "undefined") return { x: 32, y: -48 };
  const root = getComputedStyle(document.documentElement);
  return {
    x: parseFloat(root.getPropertyValue("--preview-offset-x")) || 32,
    y: parseFloat(root.getPropertyValue("--preview-offset-y")) || -48,
  };
}

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
      const section = sectionRef.current;

      if (preview) {
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
      }

      if (section) {
        const intro = section.querySelector<HTMLElement>(".projects-intro");
        const rows = gsap.utils.toArray<HTMLElement>(".project-row");

        if (intro && rows.length) {
          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;

          if (!prefersReducedMotion) {
            const headingLines = gsap.utils.toArray<HTMLElement>(".projects-heading-line");
            gsap.set(intro, { opacity: 0, y: 20 });
            gsap.set(rows, { opacity: 0, y: 24 });
            if (headingLines.length) gsap.set(headingLines, { y: "100%" });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            });

            timeline.to(intro, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });

            if (headingLines.length) {
              timeline.to(
                headingLines,
                {
                  y: "0%",
                  duration: 0.9,
                  stagger: 0.06,
                  ease: "power4.out",
                },
                "-=0.55",
              );
            }

            timeline.to(
              rows,
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.45",
            );
          }
        }
      }

      return () => {
        previewXToRef.current = null;
        previewYToRef.current = null;
        if (preview) gsap.killTweensOf(preview);
      };
    },
    { scope: sectionRef },
  );

  const movePreview = (event: MouseEvent<HTMLElement>) => {
    const { x, y } = getPreviewOffset();
    previewXToRef.current?.(event.clientX + x);
    previewYToRef.current?.(event.clientY + y);
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
      className="section-padding relative"
      aria-labelledby="work-heading"
    >
      <div className="container-site">
        <div className="projects-intro projects-heading-block">
          <p className="type-eyebrow">Proyectos</p>
          <h2 id="work-heading" className="type-projects-heading mt-6">
            <span className="block overflow-hidden">
              <span className="projects-heading-line block will-change-transform">
                <span className="projects-heading-muted">Cada proyecto es</span>
                {" una decisión."}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="projects-heading-line block will-change-transform">
                No solo una interfaz.
              </span>
            </span>
          </h2>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-row group relative pointer-fine:cursor-none"
              onMouseEnter={(event) => handleRowEnter(project, event)}
              onMouseMove={handleRowMove}
              onMouseLeave={handleRowLeave}
            >
              <div className="project-row-inner">
                <span className="type-eyebrow">{project.id}</span>

                <h3 className="type-project-title max-w-3xl will-change-transform">
                  <Link
                    href={`/work/${project.slug}`}
                    className="project-title inline-block transition-colors hover:text-primary"
                  >
                    {project.title}
                  </Link>
                </h3>

                <div className="project-row-meta">
                  <p className="project-row-category">{project.category}</p>
                  <p className="project-row-year">{project.year}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="project-preview pointer-events-none fixed top-0 left-0 z-40 hidden overflow-hidden bg-preview-bg opacity-0 shadow-2xl pointer-fine:block"
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
