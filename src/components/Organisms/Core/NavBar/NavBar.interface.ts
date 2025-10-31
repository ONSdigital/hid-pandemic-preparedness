import type { Asset } from "@localTypes/Asset";
import type { Link } from "@/src/types/Link";
import type { StoryblokRichTextNode } from "@storyblok/astro";

export interface NavBarProps {
  logo: Asset;
  navItems: NavItem[];
  navLinks: NavLink[];
}

interface NavLink {
  _uid: string;
  link: Link;
}

interface NavItem {
  _uid: string;
  label: string;
  overview: StoryblokRichTextNode;
  NavColumn: NavColumn[]; //TODO potentially change this to 'NavMenuColumn'
}

interface NavColumn {
  _uid: string;
  title: string;
  NavLink: NavLink[];
}
