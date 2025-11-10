import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Video } from "./Video";
import type { Asset } from "@localTypes/Asset";

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

  it("always includes cc_load_policy=1 in iframe src", () => {
    render(
      <Video
        url={`https://www.youtube.com/watch?v=${validVideoId}`}
        title="With CC"
      />,
    );
    const iframe = screen.getByTitle("With CC") as HTMLIFrameElement;
    const url = new URL(iframe.src);
    expect(url.searchParams.get("cc_load_policy")).toBe("1");
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

  it("renders transcript download link when transcript is provided", () => {
    const transcriptFilename = "/path/to/transcript.vtt";
    const transcriptAsset = {
      filename: transcriptFilename,
    } as Asset;

    render(
      <Video
        url={`https://youtu.be/${validVideoId}`}
        title="With Transcript"
        transcript={transcriptAsset}
      />,
    );
    const link = screen.getByRole("link", { name: /download transcript/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", transcriptFilename);
  });

  it("does not render transcript link when transcript is undefined", () => {
    render(
      <Video url={`https://youtu.be/${validVideoId}`} title="No Transcript" />,
    );
    const link = screen.queryByRole("link", { name: /download transcript/i });
    expect(link).toBeNull();
  });
});
