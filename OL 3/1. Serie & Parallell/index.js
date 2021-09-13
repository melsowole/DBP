const options = {
   method: 'GET',
   headers: {
      "Content-type": "application/json; charset=UTF-8",
      'X-Api-Key': 'K+op6jSgxahEvSpE386nHQ==FpOKGk3b1IoNdmKY'
   },
};


const r1 = new Request('https://api.api-ninjas.com/v1/city?name=Madrid', options);
const r2 = new Request('https://api.api-ninjas.com/v1/city?name=Rome', options);

function handleResponse(response) {
   return response.json();
}


console.log("PARALLELLT");
console.log("fetching Madrid");
fetch(r1)
   .then(handleResponse)
   .then(d => console.log(d[0]));
console.log("fetching Rome");
fetch(r2)
   .then(r => r.json())
   .then(d => console.log(d[0]));


   

console.log("SERIE");
console.log("fetching Madrid");
fetch(r1)
   .then(handleResponse)
   .then(d => {
      console.log(d[0]);
      console.log("fetching Rome");
      fetch(r2)
         .then(r => r.json())
         .then(d => console.log(d[0]));
   });

fetch(r1)
   .then(response => {
      return response.json();
   })
   .then(d => {
      console.log(d[0]);
      console.log("fetching Rome");
      return fetch(r2);
   })
   .then(handleResponse)
   .then(d => console.log(d[0]))
   .catch(err => console.log(err))
