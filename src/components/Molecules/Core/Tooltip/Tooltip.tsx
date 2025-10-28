import { useEffect, useRef, useState, type FC } from "react";
import { renderToString } from "react-dom/server";

import type { TooltipProps } from "./Tooltip.interface";
import Popover from "@styles/bootstrap-5.3.8/js/src/popover";

import { useClickOutside } from "@/src/hooks/useClickOutside";

import styles from "./Tooltip.module.scss";

export const Tooltip: FC<TooltipProps> = (props) => {
  const triggerRef = useRef(null);
  const tooltipInstance = useRef<Popover | null>(null);

  const [visible, setVisible] = useState(false);

  // Create tooltip instance on page load
  useEffect(() => {
    tooltipInstance.current = new Popover(triggerRef.current, {
      content: renderToString(props.content),
      html: true,
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

    // Remove tooltip on unmount (so it doesn't persist)
    return () => {
      tooltipInstance.current?.dispose();
    };
  }, []);

  // Control tooltip content visibility
  useEffect(() => {
    if (!tooltipInstance.current) return;

    if (visible) {
      tooltipInstance.current.show();
    } else {
      tooltipInstance.current.hide();
    }
  }, [visible]);

  // Dismiss tooltip content when user clicks away
  useClickOutside(triggerRef, (event) => {
    if (!tooltipInstance.current) return;

    const tooltipContent = tooltipInstance.current.tip;

    // Clicks inside content ignored
    if (tooltipContent && tooltipContent.contains(event.target as Node)) return;

    // Clicks outside content close it
    setVisible(false);
  });

  const toggleTooltipVisibility = () => {
    setVisible((previous) => !previous);
  };

  return (
    <>
      <button
        className={styles["tooltip-trigger"]}
        onClick={toggleTooltipVisibility}
        ref={triggerRef}
      >
        {props.triggerText}
      </button>
    </>
  );
};
