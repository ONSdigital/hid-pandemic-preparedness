// handler.mjs (in your project root)

// serverless-http requires a CommonJS export to wrap the HTTP server,
// so we need to ensure the entrypoint is imported correctly.
// Astro's entry.mjs exports the server handler as `handler`.

import serverless from "serverless-http";
import { handler as ssrHandler } from "./server/entry.mjs";

// serverless-http takes the request handler and turns it into a Lambda handler.
// Note: serverless-http expects the handler to be the actual request listener
// function which the Astro adapter provides.

// We export the wrapped handler function
export const handler = serverless(ssrHandler, {
  // This setting tells serverless-http where your static files are served from,
  // to correctly route requests. Use 'dist/client' if your assets are not on a CDN.
  // binaryMimeTypes: [...] // May be needed for file uploads, if applicable
});
