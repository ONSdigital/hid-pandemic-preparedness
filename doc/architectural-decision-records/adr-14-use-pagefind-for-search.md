# ADR-14: Use Pagefind for search

## Related NFRs

[search-1][1], [search-3][2], [search-4][3], [search-5][4], [search-6][5], [search-7][6], [search-8][7], [search-9][8]

## Rationale

The application needs some search functionality that allows users to search all types of content including text, videos, interactive tools and example code \[[1]\]. It must support multiple languages \[[3]\], meet performance requirements \[[4]\] and offer a good experience to users in "low-bandwidth" environments \[[6]\]. Search results must be accurate \[[5]\] and reflect the content as closely as possible \[[8]\].

The [Pagefind](https://pagefind.app/) static search library is chosen for the application search. This option is simple to set up and will provide search functionality required whilst still allowing the application to meet requirements around availability, performance and privacy. See the [search design spike output](../spike-outputs/search-design.md) for further discussion around this decision.

At the time of project initiation, [Pagefind v1.4.0](https://github.com/Pagefind/pagefind/releases/tag/v1.4.0) is the latest stable version available.

The minor version of this Pagefind version will be incremented during development as and when new versions are available. See the [package.json](../../package.json) file for the current version used.

[1]: ../non-functional-requirements/search.md#search-1
[2]: ../non-functional-requirements/search.md#search-3
[3]: ../non-functional-requirements/search.md#search-4
[4]: ../non-functional-requirements/search.md#search-5
[5]: ../non-functional-requirements/search.md#search-6
[6]: ../non-functional-requirements/search.md#search-7
[7]: ../non-functional-requirements/search.md#search-8
[8]: ../non-functional-requirements/search.md#search-9
