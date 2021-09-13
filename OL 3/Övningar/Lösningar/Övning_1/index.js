
// 1
// Skaffa dig en API-key för ninja-aPI:n
// https://api-ninjas.com/
// Det är gratis och man får nyckeln direkt.
const options = {
    method: 'GET',
    headers: {
       "Content-type": "application/json; charset=UTF-8",
       'X-Api-Key': 'K+op6jSgxahEvSpE386nHQ==FpOKGk3b1IoNdmKY' // <= där ska din nyckel gå
    },
 };


// 2
// Fetcha information om vädret i Madrid och logga den.
// Lös det på alla tre olika sätt:
// Chainade promises (flera .then efter varandra)
// Async - Await (async function)



// 3
// Cars-delen i Ninja-API är inte super bra, men vi kan göra lite saker med den.
// Hämta 30 bilar av märket Toyota från året 2010. Om du kollar på datan så ser du att 
// det finns en del repetitioner. Du ska logga alla modeller men utan att repetera dem.
// Lös det med chainade promises och med async function.

const r3 = new Request('https://api.api-ninjas.com/v1/cars?make=Toyota&year=2010&limit=30', options);

function noRepetition(cars) {
    const allCarsNoRepeat = [];
    cars.forEach(car => {
        if (!allCarsNoRepeat.some(c => c.model === car.model)) {
            allCarsNoRepeat.push(car);
        }
    });
    return allCarsNoRepeat;
}

fetch(r3)
    .then(r => r.json())
    .then(data => {
        console.log("ALT2");
        noRepetition(data).forEach(c => console.log(c.make, c.model));
    });

async function f3 () {
    const response = await fetch(r3);
    const data = await response.json();
    console.log("ALT3");
    noRepetition(data).forEach(c => console.log(c.make, c.model));
}
f3();


// 4
// Vi forstätter med bilarna.
// Nu ska ni fixa koden som i slutet kan logga:
// `Om vi snackar fwd-bilar så släppte Toyota, år 2010, ${X} bilar med manual transmission och ${Y} med automatic transmission`
// Ni behöver alltså hämta X, och Y och skriva om båda på samma console.log
// Gör detta: 
// 4.1 Genom att chaina promises
// 4.2 Med hjälp av async och await 

const r4M = new Request('https://api.api-ninjas.com/v1/cars?make=Toyota&year=2010&drive=fwd&transmission=m&limit=30', options);
const r4A = new Request('https://api.api-ninjas.com/v1/cars?make=Toyota&year=2010&drive=fwd&transmission=a&limit=30', options);

let countM, countA;
function logger(m, a) {
    console.log(`Om vi snackar fwd-bilar så släppte Toyota, år 2010, ${m} bilar med manual transmission och ${a} med automatic transmission`);
}
fetch(r4M)
    .then(r => r.json())
    .then(data => {
        countM = data.length;
        return fetch(r4A);
    })
    .then(r => r.json())
    .then(data => {
        countA = data.length;
        console.log("Övning 4.1 - Chained");
        logger(countM, countA);
    });

async function getCount(request) {
    const response = await fetch(request);
    const data = await response.json();
    return data.length;
}
async function f4() {
    const countM = await getCount(r4M);
    const countA = await getCount(r4A);
    console.log("Övning 4.2 - Async");
    logger(countM, countA);
}
f4();

