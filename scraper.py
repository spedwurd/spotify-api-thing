# so the idea of this was to find artist ids by scraping search web results 
# but im too stupid and i spent way too much time on this + i forgot the api existed for a reason so oopsie dasiisiues

import requests
from bs4 import BeautifulSoup

url = "https://open.spotify.com/search/taylorswift/artists"
response = requests.get(url, timeout=5)
html_content = response.text
content = BeautifulSoup(html_content)

results = BeautifulSoup.findAll("div", {"role": "button"})

print(results)
print(html_content)