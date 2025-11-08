import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Video } from "./Video";

describe("Video component", () => {
  // Mock console.warn to test invalid URL warnings
  const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  // example YouTube video ID
  const validVideoId = "dQw4w9WgXcQ";

  it("renders iframe with correct src for watch URL", () => {
    render(
      <Video
        url={`https://www.youtube.com/watch?v=${validVideoId}`}
        title="Test Video"
      />,
    );
    const iframe = screen.getByTitle("Test Video") as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain(
      `https://www.youtube.com/embed/${validVideoId}`,
    );
    expect(iframe.src).not.toContain("start");
    expect(iframe.src).not.toContain("end");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders iframe with correct src for shortened URL", () => {
    render(
      <Video
        url={`https://youtu.be/${validVideoId}`}
        title="Short URL Video"
      />,
    );
    const iframe = screen.getByTitle("Short URL Video") as HTMLIFrameElement;
    expect(iframe.src).toContain(
      `https://www.youtube.com/embed/${validVideoId}`,
    );
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders iframe with correct src for embed URL", () => {
    render(
      <Video
        url={`https://www.youtube.com/embed/${validVideoId}`}
        title="Embed URL Video"
      />,
    );
    const iframe = screen.getByTitle("Embed URL Video") as HTMLIFrameElement;
    expect(iframe.src).toContain(
      `https://www.youtube.com/embed/${validVideoId}`,
    );
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders iframe with start and end parameters", () => {
    render(
      <Video
        url={`https://www.youtube.com/watch?v=${validVideoId}`}
        start={30}
        end={90}
        title="With Params"
      />,
    );
    const iframe = screen.getByTitle("With Params") as HTMLIFrameElement;
    const url = new URL(iframe.src);
    expect(url.searchParams.get("start")).toBe("30");
    expect(url.searchParams.get("end")).toBe("90");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("warns and renders iframe with null videoId for invalid URL", () => {
    const invalidUrl = "https://example.com/not-a-youtube-url";
    render(<Video url={invalidUrl} title="Invalid URL" />);
    expect(consoleWarnSpy).toHaveBeenCalledWith("Invalid YouTube URL");

    const iframe = screen.getByTitle("Invalid URL") as HTMLIFrameElement;
    // Since videoId is null, the src will be https://www.youtube.com/embed/null?
    expect(iframe.src).toContain("https://www.youtube.com/embed/null");
  });
});
