# Basic search design

This is the output of the [ONSPPT-298](https://anddigitaltransformation.atlassian.net/browse/ONSPPT-298) spike ticket to design how a basic search should be implemented.

We have already designed [how the site should be indexed](./search-design.md) using [pagefind](../architectural-decision-records/adr-14-use-pagefind-for-search.md). This spike includes how a basic search should be implemented using this index.

A basic search will be provided as part of the homepage header and navbar. An image of the existing placeholder implementation is given below.

![Screenshot of the application Search Bar component in use.](../images/search-bar.png)

It is expected that users will use this basic search to quickly find content pages they are interested in. The basic search should extend the existing placeholder [SearchBar](https://github.com/ONSdigital/hid-pandemic-preparedness/tree/main/src/components/Molecules/SearchBar) and [SearchResults](https://github.com/ONSdigital/hid-pandemic-preparedness/tree/main/src/components/Molecules/SearchResults) React components that already exist.

## SearchBar design requirements

The [SearchBar](https://github.com/ONSdigital/hid-pandemic-preparedness/tree/main/src/components/Molecules/SearchBar) React component should be updated to query the pagefind api and perform a search according to the requirements below.

- The search bar should include a text input field where users can type their search query
- The input should be accessible using the [search aria role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role)
- Search should trigger on every change (onChange event) as the user types but may need to be [debounced](https://developer.mozilla.org/en-US/docs/Glossary/Debounce) to avoid excessive search api requests
- The term submitted for search via the api should match content page names and associated tags in the index

## SearchResults design requirements

The [SearchResults](https://github.com/ONSdigital/hid-pandemic-preparedness/tree/main/src/components/Molecules/SearchResults) React component should be updated to show search results to the user according to the requirements below.

- Each result item should be rendered as per the existing placeholder implementation and should include:
  - Page Title: Displayed as a clickable link navigating to the page
  - Page Summary: A short description of the page content
  - Page Tags: Display tags related to the page using the existing site `Tag` component
- When no matching results are returned from the api, a user-friendly message (e.g., "No pages found for 'search term'") should be displayed
- A loading indicator should be included if testing shows that the search api response is slow
- The search list does not need to paginate results, but it should be scrollable so all results can be viewed without the dropdown getting too large and obscuring the rest of the page
- Results should be ordered by relevance or whatever the default ordering is provided by the search api
- The result list should include a message stating how many results have been returned (e.g. "2 results found")
