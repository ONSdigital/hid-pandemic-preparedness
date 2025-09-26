# ADR-6: Use a headless CMS

## Related NFRs

[content-1][1], [usability-1][2], [usability-2][3]

## Rationale

The application needs a method for non-technical users to upload content \[[1]\], and this could include interactive content such as quizzes and code examples. This led to an initial consideration of using a Content Management System (CMS) or a Learning Management System (LMS). An LMS is basically a CMS extended for web-based learning use cases and would include user logins and tracking for course completion and tailoring content. Further investigation found that the tracking of course completion was not required \[[2]\], and additionally there should be no need for a user to log in to the application to view content \[[3]\], ensuring the content is accessible as possible. This led to the decision of including a CMS rather than an LMS.

A headless CMS was chosen in place of a traditional CMS for the following reasons:

- Decouples the frontend and backend, so we can develop both separately
- Allows us to experiment with content structure before the CMS is set up
- Can be provided as a Software-as-a-Service (SaaS) which simplifies deployment and hosting

[1]: ../non-functional-requirements/content.md#content-1
[2]: ../non-functional-requirements/usability.md#usability-1
[3]: ../non-functional-requirements/usability.md#usability-2
