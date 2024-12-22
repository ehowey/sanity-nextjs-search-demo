"use server";

import { ActionSearchResult } from "@/types";
import { client } from "@/sanity/lib/client";
import { PostsQueryResult } from "@/sanity.types";

export const actionSearch = async (
  prevState: any,
  formData: FormData
): Promise<ActionSearchResult> => {
  // Get the search term
  const search = formData.get("search") as string | null;

  // Throw an error if there is no search term
  if (!search) {
    return {
      status: "error",
      message: "No search term provided",
      results: null,
    };
  }

  // Sanitize and throw an error if when sanitized the search term is empty
  const sanitizedSearch = search.replace(/[^a-zA-Z0-9\s\-.,']/g, "").trim();

  if (sanitizedSearch === "") {
    return {
      status: "error",
      message: "Invalid search term provided",
      results: null,
    };
  }

  //   GROQ query and params to search posts
  const query = `
    *[_type == "post"]
        | score(
            boost(title match $searchTerm, 3) || 
            boost(excerpt match $searchTerm, 2) || 
            pt::text(content) match $searchTerm
        )
        | order(_score desc)
        { _score, _id, title, "slug": slug.current, excerpt, date, author}
        [ _score > 0 ]
    `;

  const params = { searchTerm: `${sanitizedSearch}` };

  try {
    // Fetch results from Sanity
    const results: PostsQueryResult = await client.fetch(query, params);
    return {
      status: "success",
      message: "Search completed successfully",
      results: results,
    };
  } catch (error) {
    console.error("Unable to complete submission:", error);

    return {
      status: "error",
      message: "Sorry! Something went wrong, try again.",
      results: null,
    };
  }
};
