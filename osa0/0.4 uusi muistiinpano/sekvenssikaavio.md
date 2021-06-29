# 0.4 Sekvennsikaavio

```
title 0.4 Sekvenssikaavio

selain->palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/notes

note over palvelin:
palvelin vastaa HTTP POST pyyntöön
302 statuskoodilla, joka kehottaa palvelinta
tekemään automaattisesti uuden HTTP GET
pyynnön osoitteeseen notes.
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
palvelin-->selain: HTML koodi
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
palvelin-->selain: main.js

note over selain:
selain suorittaa js koodin
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
palvelin-->selain: [{content: "Testing", date: "2021-06-29T07:25:01.298Z"}, ...]

note over selain:
muistiinpanot renderöityvät näytölle
kun selain suorittaa tapahtumankäsittelijän
end note
```