import {
  EditorialPage,
  GhostButton,
  PrimaryButton,
  SectionCard,
} from "@/components/shared/editorial-page";
import {
  Bug,
  Edit3,
  HelpCircle,
  LifeBuoy,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const LANES = [
  {
    icon: Edit3,
    title: "Drafting and edits",
    body: "Stuck on an opening, a structure, or a tricky transition? Send the draft and a brief note about where you would like help.",
    href: "/contact",
  },
  {
    icon: HelpCircle,
    title: "Tone and clarity",
    body: "Not sure if a piece reads like the rest of the publication? We can review tone, voice, and pacing.",
    href: "/contact",
  },
  {
    icon: Bug,
    title: "Corrections and updates",
    body: "Found an error in a published article? Let us know and we will update it with a clear correction note.",
    href: "/contact",
  },
];

const FAQS = [
  {
    q: "How quickly do you reply?",
    a: "Within 2–3 business days for editorial questions. Urgent corrections are handled the same day.",
  },
  {
    q: "Can you help with structure before I write?",
    a: "Yes. Share a one-paragraph outline through the contact form and we will reply with notes.",
  },
  {
    q: "Do you copy-edit every published piece?",
    a: "Every accepted draft gets a light copy-edit. Heavier developmental editing is done case by case.",
  },
];

export default function EditorialSupportPage() {
  return (
    <EditorialPage
      eyebrow="For authors"
      title="Editorial support."
      description="Help with drafts, corrections, and editorial decisions — from the team that publishes the work."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "For authors" },
        { label: "Editorial support" },
      ]}
      actions={
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="/contact">Open a request</PrimaryButton>
          <GhostButton href="/author-guidelines">Author guidelines</GhostButton>
        </div>
      }
    >
      <div className="space-y-8">
        <SectionCard title="What we can help with">
          <div className="grid gap-5 sm:grid-cols-3">
            {LANES.map((l) => (
              <Link
                key={l.title}
                href={l.href}
                className="group rounded-md border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#ff5500]/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#ff5500]/10 text-[#ff5500]">
                  <l.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-zinc-900 group-hover:text-[#ff5500]">
                  {l.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">
                  {l.body}
                </p>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="How requests are handled">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "You write to us",
                body: "Use the contact form or email the desk directly. Include the article title or a link if it is published.",
              },
              {
                step: "02",
                title: "We acknowledge",
                body: "You will get a confirmation within one business day, even if the full reply takes longer.",
              },
              {
                step: "03",
                title: "We resolve and follow up",
                body: "Edits go live with a short note. Drafting questions get an editor reply with concrete suggestions.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-md border border-zinc-200 bg-zinc-50 p-5"
              >
                <span className="text-xs font-semibold tracking-widest text-[#ff5500]">
                  STEP {s.step}
                </span>
                <h3 className="mt-2 text-base font-semibold text-zinc-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{s.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Frequently asked">
          <div className="divide-y divide-zinc-200">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4 first:pt-0 last:pb-0">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-zinc-300 text-zinc-500 transition group-open:rotate-45 group-open:border-[#ff5500] group-open:text-[#ff5500]">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-zinc-900 text-white">
                <LifeBuoy className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  Reach the editorial desk
                </h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Send your request through the contact page and we will route
                  it to the right editor.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/contact">
                <MessageSquare className="h-4 w-4" />
                Message the team
              </PrimaryButton>
            </div>
          </div>
        </SectionCard>
      </div>
    </EditorialPage>
  );
}
