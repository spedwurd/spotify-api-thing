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
    const token = "BQDiRtbJh0FlKZvTpX6vFj9h4xjpjKSQJBPzcDIiyQh-hoAs0zBBC1BmozMHXcGVZL5UJGRRo8FYCxlBCQ4yEgbvYH1SDiJoUriVTyD6MffvIkgg9j0";
    const artistInfo = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    artistInfo.then(data => {
      console.log(artistInfo);
    })
    return artistInfo;
  }
  catch (error) {
    console.error('ERROR NOOOOOO', error);
  }
}

async function getAccessToken() {
  try {
    const response = await axios(authOptions);
    console.log(response.data.access_token);
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
  option_a = artists[Math.floor(Math.random() * 2499)];
  option_b = artists[Math.floor(Math.random() * 2499)];
  if (option_a == option_b) {
    while (option_a == option_b) {
      option_b = artists[Math.floor(Math.random() * 2499)];
    }
   }
  console.log(getArtistInfo(option_a));
  console.log(getArtistInfo(option_b));
});

getArtistInfo("0IROOdQ2fQUcoaEPqt1Isg"); // doesnt work rn but i got the data so ill do smth next time