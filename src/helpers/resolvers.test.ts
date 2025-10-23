import type {
  StoryblokRichTextContext,
  StoryblokRichTextNode,
} from "@storyblok/richtext";
import { describe, expect, test, vi } from "vitest";

import { headingResolver } from "./resolvers";

// Mock context with a render function
const createMockContext = (): StoryblokRichTextContext<any> => {
  return {
    render: vi.fn(
      (tag: string, attrs: Record<string, any>, children: any[]) => {
        return { tag, attrs, children };
      },
    ),
  } as Partial<StoryblokRichTextContext<any>> as StoryblokRichTextContext<any>;
};

// Test when `headingResolver` is called with heading nodes of different levels
describe.each([
  { level: 1, expectedStylingClass: "heading-xl" },
  { level: 2, expectedStylingClass: "heading-l" },
  { level: 3, expectedStylingClass: "heading-m" },
  { level: 4, expectedStylingClass: "heading-s" },
  { level: 5, expectedStylingClass: "heading-xs" },
])(
  "describe headingResolver with heading h$baseUrl",
  ({ level, expectedStylingClass }) => {
    const context = createMockContext();
    const headingNode = {
      type: "heading",
      attrs: { level: level },
      content: [],
      children: ["Learning Outcomes:"],
    } as StoryblokRichTextNode<any>;

    test(`returns ${expectedStylingClass}`, () => {
      headingResolver(headingNode, context);
      expect(context.render).toHaveBeenCalledWith(
        `h${level} class=${expectedStylingClass}`,
        {},
        headingNode.children,
      );
    });
  },
);
