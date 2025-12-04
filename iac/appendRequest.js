import crypto from "crypto";

// Set to false by default. Update this value to `true` when deployed to enable auth
var AUTH_ENABLED = false;
var AUTH_URL = "https://auth.analysisforaction.org";
// Set to empty string for security. Update this value to the correct key when deployed.
var SECRET_KEY = "";
var SCHEME = "https";

// Function from https://github.com/aws-samples/amazon-cloudfront-functions/blob/main/kvs-jwt-verify/verify-jwt.js
function jwt_decode(token, key, noVerify, algorithm) {
  // check token
  if (!token) {
    throw new Error("No token supplied");
  }
  // check segments
  const segments = token.split(".");
  if (segments.length !== 3) {
    throw new Error("Not enough or too many segments");
  }

  // All segment should be base64
  const headerSeg = segments[0];
  const payloadSeg = segments[1];
  const signatureSeg = segments[2];

  // base64 decode and parse JSON
  const payload = JSON.parse(_base64urlDecode(payloadSeg));

  if (!noVerify) {
    const signingMethod = "sha256";
    const signingType = "hmac";

    // Verify signature. `sign` will return base64 string.
    const signingInput = [headerSeg, payloadSeg].join(".");

    if (!_verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
      throw new Error("Signature verification failed");
    }

    // Support for nbf and exp claims.
    // According to the RFC, they should be in seconds.
    if (payload.nbf && Date.now() < payload.nbf * 1000) {
      throw new Error("Token not yet active");
    }

    if (payload.exp && Date.now() > payload.exp * 1000) {
      throw new Error("Token expired");
    }
  }

  return payload;
}

//Function to ensure a constant time comparison to prevent
//timing side channels.
function _constantTimeEquals(a, b) {
  if (a.length != b.length) {
    return false;
  }

  let xor = 0;
  for (let i = 0; i < a.length; i++) {
    xor |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return 0 === xor;
}

function _verify(input, key, method, type, signature) {
  if (type === "hmac") {
    return _constantTimeEquals(signature, _sign(input, key, method));
  } else {
    throw new Error("Algorithm type not recognized");
  }
}

function _sign(input, key, method) {
  return crypto.createHmac(method, key).update(input).digest("base64url");
}

function _base64urlDecode(str) {
  return Buffer.from(str, "base64url");
}

// Builds absolute url using request e.g. 'https://www.analysisforaction.org/kljasdas/asdasd'
function buildRefererUrl(request) {
  var host = request.headers.host && request.headers.host.value;
  var uri = request.uri;
  var querystring = request.querystring;

  // Construct full URL
  var refererUrl = SCHEME + "://" + host + uri;
  if (querystring) {
    refererUrl += "?" + querystring;
  }

  return refererUrl;
}

/*
Applies cookie based authentication if `AUTH_ENABLED` is `true`, and appends index.html to request
uri so astro static site folder structure can be used for navigation
*/
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (AUTH_ENABLED) {
    var cookieHeader = request.headers.cookie && request.headers.cookie.value;

    if (cookieHeader) {
      // Extract auth_token cookie value
      var match = cookieHeader.match(/auth_token=([^;]+)/);

      if (match) {
        var jwtToken = decodeURIComponent(match[1]);

        try {
          jwt_decode(jwtToken, SECRET_KEY);
        } catch (err) {
          // Will throw error if invalid or expired so redirect to auth
          var refererUrl = buildRefererUrl(request);
          return {
            statusCode: 302,
            statusDescription: "Found",
            headers: {
              location: { value: `${AUTH_URL}?referer=${refererUrl}` },
            },
          };
        }
      }
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
