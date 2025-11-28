import { useState, useEffect, useCallback } from "react";

interface UrlState {
  term: string;
  pageIndex: number;
}

export const useSearchPageQueryParams = (isClient: boolean) => {
  const [urlState, setUrlState] = useState<UrlState>({
    term: "",
    pageIndex: 0,
  });

  const parseUrlAndSync = useCallback(() => {
    if (!isClient) return;
    const urlParams = new URLSearchParams(globalThis.location.search);

    const pageParam = Number.parseInt(urlParams.get("page") || "1", 10);
    const pageIndex = pageParam > 0 ? pageParam - 1 : 0;

    const term = urlParams.get("params") || "";

    setUrlState({ term, pageIndex });
  }, [isClient]);

  useEffect(() => {
    // re-run search when landing on results page
    // isClient must be true to run search
    parseUrlAndSync();

    globalThis.addEventListener("popstate", parseUrlAndSync);
    return () => globalThis.removeEventListener("popstate", parseUrlAndSync);
  }, [parseUrlAndSync]);

  const updateUrl = useCallback(
    (params: Partial<UrlState>) => {
      if (!isClient) return;
      const url = new URL(globalThis.location.href);

      const newTerm = params.term ?? urlState.term;
      const newIndex = params.pageIndex ?? urlState.pageIndex;

      if (newTerm) {
        url.searchParams.set("params", newTerm);
      } else {
        url.searchParams.delete("params");
      }

      const pageToSet = params.term !== undefined ? 0 : newIndex;
      const pageNumber = pageToSet + 1;

      if (pageNumber > 1) {
        url.searchParams.set("page", pageNumber.toString());
      } else {
        url.searchParams.delete("page");
      }

      const historyAction = params.term !== undefined ? "replace" : "push";

      if (historyAction === "replace") {
        globalThis.history.replaceState({}, "", url);
      } else {
        globalThis.history.pushState({}, "", url);
      }

      parseUrlAndSync();
    },
    [isClient, urlState.term, urlState.pageIndex, parseUrlAndSync],
  );

  return [urlState, updateUrl] as const;
};
