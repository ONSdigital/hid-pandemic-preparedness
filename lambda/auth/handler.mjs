import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

import crypto from "crypto";
import nunjucks from "nunjucks";
import path from "path";
import querystring from "querystring";

const AWS_REGION = process.env.AWS_REGION;
const SECRET_ID = process.env.SECRET_ID;
const THREE_DAYS = 3600 * 24 * 3; // Three days in seconds used for cookie expiry

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

// Generates a token that expires in 3 days
function generateToken(secret_key) {
  const expiry = Math.floor(Date.now() / 1000) + THREE_DAYS;
  const data = `expiry=${expiry}`;
  const signature = crypto
    .createHmac("sha256", secret_key)
    .update(data)
    .digest("hex");
  return `${data}&sig=${signature}`;
}

const PW_SECRET = await fetchSecret(client, SECRET_ID);

export async function handler(event) {
  const method =
    event.requestContext?.http?.method || event.httpMethod || "GET";

  let isValid = false;
  let secretObj = JSON.parse(PW_SECRET);
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

      if (submittedPassword === secretObj.ENVIRONMENT_AUTH_PASSWORD) {
        // Generate a value for auth cookie
        const cookieValue = generateToken(secretObj.ENVIRONMENT_AUTH_PASSWORD);
        // Set-Cookie header value with attributes
        const setCookie = `auth_token=${cookieValue}; HttpOnly; Secure; Path=/; Max-Age=${THREE_DAYS}; SameSite=Lax`;

        return {
          statusCode: 200,
          headers: {
            "Content-Type": "text/html",
            "Set-Cookie": setCookie,
          },
          body: nunjucks.render("success.html"),
        };
      }
    }
    wasValidated = true;
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: nunjucks.render("login.html", {
      isValid: isValid,
      wasValidated: wasValidated,
    }),
  };
}
