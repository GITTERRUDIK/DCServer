exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { serverUrl, serverPass } = JSON.parse(event.body);
    const validCredentials = [
      { url: 'https://server-abc12345.netlify.app', pass: 'NJs6%' },
      { url: 'https://server-xyz67890.netlify.app', pass: 'Kj9#m' }
    ];
    const isValid = validCredentials.some(
      cred => cred.url === serverUrl && cred.pass === serverPass
    );
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ valid: isValid })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid request' })
    };
  }
};
