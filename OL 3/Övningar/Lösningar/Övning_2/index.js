

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
         'X-CSCAPI-KEY': 'VFh5MGJBbjd3S1BSNVVKbVlWU1BjaTFFYmM3MjVJVzFha2JlZk40OA=='
      }
   },
   API2: {
      method: 'GET',
      headers: {
         "Content-type": "application/json; charset=UTF-8",
         'X-Api-Key': 'K+op6jSgxahEvSpE386nHQ==FpOKGk3b1IoNdmKY'
      },
   }
}

// 1
// Vi börjar med att använda API1 för att hämta alla huvudstäder i följande länder:
// Övningen ska resultera i en array med huvudstäderna, som:
// capitals = ["Stockholm", "Madrid", "Rome", "Lisbon", "Paris", ...]
// Lös det med Promise.all (och async eller chain, som du vill)
const countries = ["SE", "ES", "IT", "PT", "FR", "GR", "BE", "NL", "DK", "DE", "AT", "CH", "HU", "CZ", "SK", "RO", "BG", "PL", "FI", "HR", "RS", "BA", "ME"];

async function getCapital(country) {
   const url = "https://api.countrystatecity.in/v1/countries/" + country;
   const rqst = new Request(url, options.API1);
   const response = await fetch(rqst);
   const data = await response.json();
   return data.capital; 
}
const allCapitalsPromise = Promise.all(countries.map(getCapital));
// allCapitalsPromise.then(console.log);


// 2
// Om ni kollar på informationen om landet som man får från Countrystatecity så hittar ni
// nycklarna longitude och latitude. Det är ungefär mittpunkten i landet (tror jag).
// Hur som helst, se till att huvudstäderna i arrayen capitals är sorterade enligt stigande
// latitude (för landet), alltså de som ligger mest söderut först.
async function getCapitalWithCountryLatitude(country) {
   const url = "https://api.countrystatecity.in/v1/countries/" + country;
   const rqst = new Request(url, options.API1);
   const response = await fetch(rqst);
   const data = await response.json();
   return {name: data.capital, latitude: data.latitude};
}
const allCapitalsPromise2 = Promise.all(countries.map(getCapitalWithCountryLatitude));
allCapitalsPromise2.then(capitals => {
   // console.log("2. Sorterade enligt landets latitude, inte stadens");
   capitals = capitals.sort((a,b) => a.latitude > b.latitude ? 1 : -1).map(c => c.name);
   // console.log(capitals);
});


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
async function getCapitalsLatitude(capital) {
   const url = "https://api.api-ninjas.com/v1/city?name=" + capital;
   const rqst = new Request(url, options.API2);
   const response = await fetch(rqst);
   const data = await response.json();
   return {name: capital, latitude: data[0].latitude}
}
const allCapitalsPromise3 = Promise.all(countries.map(getCapital));
allCapitalsPromise3.then(async function (capitals) {
   const finalArray = await Promise.all(capitals.map(getCapitalsLatitude));
   // console.log("3. Sorterade enligt stadens latitude");
   // console.log(finalArray.sort((a,b) => a.latitude - b.latitude).map(c => c.name));
});


// 3B
// För någon som vill ha en utmaning:
// Skapa koden som beräknar vilken stad som hamnade mest fel i första sorteringen.
// Alltså om vi säger att andra sorteringen är korrekt, och kollar på vilken stad
// som i första sorteringen hamnade längst bort från sin korrekta placering...
// Am i making any sense?
async function compare () {
   
   // Latitude from Country
   const countryLat = await Promise.all(countries.map(getCapitalWithCountryLatitude));
   countryLat.sort((a,b) => parseFloat(a.latitude) - parseFloat(b.latitude));

   // Latitude from city
   const capitals = await Promise.all(countries.map(getCapital));
   const cityLat = await Promise.all(capitals.map(getCapitalsLatitude));
   cityLat.sort((a,b) => a.latitude - b.latitude);

   const differenceInPosition = countryLat.map((c, index) => {
      const posByCountryLat = index;
      const posByCityLat = cityLat.findIndex(c2 => c2.name === c.name);
      return {
         name: c.name,
         diffPosition: Math.abs(posByCityLat - posByCountryLat) // Math.abs = Absoluta värdet (typ tar bort minus)
      };
   });

   console.log("Mest fel hamnade: " + (differenceInPosition.sort((a,b) => b.diffPosition - a.diffPosition))[0].name);
}
compare();


 
// 4
// Med hjälp av Countrystatecity och Ninja, hämta info om vädret i varje huvudstad och 
// logga en lista över alla huvudstäder sorterade efter vilka som har mest sol
// Se bild Ö24 för inspiration.


