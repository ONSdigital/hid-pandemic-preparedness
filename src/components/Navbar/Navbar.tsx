import type { FC } from "react";
import { useState } from "react";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiGlobalLine,
  RiMenuLine,
  RiSearchLine,
} from "@remixicon/react";

import type { NavItem } from "../../types/NavItem";
import styles from "./Navbar.module.scss";
import type { BrandProps, NavbarProps } from "./Navbar.interface";

// eslint-disable-next-line no-unused-vars
const MegaMenu: FC<NavItem[]> = (props) => {
  return <div className={styles["mega-menu"]}>Blah</div>;
};

const NavbarItem: FC<NavItem> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggles state
  const toggleOpen = () => setIsOpen((val) => !val);

  return (
    <li className={styles["nav-item"]}>
      <a className={styles["nav-link"]} href={void 0} onClick={toggleOpen}>
        {props.label}{" "}
        {props.children &&
          (isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />)}
      </a>
      {props.children && isOpen && <MegaMenu {...props.children} />}
    </li>
  );
};

// Brand component inputted as separate component to `Navbar` via props so we can load different
// src paths depending on whether we are rendering on Storybook or Astro page. This will
// probably be updated once we figure out how to properly get Storybook to load svgs as components
// automatically
export const Brand: FC<BrandProps> = (props) => {
  return (
    <img
      className={styles["navbar-brand__image"]}
      src={props.src}
      alt="The Analysis for Action brand logo."
    />
  );
};

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
