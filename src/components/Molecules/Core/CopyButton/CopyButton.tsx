import { RiFileCopyLine, RiCheckLine } from "@remixicon/react";
import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import type { CopyButtonProps } from "./CopyButton.interface";
import { copyToClipboard } from "./copyToClipboard";
import buttonText from "@content/copyButtonText.json";
import clsx from "clsx";
import styles from "./CopyButton.module.scss";

export const CopyButton: FC<CopyButtonProps> = (props: CopyButtonProps) => {
  const timeoutRef = useRef<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    const element = props.contentElement?.current;

    if (!element) {
      console.error("No element selected to copy text from.");
      return;
    }

    const isCopyToClipboardSuccessful = await copyToClipboard(element);

    if (isCopyToClipboardSuccessful) {
      setIsCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
        timeoutRef.current = null;
      }, 2000);
    }
  };

  // Clean up timeout if the component is unmounted
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      className={clsx(
        "border-0",
        "bg-transparent",
        styles["copy-button-color"],
        props.className,
      )}
      onClick={handleClick}
    >
      {isCopied ? (
        <>
          <RiCheckLine /> {buttonText.copiedText}
        </>
      ) : (
        <>
          <RiFileCopyLine /> {buttonText.text}
        </>
      )}
    </button>
  );
};
