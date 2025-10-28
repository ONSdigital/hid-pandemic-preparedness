import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
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
                    attrs: {
                      textAlign: null,
                    },
                    content: [
                      {
                        text: "By the end of this learning you should know react.",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    };

    render(<Unit {...props} />);
    expect(screen.getByTestId("unit-container")).toBeInTheDocument();
  });

  test("renders successfully if chapters just contain a chapter", () => {
    // Update props to include a single chapter
    const props: UnitProps = {
      story: {
        ...baseProps.story,
        content: {
          ...baseProps.story.content,
          chapters: [
            {
              _uid: "716cfc89-83fa-48c4-9922-23333d705885",
              title: "Key parts of react",
              sections: [],
              subTitle: "Oooooooh",
              component: "UnitChapter",
            },
          ],
        },
      },
    };

    render(<Unit {...props} />);
    expect(screen.getByTestId("unit-container")).toBeInTheDocument();
  });
});
