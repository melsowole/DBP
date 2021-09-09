
const person = {
    firstName: "Maik",
    lastName: "Hole",
    born: 1950
}

document.getElementById("add").addEventListener("click", function(){
   fetch(new Request('http://mpp.erikpineiro.se/dbp/users/',
      {
         method: 'POST',
         body: JSON.stringify(person),
         headers: {"Content-type": "application/json; charset=UTF-8"},
      }))
      .then( response => {
         if (response.status === 409) {
            console.log("Person already in DB");
            throw Error("Person already in DB");
         } else {
            return response.json();
         }
      })
      .then(console.log)
      .catch(console.log);  
});

document.getElementById("remove").addEventListener("click", function(){
   fetch(new Request('http://mpp.erikpineiro.se/dbp/users/',
      {
         method: 'DELETE',
         body: JSON.stringify({id: 93}),
         headers: {"Content-type": "application/json; charset=UTF-8"},
      }))
      .then( response => {
         if (response.status === 404) {
            console.log("No person with that id in DB");
            throw Error("Person already in DB");
         } else {
            return response.json();
         }
      })
      .then(console.log)
      .catch(console.log);  
});


document.getElementById("patch").addEventListener("click", function(){
   fetch(new Request('http://mpp.erikpineiro.se/dbp/users/',
      {
         method: 'PATCH',
         body: JSON.stringify({id: 1, firstName:"Yoman"}),
         headers: {"Content-type": "application/json; charset=UTF-8"},
      }))
      .then( response => {
         // Kod saknas här
      })
      .then(console.log)
      .catch(console.log);  
});



document.getElementById("get").addEventListener("click", function(){
   fetch('http://mpp.erikpineiro.se/dbp/users/')
      .then( response => response.json())
      .then( console.log )
      .catch( console.log );
});