// ALT
// Denna alternativ fungerar inte om vi vill sortera huvudstäderna efter vädret.
// Man skulle kunna lösa det med utgångspunkt i denna lösning, men det blir
// omständigt.
// countries.forEach(country => {
//    const url1 = "https://api.countrystatecity.in/v1/countries/" + country;
//    fetch(url1, options.API1)
//       .then(r => r.json())
//       .then(dataCountry => {
//          const url2 = "https://api.api-ninjas.com/v1/weather?city=" + dataCountry.capital;
//          fetch(url2, options.API2)
//             .then(r => r.json())
//             .then(dataWeather => {
//                if (dataWeather.cloud_pct < 20) {
//                   console.log(`Det är soligt (${dataWeather.cloud_pct}% moln) i ${dataCountry.capital}`);
//                }
//             })
//       });
// });



// ALT
// let capitals;  // Notera att vi behöver ha denna globala variabel för att komma 
//                // åt namnet på huvudstäderna i sista .then()
// Promise.all(countries.map(c => fetch("https://api.countrystatecity.in/v1/countries/" + c, options.API1)))
//    .then(responses => {
//       return Promise.all(responses.map(r => r.json()));
//    })
//    .then(datas => {
//       capitals = datas.map(c => c.capital);
//       return Promise.all(datas.map(c => fetch("https://api.api-ninjas.com/v1/weather?city=" + c.capital, options.API2)))
//    })
//    .then(responses => {
//       return Promise.all(responses.map(r => r.json()))
//    })
//    .then(datas => {
//       datas.sort((a,b) => a.cloud_pct - b.cloud_pct).forEach((weatherData, index) => {
//          if (weatherData.cloud_pct < 20) {
//             console.log(`Det är soligt (${weatherData.cloud_pct}% moln) i ${capitals[index]}`);
//          } else {
//             console.log(`Det är inte lika soligt (${weatherData.cloud_pct}% moln) i ${capitals[index]}`);
//          }
//       });
//    });



// ALT
async function f4Async (listOfCountries) {
   
   // GET CAPITALS for each country, using Promise.all
   const url1 = "https://api.countrystatecity.in/v1/countries/"
   const countryDetailRequests = listOfCountries.map(c => new Request(url1 + c, options.API1));
   const countryDetailsResponses = await Promise.all(countryDetailRequests.map(rq => fetch(rq)));
   const countryDetailData = await Promise.all(countryDetailsResponses.map(r => r.json()));
   const capitals = countryDetailData.map(d => d.capital);
      
   // GET WEATHER in each capital
   const url3 = "https://api.api-ninjas.com/v1/weather?city=";
   const capitalsWeatherRequests = capitals.map(c => new Request(url3 + c, options.API2));
   const capitalsWeatherReponses = await Promise.all(capitalsWeatherRequests.map(rq => fetch(rq)));
   const capitalsWeatherData = await Promise.all(capitalsWeatherReponses.map(r => r.json()));
   
   // Skapa en array av objekt där varje objekt har strukturen {name: Madrid, cloud_pct: X, population: X}
   // Så vi kan sortera enligt vädret.
   const capitalsAndWeather = capitals.map((c, index) => {return {
                                                                     name: c, 
                                                                     cloud_pct: capitalsWeatherData[index].cloud_pct,
                                                                  }});

   // Sortera och logga
   capitalsAndWeather.sort((a,b) => a.cloud_pct - b.cloud_pct).forEach(c => {
      if (c.cloud_pct < 20) {
         console.log(`Det är soligt (${c.cloud_pct}% moln) i ${c.name}`);
      } else {
         console.log(`Det är inte lika soligt (${c.cloud_pct}% moln) i ${c.name}`);
      }
   });
}
// f4Async(countries);


