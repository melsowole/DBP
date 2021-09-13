const options = {
   method: 'GET',
   headers: {
      "Content-type": "application/json; charset=UTF-8",
      'X-Api-Key': 'K+op6jSgxahEvSpE386nHQ==FpOKGk3b1IoNdmKY'
   },
};


const r1 = new Request('https://api.api-ninjas.com/v1/city?name=Madrid', options);
const r2 = new Request('https://api.api-ninjas.com/v1/city?name=Rome', options);


// Promise.all:
// Tar emot en array av promises som argument
// Returnerar en promise

// const arrayOfReponsePromises = [fetch(r1), fetch(r2)];

// const onePromiseForAllResponses = Promise.all(arrayOfReponsePromises);

// onePromiseForAllResponses.then(arrayOfResponses => {
//    console.log(arrayOfResponses);
//    const dataPromise1 = arrayOfResponses[0].json();
//    const dataPromise2 = arrayOfResponses[1].json();
//    const onePromiseForAllData = Promise.all([dataPromise1, dataPromise2])
//    onePromiseForAllData.then(arrayOfData => {
//       console.log(arrayOfData);
//    });
// });


const arrayOfReponsePromises = [fetch(r1), fetch(r2)];
const onePromiseForAllResponses = Promise.all(arrayOfReponsePromises);
onePromiseForAllResponses.then(arrayOfResponses => {
   console.log(arrayOfResponses);
   // const arrayOfDataPromises = arrayOfResponses.map(response => {return response.json()})
   const arrayOfDataPromises = arrayOfResponses.map(response => response.json());
   const onePromiseForAllData = Promise.all(arrayOfDataPromises);
   onePromiseForAllData.then(arrayOfData => {
      console.log(arrayOfData);
   });
});

Promise.all([fetch(r1), fetch(r2)])
   .then(arrayOfResponses => {
      return Promise.all(arrayOfResponses.map(response => response.json()));
   })
   .then(hanteraData)

function hanteraData(datan) {
   console.log(datan);
}

   anyPromise.then()

