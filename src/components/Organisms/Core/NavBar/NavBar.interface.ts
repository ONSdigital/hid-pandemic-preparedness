import type { Asset } from "@localTypes/Asset";
import type { Link } from "@localTypes/Link";
import type { StoryblokRichTextNode } from "@storyblok/astro";

export interface NavBarProps {
  logo: Asset;
  navItems: NavItem[];
  navLinks: Link[];
}

export interface NavItem {
  _uid: string;
  label: string;
  NavColumn: NavColumn[]; //TODO potentially change this to 'NavMenuColumn'
  onClick?: () => any;
  openId?: string | null;
  overview: StoryblokRichTextNode;
}

interface NavColumn {
  _uid: string;
  title: string;
  NavLink: Link[];
}
