import type { BreadcrumbProps } from "@src/components/Molecules/Core/Breadcrumb/Breadcrumb.interface";

import { fetchStories } from "@src/helpers/fetchContent";

// Takes an input `fullSlug` and builds an output `BreadcrumbProps` object consisting of the
// parent pages up to the homepage
export async function buildBreadcrumbs(
  fullSlug: string,
): Promise<BreadcrumbProps> {
  let stories = null;
  let returnBreadcrumbs: BreadcrumbProps = {
    items: [],
  };

  let bySlugsItems: string[] = ["home"];

  // Build the `by_slugs` comma separated match string using the input `fullSlug`
  const slugItems: string[] = fullSlug.split("/");

  if (slugItems.length > 1) {
    // We create a search slug for each part of the slug
    let currentPath = "";

    for (const segment of slugItems) {
      // Only process valid non-empty strings
      if (segment !== "") {
        currentPath = currentPath ? `${currentPath}/${segment}` : segment;
        bySlugsItems.push(currentPath + "/");
      }
    }
  }
  // Sorting by id will ensure home returns first and most distant child last see
  // https://www.storyblok.com/docs/api/content-delivery/v2/stories/retrieve-multiple-stories and
  // https://www.storyblok.com/docs/api/content-delivery/v2/stories/examples/sorting-by-story-object-property
  const { data } = await fetchStories({
    by_slugs: bySlugsItems.join(","),
    sort_by: "id:asc",
  });
  stories = data?.stories;

  if (stories) {
    // Loop through the returned stories and build the breadcrumbs
    returnBreadcrumbs = {
      items: stories.map(({ uuid, name, full_slug, path }) => ({
        fieldtype: "multilink",
        linktype: "",
        id: uuid,
        // Use path if defined as link otherwise full slug prepended with /
        url: path ? path : `/${full_slug}`,
        cached_url: path ? path : `/${full_slug}`,
        title: name,
      })),
    };
  }

  return returnBreadcrumbs;
}
