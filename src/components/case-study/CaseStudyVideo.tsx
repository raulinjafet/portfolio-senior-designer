"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type CaseStudyVideoProps = {
  src: string;
  type: "video/webm" | "video/mp4";
  className?: string;
};

export default function CaseStudyVideo({
  src,
  type,
  className = "cs-case-video",
}: CaseStudyVideoProps) {
  const t = useTranslations("caseStudy");
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const autoplayOnce = async () => {
      if (userPausedRef.current) return;

      try {
        await video.play();
        setIsPaused(false);
      } catch {
        setIsPaused(true);
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void autoplayOnce();
    } else {
      video.addEventListener("canplay", () => void autoplayOnce(), { once: true });
    }

    const onPause = () => {
      if (document.visibilityState === "hidden") return;
      if (!video.ended) userPausedRef.current = true;
      setIsPaused(true);
    };

    const onPlay = () => {
      setIsPaused(false);
    };

    const onEnded = () => {
      setIsPaused(true);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && userPausedRef.current) {
        video.pause();
      }
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      void video.play();
      return;
    }

    userPausedRef.current = true;
    video.pause();
  };

  const videoClassName =
    className === "cs-case-video" ? "cs-case-video" : `cs-case-video ${className}`;

  return (
    <div className="cs-case-video-wrap">
      <video
        ref={videoRef}
        className={videoClassName}
        muted
        playsInline
        preload="metadata"
        aria-label={t("videoLabel")}
      >
        <source src={src} type={type} />
      </video>
      <button
        type="button"
        className="cs-case-video__toggle"
        onClick={togglePlayback}
        aria-label={isPaused ? t("videoPlay") : t("videoPause")}
      >
        {isPaused ? (
          <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
            <path d="M0 0v16l14-8L0 0z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M0 0h4v14H0V0zm8 0h4v14H8V0z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
