import type { Asset } from "@localTypes/Asset";
import type { Link } from "@/src/types/Link";
import type { StoryblokRichTextNode } from "@storyblok/astro";

interface NavColumn {
  _uid: string;
  title: string;
  NavLink: NavLink[];
}

interface NavLink {
  _uid: string;
  link: Link;
}

interface NavItem {
  _uid: string;
  label: string;
  overview: StoryblokRichTextNode;
  NavColumn: NavColumn[];
}

export interface NavBarProps {
  logo: Asset;
  navItems: NavItem[];
  navLinks: NavLink[];
}
