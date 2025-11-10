import clsx from "clsx";
import type { FC } from "react";

import type { VideoProps } from "./Video.interface";

export const Video: FC<VideoProps> = (props) => {
  function extractYouTubeVideoId(url: string) {
    // Regular Expression to match common YouTube URL patterns:
    // 1. Standard watch URL: v=XXXXXXXXXXX
    // 2. Shortened youtu.be URL: youtu.be/XXXXXXXXXXX
    // 3. Embed URL: /embed/XXXXXXXXXXX
    // 4. Mobile URL: /watch?v=XXXXXXXXXXX
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Use the videoId to build a valid embed URL incase a user
  // uses an incorrect URL type in the CMS
  const videoId = extractYouTubeVideoId(props.url);
  if (!videoId) console.warn("Invalid YouTube URL");

  const params = new URLSearchParams();
  params.set("cc_load_policy", "1");
  if (props.start) params.set("start", `${props.start}`);
  if (props.end) params.set("end", `${props.end}`);

  return (
    <div className={clsx("ratio", "ratio-16x9")}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title={props.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};
