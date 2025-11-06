import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import type { IframeProps } from "./Iframe.interface";

export const Iframe: FC<IframeProps> = (props) => {
  const defaultHeight = props.defaultHeight
    ? `${props.defaultHeight}px`
    : "150px";
  const [iframeHeight, setIframeHeight] = useState(defaultHeight);
  const [iframeSrc, setIframeSrc] = useState("");
  const iframeRef = useRef(null);
  const allowedOrigin = new URL(props.source.url).origin;

  // Allows for iframe not passing height entirely accurately
  const buffer = 40;

  function handleMessage(event: MessageEvent) {
    if (event.origin !== allowedOrigin) return;
    if (event.data?.type !== "iframeHeight") return;

    const newHeight = event.data.height;

    if (typeof newHeight === "number") {
      setIframeHeight(`${newHeight + buffer}px`);
    }
  }

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    // Sets the iframe src after page loads to ensure iframe
    // content isn't loaded before event handler is set up
    setIframeSrc(props.source.url);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={clsx("container-lg", "pt-4")}>
      <p>
        Open iframe in a new tab:{" "}
        <a href={props.source.url} target="_blank">
          {props.source.url}
        </a>
      </p>
      {iframeSrc === "" ? (
        <p>iFrame loading...</p>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={props.title}
            width="100%"
            height={iframeHeight}
            className={clsx("mt-2")}
          />
        </>
      )}
    </div>
  );
};
