import type { Link } from "@/src/types/Link";
import type { RemixIcon } from "@/src/types/RemixIcon";

interface QuickLinksItem {
  icon: RemixIcon;
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
