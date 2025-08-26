import "./searchBar.scss";

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
        placeholder="Search Resources..."
        aria-label="Search"
      />
      <button
        type="submit"
        className="search-bar__button"
        aria-label="Submit search"
      >
        <h4>TODO</h4>
      </button>
    </form>
  );
}

export default SearchBar;
