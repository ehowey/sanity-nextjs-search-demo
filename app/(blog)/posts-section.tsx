"use client";
import { PostsQueryResult } from "@/sanity.types";
import { useState } from "react";
import Posts from "./posts";
import PostsSearch from "./posts-search";

interface Props {
  posts: PostsQueryResult;
}

export default function PostsSection({ posts }: Props) {
  const [searchResults, setSearchResults] = useState<PostsQueryResult | null>(
    null
  );

  return (
    <section className="pb-32">
      <PostsSearch setSearchResults={setSearchResults} />
      <div className="mb-8">
        <h2 className="mb-2 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          {searchResults ? "Search results" : "All recipes"}
        </h2>
        {!searchResults && `${posts.length} recipes`}
        {searchResults &&
          searchResults.length > 1 &&
          `${searchResults.length} results`}
        {searchResults &&
          searchResults.length === 1 &&
          `${searchResults.length} result`}
      </div>
      <Posts posts={searchResults ? searchResults : posts} />
    </section>
  );
}
