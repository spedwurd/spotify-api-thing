document.getElementById('artist-one-follows').innerHTML = 'hi';

// const clientId = process.env.CLIENT_ID (import from json now)
// const clientSecret = process.env.CLIENT_SECRET; (import from json now)

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
    const token = "BQBBk2qm99kJA_ooy4QhB7pRWTtTPN_i1iU5SFMp-GOiG-h9yIFACGxvs7CEbR4yfHue0Rtg0BhRS5CvHJS5hi5yB_mtPehePhTtwLFfdEKwjxhRbFs";
    /*
    CHANGE TO FETCH()
    const artistInfo = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    */
    const x = artistInfo.data;
    return x;
  }
  catch (error) {
    console.error('ERROR NOOOOOO', error);
  }
}

async function getAccessToken() {
  try {
    /*
    CHANGE TO FETCH
    const response = await axios(authOptions);
    */
    console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response);
  }
}
/*
CHANGE FILE READING THING SHIT
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
*/

console.log('man what the sigma is going on')