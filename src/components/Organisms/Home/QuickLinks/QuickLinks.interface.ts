import type { LinkComponent } from "@/src/types/LinkComponent";
import type { RemixIcon } from "@/src/types/RemixIcon";

interface QuickLinksItem extends LinkComponent {
  icon: RemixIcon;
}

export interface QuickLinksProps {
  title: string;
  subTitle: string;
  links: QuickLinksItem[];
}
