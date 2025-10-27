import { useEffect, useRef, useState, type FC } from "react";

import type { PopoverProps } from "./Popover.interface";
import Popover from "@styles/bootstrap-5.3.8/js/src/popover";

import { useClickOutside } from "@/src/hooks/useClickOutside";

import styles from "./Popover.module.scss";

export const PopoverComponent: FC<PopoverProps> = (props) => {
  const popoverTriggerRef = useRef(null);
  const popoverInstance = useRef<Popover | null>(null);

  const [visible, setVisible] = useState(false);

  // Create popover instance on page load
  useEffect(() => {
    popoverInstance.current = new Popover(popoverTriggerRef.current, {
      content: props.contentText,
      placement: "top",
      trigger: "manual",
      popperConfig: {
        modifiers: [
          {
            name: "flip",
            enabled: false, // when large, retain placement (i.e. 'top')
          },
          {
            name: "offset",
            options: {
              offset: [0, 16], // [left/right, vertical gap]
            },
          },
        ],
      },
    });
    // Remove popover on unmount (so it doesn't persist)
    return () => {
      popoverInstance.current?.dispose();
    };
  }, []);

  // Control popover content visibility
  useEffect(() => {
    if (!popoverInstance.current) return;

    if (visible) {
      popoverInstance.current.show();
    } else {
      popoverInstance.current.hide();
    }
  }, [visible]);

  // Dismiss popover content when user clicks away
  useClickOutside(popoverTriggerRef, (event) => {
    if (!popoverInstance.current) return;

    const popoverContent = popoverInstance.current.tip;

    // Clicks inside content ignored
    if (popoverContent && popoverContent.contains(event.target as Node)) return;

    // Clicks outside content close it
    setVisible(false);
  });

  const togglePopoverVisibility = () => {
    setVisible((previous) => !previous);
  };

  return (
    <button
      className={styles["popover-trigger"]}
      onClick={togglePopoverVisibility}
      ref={popoverTriggerRef}
    >
      {props.triggerText}
    </button>
  );
};
