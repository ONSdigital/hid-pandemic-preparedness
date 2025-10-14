// Storyblok space object see https://www.storyblok.com/docs/api/content-delivery/v2/spaces/the-space-object
export interface ISpace {
  id: number;
  name: string;
  domain: string;
  version: number;
  language_codes: string[];
}
