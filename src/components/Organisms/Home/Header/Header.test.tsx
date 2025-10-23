import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import headerProps from "./header.json";
import type { HeaderProps } from "./Header.interface";
import { Header } from "./Header";

describe("Header component", () => {
  const baseProps: HeaderProps = {
    ...headerProps,
    breadcrumbs: {
      items: [
        {
          fieldtype: "",
          linktype: "multilink",
          cached_url: "/",
          url: "/",
          title: "Home",
          id: "0c6dd168-38da-4a09-b62c-971490cb80b4",
        },
      ],
    },
    title: "resilience through data",
  };

  test("renders `header-title` as sentence case", () => {
    // Make sure title is lower case first
    expect(baseProps.title).toBe("resilience through data");
    render(<Header {...baseProps} />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Resilience through data");
  });
});
