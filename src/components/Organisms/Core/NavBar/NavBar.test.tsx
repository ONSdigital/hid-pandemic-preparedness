import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import "@testing-library/jest-dom";

import navBarDataRaw from "./navBar.json";
import { NavBar } from "./NavBar";
import type { NavBarProps } from "./NavBar.interface";

const navBarData = navBarDataRaw as NavBarProps;

describe("NavBar component", () => {
  test("the nav bar renders successful using passed data", () => {
    render(<NavBar {...navBarData} />);
  });
});
