import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon component", () => {
  it("renders the correct RemixIcon when a valid iconName is provided", () => {
    const validIconName = "RiGovernmentLine";
    const { container } = render(<Icon iconName={validIconName} />);

    // The rendered icon is an SVG element - check if the SVG element is in the document
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeTruthy();
  });

  it("renders null when an invalid iconName is provided", () => {
    const invalidIconName = "NonExistentIcon";
    const { container } = render(<Icon iconName={invalidIconName} />);

    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeNull();
  });

  it("passes the className prop correctly to the icon component", () => {
    const validIconName = "RiGovernmentLine";
    const testClassName = "test-class";

    const { container } = render(
      <Icon iconName={validIconName} className={testClassName} />,
    );

    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveClass(testClassName);
  });
});
