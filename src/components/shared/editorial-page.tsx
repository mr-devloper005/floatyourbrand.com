import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
};

export function EditorialPage({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="bg-[#1a1a1a] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-white"
          >
            <img
              src="/favicon.png?v=20260424"
              alt={`${SITE_CONFIG.name} logo`}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span>{SITE_CONFIG.name}</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ff5500]" />
            Back to home
          </Link>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a4d]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
              {description}
            </p>
          ) : null}
          {crumbs && crumbs.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mt-6 flex flex-wrap items-center gap-1.5 text-xs text-white/60"
            >
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <span
                    key={`${c.label}-${i}`}
                    className="inline-flex items-center gap-1.5"
                  >
                    {c.href && !last ? (
                      <Link
                        href={c.href}
                        className="text-white/70 hover:text-white"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span className={last ? "text-white" : ""}>
                        {c.label}
                      </span>
                    )}
                    {last ? null : (
                      <ChevronRight className="h-3 w-3 text-white/40" />
                    )}
                  </span>
                );
              })}
            </nav>
          ) : null}
          {actions ? <div className="mt-7">{actions}</div> : null}
        </div>
        <div className="h-1 w-full bg-[#ff5500]" />
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:p-8">
      {title ? (
        <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
      ) : null}
      <div className={title ? "mt-4" : undefined}>{children}</div>
    </section>
  );
}

export function PrimaryButton({
  href,
  children,
  type = "link",
}: {
  href?: string;
  children: ReactNode;
  type?: "link" | "submit";
}) {
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff5500] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e64d00]";
  if (type === "submit") {
    return (
      <button type="submit" className={cls}>
        {children}
      </button>
    );
  }
  return (
    <Link href={href || "#"} className={cls}>
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-sm border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
    >
      {children}
    </Link>
  );
}
