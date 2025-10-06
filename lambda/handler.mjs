import serverless from "serverless-http";
import { handler as ssrHandler } from "./server/entry.mjs";

export const handler = async (event, context) => {
  // If your API Gateway route is ANY /proxy/{proxy+}, you might need this:
  // const basePath = event.requestContext.stage;

  // If your API Gateway is an HTTP API, the fix is simpler:

  // Log the event to see what path is being sent
  console.log("Incoming API Gateway Event:", JSON.stringify(event, null, 2));

  // API Gateway HTTP API uses routeKey $default or /{proxy+}.
  // The path to strip is often the stage name.
  const stageName = event.requestContext.stage;

  const serverlessHandler = serverless(ssrHandler, {
    // Set the base path to be stripped by serverless-http.
    // It must match your stage name to correctly map the request path to Astro's root.
    // E.g., if the browser sends /dev/about, serverless-http strips /dev,
    // and Astro sees /about.
    basePath: `/${stageName}`,
  });

  // This is the core Lambda execution point.
  return serverlessHandler(event, context);
};
