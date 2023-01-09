# REST-Api-G - Det här är ett projekt för inlämningsuppgiften REST-API vid Medieinstitutet

## Det här projektet skapar, läser, ändrar och tar bort användare ur en JSON-fil via requests i REST-filen till server.js där mina kallade endpoints ligger.


Krav för godkänt: Samtliga punkter är uppfyllda.
1. Det finns åtminstone 4 endpoints.
2. Samtliga endpoints nås via en REST-klient.
3. All data är sparad i en JSON-fil (Simulerad server)
4. Datan i JSON-filen uppdateras (CRUD)
5. APIét svarar med 404 om datan saknas.
6. Git & Github har använts.
7. Projektmappen innehåller en README
8. Uppgiften är inlämnad i tid. 

### Hur är projektet byggt?

Projektet är byggt med node.js och express paketet. Nodemon är installerat och för att sätta igång servern behöver vi skriva npm start. Om det mot förmodan
inte fungerar kan man skriva npm i först för att ominstallera paketet och sen trycka npm start.

### Funktionaliteten

I server.js finner man alla funktioner.
Samtliga endpoints användar sig av fs.readFile/writeFile för att kunna ta emot och skriva till vår JSON-server.

I post-funktionen läser vi in(parsar) JSON-servern i variabeln user. I variabeln newUser har vi req.body för att komma åt datan som kommer med anropet i REST-filen.
Om det inte går att läsa in newUser utlöses ett 404 error och funktionen slutar köras. Finns newUser kollar vi om user ID är lika långt som user.


