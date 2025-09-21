import type { LearningResourceData } from "@src/types/learningResourceData";

import { parseMarkdown } from "./parseMarkdown";

// Takes input markdown filepath
export async function createLearningSections(
  markdownContent: string,
): Promise<LearningResourceData[]> {
  // Regex to split by top-level headings (# Heading)
  // The split will keep the heading lines as separate entries.
  const splitRegex = /^(# .*)$/gm;
  let sectionCount = 0;

  // Split content by headings, keeping the headings
  const parts = markdownContent.split(splitRegex).filter(Boolean);

  const learningSections: LearningResourceData[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();

    if (part.startsWith("# ")) {
      sectionCount += 1;
      const title = part.replace(/^# /, "").trim();

      // The content for this section is the next part (if exists) or empty string
      const nextContent = parts[i + 1] ? parts[i + 1].trim() : "";

      // Convert markdown content to HTML
      const htmlContent = await parseMarkdown(nextContent);

      learningSections.push({
        id: `section${sectionCount}`,
        title,
        htmlContent,
      });
    }
  }

  return learningSections;
}
