var fs = require('fs');

require('dotenv').config();
const axios = require('axios');
const { get } = require('http');

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
    const x = artistInfo.data;
//    console.log(x);
    return x;
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
fs.readFile('data.json', 'utf8', async (err, data) => {
  if (err) {
      console.error(err);
      return;
  }
  try {
  var artists = JSON.parse(data);
  let option_a = artists[Math.floor(Math.random() * 2499)];
  let option_b = artists[Math.floor(Math.random() * 2499)];
  if (option_a == option_b) {
    while (option_a == option_b) {
      option_b = artists[Math.floor(Math.random() * 2499)];
    }
   }
  const a = await getArtistInfo(option_a);
  const b = await getArtistInfo(option_b);
  const higher = (a.followers.total>b.followers.total)*0 + (b.followers.total>a.followers.total)*1;

  } catch (error) {
    console.error('error', error.message);
  }

});

/*
lol no clue why i cant do html stuff now but im kinda stupid so its prob smth
console.log('hi');
document.getElementById('artist-one-follows').innerHTML = 'hi';
*/