import { RiFileCopyLine, RiCheckLine } from "@remixicon/react";
import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import type { CopyButtonProps } from "./CopyButton.interface";
import { copyToClipboard } from "./copyToClipboard";
import buttonText from "@content/copyButtonText.json";
import styles from "./CopyButton.module.scss";
import { Button } from "@/src/components/Button/Button";

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
    <Button
      ariaLabel="Copy to clipboard"
      type="button"
      variant="link"
      onClick={() => handleClick()}
      className={props.className}
    >
      {isCopied ? (
        <>
          <RiCheckLine className={styles["btn-label-icon"]} />
          {buttonText.copiedText}
        </>
      ) : (
        <>
          <RiFileCopyLine className={styles["btn-label-icon"]} />
          {buttonText.text}
        </>
      )}
    </Button>
  );
};
