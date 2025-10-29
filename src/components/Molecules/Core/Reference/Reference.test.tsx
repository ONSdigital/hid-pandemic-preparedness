import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import "@testing-library/jest-dom";

import referenceData from "./reference.json";
import { Reference } from "./Reference";

describe("Reference component", () => {
  test("the reference component renders successfully when passed valid data", () => {
    render(<Reference {...referenceData} />);
  });
});
