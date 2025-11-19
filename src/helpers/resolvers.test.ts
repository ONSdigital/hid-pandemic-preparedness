// Ignoring instances where generic `T` is undefined
/* eslint-disable no-undef */

import type {
  StoryblokRichTextContext,
  StoryblokRichTextNode,
} from "@storyblok/richtext";
import { clsx } from "clsx";
import { describe, expect, test, vi } from "vitest";

import { componentResolver, headingResolver } from "./resolvers";

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
        `h${level}`,
        { class: expectedStylingClass },
        headingNode.children,
      );
    });
  },
);

describe("componentResolver", () => {
  // Valid node data
  const formulaText: string = "Mₖ = (dₖ / pₖ) × 1,000";
  const componentNode = {
    type: "blok",
    attrs: {
      id: "be0bd86d-84f1-4b47-9ffd-6a5f0a7c9b01",
      body: [
        {
          _uid: "i-778e58f1-ca30-4549-8e9e-9fe9e3716cd9",
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                attrs: {
                  textAlign: null,
                },
                content: [
                  {
                    text: "Mₖ = (dₖ / pₖ) × 1,000",
                    type: "text",
                    marks: [
                      {
                        type: "bold",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          richText: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                attrs: {
                  textAlign: null,
                },
                content: [
                  {
                    text: formulaText,
                    type: "text",
                    marks: [
                      {
                        type: "textStyle",
                        attrs: {
                          color: "#212529",
                        },
                      },
                      {
                        type: "bold",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          component: "Formula",
        },
      ],
    },
    content: [],
  } as StoryblokRichTextNode<T>;

  // test("Renders formula when called with valid node", () => {
  //   const context = createMockContext();
  //   componentResolver(componentNode, context);
  //   expect(context.render).toHaveBeenCalledWith(
  //     "span",
  //     {
  //       blok: componentNode?.attrs?.body[0],
  //       class: clsx("d-flex", "p-3", "my-2", "fw-semibold", "math-block"),
  //       id: componentNode?.attrs?.id,
  //     },
  //     [formulaText],
  //   );
  // });

  test("Renders with default values when called with empty content", () => {
    const node = {
      ...componentNode,
      attrs: {
        ...componentNode.attrs,
        body: [
          {
            ...componentNode?.attrs?.body[0],
            richText: {
              ...componentNode?.attrs?.body[0].richText,
              content: [
                {
                  ...componentNode?.attrs?.body[0].richText.content[0],
                  content: [],
                },
              ],
            },
          },
        ],
      },
    } as StoryblokRichTextNode<T>;

    const context = createMockContext();
    componentResolver(node, context);
    expect(context.render).toHaveBeenCalledWith("span", {
      blok: node.attrs?.body[0],
      id: node.attrs?.id,
      style: "display: none",
    });
  });

  test("Renders with default values when called with unrecognised component type", () => {
    const node = {
      ...componentNode,
      attrs: {
        ...componentNode.attrs,
        body: [
          {
            ...componentNode?.attrs?.body[0],
            component: "Unrecognised",
          },
        ],
      },
    } as StoryblokRichTextNode<T>;

    const context = createMockContext();
    componentResolver(node, context);
    expect(context.render).toHaveBeenCalledWith("span", {
      blok: node.attrs?.body[0],
      id: node.attrs?.id,
      style: "display: none",
    });
  });

  test("Renders with default values when called with an empty blok", () => {
    const node = {
      type: "blok",
      attrs: {},
      content: [],
    } as StoryblokRichTextNode<T>;

    const context = createMockContext();
    componentResolver(node, context);
    expect(context.render).toHaveBeenCalledWith("span", {
      blok: undefined,
      id: node.attrs?.id,
      style: "display: none",
    });
  });
});
