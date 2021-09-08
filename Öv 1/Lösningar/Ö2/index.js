
"use strict";


// A
fetch("https://randomuser.me/api/?results=50&password=number,7")
    .then(response => response.json())
    .then(data => {
        let {results} = data;
        results.forEach(person => console.log(person.name.first, person.login.password));
    })
    .catch(error => console.log(error));



// A
fetch("https://randomuser.me/api/?results=50&gender=female&nat=es")
    .then(response => response.json())
    .then(data => {
        let {results} = data;
        results.forEach(person => console.log(person.name.first));
    })
    .catch(error => console.log(error));



