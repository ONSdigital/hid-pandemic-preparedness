import { marked } from "marked";

import { renderer } from "./renderers";
import { mathBlockTokenizer, tipTokenizer } from "./tokenizers";

// Takes input markdown and outputs as html
export async function parseMarkdown(markdownContent: string): Promise<string> {
  // Use the custom renderer and tokenizers
  marked.use({
    extensions: [mathBlockTokenizer, tipTokenizer],
    renderer: renderer,
  });

  const contentHtml = await marked.parse(markdownContent);
  return contentHtml;
}
