import type { Link } from "@localTypes/Link";
import type { RemixIcon } from "@/src/types/RemixIcon";

interface QuickLinksItem extends Link {
  icon: RemixIcon;
  type: string;
  component: string;
}

export interface QuickLinksProps {
  title: string;
  subTitle: string;
  links: QuickLinksItem[];
}
