import { v4 as uuidv4 } from "uuid";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { ImpactCardProps } from "./ImpactCard.interface";
import { ImpactCard } from "./ImpactCard";

describe("ImpactCard component", () => {
  const baseProps: ImpactCardProps = {
    _uid: uuidv4(),
    icon: "users",
    title: "my lower case test string",
    subTitle: "of Analysis for Action resources so far",
  };

  test("renders `impact-card-title` as sentence case", () => {
    // Make sure title is lower case first
    expect(baseProps.title).toBe("my lower case test string");
    render(<ImpactCard {...baseProps} />);
    const title = screen.getByRole("impact-card-title");
    expect(title.textContent).toBe("My lower case test string");
  });
});
