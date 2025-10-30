import type { Link } from "@/src/types/Link";
import * as RemixIcons from "@remixicon/react";

interface QuickLinksItem {
  icon: keyof typeof RemixIcons;
  link: Link;
  _uid: string;
  type: string;
  component: string;
}

export interface QuickLinksProps {
  title: string;
  subTitle: string;
  links: QuickLinksItem[];
}
