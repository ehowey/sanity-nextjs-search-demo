import { PostsQueryResult } from "@/sanity.types";

export type ActionSearchResult = {
  status: "initial" | "success" | "error";
  message: string;
  results: PostsQueryResult | null;
};
