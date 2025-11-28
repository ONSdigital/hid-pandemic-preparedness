import { useRef, useState } from "react";
import type {
  PagefindResultsData,
  PagefindSubResult,
} from "../components/Molecules/SearchBar/SearchBar.interface";
import type { SearchResultData } from "@src/types/Search.ts";

type PagefindModule = {
  init: () => Promise<void>;
  /* eslint-disable no-unused-vars */
  search: (term: string) => Promise<{
    results: {
      data: () => Promise<PagefindResultsData>;
    }[];
  }>;
};

export interface PagefindUtils {
  searchInput: string;
  allResults: SearchResultData[] | null;
  setSearchInput: (input: string) => void;
  initPagefind: () => Promise<void>;
  runSearch: (term: string) => Promise<void>;
}

export const usePagefind = (
  isClient: boolean,
  initialQuery: string | undefined,
): PagefindUtils => {
  const [searchInput, setSearchInput] = useState(initialQuery || "");
  const [allResults, setAllResults] = useState<SearchResultData[] | null>(null);

  const pagefind = useRef<PagefindModule | null>(null);
  const initPromise = useRef<Promise<void> | null>(null);

  const initPagefind = () => {
    if (initPromise.current) {
      return initPromise.current;
    }

    initPromise.current = (async () => {
      if (!isClient) return;

      const pagefindPath = "/pagefind/pagefind.js";
      try {
        // @ts-ignore
        const pf = await import(/* @vite-ignore */ pagefindPath);
        await pf.init();
        pagefind.current = pf;
      } catch (e) {
        console.error("Failed to initialise Pagefind", e);
        initPromise.current = null;
      }
    })();

    return initPromise.current;
  };

  const runSearch = async (term: string): Promise<void> => {
    if (!isClient) return;

    setAllResults(null);

    await initPagefind();
    if (!pagefind.current) {
      setAllResults([]);
      return;
    }

    if (!term) {
      setAllResults(null);
      return;
    }

    try {
      const search = await pagefind.current.search(term);

      const loadedResults: PagefindResultsData[] = await Promise.all(
        search.results.map((r: any) => r.data()),
      );

      const finalResults: SearchResultData[] = loadedResults.flatMap(
        (pagefindResults: PagefindResultsData) => {
          const tagObject = pagefindResults.meta?.tag
            ? { tag: pagefindResults.meta.tag }
            : undefined;

          return pagefindResults.sub_results.map(
            (subResult: PagefindSubResult) => {
              const resultItem: SearchResultData = {
                link: {
                  href: subResult.url,
                  label: subResult.title,
                },
                excerpt: subResult.excerpt,
              };

              if (tagObject) {
                resultItem.tag = tagObject as any; // TODO: Fix Tag object structure
              }

              return resultItem;
            },
          );
        },
      );

      setAllResults(finalResults);
    } catch (e) {
      console.error("Pagefind search failed:", e);
      setAllResults([]);
    }
  };

  return {
    searchInput,
    allResults,
    setSearchInput,
    initPagefind,
    runSearch,
  };
};
