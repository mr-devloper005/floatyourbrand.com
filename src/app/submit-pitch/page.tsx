import {
  EditorialPage,
  PrimaryButton,
  SectionCard,
} from "@/components/shared/editorial-page";
import { CheckCircle2, FileText, Lightbulb, Sparkles, Users } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Pick a sharp angle",
    body: "What is the single idea readers will walk away with? A focused angle is more persuasive than a broad topic.",
  },
  {
    n: "02",
    title: "Show your sources",
    body: "Link to research, interviews, or first-hand experience. Editors love pitches that already point at evidence.",
  },
  {
    n: "03",
    title: "Match a section",
    body: "Tell us where the piece fits — Technology, Business, Culture, or another category from the homepage.",
  },
  {
    n: "04",
    title: "Send and iterate",
    body: "We respond within a few days with notes, edits, or a green light. Most published pieces evolve from a first draft.",
  },
];

const TIPS = [
  "Lead with a one-sentence summary editors can repeat back.",
  "Mention 2–3 quick proof points or sources.",
  "Aim for 600–1,800 word pieces unless you are pitching a feature.",
  "Avoid promotional copy — readers can spot it instantly.",
  "Tell us why now — what makes the timing right?",
];

export default function SubmitPitchPage() {
  return (
    <EditorialPage
      eyebrow="Write with us"
      title="Pitch your next article."
      description="Tell us what you want to write. Strong, specific pitches with a clear angle get the fastest reply."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "For authors" },
        { label: "Submit a pitch" },
      ]}
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <SectionCard title="How a pitch becomes a published article">
            <ol className="grid gap-5 sm:grid-cols-2">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="rounded-md border border-zinc-200 bg-zinc-50 p-5"
                >
                  <span className="text-xs font-semibold tracking-widest text-[#ff5500]">
                    STEP {s.n}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-zinc-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard title="What makes a great pitch">
            <ul className="space-y-3">
              {TIPS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#28a745]" />
                  <span className="leading-7">{t}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Lightbulb,
                label: "We respond in 2–3 business days",
              },
              { icon: Users, label: "Read by an active community" },
              { icon: Sparkles, label: "Editing support included" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3 rounded-md border border-zinc-200 bg-white p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#ff5500]/10 text-[#ff5500]">
                  <b.icon className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium text-zinc-800">{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        <SectionCard title="Pitch form">
          <form className="grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Your name
              </span>
              <input
                required
                className="h-11 rounded-sm border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-[#ff5500]"
                placeholder="Jane Doe"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Email
              </span>
              <input
                type="email"
                required
                className="h-11 rounded-sm border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-[#ff5500]"
                placeholder="you@example.com"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Working title
              </span>
              <input
                required
                className="h-11 rounded-sm border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-[#ff5500]"
                placeholder="A short, scannable headline"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Section
              </span>
              <select className="h-11 rounded-sm border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-[#ff5500]">
                <option>Technology</option>
                <option>Business</option>
                <option>Culture</option>
                <option>Health &amp; Science</option>
                <option>Opinion</option>
                <option>Other / not sure</option>
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Pitch summary
              </span>
              <textarea
                required
                rows={6}
                className="rounded-sm border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff5500]"
                placeholder="In 4–6 sentences: what is the angle, why now, and what readers will learn."
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Links to past work (optional)
              </span>
              <input
                className="h-11 rounded-sm border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-[#ff5500]"
                placeholder="https://..."
              />
            </label>
            <PrimaryButton type="submit">
              <FileText className="h-4 w-4" />
              Submit pitch
            </PrimaryButton>
            <p className="text-xs text-zinc-500">
              By submitting you agree to our editorial terms. We reply to every
              pitch.
            </p>
          </form>
        </SectionCard>
      </div>
    </EditorialPage>
  );
}
