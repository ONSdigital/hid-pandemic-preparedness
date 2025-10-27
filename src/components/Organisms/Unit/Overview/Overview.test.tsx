import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

// Importing raw here to avoid typescript errors when parsing strings to enums
import overviewDataJson from "./overview.json?raw";
import type { OverviewProps } from "./Overview.interface";
import { Overview } from "./Overview";

describe("Overview component", () => {
  const baseProps: OverviewProps = {
    ...JSON.parse(overviewDataJson),
    githubLink: null,
    startLink: null,
  };

  test("doesn't render `github-link` if `githubLink` prop not defined", () => {
    render(<Overview {...baseProps} />);
    // Test id should not exist if `githubLink` prop not defined
    expect(screen.queryByTestId("github-link")).toEqual(null);
  });

  test("doesn't render `start-link` if `startLink` prop not defined", () => {
    render(<Overview {...baseProps} />);
    // Test id should not exist if `startLink` prop not defined
    expect(screen.queryByTestId("start-link")).toEqual(null);
  });

  test("renders `github-link` if `githubLink` prop is defined", () => {
    const githubLink = {
      id: "",
      rel: "",
      url: "github.com",
      title: "Open Github",
      linktype: "url",
      fieldtype: "multilink",
      cached_url: "github.com",
    };
    render(<Overview {...baseProps} githubLink={githubLink} />);
    // Test id should exist if `githubLink` prop is defined
    expect(screen.getByTestId("github-link")).toBeInTheDocument();
  });

  test("renders `start-link` if `startLink` prop is defined", () => {
    const startLink = {
      id: "",
      rel: "",
      url: "/1/",
      title: "Start",
      linktype: "url",
      fieldtype: "multilink",
      cached_url: "/1/",
    };
    const updatedProps = {
      ...baseProps,
      startLink: startLink,
    };

    render(<Overview {...updatedProps} />);
    // Test id should exist if `startLink` prop is defined
    expect(screen.getByTestId("start-link")).toBeInTheDocument();
  });
});
