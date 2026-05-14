import {
  EditorialPage,
  PrimaryButton,
  SectionCard,
} from "@/components/shared/editorial-page";
import { SITE_CONFIG } from "@/lib/site-config";
import { Mail, MessageSquare, Send, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

const lanes = [
  {
    icon: Send,
    title: "Submit a story or pitch",
    body: "Have an idea for an article, an essay, or a feature? Send a tight summary and we will reply with next steps.",
    href: "/submit-pitch",
    cta: "Open the pitch form",
  },
  {
    icon: MessageSquare,
    title: "Editorial questions",
    body: "Working on a draft, need feedback on tone, or unsure where your piece fits? The editorial desk can help.",
    href: "/editorial-support",
    cta: "Editorial support",
  },
  {
    icon: Mail,
    title: "General inquiries",
    body: "Press, partnerships, corrections, or anything that does not fit the other lanes. We read every message.",
    href: "mailto:hello@floatyourbrand.com",
    cta: "Email the team",
  },
] as const;

export default function ContactPage() {
  return (
    <EditorialPage
      eyebrow="Get in touch"
      title="Talk to the editorial desk."
      description={`Reach the people behind ${SITE_CONFIG.name}. Choose a lane below or send a note directly — we read everything.`}
      crumbs={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {lanes.map((lane) => (
            <div
              key={lane.title}
              className="rounded-md border border-zinc-200 bg-white p-6 transition hover:border-zinc-300"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff5500]/10 text-[#ff5500]">
                  <lane.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {lane.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {lane.body}
                  </p>
                  <Link
                    href={lane.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {lane.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 rounded-md bg-zinc-50 p-5 text-sm text-zinc-600">
            <Clock className="h-4 w-4 text-zinc-500" />
            We typically reply within 2&ndash;3 business days.
          </div>
        </div>

        <SectionCard title="Send a quick message">
          <ContactLeadForm />
        </SectionCard>
      </div>
    </EditorialPage>
  );
}
