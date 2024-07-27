document.getElementById('artist-one-button').addEventListener('click', async () => { 
    try {
      const response = await fetch(`http://localhost:3000/api/artist/`);
      const data = await response.json();
      document.getElementById('artist-one-follows').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error fetching artist info:', error);
      document.getElementById('artist-one-follows').innerText = 'Failed to fetch artist info';
    }
  });