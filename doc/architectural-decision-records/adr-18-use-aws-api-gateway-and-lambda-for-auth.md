# ADR-18: Use AWS API Gateway and Lambda for authentication

## Related NFRs

## Rationale

The application is designed to be [deployed as a static site](./adr-7-deploy-as-a-static-site.md) and uses the [Astro web framework](./adr-11-use-the-astrojs-web-framework.md) to do this. The project environments are deployed either as CloudFront distributions or as a [Lambda using API Gateway](./architectural-decision-records/adr-16-use-aws-api-gateway-and-lambda-for-storyblok-preview.md).

This approach is fine for when the project is live, but does mean that when in development project environments are available on the public internet. There is a need to provide a simple authentication solution to ensure only project stakeholders can view development project environments.

As Astro is primarily designed to output a web application as a static site, there is no built in way to provide a simple authentication layer within Astro. Therefore a different mechanism is needed.

A combination of providing a small authentication application as a [Lambda](https://aws.amazon.com/lambda/) and handling requests using [API Gateway](https://aws.amazon.com/api-gateway/) was chosen. The Lambda function is responsible for validating user credentials and setting HTTP cookies upon successful login. This approach uses cookie-based authentication to maintain user sessions across requests. An existing CloudFront Function running as part of the CloudFront distributions has been updated to inspect incoming requests, verify the presence and validity of these authentication cookies, and enforce access control by allowing or redirecting requests accordingly. This ensures all application environments deployed as static sites, distributed by CloudFront and on the same domain can be secured using a single authentication cookie.
