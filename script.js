var fs = require('fs');

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

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
      console.error(err);
      return;
  }

  var artists = JSON.parse(data);
  console.log(artists)
});

getArtistInfo(); // doesnt work rn but i got the data so ill do smth next time