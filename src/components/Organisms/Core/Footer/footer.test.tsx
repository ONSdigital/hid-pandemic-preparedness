import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import "@testing-library/jest-dom";

import footerData from "./footer.json";
import { Footer } from "./Footer";

describe("Footer component", () => {
  test("the footer renders successful using passed data", () => {
    render(<Footer {...footerData} />);
  });
});
