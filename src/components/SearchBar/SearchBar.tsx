import type { FC, FormEvent } from "react";
import { RiSearchLine } from "@remixicon/react";

import styles from "./SearchBar.module.scss";
import type { SearchBarProps } from "./SearchBar.interface";
import { Button } from "../Button/Button";

const SearchBar: FC<SearchBarProps> = ({ placeholder, ariaLabel }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const searchItem = formData.get("search");
    console.log("Search submitted:", searchItem);
  };

  return (
    <form
      className={styles["search-bar__form"]}
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        name="search"
        className={styles["search-bar__input"]}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      <Button ariaLabel="Submit search" type="submit" variant="search-bar">
        <RiSearchLine className={styles["button__label-icon"]} />
      </Button>
    </form>
  );
};

export default SearchBar;
