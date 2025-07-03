# Architectural Decision Records

This page lists the Architectural Decision Records (ADRs) that have defined the architecture and implementation of the application. The table below provides a high-level list of the application ADRs and their related non-functional requirements (NFRs). Further discussion is given in each section, including references to related NFRs.

| Id    | Title              | Related NFRs                |
| ----- | ------------------ | --------------------------- |
| ADR-1 | Use a headless CMS | content-1, users-1, users-2 |

## ADR-1: Use a headless CMS

The application needs a method for non-technical users to upload content \[content-1\], and this could include interactive content such as quizzes and code examples. This led to an initial consideration of using a Content Management System (CMS) or a Learning Management System (LMS). An LMS is basically a CMS extended for web-based learning use cases and would include user logins and tracking for course completion and tailoring content. Further investigation found that the tracking of course completion was not required \[users-1\], and additionally there should be no need for a user to log in to the application to view content \[users-2\], ensuring the content is accessible as possible. This led to the decision of including a CMS rather than an LMS.

A headless CMS was chosen in place of a traditional CMS for the following reasons:

- Decouples the frontend and backend, so we can develop both separately
- Allows us to experiment with content structure before the CMS is set up
- Can be provided as a Software-as-a-Service (SaaS) which simplifies deployment and hosting

## ADR-2: Deploy as a static site

## ADR-3: Use the Next.js web framework

## ADR-4: Use typescript
