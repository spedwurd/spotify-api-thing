var fs = require('fs');

require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const { get } = require('http');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const port = process.env.PORT;
const url = process.env.URL;

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
    /*
    const response = await axios(authOptions);
    console.log(response.data.access_token);
    return response.data.access_token;
    */
    return 'BQBVzQQ2ssSQtz2IUcVu-NYKSlbIp7fPriaK45yrxa7PrxFZlSyrOh6twC752t6tpxTlrNnBmp2BeJyOMDIXYZk7WOtV6llUA6xbFLS-0l6u7aBGrWM';
  } catch (error) {
    console.error('Error fetching access token:', error.response);
  }
}
fs.readFile('assets/data.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    artists = JSON.parse(data);
  });


async function getResults() {
  try {
    var option_a = artists[Math.floor(Math.random() * 2499)], option_b = artists[Math.floor(Math.random() * 2499)];
    while (option_a == option_b) {
      option_b = artists[Math.floor(Math.random() * 2499)];
    }
    var a = await getArtistInfo(option_a), b = await getArtistInfo(option_b);
    var higher = (b.followers.total>a.followers.total)*0 + (a.followers.total>b.followers.total)*1;
    return [a, b, higher];
  }
  catch (error) {
    console.error('ERRORRRR', error);
  }
}

// god bless stack overflow for this shit idk wtf express is doing rn 😭
const cors = require('cors');
app.use(cors({
  origin: url
}));

app.get('/artist/', async (req, res) => {
  info = await getResults();
  res.json({'message': 'it worked!', 'artist_one': info[0], 'artist_two': info[1], 'answer': info[2]});
});

app.get('/artist/continue', async (req, res) => {
  info = await getResults();
  res.json({'message': 'it worked!', 'new_artist': info[0]});
})

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});