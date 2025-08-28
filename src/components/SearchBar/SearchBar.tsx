import "./searchBar.scss";
import { Button } from "../Button/Button";

function SearchBar() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        placeholder="Search all learning resources"
        aria-label="Search"
      />
      <button
        aria-label="Submit search"
        className="search-bar__button"
        type="submit"
      ></button>
    </form>
  );
}

export default SearchBar;
