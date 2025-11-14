import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { ChildPagesNavProps } from "./ChildPagesNav.interface";
import { ChildPagesNav } from "./ChildPagesNav";
import storiesJson from "./stories.json?raw";

describe("ChildPagesNav component", () => {
  const baseProps: ChildPagesNavProps = {
    currentFullSlug: "learning-resources/data-analysis/",
    parentFullSlug: "learning-resources/data-analysis/",
  };

  test("renders component without error", () => {
    const component = render(<ChildPagesNav {...baseProps} />);
    expect(component).toBeDefined();
  });

  test("renders subTitle if supplied", () => {
    const subTitle: string =
      "Grouped into themes and modules, with multiple units within each.";

    const props: ChildPagesNavProps = {
      ...baseProps,
      subTitle: subTitle,
    };

    render(<ChildPagesNav {...props} />);
    const subTitleParagraph = screen.getByRole("paragraph");
    // Inner text should be set to subtitle
    expect(subTitleParagraph).toHaveTextContent(subTitle);
  });

  test("renders buttons with links if stories supplied", () => {
    const props: ChildPagesNavProps = {
      ...baseProps,
      stories: JSON.parse(storiesJson),
    };

    render(<ChildPagesNav {...props} />);
    const storiesNav = screen.getByRole("navigation");
    // Nav should contain buttons for each story
    // expect(storiesNav).toHaveTextContent(subTitle);
  });
});
