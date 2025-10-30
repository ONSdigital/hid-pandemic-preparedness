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
  } else {
    // If there is no slashes in the `fullSlug`, then this is a level 0 single slug so just add the
    // item without slash for searching. Only process if not home
    const item: string = slugItems[0];
    if (item !== "home") {
      bySlugsItems.push(slugItems[0]);
    }
  }

  // Add the original input slug onto the end for good measure to ensure we fetch this story
  bySlugsItems.push(fullSlug);

  // See
  // https://www.storyblok.com/docs/api/content-delivery/v2/stories/retrieve-multiple-stories
  const { data } = await fetchStories({
    by_slugs: bySlugsItems.join(","),
  });
  stories = data?.stories;

  // Sort the stories ourselves by shortest full_slug to longest. There is no reliable way to get
  // the stories in this order using the api
  const sortedStories = stories.sort((a, b) => {
    return a.full_slug.length - b.full_slug.length;
  });

  if (sortedStories) {
    // Loop through the returned stories and build the breadcrumbs
    returnBreadcrumbs = {
      items: sortedStories.map(({ uuid, name, full_slug, path }) => ({
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
