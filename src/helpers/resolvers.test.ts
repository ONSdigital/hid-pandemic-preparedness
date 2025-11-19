// Ignoring instances where generic `T` is undefined
/* eslint-disable no-undef */

import type {
  StoryblokRichTextContext,
  StoryblokRichTextNode,
} from "@storyblok/richtext";
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

  test("Renders formula when called with valid node", () => {
    const formulaText = "Mₖ = (dₖ / pₖ) × 1,000";
    const node = {
      type: "blok",
      attrs: {
        id: "bafc1eec-4837-4a94-a0c2-ba45f709e64b",
        body: [
          {
            _uid: "i-e3d68995-7df7-4a09-9d36-a89855bde871",
            text: formulaText,
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
            _editable:
              '\u003C!--#storyblok#{"name": "Formula", "space": "287525897740819", "uid": "i-e3d68995-7df7-4a09-9d36-a89855bde871", "id": "104958153601090"}--\u003E',
          },
        ],
      },
    } as unknown as StoryblokRichTextNode<T>;

    const context = createMockContext();
    // Valid node should return rendered `Formula` component
    const component = componentResolver(node, context);
    expect(component).toContain(formulaText);
  });

  test("copes with weird data coming from node", () => {
    const formulaText: string = "";
    const node = {
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
                      text: "Mₖ = (dₖ / pₖ) × 1,000",
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
            _editable:
              '\u003C!--#storyblok#{"name": "Formula", "space": "287525897740819", "uid": "i-778e58f1-ca30-4549-8e9e-9fe9e3716cd9", "id": "104958153601090"}--\u003E',
          },
        ],
      },
    } as unknown as StoryblokRichTextNode<T>;

    const context = createMockContext();
    // Invalid node should be caught by try catch and just return default implementation
    componentResolver(node, context);
    expect(context.render).toHaveBeenCalledWith("span", {
      blok: node.attrs?.body[0],
      id: node.attrs?.id,
      style: "display: none",
    });
  });

  test("Renders tip when called with valid node", () => {
    const tipText =
      "If you are surveying students or children, check the specific demographic themes tailored to those groups";
    const node = {
      type: "blok",
      attrs: {
        id: "e680e321-66d3-442d-a320-5ba5ec7b2705",
        body: [
          {
            _uid: "i-f4d109c8-80d5-4b02-93ef-e32184d7d7ad",
            text: tipText,
            component: "Tip",
            _editable:
              '\u003C!--#storyblok#{"name": "Tip", "space": "287525897740819", "uid": "i-f4d109c8-80d5-4b02-93ef-e32184d7d7ad", "id": "111392427945344"}--\u003E',
          },
        ],
      },
    } as unknown as StoryblokRichTextNode<T>;

    const context = createMockContext();
    // Valid node should return rendered `Tip` component
    const component = componentResolver(node, context);
    expect(component).toContain(tipText);
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
