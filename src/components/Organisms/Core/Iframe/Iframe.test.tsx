import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Iframe } from "./Iframe";
import type { Link } from "@/src/types/Link";

describe("Iframe component", () => {
  const source = { url: "https://example.com/page" } as Link;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading text initially and then iframe with correct src", async () => {
    render(<Iframe source={source} title="Test iframe" />);

    expect(screen.queryByText(/iFrame loading.../i)).toBeDefined();

    // Check src is set after effect runs
    await waitFor(() => {
      const iframe = screen.getByTitle("Test iframe") as HTMLIFrameElement;
      expect(iframe).toBeDefined();
      expect(iframe.src).toBe(source.url);
    });
  });

  it("renders link to open iframe in new tab", () => {
    render(<Iframe source={source} title="Test iframe" />);

    const link = screen.getByRole("link", { name: source.url });
    expect(link).toHaveAttribute("href", source.url);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("iframe height initializes with defaultHeight prop and updates on message event", async () => {
    const defaultHeight = 200;
    const buffer = 40;
    render(
      <Iframe
        source={source}
        title="Test iframe"
        defaultHeight={defaultHeight}
      />,
    );

    const iframe = await screen.findByTitle("Test iframe");

    expect(iframe).toHaveAttribute("height", `${defaultHeight}px`);

    const newHeight = 300;
    const event = new MessageEvent("message", {
      origin: new URL(source.url).origin,
      data: { type: "iframeHeight", height: newHeight },
    });
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(iframe).toHaveAttribute("height", `${newHeight + buffer}px`);
    });
  });

  it("ignores message events from disallowed origin", async () => {
    render(<Iframe source={source} title="Test iframe" />);

    const iframe = await screen.findByTitle("Test iframe");

    expect(iframe).toHaveAttribute("height", "150px");

    const wrongOriginEvent = new MessageEvent("message", {
      origin: "https://wrong-origin-website.com",
      data: { type: "iframeHeight", height: 500 },
    });
    window.dispatchEvent(wrongOriginEvent);

    expect(iframe).toHaveAttribute("height", "150px");
  });

  it("ignores message events of the wrong type", async () => {
    render(<Iframe source={source} title="Test iframe" />);

    const iframe = await screen.findByTitle("Test iframe");

    expect(iframe).toHaveAttribute("height", "150px");

    const wrongTypeEvent = new MessageEvent("message", {
      origin: new URL(source.url).origin,
      data: { type: "otherType", height: 500 },
    });
    window.dispatchEvent(wrongTypeEvent);

    expect(iframe).toHaveAttribute("height", "150px");
  });

  it("adds and removes message event listener on mount and unmount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<Iframe source={source} title="Test iframe" />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "message",
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "message",
      expect.any(Function),
    );
  });
});
