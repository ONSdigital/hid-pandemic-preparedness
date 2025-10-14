import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import impactProps from "./impact.json";
import type { ImpactProps } from "./Impact.interface";
import { Impact } from "./Impact";

describe("Impact component", () => {
  const baseProps: ImpactProps = {
    ...(impactProps as ImpactProps),
    title: "global impact",
  };

  test("renders `impact-title` as sentence case", () => {
    // Make sure title is lower case first
    expect(baseProps.title).toBe("global impact");
    render(<Impact {...baseProps} />);
    const title = screen.getByRole("impact-title");
    expect(title.textContent).toBe("Global impact");
  });
});
