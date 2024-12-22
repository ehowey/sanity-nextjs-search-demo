import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import PortableText from "@/app/(blog)/portable-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-16 mt-10 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          {settings?.title}
        </Link>
      </h2>
      <article>
        <h1 className="text-balance mb-12 text-6xl font-bold leading-tight tracking-tighter md:text-7xl md:leading-none lg:text-8xl">
          {post.title}
        </h1>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <div className="shadow-md transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
            <Image
              className="h-auto w-full"
              width={2000}
              height={1000}
              alt={post.coverImage?.alt || ""}
              src={
                urlForImage(post.coverImage)
                  ?.height(1000)
                  .width(2000)
                  .url() as string
              }
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-lg">
            <div className="mb-4 text-lg">
              <time dateTime={post.date}>
                {format(new Date(post.date), "LLLL	d, yyyy")}
              </time>
              {post.author && <p>{post.author.name}</p>}
            </div>
          </div>
        </div>
        {post.content?.length && (
          <PortableText
            className="mx-auto max-w-2xl"
            value={post.content as PortableTextBlock[]}
          />
        )}
      </article>
    </div>
  );
}
