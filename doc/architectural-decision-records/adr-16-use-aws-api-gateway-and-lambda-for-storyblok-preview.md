# ADR-16: Use AWS API Gateway and Lambda for Storyblok preview

## Related NFRs

[content-cms-8][1], [security-4][2], [security-5][3], [sustainability-1][4], [sustainability-2][5], [sustainability-3][6]

## Rationale

The application is designed to be [deployed as a static site](./adr-7-deploy-as-a-static-site.md) and uses the [Astro web framework](./adr-11-use-the-astrojs-web-framework.md) to do this. [Storyblok has been chosen](./adr-15-use-storyblok-for-content-management.md) as the Content Management System (CMS) for the application. When content creators are uploading content using the Storyblok CMS, a preview of the site is needed within the Storyblok UI \[[1]\]. This allows users to see how the site will look when the content they are editing is rendered by the application. This preview should be able to update in real time based on the content being inputted.

The application is built as static html files stored on S3 and distributed using CloudFront. This deployment method cannot be used to facilitate the Storyblok preview as this requires client-side or server-side rendering to update application content in real time. In order to deploy the application as a server-rendered site, the application can be built using [Astro server-side rendering (SSR)](https://docs.astro.build/en/guides/on-demand-rendering/). This requires the application to be deployed as a function that can respond to requests from the user. For the CMS preview, this will be when admin users are updating content on Storyblok.

There are many different methods to deploy a SSR application of this kind. A combination of deploying the site as a [Lambda](https://aws.amazon.com/lambda/), managing static assets using [S3](https://aws.amazon.com/s3/) and [CloudFront](https://aws.amazon.com/cloudfront/) and handling requests using [API Gateway](https://aws.amazon.com/api-gateway/) was chosen. See the [cms integration spike output](../spike-outputs/cms-integration.md) for further discussion around this decision.

[1]: ../non-functional-requirements/content.md#content-cms-8
[2]: ../non-functional-requirements/security.md#security-4
[3]: ../non-functional-requirements/security.md#security-5
[4]: ../non-functional-requirements/sustainability.md#sustainability-1
[5]: ../non-functional-requirements/sustainability.md#sustainability-2
[6]: ../non-functional-requirements/sustainability.md#sustainability-3
