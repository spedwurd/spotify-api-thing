# so the idea of this was to find artist ids by scraping search web results 
# but im too stupid and i spent way too much time on this + i forgot the api existed for a reason so oopsie dasiisiues
# UPDATE i got some things

import requests
from bs4 import BeautifulSoup
import json

url = "https://kworb.net/spotify/listeners.html"
response = requests.get(url, timeout=5)
html_content = response.text
content = BeautifulSoup(html_content, 'html.parser').findAll("a")

artists = {}

for artist in content:
  artists[artist.text] = artist['href'][7:29]

with open('data.json', 'w') as json_file:
  json.dump(artists, json_file)

