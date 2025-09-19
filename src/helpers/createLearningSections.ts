import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

import type { LearningResourceData } from "@src/types/learningResourceData";

import { parseMarkdown } from "./parseMarkdown";

// Takes input markdown filepath
export async function createLearningSections(
  markdownFilepath: string,
): Promise<LearningResourceData[]> {
  const content = await fs.readFile(markdownFilepath, "utf-8");

  // Regex to split by top-level headings (# Heading)
  // The split will keep the heading lines as separate entries.
  const splitRegex = /^(# .*)$/gm;

  // Split content by headings, keeping the headings
  const parts = content.split(splitRegex).filter(Boolean);

  const learningSections: LearningResourceData[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();

    if (part.startsWith("# ")) {
      const title = part.replace(/^# /, "").trim();

      // The content for this section is the next part (if exists) or empty string
      const nextContent = parts[i + 1] ? parts[i + 1].trim() : "";

      // Convert markdown content to HTML
      const htmlContent = await parseMarkdown(nextContent);

      learningSections.push({
        id: uuidv4(),
        title,
        htmlContent,
      });
    }
  }

  return learningSections;
}
