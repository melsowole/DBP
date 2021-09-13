/*
TYPER AV FÖRFRÅGNINGAR på internet (http protokollet)
*/

/* ===========
       GET
   ===========

GET-förfrågningar ska endast användas när man vill hämta information från servern, och innehållet
i servern kommer inte att ändras.
De flesta öppna API:er accepterar endast GET-förfrågningar. Folk vill ju inte att utomstådende
ska ha möjlighet att ändra på innehållet i servern eller så.

I JS kan (och brukar) en GET-request skapas som vi har tidigare sätt:*/

const rqst1 = new Request("https://randomuser.me/api/");
fetch (rqst1);

fetch("https://randomuser.me/api/"); // Detta fungerar också, fetch skapar förfrågan automatiskt åt oss.

/*
Om att skicka data till servern med en GET-förfrågan.

Det går att skicka data till servern med en GET-förfrågan. Det görs med hjälp av sk. GET-parameters, som
skrivs på ett särskilt sätt efter URL:et.*/

const rqst2 = new Request("https://randomuser.me/api/?results=50");
//                                                  ===========

/*
GET-parameterarna skrivs genom att placera ett ? efter URL:et och sedan skriva:
parameterName=parameterValue

Skulle vi ha fler än ett parameter:
URL?parameterName1=parameterValue1&parameterName2=parameterValue2
Vi separerar de alltså med en &

OBS: Alla values som skickas kommer att läsas som en sträng. Därför behöver vi inte
placera några citationstecken runt värden.*/
const rqst3 = new Request("https://randomuser.me/api/?results=50&gender=female");
//                                                                     ======
//                                                                     Inga citationstecken


// Man kan dock skicka ett helt objekt (eller array) som man JSON-stringifyar den först
const oInit = {
    name: "Jimi",
    annat: "Koolast"
}
const oJSON = JSON.stringify(oInit);
const rqst4 = new Request("someURL?object=" + oJSON); // Concatenation
const rqst5 = new Request(`someURL?object=${oJSON}`); // Literals

/*
OBS OBS
Det går med andra ord att skicka nästan vilken info som helst till servern via
en GET-request. Men glöm inte att man INTE ska använda en GET-request om man vill
ändra på innehållet i servern (databasen)
*/

