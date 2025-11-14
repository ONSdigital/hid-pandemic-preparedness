export interface SearchBarProps {
  placeholder: string;
  initialQuery?: string;
  isResultsPage?: boolean;
}

export interface PagefindResultsData {
  url: string;
  excerpt: string;
  meta: {
    title?: string;
    image?: string;
    [key: string]: any;
  };
  sub_results: PagefindSubResult[];
}

export interface PagefindSubResult {
  title: string;
  url: string;
  excerpt: string;
}
