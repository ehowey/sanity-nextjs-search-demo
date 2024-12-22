import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery, settingsQuery } from "@/sanity/lib/queries";
import { Suspense } from "react";
import PostsSection from "./posts-section";

export default async function Page() {
  const [settings, posts] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
    }),
    sanityFetch({ query: postsQuery }),
  ]);

  return (
    <div className="container mx-auto px-5">
      <section className="mt-16 mb-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between">
        <h1 className="text-balance text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl">
          {settings?.title}
        </h1>
      </section>
      <Suspense>
        <PostsSection posts={posts} />
      </Suspense>
    </div>
  );
}
