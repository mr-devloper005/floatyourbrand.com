import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Search as SearchIcon } from "lucide-react";
import { EditorialPage, SectionCard } from "@/components/shared/editorial-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";
import { fetchTaskPosts } from "@/lib/task-data";
import type { SitePost } from "@/lib/site-connector";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("article", {
    path: "/articles",
    title: taskPageMetadata.article.title,
    description: taskPageMetadata.article.description,
  });

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&w=1400&q=80";

const CATEGORIES = [
  "All",
  "Technology",
  "Business",
  "Culture",
  "Health & Science",
  "Opinion",
  "Travel",
  "Finance",
  "Education",
  "Design",
] as const;

function getImage(post: SitePost): string {
  const media = Array.isArray(post.media) ? post.media : [];
  const fromMedia = media.find(
    (m) => typeof m?.url === "string" && m.url
  )?.url;
  if (fromMedia) return fromMedia;
  if (post.content && typeof post.content === "object") {
    const c = post.content as Record<string, unknown>;
    const images = Array.isArray(c.images) ? (c.images as unknown[]) : [];
    const first = images.find((u) => typeof u === "string" && u);
    if (typeof first === "string") return first;
  }
  return FALLBACK_IMAGE;
}

function getCategory(post: SitePost): string {
  if (post.content && typeof post.content === "object") {
    const c = post.content as Record<string, unknown>;
    if (typeof c.category === "string" && c.category) return c.category;
  }
  if (Array.isArray(post.tags) && typeof post.tags[0] === "string") {
    return post.tags[0]!;
  }
  return "Article";
}

function formatDate(value?: string | null) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = (await searchParams) || {};
  const activeCategory = (params.category || "").toLowerCase();
  const posts = await fetchTaskPosts("article", 24, {
    allowMockFallback: true,
    fresh: true,
  });

  const filtered = activeCategory
    ? posts.filter((p) => getCategory(p).toLowerCase().includes(activeCategory))
    : posts;
  const lead = filtered[0];
  const rest = filtered.slice(1);

  return (
    <EditorialPage
      eyebrow="The reading room"
      title="Articles, essays, and ideas worth your time."
      description="Long-form writing and timely commentary across technology, business, culture, and more."
      crumbs={[{ label: "Home", href: "/" }, { label: "Articles" }]}
      actions={
        <form
          action="/search"
          className="flex w-full max-w-md items-center gap-2"
        >
          <input type="hidden" name="task" value="article" />
          <input type="hidden" name="master" value="1" />
          <label className="flex flex-1 items-center gap-2 rounded-sm bg-white px-3 py-2 text-sm text-zinc-800">
            <SearchIcon className="h-4 w-4 text-zinc-400" />
            <input
              name="q"
              placeholder="Search articles, topics, authors"
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
          </label>
          <button
            type="submit"
            className="rounded-sm bg-[#ff5500] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e64d00]"
          >
            Search
          </button>
        </form>
      }
    >
      <div className="space-y-10">
        <nav
          aria-label="Categories"
          className="-mx-1 flex flex-wrap gap-2 border-b border-zinc-200 pb-4"
        >
          {CATEGORIES.map((c) => {
            const slug = c === "All" ? "" : c.toLowerCase();
            const isActive =
              activeCategory === slug || (c === "All" && !activeCategory);
            return (
              <Link
                key={c}
                href={
                  slug
                    ? `/articles?category=${encodeURIComponent(slug)}`
                    : "/articles"
                }
                className={
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition " +
                  (isActive
                    ? "border-[#ff5500] bg-[#ff5500] text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-900")
                }
              >
                {c}
              </Link>
            );
          })}
        </nav>

        {filtered.length === 0 ? (
          <SectionCard>
            <p className="text-center text-sm text-zinc-600">
              No articles match this filter yet. Try another category or come
              back soon.
            </p>
          </SectionCard>
        ) : null}

        {lead ? (
          <article className="overflow-hidden rounded-md border border-zinc-200 bg-white">
            <Link
              href={`/articles/${lead.slug}`}
              className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-[360px]">
                <Image
                  src={getImage(lead)}
                  alt={lead.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-sm bg-[#ff5500] px-2 py-1 font-bold uppercase tracking-wider text-white">
                    Featured
                  </span>
                  <span className="font-semibold uppercase tracking-wider text-[#ff5500]">
                    {getCategory(lead)}
                  </span>
                  {lead.publishedAt ? (
                    <span className="inline-flex items-center gap-1 text-zinc-500">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(lead.publishedAt)}
                    </span>
                  ) : null}
                </div>
                <h2 className="text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl">
                  {lead.title}
                </h2>
                {lead.summary ? (
                  <p className="text-base leading-7 text-zinc-600">
                    {lead.summary}
                  </p>
                ) : null}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </article>
        ) : null}

        {rest.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.id}
                href={`/articles/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:border-[#ff5500]/40"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={getImage(p)}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff5500]">
                    {getCategory(p)}
                  </span>
                  <h3 className="text-lg font-semibold leading-snug text-zinc-900 group-hover:text-[#ff5500]">
                    {p.title}
                  </h3>
                  {p.summary ? (
                    <p className="line-clamp-3 text-sm leading-7 text-zinc-600">
                      {p.summary}
                    </p>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between text-xs text-zinc-500">
                    <span>{p.authorName || "Editorial team"}</span>
                    <span>{formatDate(p.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        <SectionCard>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Have a story to tell?
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Pitch an article and join the next issue.
              </p>
            </div>
            <Link
              href="/submit-pitch"
              className="inline-flex items-center gap-2 rounded-sm bg-[#ff5500] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e64d00]"
            >
              Submit a pitch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SectionCard>
      </div>
    </EditorialPage>
  );
}
