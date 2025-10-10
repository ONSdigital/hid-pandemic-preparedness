// This is the same as `https://github.com/storyblok/monoblok/packages/cli/src/types/storyblok.ts:StoryblokMultilink`
export interface Link {
  fieldtype: string; // "multilink"
  id: string;
  url: string;
  cached_url: string;
  target?: "_blank" | "_self";
  anchor?: string;
  rel?: string;
  title?: string;
  prep?: string;
  linktype: string; // "story" | "url" | "email" | "asset";
  story?: {
    name: string;
    created_at: string;
    published_at: string;
    id: number;
    uuid: string;
    content: Record<string, any>;
    slug: string;
    full_slug: string;
    sort_by_date?: string;
    position?: number;
    tag_list?: string[];
    is_startpage?: boolean;
    parent_id?: number | null;
    meta_data?: Record<string, any> | null;
    group_id?: string;
    first_published_at?: string;
    release_id?: number | null;
    lang?: string;
    path?: string | null;
    alternates?: any[];
    default_full_slug?: string | null;
    translated_slugs?: any[] | null;
  };
  email?: string;
}
