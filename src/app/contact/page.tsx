import {
  EditorialPage,
  SectionCard,
} from "@/components/shared/editorial-page";
import { SITE_CONFIG } from "@/lib/site-config";
import { Clock, MessageSquare } from "lucide-react";
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

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
          <SectionCard title="How we can help">
            <div className="space-y-3 text-sm leading-7 text-zinc-600">
              <p>
                Use this page for support requests, publishing questions, partnership
                discussions, account help, and feedback about your experience.
              </p>
              <p>
                Add as much detail as possible in your message so we can route it
                quickly and respond with the right next steps.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Before you send">
            <ul className="space-y-2 text-sm leading-7 text-zinc-600">
              <li>Include the page URL if your request is about a specific article or section.</li>
              <li>Share screenshots and expected outcome for faster troubleshooting.</li>
              <li>For urgent issues, add "Urgent" at the beginning of your message subject.</li>
            </ul>
          </SectionCard>

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
