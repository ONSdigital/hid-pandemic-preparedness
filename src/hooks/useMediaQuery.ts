import { useEffect, useState } from "react";
import breakpoints from "@src/styles/global/overrides/_breakpoints.module.scss";

const breakpointMd = parseInt(breakpoints.breakpointMd);

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      return setIsMobile(window.innerWidth < breakpointMd);
    };

    checkIsMobile(); // run once on component mount

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};
