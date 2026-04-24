import { fetchTaskPosts } from "@/lib/task-data";
import { HotfrogArticleHome } from "@/overrides/hotfrog-article-home";

export const HOME_PAGE_OVERRIDE_ENABLED = true;

export async function HomePageOverride() {
  const initialPosts = await fetchTaskPosts("article", 12, {
    allowMockFallback: true,
    fresh: true,
  });
  return <HotfrogArticleHome initialPosts={initialPosts} />;
}
