import clsx from "clsx";
import type { FC } from "react";

import type { HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";
import SearchBar from "../../SearchBar/SearchBar";

const Header: FC<HeaderProps> = (props) => {
  return <div className={clsx("w-100", styles["header-bg"])}>Hello</div>;
};

export default Header;
