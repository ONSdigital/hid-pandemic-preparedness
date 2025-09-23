import { marked } from "marked";

import { renderer } from "./renderers";

// Takes input markdown and outputs as html
export async function parseMarkdown(markdownContent: string): Promise<string> {
  // Use the custom renderer
  marked.use({ renderer: renderer });

  const contentHtml = await marked.parse(markdownContent);
  return contentHtml;
}
