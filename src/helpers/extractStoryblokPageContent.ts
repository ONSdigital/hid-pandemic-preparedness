const parseRichText = (node: any): string => {
  if (!node) return "";

  // Find the actual text leaf on node
  if (node.type === "text" && node.text) {
    return node.text;
  }

  // If node has children recursively look for text, map and join them
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(parseRichText).join(" ");
  }

  return "";
};

export const getSearchableChapters = (story: any) => {
  // Return empty where data missing
  if (!story?.content?.chapters) return [];

  return story.content.chapters.map((chapter: any) => {
    const chapterTitle = chapter.title || "";

    const overviewText = parseRichText(chapter.overviewRichText);

    // Find sections within chapter and join
    const sectionsText = (chapter.sections || [])
      .map((section: any) => {
        // Include section title to make it searchable too
        const secTitle = section.title || "";
        const secBody = parseRichText(section.contentRichText);
        return `${secTitle} ${secBody}`;
      })
      .join(" ");

    // Join title + overview + sections
    const fullText = `${chapterTitle} ${overviewText} ${sectionsText}`
      .replace(/\s+/g, " ")
      .trim();

    return {
      title: chapterTitle, // Identifier for the search result
      text: fullText, // Content Pagefind indexes (includes title)
    };
  });
};
