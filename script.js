document.getElementById('artist-one-button').addEventListener('click', async () => { 
    try {
      var response = await fetch(`http://localhost:3000/artist`);
      const data = await response.json();
      document.getElementById('artist-one-follows').innerHTML = data.artist_one.followers.total;
      document.getElementById('artist-two-follows').innerHTML = data.artist_two.followers.total;
      document.getElementById('answer').innerHTML = data.total;
    } catch (error) {
      console.error('Error fetching artist info:', error);
      document.getElementById('artist-one-follows').innerText = 'Failed to fetch artist info';
      
    }
  });
