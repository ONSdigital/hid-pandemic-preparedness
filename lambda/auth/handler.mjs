import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

import nunjucks from 'nunjucks';
import path from 'path';
import querystring from "querystring"

const AWS_REGION = process.env.AWS_REGION;
const SECRET_ID = process.env.SECRET_ID;

// Configure nunjucks templates
nunjucks.configure(path.resolve('./templates'), { autoescape: true });

// Fetch the secret from secret manager
const client = new SecretsManagerClient({region: AWS_REGION});

let smClientResponse;

try {
  smClientResponse = await client.send(
    new GetSecretValueCommand({
      SecretId: SECRET_ID,
      VersionStage: "AWSCURRENT",
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

const PW_SECRET = smClientResponse.SecretString;

export async function handler(event) {
  const method = event.requestContext?.http?.method || event.httpMethod || 'GET';

  let isValid = false;
  let secretObj = JSON.parse(PW_SECRET)
  let submittedPassword = ""
  let wasValidated = false;

  if (method === 'POST') {
    if (event.body !== null && event.body !== undefined) {
      // Decode base64 if needed
      const bodyStr = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf8')
        : event.body;

      // Parse URL-encoded form data
      const parsedBody = querystring.parse(bodyStr);

      submittedPassword = parsedBody.password.trim() || '';

      if (submittedPassword === secretObj.ENVIRONMENT_AUTH_PASSWORD) {
        isValid = true;
      }
    }
    wasValidated = true;
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: nunjucks.render('login.html', {isValid: isValid, wasValidated: wasValidated}),
  };
}