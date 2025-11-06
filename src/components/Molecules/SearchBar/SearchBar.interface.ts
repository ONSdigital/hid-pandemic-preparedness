export interface SearchBarProps {
  placeholder: string;
}

export interface PagefindResultData {
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
