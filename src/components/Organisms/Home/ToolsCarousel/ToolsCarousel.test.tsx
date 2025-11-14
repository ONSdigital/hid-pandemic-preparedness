import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import "@testing-library/jest-dom";

import toolsCarouselData from "./toolsCarousel.json";
import { ToolsCarousel } from "./ToolsCarousel";
import type { ToolsCarouselProps } from "./ToolsCarousel.interface";

describe("ToolsCarousel organism", () => {
  test("the ToolsCarousel renders successfully using passed data", () => {
    render(<ToolsCarousel {...(toolsCarouselData as ToolsCarouselProps)} />);
  });
});
