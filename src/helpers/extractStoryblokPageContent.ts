// We only need recursion here because Rich Text is nested (lists, paragraphs, bold, etc.)
const parseRichText = (node: any): string => {
  if (!node) return "";

  // Found the actual text leaf
  if (node.type === "text" && node.text) {
    return node.text;
  }

  // If it has children (content array), map and join them
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(parseRichText).join(" ");
  }

  return "";
};

// 2. Main function to Transform the Story Object
export const getSearchableChapters = (story: any) => {
  // Guard clause: if data is missing, return empty array
  if (!story?.content?.chapters) return [];

  return story.content.chapters.map((chapter: any) => {
    
    // A. Capture Chapter Title
    const chapterTitle = chapter.title || "";

    // B. Capture "Overview" Text (e.g., Chapter 1 has this, but no sections)
    const overviewText = parseRichText(chapter.overviewRichText);

    // C. Capture "Sections" Text (e.g., Chapter 2 has sections)
    const sectionsText = (chapter.sections || [])
      .map((section: any) => {
        // We include the section title to make it searchable too
        const secTitle = section.title || "";
        const secBody = parseRichText(section.contentRichText);
        return `${secTitle} ${secBody}`;
      })
      .join(" ");

    // D. Combine and Clean
    // Join title + overview + sections, remove double spaces
    const fullText = `${chapterTitle} ${overviewText} ${sectionsText}`
      .replace(/\s+/g, " ")
      .trim();

    return {
      title: chapterTitle, // The identifier for the search result
      text: fullText       // The content Pagefind will index
    };
  });
};