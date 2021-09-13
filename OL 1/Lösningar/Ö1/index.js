
"use strict";


//Vanliga övningen
fetch("https://randomuser.me/api/?results=400")
    .then(response => response.json())
    .then(data => {
        let {results} = data;
        results = results.filter(person => person.name.first[0] === "A");
    })
    .catch(error => console.error(error));




// Extra 1 & 2
// Vi hämtar nya random personer.

fetch("https://randomuser.me/api/?results=400")
    .then(response => response.json())
    .then(data => {
        const {results} = data;
        const names = [];
        results.forEach(p => {
            if (!names.some(n => n.name === p.name.first)) {
                names.push({
                    name: p.name.first,
                    count: 1
                });
            } else {
                console.log("RPEAT");
                names.find(n => n.name === p.name.first).count++;
            }
        });

        names.sort((a,b) => a.name < b.name).forEach(n => {
            console.log(n.name, n.count);
        });
    })
    .catch(error => console.error(error));



