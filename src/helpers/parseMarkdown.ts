import { marked } from "marked";

import { markedRenderer } from "./markedRenderer";

// Takes input markdown and outputs as html
export async function parseMarkdown(markdownContent: string): Promise<string> {
  // Use the custom renderer
  marked.use({ renderer: markedRenderer });

  const contentHtml = await marked.parse(markdownContent);
  return contentHtml;
}
