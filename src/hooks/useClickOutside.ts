import type { RefObject } from "react";
import { useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: (event: MouseEvent) => void, // eslint-disable-line no-unused-vars
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
};
