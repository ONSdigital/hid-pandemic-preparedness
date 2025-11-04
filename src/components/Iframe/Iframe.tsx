import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import type { IframeProps } from "./Iframe.interface";

export const Iframe: FC<IframeProps> = (props) => {
  const [iframeHeight, setIframeHeight] = useState(
    props.defaultHeight ?? "150px",
  );
  const [iframeSrc, setIframeSrc] = useState("");
  const iframeRef = useRef(null);
  const allowedOrigin = new URL(props.src).origin;
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
    setIframeSrc(props.src);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={clsx("container-lg", "py-4")}>
      <strong>Height: {iframeHeight}</strong> - Open iframe in a new tab:{" "}
      <a href={iframeSrc} target="_blank">
        {iframeSrc}
      </a>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title="Welcome"
        width="100%"
        height={iframeHeight}
        className={clsx("mt-4")}
      />
    </div>
  );
};
