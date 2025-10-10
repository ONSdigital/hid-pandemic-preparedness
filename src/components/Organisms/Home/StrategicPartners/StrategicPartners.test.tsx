import { v4 as uuidv4 } from "uuid";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import strategicPartnersProps from "./strategic-partners.json";
import type { StrategicPartnersProps } from "./StrategicPartners.interface";
import { StrategicPartners } from "./StrategicPartners";

describe("StrategicPartners component", () => {
  const baseProps: StrategicPartnersProps = {
    ...(strategicPartnersProps as StrategicPartnersProps),
    title: "strategic partners",
  };

  test("renders `strategic-partners-title` as sentence case", () => {
    // Make sure title is lower case first
    expect(baseProps.title).toBe("strategic partners");
    render(<StrategicPartners {...baseProps} />);
    const title = screen.getByRole("strategic-partners-title");
    expect(title.textContent).toBe("Strategic partners");
  });
});
