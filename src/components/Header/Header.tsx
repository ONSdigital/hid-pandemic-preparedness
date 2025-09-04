import type { FC } from "react";

import type { HeaderProps } from "./Header.interface";
import "./Header.scss";
import SearchBar from "../SearchBar/SearchBar";

const Header: FC<HeaderProps> = ({ subheading, heading, description }) => {
  return (
    <header>
      <div className="header-content">
        <h2 className="body">{subheading}</h2>
        <h1 className="heading-xl">{heading}</h1>
        <p className="heading-s">{description}</p>
        <SearchBar placeholder="TODO" ariaLabel="search" />
      </div>
    </header>
  );
};

export default Header;
