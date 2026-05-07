import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import {
  EditorialPage,
  SectionCard,
} from "@/components/shared/editorial-page";
import { fetchSiteFeed, type SitePost } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&w=1400&q=80";

const POPULAR_QUERIES = [
  "Artificial intelligence",
  "Climate change",
  "Remote work",
  "Mental health",
  "Startup growth",
  "Design systems",
];

const POPULAR_CATEGORIES = [
  "Technology",
  "Business",
  "Culture",
  "Health & Science",
  "Opinion",
  "Travel",
  "Finance",
  "Design",
];

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

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

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        className="bg-[#ff5500]/15 px-0.5 text-[#b3370b] rounded-sm"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    task?: string;
    master?: string;
  }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key));

  const filtered = posts.filter((post) => {
    const content =
      post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);
  const totalCount = results.length;

  const categoryCounts = new Map<string, number>();
  filtered.forEach((p) => {
    const c = getCategory(p);
    categoryCounts.set(c, (categoryCounts.get(c) || 0) + 1);
  });
  const topCategories = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const activeChips: { label: string; href: string }[] = [];
  if (query)
    activeChips.push({
      label: `Search: ${query}`,
      href: buildSearchHref({ category, task }),
    });
  if (category)
    activeChips.push({
      label: `Category: ${category}`,
      href: buildSearchHref({ q: query, task }),
    });
  if (task)
    activeChips.push({
      label: `Type: ${task}`,
      href: buildSearchHref({ q: query, category }),
    });

  const heroDescription = query
    ? `${totalCount} ${totalCount === 1 ? "result" : "results"} for “${query}”${
        category ? ` in ${category}` : ""
      }.`
    : "Find articles, topics, and authors across the publication.";

  return (
    <EditorialPage
      eyebrow="Search"
      title={query ? `Results for “${query}”` : "Search the publication"}
      description={heroDescription}
      crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      actions={
        <form
          action="/search"
          className="flex w-full max-w-2xl flex-col gap-2 sm:flex-row"
        >
          <input type="hidden" name="master" value="1" />
          {task ? <input type="hidden" name="task" value={task} /> : null}
          {category ? (
            <input type="hidden" name="category" value={category} />
          ) : null}
          <label className="flex flex-1 items-center gap-2 rounded-sm bg-white px-3 py-2.5 text-sm text-zinc-800 shadow-sm">
            <SearchIcon className="h-4 w-4 text-zinc-400" />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search articles, topics, authors"
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
              autoFocus
            />
          </label>
          <button
            type="submit"
            className="rounded-sm bg-[#ff5500] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#e64d00]"
          >
            Search
          </button>
        </form>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6 self-start lg:sticky lg:top-6">
          <SectionCard>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
              <SlidersHorizontal className="h-4 w-4 text-[#ff5500]" />
              Refine
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Categories
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Link
                  href={buildSearchHref({ q: query, task })}
                  className={
                    "flex items-center justify-between rounded-sm px-2 py-1.5 " +
                    (!category
                      ? "bg-[#ff5500]/10 font-semibold text-[#b3370b]"
                      : "text-blue-600 hover:bg-zinc-50")
                  }
                >
                  <span>All</span>
                </Link>
              </li>
              {(topCategories.length
                ? topCategories.map(([c, n]) => ({ name: c, count: n }))
                : POPULAR_CATEGORIES.map((c) => ({
                    name: c,
                    count: 0,
                  }))
              ).map((c) => {
                const slug = c.name.toLowerCase();
                const isActive = category === slug;
                return (
                  <li key={c.name}>
                    <Link
                      href={buildSearchHref({ q: query, category: slug, task })}
                      className={
                        "flex items-center justify-between rounded-sm px-2 py-1.5 " +
                        (isActive
                          ? "bg-[#ff5500]/10 font-semibold text-[#b3370b]"
                          : "text-blue-600 hover:bg-zinc-50")
                      }
                    >
                      <span>{c.name}</span>
                      {c.count ? (
                        <span className="text-xs text-zinc-500">
                          {c.count}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SectionCard>

          <SectionCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Try searching for
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {POPULAR_QUERIES.map((q) => (
                <Link
                  key={q}
                  href={buildSearchHref({ q })}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-[#ff5500] hover:text-[#ff5500]"
                >
                  {q}
                </Link>
              ))}
            </div>
          </SectionCard>
        </aside>

        <div className="space-y-6">
          {activeChips.length ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Active filters
              </span>
              {activeChips.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-rose-300 hover:text-rose-600"
                >
                  {chip.label}
                  <X className="h-3 w-3" />
                </Link>
              ))}
              {activeChips.length > 1 ? (
                <Link
                  href="/search?master=1"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Clear all
                </Link>
              ) : null}
            </div>
          ) : null}

          {results.length ? (
            <p className="text-sm text-zinc-500">
              Showing <span className="font-semibold text-zinc-800">{totalCount}</span>{" "}
              {totalCount === 1 ? "match" : "matches"}
              {query ? (
                <>
                  {" for "}
                  <span className="font-semibold text-zinc-800">“{query}”</span>
                </>
              ) : null}
              .
            </p>
          ) : null}

          {results.length === 0 ? (
            <SectionCard>
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5500]/10 text-[#ff5500]">
                  <SearchIcon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-zinc-900">
                  No matches{query ? ` for “${query}”` : ""}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-zinc-600">
                  Try a broader keyword, remove a filter, or browse one of the
                  suggestions below.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {POPULAR_QUERIES.slice(0, 6).map((q) => (
                    <Link
                      key={q}
                      href={buildSearchHref({ q })}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-700 hover:border-[#ff5500] hover:text-[#ff5500]"
                    >
                      {q}
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 rounded-sm bg-[#ff5500] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e64d00]"
                  >
                    Browse all articles
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SectionCard>
          ) : (
            <ul className="space-y-5">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post);
                const href = taskKey
                  ? buildPostUrl(taskKey, post.slug)
                  : `/posts/${post.slug}`;
                return (
                  <li
                    key={post.id}
                    className="overflow-hidden rounded-md border border-zinc-200 bg-white transition hover:border-[#ff5500]/40"
                  >
                    <Link
                      href={href}
                      className="grid gap-0 sm:grid-cols-[220px_1fr]"
                    >
                      <div className="relative aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:min-h-[160px]">
                        <Image
                          src={getImage(post)}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 220px"
                        />
                      </div>
                      <div className="flex flex-col gap-2 p-5">
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="rounded-sm bg-[#ff5500]/10 px-2 py-0.5 font-bold uppercase tracking-wider text-[#ff5500]">
                            {getCategory(post)}
                          </span>
                          {post.authorName ? (
                            <span className="text-zinc-500">
                              · {post.authorName}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="text-lg font-semibold leading-snug text-zinc-900">
                          {highlight(post.title, query)}
                        </h3>
                        {post.summary ? (
                          <p className="line-clamp-2 text-sm leading-7 text-zinc-600">
                            {highlight(post.summary, query)}
                          </p>
                        ) : null}
                        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                          Read article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </EditorialPage>
  );
}

function buildSearchHref(params: {
  q?: string;
  category?: string;
  task?: string;
}) {
  const usp = new URLSearchParams();
  usp.set("master", "1");
  if (params.q) usp.set("q", params.q);
  if (params.category) usp.set("category", params.category);
  if (params.task) usp.set("task", params.task);
  return `/search?${usp.toString()}`;
}
