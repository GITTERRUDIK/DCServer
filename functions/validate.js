exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { serverUrl, serverPass } = JSON.parse(event.body);
    
    // Mock database of valid credentials (in production, use a real database)
    const validCredentials = [
      { url: 'https://server-abc12345.netlify.app', pass: 'NJs6%' },
      { url: 'https://server-xyz67890.netlify.app', pass: 'Kj9#m' }
    ];

    const isValid = validCredentials.some(
      cred => cred.url === serverUrl && cred.pass === serverPass
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: isValid })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request' })
    };
  }
};
