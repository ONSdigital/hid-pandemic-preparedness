import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, test } from "vitest";
import "@testing-library/jest-dom";

import { Tooltip } from "./Tooltip";

const mockTooltipProps = {
  content: <span>Tooltip content</span>,
  triggerText: "Tooltip trigger",
};

describe("Tooltip component", () => {
  test("the tooltip component renders successfully ", () => {
    render(<Tooltip {...mockTooltipProps} />);
  });
  test("Tooltip content is only shown when trigger is clicked", () => {
    render(<Tooltip {...mockTooltipProps} />);

    // Tooltip content originally not there
    expect(screen.queryByText(/tooltip content/i)).not.toBeInTheDocument();

    // When Tooltip trigger is clicked
    const triggerButton = screen.getByRole("button", {
      name: /Tooltip trigger/i,
    });
    fireEvent.click(triggerButton);

    // Tooltip becomes visible
    expect(screen.queryByText(/tooltip content/i)).toBeInTheDocument();
  });
});
