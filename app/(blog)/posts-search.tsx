"use client";

import { useEffect, useRef, useActionState } from "react";
import PostsSearchButton from "./posts-search-button";
import { actionSearch } from "@/actions/actionSearch";
import { ActionSearchResult } from "@/types";
import { PostsQueryResult } from "@/sanity.types";

export interface Props {
  setSearchResults: React.Dispatch<
    React.SetStateAction<PostsQueryResult | null>
  >;
}

const initialState: ActionSearchResult = {
  status: "initial",
  message: "Initial",
  results: null,
};

export default function PostsSearch({ setSearchResults }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formState, formAction] = useActionState(actionSearch, initialState);

  useEffect(() => {
    if (formState && formState.status === "error") {
      // You could use a dialog or popup ala Sonner to display this error message to the user. https://sonner.emilkowal.ski/
      console.log(formState.message);
    }
    if (formState && formState.status === "success") {
      setSearchResults(formState.results);
    }
  }, [formState]);

  return (
    <div className="my-16">
      <form action={formAction} className="mt-5 sm:flex sm:items-center">
        <div className="w-full sm:max-w-sm">
          <input
            required
            ref={inputRef}
            id="search"
            name="search"
            type="search"
            autoComplete="search"
            placeholder="Search..."
            aria-label="Search"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>
        <PostsSearchButton />
      </form>
    </div>
  );
}
