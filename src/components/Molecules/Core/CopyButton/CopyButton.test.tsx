import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CopyButton } from "./CopyButton";
import { copyToClipboard } from "./copyToClipboard";
import { act, type RefObject } from "react";
import type { Mock } from "vitest";

vi.mock("./copyToClipboard", () => ({
  copyToClipboard: vi.fn(),
}));

describe("CopyButton", () => {
  let contentElement: RefObject<HTMLElement>;

  beforeEach(() => {
    contentElement = { current: document.createElement("div") };
  });

  it("renders with initial text", () => {
    render(<CopyButton contentElement={contentElement} />);
    expect(screen.getByText("Copy")).toBeDefined();
  });

  it("calls copyToClipboard when clicked", async () => {
    (copyToClipboard as unknown as Mock).mockResolvedValue(true);

    render(<CopyButton contentElement={contentElement} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(copyToClipboard).toHaveBeenCalledWith(contentElement.current);
  });

  it("shows 'Copied!' after successful copy and then resets after 2 seconds", async () => {
    vi.useFakeTimers();
    (copyToClipboard as unknown as Mock).mockResolvedValue(true);

    render(<CopyButton contentElement={contentElement} />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText("Copied!")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Copy")).toBeDefined();
  });

  it("does not change text if copyToClipboard fails", async () => {
    (copyToClipboard as unknown as Mock).mockResolvedValue(false);

    render(<CopyButton contentElement={contentElement} />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText("Copy")).toBeDefined();
  });
});
