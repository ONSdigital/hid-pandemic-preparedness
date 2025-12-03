// Set to false by default. Update this value to `true` when deployed to enable auth
const AUTH_ENABLED = false;
// Set to empty string for security. Update this value to the correct key when deployed.
const SECRET_KEY = ""

/*
Applies cookie based authentication if `AUTH_ENABLED` is `true`, and appends index.html to request
uri so astro static site folder structure can be used for navigation
*/
async function handler(event) {
  const request = event.request;
  const uri = request.uri;

  if (AUTH_ENABLED) {
    var cookieHeader = request.headers.cookie && request.headers.cookie.value;

    if (!cookieHeader) {
      return redirectToAuth();
    }

    const match = cookieHeader.match(/auth_token=([^;]+)/);
    if (!match) {
      return redirectToAuth();
    }

    const token = decodeURIComponent(match[1]);

    // Parse token format: expiry=...&sig=...
    const parts = {};
    token.split("&").forEach((pair) => {
      const [k, v] = pair.split("=");
      parts[k] = v;
    });

    if (!parts.expiry || !parts.sig) {
      return redirectToAuth();
    }

    const now = Math.floor(Date.now() / 1000);
    if (now > Number(parts.expiry)) {
      return redirectToAuth();
    }

    // Recompute HMAC-SHA256 of "expiry=..."
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SECRET_KEY);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const msgData = encoder.encode(`expiry=${parts.expiry}`);
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      msgData,
    );
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const expectedSig = signatureArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (parts.sig !== expectedSig) {
      return redirectToAuth();
    }
  }

  // Check whether the URI is missing a file name.
  if (uri.endsWith("/")) {
    request.uri += "index.html";
  }
  // Check whether the URI is missing a file extension.
  else if (!uri.includes(".")) {
    request.uri += "/index.html";
  }

  return request;
}

// Redirects to auth site
function redirectToAuth() {
  return {
    statusCode: 302,
    statusDescription: "Found",
    headers: {
      location: { value: "https://auth.analysisforaction.org" },
    },
  };
}
