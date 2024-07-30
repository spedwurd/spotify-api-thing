lost = false;

function cursorMoved(event) { // aligns custom cursors
  let x = event.clientX;
  let y = event.clientY;

  const cursorInfo = document.getElementById('cursor');
  cursorInfo.style.top = y-6 + 'px';
  cursorInfo.style.left = x-4 + 'px';

  const cursorOutlineInfo = document.getElementById('cursor_outline');
  cursorOutlineInfo.style.top = y-15 + 'px';
  cursorOutlineInfo.style.left = x-11.5 + 'px'
  cursorOutlineInfo.style.transform = `translate(${clientX}px, ${clientY}px)`;
}

document.getElementById('start-game').addEventListener('click', async () => { // starts game
    document.getElementById('cursor').style.backgroundColor = "lightblue";
    await new Promise(r => setTimeout(r, 50));
    document.getElementById('cursor').style.backgroundColor = "rgba(255, 10, 71, 0.5)"; // changes cursor color on click briefly
    try {
      document.styleSheets[0].cssRules[6].style.setProperty('content', 'counter(num)');
      lost = false;
      score = 0;
      document.getElementById('artist-two-followers').style.setProperty('--num', 0);
      document.getElementById('has_failed').innerHTML = '';
      document.getElementById('has_failed').style.border = '';
      document.getElementById('score').innerHTML = 'SCORE: ' + score;
      document.getElementById('artist-two-followers').innerHTML = "how many followers?: ";
      response = await fetch(`http://localhost:3000/artist`); // gets data
      data = await response.json();
      refreshArtists(); // presents artist data visually
    } catch (error) { 
      console.error('Error fetching artist info:', error);
    }
  });

  async function eval(a) {
    document.getElementById('cursor').style.backgroundColor = "lightblue";
    await new Promise(r => setTimeout(r, 50));
    document.getElementById('cursor').style.backgroundColor = "rgba(255, 10, 71, 0.5)"; // cursor change 

    if (data.answer == a && lost != true) { // if picked correct
      score += 1;
      const formattedFollowers = data.artist_two.followers.total.toLocaleString();
      followers_reveal = document.getElementById('artist-two-followers');
      followers_reveal.style.setProperty('--num', data.artist_two.followers.total); // number animation
      await new Promise(r => setTimeout(r, 1200));
      document.styleSheets[0].cssRules[6].style.setProperty('content', `"${formattedFollowers}"`); // formats the number
      await new Promise(r => setTimeout(r, 500));
      document.styleSheets[0].cssRules[6].style.setProperty('content', 'counter(num)');
      followers_reveal.style.setProperty('--num', 0);
      elem = document.getElementById('body');
      elem.classList.add('flashWon'); // flashes green briefly 
      elem.addEventListener('animationend', () => {
        elem.classList.remove('flashWon'); 
      })
      document.getElementById('score').innerHTML = 'SCORE: ' + score;

      response = await fetch(`http://localhost:3000/artist`); // brings new artist
      temp_data = await response.json();
      data.artist_one = data.artist_two;
      data.artist_two = temp_data.artist_one;
      data.answer = (data.artist_one.followers.total>data.artist_two.followers.total)*1 + (data.artist_two.followers.total>data.artist_one.followers.total)*0;
      refreshArtists();
    }
    else { // you lost
      let elem = document.getElementById('body');
      followers_reveal.style.setProperty('--num', data.artist_two.followers.total); // number animation
      await new Promise(r => setTimeout(r, 1200));
      const formattedFollowers = data.artist_two.followers.total.toLocaleString(); 
      document.styleSheets[0].cssRules[6].style.setProperty('content', `"${formattedFollowers}"`); // formats number
      await new Promise(r => setTimeout(r, 500));

      document.getElementById('has_failed').style.border = "3px solid black";
      document.getElementById('has_failed').innerHTML = 'oops! you lost.'
      elem.classList.add('flashLost'); // flashes red to show you lost
      elem.addEventListener('animationend', () => { 
        elem.classList.remove('flashLost');
      })
      lost = true;
    }
  }
  async function refreshArtists() { // after getting new artist data, this presents the new data 
    document.getElementById('artist-one-name').innerHTML = data.artist_one.name;
    document.getElementById('artist-two-name').innerHTML = data.artist_two.name;
    let image_one = document.getElementById('artist-one-image');
    let image_two = document.getElementById('artist-two-image');
    image_one.src = data.artist_one.images[0].url;
    image_two.src = data.artist_two.images[0].url;

    image_one.classList.add('fade'); // fade animations to make it smootherish
    image_one.addEventListener('animationend', () => {
      image_one.classList.remove('fade')
    })

    image_two.classList.add('fade');
    image_two.addEventListener('animationend', () => {
      image_two.classList.remove('fade')
    })
    document.getElementById('artist-one-followers').innerHTML = data.artist_one.followers.total.toLocaleString() + ' followers';
  }