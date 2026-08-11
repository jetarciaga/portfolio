import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-32 sm:scroll-mt-24 ${className}`}
    >
      <div className="max-w-prose">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-2xl font-semibold leading-heading"
        >
          {title}
        </h2>
        {description ? (
          <div className="mt-4 text-base text-muted">{description}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}
