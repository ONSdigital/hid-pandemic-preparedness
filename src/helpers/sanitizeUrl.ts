// Takes an input `baseUrl` and optional `path` to always construct a valid url with a trailing slash
export function sanitizeUrl(baseUrl: string, path?: string): string {
  let absoluteUrl = null;
  let origin = null;

  // See whether we have an absolute url by trying to construct URL object
  try {
    absoluteUrl = new URL(baseUrl);
  } catch {
    // Not absolute url so just ignore
  }

  if (absoluteUrl) {
    origin = absoluteUrl.origin;
  } else {
    // Remove any trailing slashes
    origin = baseUrl.replace(/\/$/, "");
    // Prepend with slash if appropriate to construct relative url
    if (!origin.startsWith("/")) {
      origin = `/${origin}`;
    }
  }

  // If path, append it
  if (path) {
    // Remove any leading or trailing slashes before building the url
    path = path.replace(/^\//, "");
    path = path.replace(/\/$/, "");

    return `${origin}/${path}/`;
  } else {
    return `${origin}/`;
  }
}
