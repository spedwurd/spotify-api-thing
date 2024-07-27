document.getElementById('start-game').addEventListener('click', async () => { 
    try {
      var response = await fetch(`http://localhost:3000/artist`);
      var score = 0;
      const data = await response.json();
      document.getElementById('score').innerHTML = 'SCORE: ' + score;
      document.getElementById('artist-one-name').innerHTML = data.artist_one.name;
      document.getElementById('artist-two-name').innerHTML = data.artist_two.name;
      document.getElementById('artist-one-image').src = data.artist_one.images[0].url;
      document.getElementById('artist-two-image').src = data.artist_two.images[0].url;
      document.getElementById('artist-one-followers').innerHTML = data.artist_one.followers.total;
      document.getElementById('artist-two-followers').innerHTML = "hmm what is it";
      document.getElementById('answer').innerHTML = data.answer;
    } catch (error) {
      console.error('Error fetching artist info:', error);
      document.getElementById('artist-one-follows').innerText = 'Failed to fetch artist info';
      
    }
  });
