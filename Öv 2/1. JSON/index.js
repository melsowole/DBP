/*

JSON: JavaScript Object Notation är ett format som låter oss skicka information:
- till andra program som inte är skrivna i samma språk
- över internet

Grundtanken är att en data struktur (objekt, array, etc) översätts till en sträng, som
skickas över internet och översätts till något annar språk (eller samma).

I denna kurs:

Klient  =====>  Internet =====> Server
======                          ======

JS              sträng          PHP
Objekt (exvis)  sträng          Associative array


JSON erbjuder ett sätt att formattera datastrukturer som alla språk kan översätta från.


Varje programmeringsspråk har sitt sätt att översätta en datastruktur till och från JSON.
I JS finns det ett objekt som heter JSON, med två metoder:
- stringify (översätter till JSON, dvs, skapar en string av en datastruktur)
- parse (översätter från JSON, dvs, skapar en datastruktur av en sträng)

*/



const oInit = {
    name: "Jimi Hendrix",
    instrument: "Guitarr",
    born: 1943
};

// const oJSON = JSON.stringify(oInit);
// const oParsed = JSON.parse(oJSON);
// console.log(oJSON);
// console.log(oInit);
// console.log(oParsed);





/* 
ANTECKNING 1: by reference, kloning med JSON.

oInit och oParsed ovan är båda objekt med samma innehåll men de pekar INTE på samma objekt.
Kom ihåg assignment by reference: */

const o1 = { name: "MPP" };
const o2 = o1;
o2.name = "Jimi";

console.log(o1.name); // "Jimi", förväntat
console.log(o2.name); // "Jimi", kanske inte lika förväntat

// MEN
const o1JSON = JSON.stringify(o1);
const o1Parse = JSON.parse(o1JSON);


o1.name = "Janis"; // Byter tillbaka
console.log(o1.name); // Janis
console.log(o1Parse.name); // Jimi, o1 och o3 är "kloner": samma innehåll men pekar inte på samma objekt.





/*
ANTECKNING 2: Vad händer med metoderna i ett objekt som vi JSON-stringifyar? 
              Svar: De försvinner.
JSON behåller endast nycklar som inte innehåller funktioner.
JSON används för att översätta data, inte funktioner.
*/

const mInit = {
    name: "Janis",
    halsa: function () { console.log("Hej!"); }
}
const mJSON = JSON.stringify(mInit);
const mParsed = JSON.parse(mJSON);

console.log("ANTECKNING 2: METODER");
console.log(mInit);
console.log(mJSON);
console.log(mParsed);
console.log(mParsed.halsa); // undefined



/*
ANTECKNING 3: Vi kommer inte att använda JSON.parse() så mycket
              eftersom metoden .json() i responsen gör det åt oss.
*/

console.log("ANTECKNING 3: json()-metoden");
fetch(new Request("https://randomuser.me/api/?results=50"))
    .then(response => response.json())
    .then(data => console.log(data))

// data kommer till oss som ett objekt, vi behövde inte parsa JSON-strängen
// som servern skickade till oss.



