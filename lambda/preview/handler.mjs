import serverless from "serverless-http";
import { handler as ssrHandler } from "./server/entry.mjs";

// The entry.mjs exports the core request handler function.
// serverless-http converts this Node request handler into a Lambda event handler.
const transformedHandler = serverless(ssrHandler);

// Export the function Lambda will invoke.
export const handler = (event, context) => {
  return transformedHandler(event, context);
};
