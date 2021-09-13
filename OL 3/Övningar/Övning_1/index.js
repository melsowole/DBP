
// 1
// Skaffa dig en API-key för ninja-aPI:n
// https://api-ninjas.com/
// Det är gratis och man får nyckeln direkt.
const options = {
    method: 'GET',
    headers: {
       "Content-type": "application/json; charset=UTF-8",
       'X-Api-Key': 'MWB/A/bxTe28urjv+vzZ1g==7bOIsZj0EQLOjdQh' // <= där ska din nyckel gå
    },
 };


 // 2
// Fetcha information om vädret i Madrid och logga den.
// Lös det på alla tre olika sätt:
// Chainade promises (flera .then efter varandra)
// Async - Await (async function)

 
 function getWeatherInMadridChain(){
   let request = new Request( "https://api.api-ninjas.com/v1/weather?city=madrid", options );
   fetch( request )
      .then(response => response.json())
      .then(console.log)
}

// getWeatherInMadridChain()

async function getWeatherInMadridAsync(){
   let request = new Request( "https://api.api-ninjas.com/v1/weather?city=madrid", options );
   let response =  await fetch(request)
   let data = await response.json();

   return data
}

// getWeatherInMadridAsync()
//    .then( d => console.log(d))



// 3
// Cars-delen i Ninja-API är inte super bra, men vi kan göra lite saker med den.
// Hämta 30 bilar av märket Toyota från året 2010. Om du kollar på datan så ser du att 
// det finns en del repetitioner. Du ska logga alla modeller men utan att repetera dem.
// Lös det med chainade promises och med async function.

function getCarsChain(){
   let request = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&limit=30", options);

   fetch(request)
      .then( r => r.json())
      .then( d => {
         console.log( [...new Set( d.map( m => m.model) )] )
      })
}

// getCarsChain()

async function getCarsAsync(){
   let request = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&limit=30", options);
   let response = await fetch(request);
   let data = await response.json()

   return data
}

// getCarsAsync()
//    .then( d => console.log( [...new Set( d.map( c => c.model ) )] ))
// ;



// 4
// Vi forstätter med bilarna.
// Nu ska ni fixa koden som i slutet kan logga:
// `Om vi snackar fwd-bilar så släppte Toyota, år 2010, ${X} bilar med manual transmission och ${Y} med automatic transmission`
// Ni behöver alltså hämta X, och Y och skriva om båda på samma console.log
// Gör detta: 
// 4.1 Genom att chaina promises
// 4.2 Med hjälp av async och await 

function sentenceChain(){
   let rTransMan = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&transmission=m&limit=30", options);
   let rTransAuto = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&limit=30&transmission=a", options);

   fetch(rTransMan)
      .then( r => r.json() )
      .then( d => {
         let transMan = d.length;
         fetch(rTransAuto)
         .then( r => r.json())
         .then( d => {
               let transAuto = d.length;

               console.log( `Om vi snackar fwd-bilar så släppte Toyota, år 2010, ${transMan} bilar med manual transmission och ${transAuto} med automatic transmission` )
            } )
      })

}
// sentenceChain()

function sentencePAll(){
   let rTransMan = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&transmission=m&limit=30", options);
   let rTransAuto = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&limit=30&transmission=a", options);

   Promise.all([fetch(rTransMan), fetch(rTransAuto)])
      .then( responses => Promise.all( responses.map(resp => resp.json()) ) )
      .then(d => {
         console.log( `Om vi snackar fwd-bilar så släppte Toyota, år 2010, ${d[0].length} bilar med manual transmission och ${d[1].length} med automatic transmission` )
      })
}

// sentencePAll()


async function sentenceAsync(){
   let rTransMan = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&transmission=m&limit=30", options);
   let rTransAuto = new Request("https://api.api-ninjas.com/v1/cars?make=toyota&year=2010&limit=30&transmission=a", options);

   let manResp = await fetch(rTransMan);
   let autoResp = await fetch(rTransAuto);

   let manData = await manResp.json();
   let autoData = await autoResp.json()
 
   return manData, autoData
}  

// sentenceAsync()
//    .then( d => {
//       return console.log(d)
//    })



