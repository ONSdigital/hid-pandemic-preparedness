import clsx from "clsx";
import type { FC, FormEvent } from "react";
import { RiSearchLine } from "@remixicon/react";

import type { SearchBarProps } from "./SearchBar.interface";
import styles from "./SearchBar.module.scss";

export const SearchBar: FC<SearchBarProps> = (props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const searchItem = formData.get("search");
    console.log("Search submitted:", searchItem);
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <div className={clsx("input-group", "mb-3")}>
        <input
          type="search"
          className={clsx("form-control", styles["input-sizing"])}
          placeholder={props.placeholder}
          aria-label={props.placeholder}
          aria-describedby="search-button"
        />
        <button
          className={clsx("btn", "btn-secondary")}
          type="button"
          id="search-button"
        >
          <RiSearchLine />
        </button>
      </div>
    </form>
  );
};
