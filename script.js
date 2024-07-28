lost = false;

document.getElementById('start-game').addEventListener('click', async () => { 
    try {
      lost = false;
      document.getElementById('has_failed').innerHTML = '';
      response = await fetch(`http://localhost:3000/artist`);
      score = 0;
      data = await response.json();
      skibidi();
      document.getElementById('score').innerHTML = 'SCORE: ' + score;
      document.getElementById('artist-two-followers').innerHTML = "how many followers?";

    } catch (error) {
      console.error('Error fetching artist info:', error);
    }
  });

  async function eval(a) {
    if (data.answer == a && lost != true) {
      score += 1;
      document.getElementById('score').innerHTML = 'SCORE: ' + score;
      console.log('correct!');
      response = await fetch(`http://localhost:3000/artist`);
      temp_data = await response.json();
      data.artist_one = data.artist_two;
      data.artist_two = temp_data.artist_one;
      data.answer = (data.artist_one.followers.total>data.artist_two.followers.total)*1 + (data.artist_two.followers.total>data.artist_one.followers.total)*0;
      skibidi();
    }
    else {
      document.getElementById('has_failed').innerHTML = 'oops! you lost.'
      document.getElementById('artist-two-followers').innerHTML = data.artist_two.followers.total.toLocaleString() + ' followers';
      lost = true;
    }
  }
  async function skibidi() {
    document.getElementById('artist-one-name').innerHTML = data.artist_one.name;
    document.getElementById('artist-two-name').innerHTML = data.artist_two.name;
    document.getElementById('artist-one-image').src = data.artist_one.images[0].url;
    document.getElementById('artist-two-image').src = data.artist_two.images[0].url;
    document.getElementById('artist-one-followers').innerHTML = data.artist_one.followers.total.toLocaleString() + ' followers';
    document.getElementById('artist-two-followers').innerHTML = 'how many followers?';
  }