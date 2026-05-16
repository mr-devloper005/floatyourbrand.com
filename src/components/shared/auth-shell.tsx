import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Quote, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&w=1600&q=80";

type Props = {
  side: "login" | "register";
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  altLink: { label: string; helper: string; href: string };
  children: ReactNode;
};

export function AuthShell({
  side,
  eyebrow,
  title,
  description,
  bullets,
  altLink,
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
            href={altLink.href}
            className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/10"
          >
            {altLink.helper}
            <span className="text-[#ff5500]">{altLink.label} →</span>
          </Link>
        </div>
        <div className="h-1 w-full bg-[#ff5500]" />
      </header>

      <main className="mx-auto grid max-w-6xl gap-0 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:px-8 lg:py-14">
        <section className="relative hidden overflow-hidden rounded-md bg-[#1a1a1a] text-white lg:block">
          <Image
            src={HERO_IMAGE}
            alt="Reading"
            fill
            className="object-cover opacity-50"
            sizes="50vw"
            priority
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a4d]">
                {eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight">
                {title}
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-white/80">
                {description}
              </p>
              <ul className="mt-8 space-y-3">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm leading-7 text-white/90"
                  >
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff5500]/20 text-[#ff8a4d]">
                      <Sparkles className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="mt-10 rounded-md border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <Quote className="h-5 w-5 text-[#ff8a4d]" />
              <blockquote className="mt-3 text-sm leading-7 text-white/90">
                {side === "login"
                  ? "Reading here feels calm and intentional. The kind of place I keep coming back to in the morning."
                  : "Within a week of creating my account, my pitch was published. The editorial team is sharp and supportive."}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff5500] text-sm font-bold text-white">
                  {side === "login" ? "M" : "A"}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">
                    {side === "login" ? "Maya R." : "Arjun P."}
                  </p>
                  <p className="text-white/60">
                    {side === "login" ? "Reader since 2025" : "Contributor"}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-[#ff8a4d]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="rounded-md border border-zinc-200 bg-white p-6 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5500]">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-zinc-900">
            {side === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-zinc-600">
            {side === "login"
              ? "Sign in to continue reading and managing your account."
              : "Join thousands of readers and writers — it only takes a minute."}
          </p>

          <div className="mt-6">{children}</div>

        

         

          <p className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="h-3.5 w-3.5 text-[#28a745]" />
            We never share your details. Read our{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function GoogleMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#EA4335"
        d="M12 11v3.6h5.1c-.2 1.4-1.7 4-5.1 4-3.1 0-5.6-2.5-5.6-5.6S8.9 7.4 12 7.4c1.7 0 2.9.7 3.6 1.3l2.5-2.4C16.5 4.9 14.5 4 12 4 6.9 4 2.8 8.1 2.8 13.2S6.9 22.4 12 22.4c6.9 0 9.2-4.8 9.2-7.3 0-.5 0-.9-.1-1.3H12z"
      />
    </svg>
  );
}

