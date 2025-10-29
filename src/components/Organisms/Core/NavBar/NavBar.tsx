import type { FC } from "react";

import type { NavBarProps } from "./NavBar.interface";
import { Image } from "@components/Molecules/Core/Image/Image";

export const NavBar: FC<NavBarProps> = (props) => {
  return <Image {...props.logo} />;
};
