import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { NavigationRowProps } from "./NavigationRow.interface";
import { NavigationRow } from "./NavigationRow";
import storiesJson from "./stories.json?raw";

describe("NavigationRow component", () => {
  const baseProps: NavigationRowProps = {
    currentFullSlug: "learning-resources/data-analysis/",
    parentFullSlug: "learning-resources/data-analysis/",
  };

  test("renders component without error", () => {
    const component = render(<NavigationRow {...baseProps} />);
    expect(component).toBeDefined();
  });

  test("renders subTitle if supplied", () => {
    const subTitle: string =
      "Grouped into themes and modules, with multiple units within each.";

    const props: NavigationRowProps = {
      ...baseProps,
      subTitle: subTitle,
    };

    render(<NavigationRow {...props} />);
    const subTitleParagraph = screen.getByRole("paragraph");
    // Inner text should be set to subtitle
    expect(subTitleParagraph).toHaveTextContent(subTitle);
  });

  test("renders buttons with links if stories supplied", () => {
    const props: NavigationRowProps = {
      ...baseProps,
      stories: JSON.parse(storiesJson),
    };

    render(<NavigationRow {...props} />);
    const storiesNav = screen.getByRole("navigation");
    // Nav should contain buttons for each story
    // expect(storiesNav).toHaveTextContent(subTitle);
  });
});
