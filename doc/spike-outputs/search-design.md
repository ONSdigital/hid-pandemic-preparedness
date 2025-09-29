# Search design

This is the output of the [ONSPPT-266](https://anddigitaltransformation.atlassian.net/browse/ONSPPT-266) spike ticket to investigate how we would implement search across the site and include a recommended design.

There is a need for the application to provide search across the site. The questions this spike aims to answer are:

- What search functionality is required?
- What implementation options are available based on the architectural decisions taken so far?
- What is the recommended search implementation?

## What search functionality is required?

[Search non-functional requirements (NFRs)](../non-functional-requirements/search.md) have been written to capture the high-level search functionality the application requires. In summary, the search implementation should:

- Comprehensively index all content types (text, videos, interactive tools, code) and support multilingual content, ensuring scalability and frequent updates to reflect content changes
- Provide a fast, accurate, and user-friendly search experience, including keyword search
- Align with overall performance and usability goals, ensuring responsiveness and accessibility across all supported languages and conditions

Content structure and user needs when searching are not yet fully defined, so any search implementation should be extensible to ensure it meets future needs.

## What implementation options are available?

The application technical architecture leads us to consider a number of implementations based on design descisions already made, particularly [using a headless CMS](../architectural-decision-records/adr-6-use-a-headless-cms.md), [deploying the application as a static site](../architectural-decision-records/adr-7-deploy-as-a-static-site.md) and [using the Astro web framework](../architectural-decision-records/adr-11-use-the-astrojs-web-framework.md).

The simplest implementation would be to use the headless CMS API to query the content using a search term inputted by the user. The response of this API call could then be used to construct search results.
