lost = false;

function formatNumber() {
  const f = document.getElementById('artist-two-followers');
  const numValue = getComputedStyle(f).getPropertyValue('--num').trim();
  const formattedNum = Number(numValue).toLocaleString();
  f.content = counter(formattedNumber);
}

function cursorMoved(event) {
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

document.getElementById('start-game').addEventListener('click', async () => { 
    try {
      document.getElementById('artist-two-followers').style.setProperty('--num', 0);
      lost = false;
      document.getElementById('has_failed').innerHTML = '';
      document.getElementById('has_failed').style.border = '';
      response = await fetch(`http://localhost:3000/artist`);
      score = 0;
      data = await response.json();
      skibidi();
      document.getElementById('score').innerHTML = 'SCORE: ' + score;
      document.getElementById('artist-two-followers').innerHTML = "how many followers?: ";

    } catch (error) {
      console.error('Error fetching artist info:', error);
    }
  });

  async function eval(a) {
    if (data.answer == a && lost != true) {
      score += 1;
      document.getElementById('score').innerHTML = 'SCORE: ' + score;
      followers_reveal = document.getElementById('artist-two-followers');
      followers_reveal.style.setProperty('--num', data.artist_two.followers.total);
      await new Promise(r => setTimeout(r, 1500));
      document.getElementById('artist-two-followers').addEventListener('transitionend', formatNumber);
      await new Promise(r => setTimeout(r, 1500));

      followers_reveal.style.setProperty('--num', 0);
      console.log('correct!');
      response = await fetch(`http://localhost:3000/artist`);
      temp_data = await response.json();
      data.artist_one = data.artist_two;
      data.artist_two = temp_data.artist_one;
      data.answer = (data.artist_one.followers.total>data.artist_two.followers.total)*1 + (data.artist_two.followers.total>data.artist_one.followers.total)*0;
      skibidi();
    }
    else {
      let elem = document.getElementById('body');
      elem.classList.add('flash');
      elem.addEventListener('animationend', () => {
        elem.classList.remove('flash');
      })
      
      document.getElementById('has_failed').style.border = "3px solid black";
      document.getElementById('has_failed').innerHTML = 'oops! you lost.'
      document.getElementById('artist-two-followers').style.setProperty('--num', data.artist_two.followers.total);
      await new Promise(r => setTimeout(r, 1500));
      lost = true;
    }
  }
  async function skibidi() {
    document.getElementById('artist-one-name').innerHTML = data.artist_one.name;
    document.getElementById('artist-two-name').innerHTML = data.artist_two.name;
    let image_one = document.getElementById('artist-one-image');
    let image_two= document.getElementById('artist-two-image');
    image_one.src = data.artist_one.images[0].url;
    image_two.src = data.artist_two.images[0].url;

    image_one.classList.add('fade');
    image_one.addEventListener('animationend', () => {
      image_one.classList.remove('fade')
    })

    image_two.classList.add('fade');
    image_two.addEventListener('animationend', () => {
      image_two.classList.remove('fade')
    })
    document.getElementById('artist-one-followers').innerHTML = data.artist_one.followers.total.toLocaleString() + ' followers';
  }