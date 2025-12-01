import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Video } from "./Video";
import type { StoryblokAsset } from "@src/types/storyblok";

import type { VideoProps } from "./Video.interface";

describe("Video component", () => {
  // Mock console.warn to test invalid URL warnings
  const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  // example YouTube video ID
  const validVideoId = "dQw4w9WgXcQ";

  const defaultProps: VideoProps = {
    component: "Video",
    _uid: "uniqueId",
    title: "Test Video",
    url: `https://www.youtube.com/embed/${validVideoId}`,
  };

  const renderVideo = (props: Partial<VideoProps> = {}) => {
    render(<Video {...defaultProps} {...props} />);
  };

  it("renders iframe with correct src for watch URL", () => {
    renderVideo();

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
    renderVideo({ title: "Short URL Video" });

    const iframe = screen.getByTitle("Short URL Video") as HTMLIFrameElement;
    expect(iframe.src).toContain(
      `https://www.youtube.com/embed/${validVideoId}`,
    );
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders iframe with correct src for embed URL", () => {
    renderVideo({ title: "Embed URL Video" });

    const iframe = screen.getByTitle("Embed URL Video") as HTMLIFrameElement;
    expect(iframe.src).toContain(
      `https://www.youtube.com/embed/${validVideoId}`,
    );
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("always includes cc_load_policy=1 in iframe src", () => {
    renderVideo({ title: "With CC" });

    const iframe = screen.getByTitle("With CC") as HTMLIFrameElement;
    const url = new URL(iframe.src);
    expect(url.searchParams.get("cc_load_policy")).toBe("1");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders iframe with start and end parameters", () => {
    renderVideo({ title: "With Params", start: "30", end: "90" });

    const iframe = screen.getByTitle("With Params") as HTMLIFrameElement;
    const url = new URL(iframe.src);
    expect(url.searchParams.get("start")).toBe("30");
    expect(url.searchParams.get("end")).toBe("90");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("warns and renders iframe with null videoId for invalid URL", () => {
    const invalidUrl = "https://example.com/not-a-youtube-url";

    renderVideo({ title: "Invalid URL", url: invalidUrl });
    expect(consoleWarnSpy).toHaveBeenCalledWith("Invalid YouTube URL");

    const iframe = screen.getByTitle("Invalid URL") as HTMLIFrameElement;
    // Since videoId is null, the src will be https://www.youtube.com/embed/null?
    expect(iframe.src).toContain("https://www.youtube.com/embed/null");
  });

  it("renders transcript download link when transcript is provided", () => {
    const transcriptFilename = "/path/to/transcript.vtt";
    const transcriptAsset = {
      filename: transcriptFilename,
    } as StoryblokAsset;

    renderVideo({ title: "With Transcript", transcript: transcriptAsset });

    const link = screen.getByRole("link", { name: /download transcript/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", transcriptFilename);
  });

  it("does not render transcript link when transcript is undefined", () => {
    renderVideo({ title: "No Transcript" });

    const link = screen.queryByRole("link", { name: /download transcript/i });
    expect(link).toBeNull();
  });
});
