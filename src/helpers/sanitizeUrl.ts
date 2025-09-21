// Takes an input `baseUrl` and optional `path` to always construct a valid url with a trailing slash
export function sanitizeUrl(baseUrl: string, path?: string): string {
  // Remove any trailing slashes before building
  baseUrl = baseUrl.replace(/\/$/, "");

  // If path, append it
  if (path) {
    // Remove any leading or trailing slashes before building the url
    path = path.replace(/^\//, "");
    path = path.replace(/\/$/, "");

    return `${baseUrl}/${path}/`;
  } else {
    return `${baseUrl}/`;
  }
}
