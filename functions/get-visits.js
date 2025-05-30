const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const universeId = event.queryStringParameters.universeId;
  
  if (!universeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing universeId' }),
    };
  }

  const url = `https://games.roblox.com/v1/games?universeIds=${universeId}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const visits = data?.data?.[0]?.visits || 0;

    return {
      statusCode: 200,
      body: JSON.stringify({ visits }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from Roblox API', details: error.message }),
    };
  }
};
