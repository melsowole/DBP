const options = {
   method: 'GET',
   headers: {
      "Content-type": "application/json; charset=UTF-8",
      'X-Api-Key': 'K+op6jSgxahEvSpE386nHQ==FpOKGk3b1IoNdmKY'
   },
};


const r1 = new Request('https://api.api-ninjas.com/v1/city?name=Madrid', options);
const r2 = new Request('https://api.api-ninjas.com/v1/city?name=Rome', options);



// fetch(r1)
//    .then(response => response.json())
//    .then(data => console.log(data))
// fetch(r2)
//    .then(response => response.json())
//    .then(data => console.log(data))



async function getCityInfo(city) {
   const rqst = new Request('https://api.api-ninjas.com/v1/city?name=' + city, options);
   const response = await fetch(rqst);
   const data = await response.json();
   return data;
}


// const stadInfoPromise = getCityInfo("Madrid");
// stadInfoPromise.then(argument => console.log(argument));

getCityInfo("Madrid")
   .then(argument => console.log(argument))
   .catch()



// async function test () {
//    let response1 = await fetch(r1);
//    let data1 = await response1.json();
//    let response2 = await fetch(r2);
//    let data2 = await response2.json();
//    console.log(data1, data2);
// }

// test();



