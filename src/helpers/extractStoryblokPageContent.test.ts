import { describe, expect, test } from "vitest";
import { getSearchableChapters } from "./extractStoryblokPageContent";

describe("getSearchableChapters", () => {
  test("returns empty array if story content is missing", () => {
    const result = getSearchableChapters(null);
    expect(result).toEqual([]);

    const result2 = getSearchableChapters({});
    expect(result2).toEqual([]);
  });

  test("returns empty array if chapters array is missing", () => {
    const story = { content: { title: "No chapters" } };
    const result = getSearchableChapters(story);
    expect(result).toEqual([]);
  });

  test("extracts basic chapter title", () => {
    const story = {
      content: {
        chapters: [{ title: "Chapter 1" }],
      },
    };

    const result = getSearchableChapters(story);
    expect(result).toEqual([
      {
        title: "Chapter 1",
        text: "Chapter 1",
      },
    ]);
  });

  test("extracts text from overviewRichText", () => {
    const story = {
      content: {
        chapters: [
          {
            title: "Overview",
            overviewRichText: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Hello world" }],
                },
              ],
            },
          },
        ],
      },
    };

    const result = getSearchableChapters(story);
    expect(result[0].text).toBe("Overview Hello world");
  });

  test("extracts text from deeply nested rich text arrays", () => {
    const story = {
      content: {
        chapters: [
          {
            title: "Deep",
            overviewRichText: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Part 1" },
                    { type: "text", text: "Part 2" },
                  ],
                },
                {
                  type: "bullet_list",
                  content: [
                    {
                      type: "list_item",
                      content: [
                        {
                          type: "paragraph",
                          content: [{ type: "text", text: "Bullet point" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    };

    const result = getSearchableChapters(story);
    expect(result[0].text).toBe("Deep Part 1 Part 2 Bullet point");
  });

  test("extracts text from sections within a chapter", () => {
    const story = {
      content: {
        chapters: [
          {
            title: "Chapter 2",
            sections: [
              {
                title: "Section A",
                contentRichText: {
                  type: "doc",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Section content" }],
                    },
                  ],
                },
              },
              {
                title: "Section B",
                contentRichText: {
                  type: "doc",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "More content" }],
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    };

    const result = getSearchableChapters(story);
    expect(result[0].text).toBe(
      "Chapter 2 Section A Section content Section B More content",
    );
  });

  test("handles mixed content types gracefully", () => {
    const story = {
      content: {
        chapters: [
          {
            title: "Mixed",
            overviewRichText: null,
            sections: [
              {
                title: "Empty Section",
                contentRichText: {},
              },
              {
                title: "Valid Section",
                contentRichText: {
                  type: "doc",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Real text" }],
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    };

    const result = getSearchableChapters(story);
    expect(result[0].text).toBe("Mixed Empty Section Valid Section Real text");
  });

  test("cleans up excessive whitespace", () => {
    const story = {
      content: {
        chapters: [
          {
            title: "   Messy   Title   ",
            overviewRichText: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "   Text with   spaces   " }],
                },
              ],
            },
          },
        ],
      },
    };

    const result = getSearchableChapters(story);
    expect(result[0].text).toBe("Messy Title Text with spaces");
  });
});