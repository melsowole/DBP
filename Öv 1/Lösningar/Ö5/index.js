
"use strict";

function done() {
    names.sort().forEach(n => console.log(n));
    console.log("Fetch count: " + countFetch);
}

function getOneName() {

    countFetch++;
    document.querySelector("#fetchCount > div:last-child").textContent = countFetch;

    fetch("https://randomuser.me/api/?gender=female&nat=fr")
        .then(response => response.json())
        .then(data => {
            const {results} = data;
            const name = results[0].name.first;


            const nameElement = document.querySelector("#latestName");
            nameElement.textContent = name;

            if (!names.includes(name)) {
                names.push(name);
                nameElement.style.backgroundColor = "lightgreen";
                document.querySelector("#nameCount > div:last-child").textContent = names.length;
            } else {
                nameElement.style.backgroundColor = "tomato";
            }

            if (names.length < 50) {
                getOneName();
            } else {
                done();   
            }
        })
        .catch(error => console.error(error));

}



const names = [];
let countFetch = 0;
getOneName();



