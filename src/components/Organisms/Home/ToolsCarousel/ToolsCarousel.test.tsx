import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import "@testing-library/jest-dom";

import toolsCarouselRaw from "./toolsCarousel.json";
import { ToolsCarousel } from "./ToolsCarousel";
import type { ToolsCarouselProps } from "./ToolsCarousel.interface";

const toolsCarouselData = toolsCarouselRaw as ToolsCarouselProps;

describe("ToolsCarousel organism", () => {
  test("the ToolsCarousel renders successfully using passed data", () => {
    render(<ToolsCarousel {...toolsCarouselData} />);
  });
});
