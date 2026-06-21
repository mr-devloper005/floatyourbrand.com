import {
  EditorialPage,
  GhostButton,
  PrimaryButton,
  SectionCard,
} from "@/components/shared/editorial-page";
import {
  BookOpen,
  Compass,
  Lightbulb,
  MessageSquare,
  Search as SearchIcon,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const topics = [
  {
    icon: Compass,
    title: "Getting started",
    body: "Create your account, set up your reading preferences, and find your first stories.",
    href: "/articles",
  },
  {
    icon: BookOpen,
    title: "Reading and discovery",
    body: "Browse categories, follow topics, and use search to find exactly what you want to read.",
    href: "/articles",
  },
  {
    icon: Lightbulb,
    title: "Publishing your first article",
    body: "From a rough idea to a polished piece — see how the editorial workflow flows end to end.",
    href: "/submit-pitch",
  },
  {
    icon: ShieldCheck,
    title: "Account and security",
    body: "Manage your sign-in, update your details, and learn how we keep your account safe.",
    href: "/privacy",
  },
] as const;

const faqs = [
  {
    q: "Do I need an account to read articles?",
    a: "No. Anyone can read on the site. An account lets you save articles and publish your own.",
  },
  {
    q: "How do I pitch an article?",
    a: "Use the pitch form on the Submit a pitch page. We respond within 2–3 business days.",
  },
  {
    q: "Can I edit a published article?",
    a: "Yes. Reach out to the editorial desk and we will help with corrections and updates.",
  },
  {
    q: "How is my data handled?",
    a: "We collect the minimum needed to run the site. The privacy policy explains everything.",
  },
] as const;

export default function HelpPage() {
  return (
    <EditorialPage
      eyebrow="Help center"
      title="Find answers fast."
      description="Guides, FAQs, and quick links for readers and authors."
      crumbs={[{ label: "Home", href: "/" }, { label: "Help" }]}
      actions={
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="/contact">Contact support</PrimaryButton>
          <GhostButton href="/submit-pitch">Pitch a story</GhostButton>
        </div>
      }
    >
      <div className="space-y-8">
        <SectionCard>
          <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
              <SearchIcon className="h-4 w-4 text-[#ff5500]" />
              Search the help center
            </span>
            <form
              action="/search"
              className="flex w-full flex-1 items-center gap-2"
            >
              <input
                name="q"
                placeholder="Try ‘publish article’ or ‘account settings’"
                className="h-11 w-full rounded-sm border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-[#ff5500]"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-sm bg-[#ff5500] px-4 text-sm font-semibold text-white hover:bg-[#e64d00]"
              >
                Search
              </button>
            </form>
          </label>
        </SectionCard>

        <div className="grid gap-5 sm:grid-cols-2">
          {topics.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group flex gap-4 rounded-md border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#ff5500]/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#ff5500]/10 text-[#ff5500]">
                <t.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-[#ff5500]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{t.body}</p>
              </div>
            </Link>
          ))}
        </div>

        <SectionCard title="Frequently asked questions">
          <div className="divide-y divide-zinc-200">
            {faqs.map((f) => (
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
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-zinc-900 text-white">
                <MessageSquare className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  Still need a hand?
                </h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Send a request and we will reply within a couple of business
                  days.
                </p>
              </div>
            </div>
            <PrimaryButton href="/contact">Contact support</PrimaryButton>
          </div>
        </SectionCard>
      </div>
    </EditorialPage>
  );
}
