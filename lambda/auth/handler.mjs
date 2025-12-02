const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL || 'https://your-cloudfront-domain.example.com';
const SECRET_ARN = process.env.SECRET_ARN; // ARN of secret in Secrets Manager
const VALID_PASSWORD = process.env.VALID_PASSWORD || 'your-password';


export async function handler(event) {
  const request = event.Records[0].cf.request;

  const headers = request.headers;
  const method = request.method.toUpperCase();



  if (method === 'GET') {
    const params = querystring.parse(request.querystring || '');
    const errorMsg = params.error === '1' ? 'Invalid password, please try again.' : '';
    const html = renderLoginPage(errorMsg);

    return {
      status: '200',
      statusDescription: 'OK',
      headers: {
        'content-type': [{ key: 'Content-Type', value: 'text/html' }],
      },
      body: html,
    };
  }

  if (method === 'POST') {
    if (!request.body || request.body.encoding !== 'base64' || !request.body.data) {
      return {
        status: '400',
        statusDescription: 'Bad Request',
        headers: {
          'content-type': [{ key: 'Content-Type', value: 'text/plain' }],
        },
        body: 'Missing or invalid request body',
      };
    }

    const bodyStr = Buffer.from(request.body.data, 'base64').toString('utf8');
    const formData = querystring.parse(bodyStr);

    if (formData.password === VALID_PASSWORD) {
      const token = 'authenticated';
      const signature = signToken(token, secretKey);
      const cookieValue = `${token}|${signature}`;

      return {
        status: '302',
        statusDescription: 'Found',
        headers: {
          'set-cookie': [{
            key: 'Set-Cookie',
            value: `${TOKEN_COOKIE_NAME}=${cookieValue}; HttpOnly; Secure; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
          }],
          location: [{ key: 'Location', value: CLOUDFRONT_URL }],
        },
      };
    } else {
      return {
        status: '302',
        statusDescription: 'Found',
        headers: {
          location: [{ key: 'Location', value: '/login?error=1' }],
        },
      };
    }
  }

  return {
    status: '405',
    statusDescription: 'Method Not Allowed',
    headers: {
      allow: [{ key: 'Allow', value: 'GET, POST' }],
      'content-type': [{ key: 'Content-Type', value: 'text/plain' }],
    },
    body: 'Method Not Allowed',
  };
}