// Lite bättre strukturerat
async function getAllFetchData (arrayOfRequests) {
   const arrayOfResponses = await Promise.all(arrayOfRequests.map(rq => fetch(rq)));
   const arrayOfData = await Promise.all(arrayOfResponses.map(rp => rp.json()));
   return arrayOfData;
}
async function f4AsyncBetter (listOfCountries) {
   const url1 = "https://api.countrystatecity.in/v1/countries/"
   const url2 = "https://api.api-ninjas.com/v1/city?name=";
   const url3 = "https://api.api-ninjas.com/v1/weather?city=";

   const countryDetailData = await getAllFetchData (listOfCountries.map(c => new Request(url1 + c, options.API1)));
   const capitals = countryDetailData.map(c => c.capital);

   // Info om vädret
   const capitalsWeather = await getAllFetchData (capitals.map(c => new Request(url3 + c, options.API2)));

   // Sätt ihop dem så vi kan sortera enligt vädret
   const allInfo = capitals.map((c, index) => { return {
                                                name: c,
                                                cloud_pct: capitalsWeather[index].cloud_pct,
                                               }});

   // Sortera och logga
   allInfo.sort((a,b) => a.cloud_pct - b.cloud_pct).forEach(c => {
      if (c.cloud_pct < 20) {
         console.log(`Det är soligt (${c.cloud_pct}% moln) i ${c.name}`);
      } else {
         console.log(`Det är inte lika soligt (${c.cloud_pct}% moln) i ${c.name}`);
      }
   });


}
// f4AsyncBetter(countries);











// 5
// Ni ska hämta följande info om varje stad:
// - antal invånare (https://api.api-ninjas.com/v1/city?name=)
// - vädret (https://api.api-ninjas.com/v1/weather?city=)
// Och om varje stad ska ni skriva:
// Madrid: X% Moln, X invånare
// Se bild Ö2.5 för inspiration

async function f5Async (listOfCountries) {
   const url1 = "https://api.countrystatecity.in/v1/countries/"
   const url2 = "https://api.api-ninjas.com/v1/city?name=";
   const url3 = "https://api.api-ninjas.com/v1/weather?city=";

   const countryDetailData = await getAllFetchData (listOfCountries.map(c => new Request(url1 + c, options.API1)));
   const capitals = countryDetailData.map(c => c.capital);

   // Info om invånarna (och lite annat)
   const capitalsInfoRaw = await getAllFetchData (capitals.map(c => new Request(url2 + c, options.API2)));
   // Kom ihåg att det kan finnas fler än en stad med samma namn, så vi får en array av städer (med bara ett element, i dessa fall)
   const capitalsInfo = capitalsInfoRaw.map(cr => cr[0]);

   // Info om vädret
   const capitalsWeather = await getAllFetchData (capitals.map(c => new Request(url3 + c, options.API2)));

   // Sätt ihop dem så vi kan sortera enligt antal invånare
   const allInfo = capitals.map((c, index) => { return {
                                                name: c,
                                                cloud_pct: capitalsWeather[index].cloud_pct,
                                                population: capitalsInfo[index].population
                                               }});

   // Logga
   allInfo.sort((a,b) => a.population - b.population).forEach(c => {
      console.log(`${c.name}: ${c.cloud_pct}% Moln, ${c.population} invånare`);
   });


}
// f5Async(countries);
