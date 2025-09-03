import type { FC, FormEvent } from "react";
import { RiSearchLine } from "@remixicon/react";

import "./SearchBar.scss";
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
    <form className="search-bar__form" role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        className="search-bar__input"
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      <Button ariaLabel="Submit search" type="submit" variant="search-bar">
        <RiSearchLine className="button__label-icon" />
      </Button>
    </form>
  );
};

export default SearchBar;
