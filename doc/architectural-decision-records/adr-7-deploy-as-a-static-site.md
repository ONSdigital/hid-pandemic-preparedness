# ADR-7: Deploy as a static site

## Related NFRs

[availability-1][1], [availability-2][2], [availability-3][3], [security-4][4], [security-6][5], [security-9][6], [performance-1][7], [performance-2][8]

## Rationale

The application needs to be available across multiple regions worldwide \[[1]\], and also discoverable \[[2]\]. It should provide both fast loading times \[[7]\] and also provide a good user experience in low bandwidth environments \[[8]\]. Downloadable content should be made available to facilitate the use of the application where an internet connection is not available \[[3]\]. To meet these needs, the application will be provided as a [static site](https://en.wikipedia.org/wiki/Static_web_page). This technology was chosen for the following reasons:

- The use of pre-built HTML files provide fast load times and low latency
- Site files can be hosted simply using a Content Delivery Network (CDN), providing availability worldwide
- As there is no backend or database, a static site is more secure as the attack surface is smaller
- Using a CDN to host the site ensures effective scalability depending on site traffic
- Site files are pre-rendered. This ensures content is Search Engine Optimised (SEO)
- The site is easier to maintain as there is reduced complexity and no server-side processing required

[1]: ../non-functional-requirements/availability.md#availability-1
[2]: ../non-functional-requirements/availability.md#availability-2
[3]: ../non-functional-requirements/availability.md#availability-3
[4]: ../non-functional-requirements/security.md#security-4
[5]: ../non-functional-requirements/security.md#security-6
[6]: ../non-functional-requirements/security.md#security-9
[7]: ../non-functional-requirements/performance.md#performance-1
[8]: ../non-functional-requirements/performance.md#performance-2
