import {
  EditorialPage,
  SectionCard,
} from "@/components/shared/editorial-page";
import { SITE_CONFIG } from "@/lib/site-config";
import { ScrollText, ShieldCheck, Ban, FileSignature, AlertTriangle } from "lucide-react";

const sections = [
  {
    icon: ScrollText,
    title: "Using your account",
    body: "You are responsible for the activity that happens under your account. Keep your sign-in details safe and let us know if something looks off.",
    bullets: [
      "One person per account; do not share credentials.",
      "Provide accurate information when registering.",
      "Notify us about unauthorized access right away.",
    ],
  },
  {
    icon: FileSignature,
    title: "Content ownership",
    body: "You own the articles and ideas you publish. By posting, you grant us a non-exclusive license to display and distribute them on the platform.",
    bullets: [
      "You keep copyright of your work.",
      "We can show your work on the site, in feeds, and in newsletters.",
      "You can remove your content at any time.",
    ],
  },
  {
    icon: Ban,
    title: "What is not allowed",
    body: "To keep the platform a place worth reading, we do not allow content that targets people, misleads readers, or breaks the law.",
    bullets: [
      "No harassment, hate speech, or threats.",
      "No spam, manipulation, or deceptive promotion.",
      "No illegal, infringing, or harmful material.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Moderation and enforcement",
    body: "We may review, edit, or remove content that breaks these terms. Repeat issues may lead to account suspension or removal.",
    bullets: [
      "First-time issues usually get a heads-up.",
      "Severe or repeated issues lead to enforcement.",
      "You can appeal any decision in writing.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Terms of service."
      description={`The simple ground rules for reading, writing, and publishing on ${SITE_CONFIG.name}.`}
      crumbs={[{ label: "Home", href: "/" }, { label: "Terms of service" }]}
    >
      <div className="space-y-6">
        <div className="rounded-md border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm leading-7 text-amber-900">
              These terms are a summary of the agreement between you and{" "}
              {SITE_CONFIG.name}. By using the site you accept them. If
              something is not clear, get in touch and we will explain.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <SectionCard key={s.title} title={s.title}>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff5500]/10 text-[#ff5500]">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm leading-7 text-zinc-600">{s.body}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 before:mt-2 before:inline-block before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[#ff5500]"
                      >
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>

        <SectionCard title="Changes to these terms">
          <p className="text-sm leading-7 text-zinc-600">
            We may update these terms from time to time as the platform grows.
            When we do, we will note it on this page and, for material changes,
            send a heads-up to active accounts. Continued use of the site means
            you accept the updated terms.
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Last updated: April 24, 2026
          </p>
        </SectionCard>
      </div>
    </EditorialPage>
  );
}
