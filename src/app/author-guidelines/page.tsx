import {
  EditorialPage,
  GhostButton,
  PrimaryButton,
  SectionCard,
} from "@/components/shared/editorial-page";
import {
  BookOpen,
  CheckCircle2,
  PenLine,
  Quote,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const PRINCIPLES = [
  {
    icon: PenLine,
    title: "Write for people, not algorithms",
    body: "Lead with a clear point. Cut filler. Use plain language and short paragraphs that respect a reader's time.",
  },
  {
    icon: BookOpen,
    title: "Show your work",
    body: "Cite sources, link to data, and credit the people you spoke to. Strong references make a piece more persuasive.",
  },
  {
    icon: ShieldCheck,
    title: "Be accurate and fair",
    body: "Double-check names, numbers, and claims. If a piece criticizes someone, give them an honest chance to respond.",
  },
  {
    icon: Quote,
    title: "Use voice on purpose",
    body: "Personal voice is welcome when it serves the reader. Avoid jargon and avoid the temptation to sound clever.",
  },
];

const STYLE_DO = [
  "Write a clear, concrete headline.",
  "Open with the strongest sentence you have.",
  "Use sub-headings every 2–4 paragraphs.",
  "Prefer active verbs and short sentences.",
  "Close with a takeaway, not a summary.",
];

const STYLE_DONT = [
  "No undisclosed sponsored or promotional content.",
  "No clickbait headlines or misleading framing.",
  "No copy-pasted material without attribution.",
  "No personal attacks, hate speech, or harassment.",
  "No AI-generated content presented as original reporting.",
];

export default function AuthorGuidelinesPage() {
  return (
    <EditorialPage
      eyebrow="For authors"
      title="Author guidelines."
      description="A short, practical handbook for writing well, working with editors, and publishing pieces our readers value."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "For authors" },
        { label: "Author guidelines" },
      ]}
      actions={
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="/submit-pitch">Pitch a story</PrimaryButton>
          <GhostButton href="/editorial-support">Editorial support</GhostButton>
        </div>
      }
    >
      <div className="space-y-8">
        <SectionCard title="Editorial principles">
          <div className="grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 rounded-md border border-zinc-200 bg-zinc-50 p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff5500]/10 text-[#ff5500]">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-6 md:grid-cols-2">
          <SectionCard title="Style — please do">
            <ul className="space-y-3">
              {STYLE_DO.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-sm text-zinc-700"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#28a745]" />
                  <span className="leading-7">{t}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title="Style — please avoid">
            <ul className="space-y-3">
              {STYLE_DONT.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-sm text-zinc-700"
                >
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span className="leading-7">{t}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <SectionCard title="Article format checklist">
          <div className="overflow-hidden rounded-md border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Element</th>
                  <th className="px-4 py-3">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                {[
                  ["Headline", "60 characters or fewer, descriptive"],
                  ["Standfirst", "1–2 sentences that promise the read"],
                  ["Length", "600–1,800 words for most pieces"],
                  ["Images", "Original or properly licensed, with credit"],
                  ["Links", "External sources for every key claim"],
                  ["Author bio", "1–2 lines + optional social link"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="px-4 py-3 font-semibold text-zinc-900">
                      {k}
                    </td>
                    <td className="px-4 py-3">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Ready to write?
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Use the pitch form to share your idea — we will get back to you
                with a clear next step.
              </p>
            </div>
            <PrimaryButton href="/submit-pitch">Submit a pitch</PrimaryButton>
          </div>
        </SectionCard>
      </div>
    </EditorialPage>
  );
}
