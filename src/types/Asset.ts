// This is the same as `https://github.com/storyblok/monoblok/packages/cli/src/types/storyblok.ts:StoryblokAsset`
// with some made optional to suit whats being returned from Storyblok
export interface Asset {
  alt: string | null;
  copyright: string | null;
  fieldtype: "asset";
  id: number;
  filename: string | null;
  name: string;
  title: string | null;
  focus: string | null;
  meta_data: Record<string, any>;
  source: string | null;
  is_external_url: boolean;
  is_private?: boolean;
  updated_at?: string;
  src?: string;
  // Cloudinary integration keys
  width?: number | null;
  height?: number | null;
  aspect_ratio?: number | null;
  public_id?: string | null;
  content_type?: string;
}
