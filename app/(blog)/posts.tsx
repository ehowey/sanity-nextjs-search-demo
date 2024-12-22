import Link from "next/link";
import { format } from "date-fns";
import { PostsQueryResult } from "@/sanity.types";

interface Props {
  posts: PostsQueryResult;
}

export default function Posts({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {posts.length === 0 && (
        <p className="text-xl bold">
          Sorry! No results, please try a different search term.
        </p>
      )}
      {posts.map((post) => {
        const { _id, title, slug, excerpt } = post;
        return (
          <article key={_id}>
            <h3 className="text-balance mb-3 text-3xl leading-snug underline">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            <div className="mb-4 text-lg">
              <span>
                <time dateTime={post.date}>
                  {format(new Date(post.date), "LLLL	d, yyyy")}
                </time>
                &nbsp;&mdash;&nbsp;{post.author?.name}
              </span>
            </div>
            {excerpt && (
              <p className="text-pretty mb-4 text-lg leading-relaxed">
                {excerpt}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
