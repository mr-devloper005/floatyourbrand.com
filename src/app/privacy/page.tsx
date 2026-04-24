import {
  EditorialPage,
  SectionCard,
} from "@/components/shared/editorial-page";
import { SITE_CONFIG } from "@/lib/site-config";
import { Shield, Database, UserCog, Cookie, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information we collect",
    body: "We collect the information you give us when you create an account, publish a story, or contact the editorial team. This includes your name, email address, and the content you choose to publish.",
    bullets: [
      "Account details such as name and email.",
      "Content you submit, including drafts and published articles.",
      "Basic device and browser information for analytics.",
    ],
  },
  {
    icon: UserCog,
    title: "How we use your data",
    body: "Your information helps us run the platform, deliver a better reading experience, and keep authors connected to their work.",
    bullets: [
      "Personalize your reading and writing experience.",
      "Send important notifications related to your account.",
      "Improve search, discovery, and editorial workflows.",
    ],
  },
  {
    icon: Cookie,
    title: "Cookies and analytics",
    body: "We use a small number of cookies to remember sessions and measure aggregate usage. We do not sell personal data to third parties.",
    bullets: [
      "Essential cookies for sign-in and security.",
      "Anonymous analytics to understand reading patterns.",
      "No third-party advertising trackers.",
    ],
  },
  {
    icon: Shield,
    title: "Your choices",
    body: "You stay in control of your data. You can edit, export, or delete your account information at any time.",
    bullets: [
      "Update or remove your profile from your account.",
      "Request a copy of the data we hold about you.",
      "Delete your account and associated content.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Privacy policy."
      description={`How ${SITE_CONFIG.name} collects, uses, and protects your information — written in plain language.`}
      crumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
    >
      <div className="grid gap-6 lg:grid-cols-[0.32fr_0.68fr]">
        <aside className="self-start rounded-md border border-zinc-200 bg-zinc-50 p-5 lg:sticky lg:top-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            On this page
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.title}>
                <a
                  href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-blue-600 hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-zinc-500">
            Last updated: April 24, 2026
          </p>
        </aside>

        <div className="space-y-6">
          {sections.map((s) => (
            <SectionCard
              key={s.title}
              title={s.title}
            >
              <div
                id={s.title.toLowerCase().replace(/\s+/g, "-")}
                className="flex items-start gap-4"
              >
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

          <SectionCard title="Contact us about privacy">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-7 text-zinc-600">
                Have a privacy question or request? Reach the editorial team and
                we will respond as soon as we can.
              </p>
              <a
                href="mailto:privacy@floatyourbrand.com"
                className="inline-flex items-center gap-2 rounded-sm bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                <Mail className="h-4 w-4" />
                privacy@floatyourbrand.com
              </a>
            </div>
          </SectionCard>
        </div>
      </div>
    </EditorialPage>
  );
}
