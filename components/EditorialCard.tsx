import Link from "next/link";
import type { ReactNode } from "react";
import type { EditorialTone } from "@/lib/data";

type EditorialCardProps = {
  eyebrow: string;
  title: string;
  body?: string;
  meta?: string;
  href?: string;
  linkLabel?: string;
  tone?: EditorialTone;
  className?: string;
  headingLevel?: 2 | 3;
  children?: ReactNode;
};

export function EditorialCard({
  eyebrow,
  title,
  body,
  meta,
  href,
  linkLabel,
  tone = "paper",
  className = "",
  headingLevel = 2,
  children,
}: EditorialCardProps) {
  const heading =
    headingLevel === 2 ? <h2>{title}</h2> : <h3>{title}</h3>;

  const content = (
    <>
      <span className="editorial-card-eyebrow">{eyebrow}</span>
      {heading}
      {body ? <p className="editorial-card-body">{body}</p> : null}
      {children}
      <span className="editorial-card-footer">
        <span>{meta}</span>
        {href ? (
          <span className="editorial-card-action">
            {linkLabel ?? "Open"} <span aria-hidden="true">↗</span>
          </span>
        ) : null}
      </span>
    </>
  );

  const classes = `editorial-card editorial-card-${tone} ${
    href ? "editorial-card-link" : ""
  } ${className}`.trim();

  if (!href) {
    return <article className={classes}>{content}</article>;
  }

  if (href.startsWith("/")) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");

  return (
    <a
      className={classes}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {content}
    </a>
  );
}
