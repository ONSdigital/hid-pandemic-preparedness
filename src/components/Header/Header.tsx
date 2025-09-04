import type { FC } from "react";

import type { HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

const Header: FC<HeaderProps> = ({
  children,
  description,
  heading,
  subheading,
}) => {
  return (
    <header>
      <div className={styles["header-content"]}>
        <h2 className="body">{subheading}</h2>
        <h1 className="heading-xl">{heading}</h1>
        <p className="heading-s">{description}</p>
        {children}
      </div>
    </header>
  );
};

export default Header;
