import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { collections } from "@src/content.config";

type CollectionName = keyof typeof collections;

async function getAllContent() {
  const allContent = [];

  for (const collectionName of Object.keys(collections) as CollectionName[]) {
    const entries = await getCollection(collectionName);
    for (const item of entries) {
      allContent.push({
        id: item.id,
        title: item.data.title,
        url: item.data.slug,
      });
    }
  }

  return allContent;
}

export const GET: APIRoute = async () => {
  const allItems = await getAllContent();

  return new Response(JSON.stringify(allItems), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
