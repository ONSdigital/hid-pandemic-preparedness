import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import "@testing-library/jest-dom";

import carouselData from "./carousel.json";
import { Carousel } from "./Carousel";

describe("Carousel component", () => {
  test("the carousel renders successful using passed data", () => {
    render(<Carousel {...carouselData} />);
  });
});
