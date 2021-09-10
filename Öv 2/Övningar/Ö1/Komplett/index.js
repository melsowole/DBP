
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
         body: JSON.stringify({id: 111}),
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
         body: JSON.stringify({id: 103, firstName:"Melk"}),
         headers: {"Content-type": "application/json; charset=UTF-8"},
      }))
      .then( response => {
         if( response.status == 409){ 
            console.log("Person already in DB");
            throw Error("Person already in DB");
         } else {
            return response.json()
         }
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

