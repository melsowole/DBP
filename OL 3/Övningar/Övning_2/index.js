

/*

Nu ska vi använda två olika API:er för att visa lite info

Dessa är API:erna som ska användas:
API1: https://countrystatecity.in/docs/api/cities-by-country
API2: https://api-ninjas.com/api/city

Ni ska redan ha en nyckel till Ninjas och förhoppningsvis ha hunnit få en till Countrystatecity.
*/

// FÖRBEREDELSER
const options = {
   API1: {
      method: "GET",
      redirect: 'follow',
      headers: {
         "Content-type": "application/json; charset=UTF-8",
         'X-CSCAPI-KEY': 'UVVuOUFhMHVORDdVZWl3MWR4bURYR3NpNXhWYkNRUHB2TVptcnU3MA=='
      }
   },
   API2: {
      method: 'GET',
      headers: {
         "Content-type": "application/json; charset=UTF-8",
         'X-Api-Key': 'MWB/A/bxTe28urjv+vzZ1g==7bOIsZj0EQLOjdQh'
      },
   }
}

// En array med en massa länder
const countries = ["SE", "ES", "IT", "PT", "FR", "GR", "BE", "NL", "DK", "DE", "AT", "CH", "HU", "CZ", "SK", "RO", "BG", "PL", "FI", "HR", "RS", "BA", "ME"];



// 1
// Vi börjar med att använda API1 för att hämta alla huvudstäder i länderna ovan.
// Övningen ska resultera i en array med huvudstäderna, som:
// capitals = ["Stockholm", "Madrid", "Rome", "Lisbon", "Paris", ...]
// Lös det med Promise.all (och async eller chain, som du vill)

async function getCapitals(){
   let capitals = [];
   let countriesObj = [];

   let requests = []
   countries.forEach(c => {
      requests.push( fetch(new Request(`https://api.countrystatecity.in/v1/countries/${c}`, options.API1)) )
   });

   let response = await Promise.all( requests );
   let data = await Promise.all( response.map( r => r.json() ) );
   
   data.forEach( country => {
      capitals.push(country.capital)
      countriesObj.push(country)
   } )
   
   // console.log(capitals)

   return countriesObj
}

// 2
// Om ni kollar på informationen om landet som man får från Countrystatecity så hittar ni
// nycklarna longitude och latitude. Det är ungefär mittpunkten i landet (tror jag).
// Hur som helst, se till att huvudstäderna i arrayen capitals är sorterade enligt stigande
// latitude (för landet), alltså de som ligger mest söderut först.

async function sortLat(){
   let countries = await  getCapitals();
   countries = countries.sort( (x, y ) => x.latitude > y.latitude ? 1 :-1)

   countries.forEach( country => {
      console.log( country.capital, country.latitude )
   } )

   return countries
}

// sortLat()



// 3
// Men riktig info om stadens latitude hittar vi i Ninja-API:n
// Så nu ska vi använda oss av den för att hämta den riktiga latitude
// så vi kan sortera ordentligt.
// Vi ska alltså i slutet ha en array av huvudstäder där varje element är
// {
//    name: Madrid,
//    latitude: X
// }
// OBS: Kom ihåg att ninja-city returnerar en array av städer som har namnet
// vi söker. Det finns ju några städer som har samma namn som andra.
// Vi utgår från att vi får bara ett element i arrayen, som kan nås med data[0].

async function newSortLat(){
   let countries = await sortLat();

   
}






// 3B
// För någon som vill ha en utmaning:
// Skapa koden som beräknar vilken stad som hamnade mest fel i första sorteringen.
// Alltså om vi säger att andra sorteringen är korrekt, och kollar på vilken stad
// som i första sorteringen hamnade längst bort från sin korrekta placering...
// Am i making any sense?






 
// 4
// Med hjälp av Countrystatecity och Ninja, hämta info om vädret i varje huvudstad och 
// logga en lista över alla huvudstäder sorterade efter vilka som har mest sol
// Se bild Ö24 för inspiration.









// 5
// Ni ska hämta följande info om varje stad:
// - antal invånare (https://api.api-ninjas.com/v1/city?name=)
// - vädret (https://api.api-ninjas.com/v1/weather?city=)
// Och om varje stad ska ni skriva:
// Madrid: X% Moln, X invånare
// Se bild Ö2.5 för inspiration

