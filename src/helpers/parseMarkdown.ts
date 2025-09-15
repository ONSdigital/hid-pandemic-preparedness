import { marked } from "marked";
// import sanitizeHtml from "sanitize-html";

// Takes input markdown and outputs as html
export async function parseMarkdown(markdownContent: string): Promise<string> {
  const contentHtml = await marked.parse(markdownContent);
  return contentHtml;
}
