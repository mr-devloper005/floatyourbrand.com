import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Facebook, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#d7deca] bg-[#f4f6ef] text-[#1f2617]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#56604b]">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="rounded-lg border border-[#d7deca] bg-white px-3 py-2 text-sm font-medium text-[#1f2617] hover:bg-[#ebefdf]">
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f_0%,#0b1a2e_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <img
                  src="/favicon.png?v=20260424"
                  alt={`${SITE_CONFIG.name} logo`}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-4 py-2.5 text-sm font-semibold text-[#07111f] hover:bg-[#77dfb8]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-white">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-slate-200 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    const popularReadHeadlines = [
      { href: '/articles', label: 'The quiet comeback of long-form' },
      { href: '/articles', label: 'Sustainable work in 2026' },
      { href: '/articles', label: 'Notes on local journalism' },
      { href: '/help', label: 'How we edit & fact-check' },
    ]
    const forAuthors = [
      { name: 'Submit a pitch', href: '/submit-pitch' },
      { name: 'Author guidelines', href: '/author-guidelines' },
      { name: 'Editorial support', href: '/editorial-support' },
    ]
    const quick = [
      { name: 'Privacy policy', href: '/privacy' },
      { name: 'Terms of service', href: '/terms' },
      { name: 'Contact us', href: '/contact' },
      { name: 'Author login', href: '/login' },
    ]
    return (
      <footer className="bg-[#1a1a1a] text-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Popular topics</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-200">
                {popularReadHeadlines.map((row) => (
                  <li key={row.label}>
                    <Link href={row.href} className="hover:text-white">
                      {row.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">For authors</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-200">
                {forAuthors.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Quick links</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-200">
                {quick.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Browse</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-200">
                {footerLinks.platform.length ? (
                  footerLinks.platform.map((item: { name: string; href: string }) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link href="/articles" className="hover:text-white">Articles</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold text-white">
              <img
                src="/favicon.png?v=20260424"
                alt={`${SITE_CONFIG.name} logo`}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              {SITE_CONFIG.name}
            </Link>
            <div className="flex items-center gap-2">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-200 hover:bg-white/10" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-200 hover:bg-white/10" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <p className="text-center text-xs text-zinc-500 sm:text-right">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. {siteContent.footer.tagline} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/favicon.png?v=20260424"
                alt={`${SITE_CONFIG.name} logo`}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <div>
                <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-slate-950">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
