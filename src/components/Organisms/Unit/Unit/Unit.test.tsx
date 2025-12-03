import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";

// Importing raw here to avoid typescript errors when parsing strings to enums
import storyJson from "./story.json?raw";
import type { UnitProps } from "./Unit.interface";
import { Unit } from "./Unit";

describe("Unit component", () => {
  const baseProps: UnitProps = {
    ...JSON.parse(storyJson),
    githubLink: null,
    startLink: null,
  };

  beforeEach(() => {
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });

    window.location.hash = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.location.hash = "";
  });

  test("renders successfully if chapters are empty", () => {
    render(<Unit {...baseProps} />);
    expect(screen.getByTestId("unit-container")).toBeInTheDocument();
  });

  test("renders successfully if chapters just contain an overview", () => {
    // Update props to include a single overview chapter
    const props: UnitProps = {
      story: {
        ...baseProps.story,
        content: {
          ...baseProps.story.content,
          chapters: [
            {
              _uid: "2b215315-ede6-42a5-9cd0-749a916b8661",
              title: "Overview",
              component: "UnitOverview",
              githubLink: {
                id: "",
                url: "https://www.github.com",
                linktype: "url",
                fieldtype: "multilink",
                cached_url: "https://www.github.com",
              },
              readingTime: "Takes around six months",
              overviewRichText: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    attrs: { textAlign: null },
                    content: [{ text: "Intro text", type: "text" }],
                  },
                ],
              },
              content: [],
            },
          ],
        },
      },
    };

    render(<Unit {...props} />);
    expect(screen.getByTestId("unit-container")).toBeInTheDocument();
  });

  test("automatically selects chapter if URL hash matches slug", async () => {
    const chapterTitle = "Key parts of react";
    const expectedSlug = "key-parts-of-react";

    // Update props to include a single chapter
    const props: UnitProps = {
      story: {
        ...baseProps.story,
        content: {
          ...baseProps.story.content,
          chapters: [
            {
              _uid: "overview-uid-123",
              title: "Overview",
              component: "UnitOverview",
              githubLink: {
                id: "gh-link-1",
                url: "https://github.com",
                linktype: "url",
                fieldtype: "multilink",
                cached_url: "https://github.com",
              },
              readingTime: "5m",
              overviewRichText: { type: "doc", content: [] },
              content: [],
            },
            {
              _uid: "chapter-uid-456",
              title: chapterTitle,
              sections: [],
              subTitle: "Deep linked content",
              component: "UnitChapter",
              content: [],
            },
          ],
        },
      },
    };

    window.location.hash = `#${expectedSlug}`;

    render(<Unit {...props} />);

    await waitFor(() => {
      expect(screen.getByText("Deep linked content")).toBeInTheDocument();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
