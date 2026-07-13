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
  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    >
      <source src={src} type={type} />
    </video>
  );
}
