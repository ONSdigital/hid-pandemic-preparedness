import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

// Importing raw here to avoid typescript errors when parsing strings to enums
import storyJson from "./story.json?raw";
import type { UnitProps } from "./Unit.interface";
import { Unit } from "./Unit";

describe("Unit component", () => {
  const baseProps: UnitProps = {
    ...JSON.parse(storyJson),
    githubLink: null,
    startLink: null,
  };

  test("renders successfully if chapters are empty", () => {
    render(<Unit {...baseProps} />);
    expect(screen.getByTestId("unit-container")).toBeInTheDocument();
  });

  // test("doesn't render `start-link` if `startLink` prop not defined", () => {
  //   render(<UnitOverview {...baseProps} />);
  //   // Test id should not exist if `startLink` prop not defined
  //   expect(screen.queryByTestId("start-link")).toEqual(null);
  // });

  // test("renders `github-link` if `githubLink` prop is defined", () => {
  //   const githubLink = {
  //     id: "",
  //     rel: "",
  //     url: "github.com",
  //     title: "Open Github",
  //     linktype: "url",
  //     fieldtype: "multilink",
  //     cached_url: "github.com",
  //   };
  //   render(<UnitOverview {...baseProps} githubLink={githubLink} />);
  //   // Test id should exist if `githubLink` prop is defined
  //   expect(screen.getByTestId("github-link")).toBeInTheDocument();
  // });
});
