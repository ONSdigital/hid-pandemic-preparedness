import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

import jwt from "jsonwebtoken";
import nunjucks from "nunjucks";
import path from "path";
import querystring from "querystring";

const AWS_REGION = process.env.AWS_REGION;
const SECRET_ID = process.env.SECRET_ID;
const SEVEN_DAYS = 3600 * 24 * 7; // Seven days in seconds used for cookie expiry

// Configure nunjucks templates
nunjucks.configure(path.resolve("./templates"), { autoescape: true });

// Fetch the secret from secret manager
const client = new SecretsManagerClient({ region: AWS_REGION });

// Fetches a secret from AWS Secret Manager
async function fetchSecret(client, secret_id) {
  let smClientResponse;

  try {
    smClientResponse = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_id,
        VersionStage: "AWSCURRENT",
      }),
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  return smClientResponse.SecretString;
}

const PW_SECRET = await fetchSecret(client, SECRET_ID);
const SECRET_OBJ = JSON.parse(PW_SECRET);

// Creates the `set-cookie` string
function setCookieStr(cookieValue, maxAge) {
  return `auth_token=${cookieValue}; HttpOnly; Secure; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

// Returns `true` if cookie is valid, otherwise `false`
function validateCookie(event) {
  const headers = event.headers || {};
  // Header keys in API Gateway are case-insensitive but often lowercase
  const cookieHeader = headers.cookie || headers.Cookie || "";

  if (cookieHeader) {
    // Extract auth_token cookie value
    const match = cookieHeader.match(/auth_token=([^;]+)/);

    if (match) {
      const token = decodeURIComponent(match[1]);

      try {
        jwt.verify(token, SECRET_OBJ.ENVIRONMENT_AUTH_PASSWORD);
        return true;
      } catch (err) {
        // Will throw error if invalid or expired
      }
    }
  }

  return false;
}

export async function handler(event) {
  const method =
    event.requestContext?.http?.method || event.httpMethod || "GET";
  const queryParams = event.queryStringParameters || {};

  let isValid = false;
  let submittedPassword = "";
  let wasValidated = false;

  if (method === "POST") {
    if (event.body !== null && event.body !== undefined) {
      // Decode base64 if needed
      const bodyStr = event.isBase64Encoded
        ? Buffer.from(event.body, "base64").toString("utf8")
        : event.body;

      // Parse URL-encoded form data
      const parsedBody = querystring.parse(bodyStr);

      submittedPassword = parsedBody.password.trim() || "";

      if (submittedPassword === SECRET_OBJ.ENVIRONMENT_AUTH_PASSWORD) {
        // Generate a jwt value for auth cookie
        const cookieValue = jwt.sign({}, SECRET_OBJ.ENVIRONMENT_AUTH_PASSWORD, {
          expiresIn: SEVEN_DAYS,
        });

        return {
          statusCode: 200,
          headers: {
            "Content-Type": "text/html",
            "Set-Cookie": setCookieStr(cookieValue, SEVEN_DAYS),
          },
          body: nunjucks.render("success.html"),
        };
      }
    }
    wasValidated = true;
  }

  // Handle request to delete the cookie if querystring param is present
  const deleteCookie = queryParams["delete-cookie"];

  if (deleteCookie === "true") {
    // Reset the cookie
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "Set-Cookie": setCookieStr("", 0),
      },
      body: nunjucks.render("deleted.html", {
        isValid: isValid,
        wasValidated: wasValidated,
      }),
    };
  }

  // Check for presence of valid cookie
  const cookieValid = validateCookie(event);

  if (cookieValid) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: nunjucks.render("success.html"),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: nunjucks.render("enter-password.html", {
      isValid: isValid,
      wasValidated: wasValidated,
    }),
  };
}
