// chatgpt and stack overflow has ultimately become most of what i wrote here 😢

require('dotenv').config();
const axios = require('axios');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const authOptions = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: new URLSearchParams({
    grant_type: 'client_credentials'
  }).toString()
};   

async function getArtistInfo(artistId) {
  try {
    const token = await getAccessToken();
    const artistInfo = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(artistInfo);
  }
  catch (error) {
    console.error('ERROR NOOOOOO', error);
  }
}

async function getAccessToken() {
  try {
    const response = await axios(authOptions);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response);
  }
}

artistId = '0Y5tJX1MQlPlqiwlOH1tJY'; // will do something like better later

getArtistInfo(artistId);