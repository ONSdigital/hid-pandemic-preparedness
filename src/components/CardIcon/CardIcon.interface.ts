import type { ReactNode } from "react";

import type { LinkData } from "../../types/LinkData";

export interface CardIconProps {
  id: string;
  icon: ReactNode;
  title: string;
  subTitle: string;
  link: LinkData;
}
