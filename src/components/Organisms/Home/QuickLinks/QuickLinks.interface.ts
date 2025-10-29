import type { Link } from "@/src/types/Link";
import * as RemixIcons from "@remixicon/react";

interface QuickLinksItem {
  icon: keyof typeof RemixIcons;
  link: Link;
}

export interface QuickLinksProps {
  title: string;
  subTitle: string;
  links: QuickLinksItem[];
}
