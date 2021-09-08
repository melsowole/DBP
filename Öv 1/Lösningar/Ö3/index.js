
"use strict";


// A
fetch("https://restcountries.eu/rest/v2/currency/eur")
    .then(response => response.json())
    .then(countries => {
        console.log(" ");
        console.log("Övning A");
        countries.sort((a,b) => a.translations.pt < b.translations.pt).forEach(c => console.log(c.translations.pt));
    })
    .catch(error => console.log(error));


// B
fetch("https://restcountries.eu/rest/v2/lang/en")
    .then(response => response.json())
    .then(countries => {
        console.log(" ");
        console.log("Övning B");
        countries.sort((a,b) => a.area > b.area).forEach(c => console.log(c.name, c.area));
    })
    .catch(error => console.log(error));



// C
fetch("https://restcountries.eu/rest/v2/name/s")
    .then(response => response.json())
    .then(countries => {
        countries
            .filter(c => c.nativeName[0] === "S")
            .sort((a,b) => a.nativeName > b.nativeName)
            .forEach( c => {
                const element = document.createElement("div");
                element.innerHTML = `
                    <div class="flag" style="background-image: url('${c.flag}')"></div>
                    <div class="name">${c.nativeName}</div>
                `;
                document.querySelector("body").append(element);
            });
    })
    .catch(error => console.log(error));



