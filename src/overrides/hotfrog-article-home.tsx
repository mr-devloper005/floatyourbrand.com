"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Loader2,
  LogOut,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  UserCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { useAuth } from "@/lib/auth-context";
import type { SitePost } from "@/lib/site-connector";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&w=2000&q=80";

const ARTICLE_CATEGORIES = [
  "Technology",
  "Health & Science",
  "Business",
  "Lifestyle",
  "Opinion",
  "Culture",
  "Travel",
  "Finance",
  "Education",
  "Environment",
  "Startups",
  "Design",
  "Productivity",
  "Leadership",
  "Innovation",
  "Society",
  "Sports",
  "Art",
  "Books",
  "Local News",
  "Data & Research",
  "Sustainability",
  "Gaming",
  "Food",
  "Parenting",
  "Careers",
] as const;

const MORE_CATEGORIES = [
  "Mental health",
  "Real estate",
  "Politics",
  "Music",
  "History",
  "Agriculture",
] as const;

const VALUE_ITEMS = [
  {
    icon: CreditCard,
    text: "Freshly published daily insights and timely reporting.",
  },
  {
    icon: UserCircle,
    text: "Expert authors and in-depth research you can trust.",
  },
  {
    icon: MessageCircle,
    text: "Join the conversation and share your thoughts.",
  },
] as const;

type ActivityItem = {
  user: string;
  verb: string;
  title: string;
  href: string;
  time: string;
};

function buildActivity(posts: SitePost[]): ActivityItem[] {
  if (!posts.length) {
    return [
      {
        user: "Avery Kim",
        verb: "bookmarked",
        title: "Signal over noise: writing with clarity",
        href: "/articles",
        time: "Today · 4:12",
      },
      {
        user: "Jordan M.",
        verb: "commented on",
        title: "Long-form in a short-attention world",
        href: "/articles",
        time: "Yesterday · 7:50",
      },
    ];
  }
  const names = [
    "Avery K.",
    "Morgan L.",
    "Riley S.",
    "Quinn T.",
    "Emery P.",
  ];
  return posts.slice(0, 5).map((p, i) => ({
    user: names[i % names.length]!,
    verb: "commented on",
    title: p.title,
    href: `/articles/${p.slug}`,
    time: "Recently",
  }));
}

type Props = {
  initialPosts: SitePost[];
};

export function HotfrogArticleHome({ initialPosts }: Props) {
  const { isAuthenticated, user, logout } = useAuth();
  const [loadMore, setLoadMore] = useState(false);
  const [pending, setPending] = useState(false);

  const activities = useMemo(
    () => buildActivity(initialPosts),
    [initialPosts]
  );

  const displayCategories = useMemo(() => {
    if (!loadMore) return [...ARTICLE_CATEGORIES];
    return [...ARTICLE_CATEGORIES, ...MORE_CATEGORIES];
  }, [loadMore]);

  const onLoadMore = () => {
    if (loadMore) return;
    setPending(true);
    window.setTimeout(() => {
      setLoadMore(true);
      setPending(false);
    }, 500);
  };

  return (
    <div className="bg-white text-zinc-900">
      <section className="relative min-h-[min(520px,85vh)] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Reading and discovery"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black/60"
            aria-hidden
          />
        </div>

        <div className="absolute left-0 right-0 top-0 z-20">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-base font-semibold text-white"
            >
              <img
                src="/favicon.png?v=20260424"
                alt={`${SITE_CONFIG.name} logo`}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated && user ? (
                <>
                  <span className="hidden max-w-[180px] truncate text-sm text-white/90 sm:inline">
                    Hi, {user.name}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign out</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm font-medium text-white hover:text-white/90"
                >
                  <UserCircle className="h-4 w-4" />
                  Log in
                </Link>
              )}
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-white/20 text-white/90"
                title="Language (example)"
                aria-label="Region or language"
              >
                <span className="text-sm leading-none">en</span>
              </span>
            </div>
          </nav>
        </div>

        <div className="relative z-10 flex min-h-[min(520px,85vh)] flex-col items-center justify-center px-4 pb-20 pt-32 text-center sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            Your daily source for insightful articles
          </p>
          <h1 className="mt-4 flex flex-wrap items-end justify-center gap-2 sm:gap-3">
            <span
              className="inline-flex items-end rounded-sm bg-[#ff5500] px-2 py-1.5 text-2xl font-black uppercase tracking-tight text-white shadow-lg sm:px-3 sm:text-4xl md:text-5xl"
              style={{
                borderRadius: "0.2rem 1.25rem 0.2rem 0.2rem",
                clipPath: "none",
              }}
            >
              READ.
            </span>
            <span className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              LEARN.
            </span>
            <span className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              DISCOVER.
            </span>
          </h1>

          <form
            action="/search"
            className="mt-10 w-full max-w-3xl"
            role="search"
          >
            <input type="hidden" name="task" value="article" />
            <input type="hidden" name="master" value="1" />
            <div className="flex w-full flex-col overflow-hidden rounded-sm bg-white shadow-2xl ring-1 ring-white/20 sm:flex-row sm:items-stretch">
              <label className="flex flex-1 items-center gap-2 border-b border-zinc-200 px-3 py-3 sm:border-b-0 sm:py-0 sm:pl-4">
                <Search className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  name="q"
                  className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                  placeholder="Search titles or keywords"
                  autoComplete="off"
                />
              </label>
              <label className="flex flex-1 items-center gap-2 border-b border-zinc-200 px-3 py-3 sm:border-b-0 sm:border-l sm:border-t-0 sm:py-0 sm:pl-3">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  name="category"
                  className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                  placeholder="Filter by category"
                  list="home-cat-hints"
                  autoComplete="off"
                />
                <datalist id="home-cat-hints">
                  {ARTICLE_CATEGORIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </label>
              <button
                type="submit"
                className="shrink-0 bg-[#ff5500] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#e64d00] sm:py-0"
              >
                Find
              </button>
            </div>
            <p className="mt-2 text-left text-xs text-white/60 sm:text-center">
              {siteContent.navbar.tagline}
            </p>
          </form>
        </div>
      </section>

      <div className="bg-black/70 py-3 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {VALUE_ITEMS.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 sm:justify-center"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium leading-snug text-white/90">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-zinc-200 bg-zinc-50/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="text-lg font-semibold text-zinc-800">
                Article categories
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {displayCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/search?task=article&master=1&category=${encodeURIComponent(cat.toLowerCase())}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={loadMore || pending}
                  className="inline-flex items-center gap-2 rounded-md bg-[#28a745] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#218838] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Load more
                </button>
              </div>
            </div>
            <aside>
              <h2 className="text-base font-semibold text-zinc-800">
                Recent activity
              </h2>
              <div className="mt-3 space-y-3 border border-zinc-200 bg-white p-3 shadow-sm">
                {activities.map((a, i) => (
                  <p
                    key={`${a.user}-${a.title}-${i}`}
                    className="text-sm leading-relaxed text-zinc-600"
                  >
                    <span className="font-medium text-zinc-800">
                      {a.user}
                    </span>{" "}
                    <span className="text-zinc-500">{a.verb}</span>{" "}
                    <Link
                      href={a.href}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      &ldquo;{a.title}&rdquo;
                    </Link>
                  </p>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
