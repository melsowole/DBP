"use strict";

function errorMsg(){
    console.log("ERROR")
}

// ------------------

function one(){
    let data;

    fetch(new Request("https://randomuser.me/api/?results=400"))
        .then( responsePromise => responsePromise.json() )
        .then( dataPromise => {
            data = dataPromise.results;
            console.log(data)
        } )
        .catch(errorMsg);
}


// ----------------------


function twoA(){
    // Hämta 50 personer, som alla ska ha ett lösenord som endast innehåller siffror och är exakt 7 chars lång.
    // Logga deras förnamn och lösenord.

    let data;

    fetch( new Request("https://randomuser.me/api/?password=number,7-7&results=50") )
        .then( responsePromise => responsePromise.json() )
        .then( dataResponse => {
            data = dataResponse;

            console.log(data)

            data.results.forEach(person => {
                console.log(person.name.first + " " + person.login.password)
            });
        } )
        .catch( errorMsg )
    ;
}

function twoB(){
    // Hämta 50 personer, som alla kommer från Spanien och är kvinnor.
    // Logga deras förnamn

    let data;

    fetch( new Request("https://randomuser.me/api/?results=50&nat=ES&gender=female") )
        .then( responsePromise => responsePromise.json() )
        .then( dataPromise => {
            data = dataPromise.results;

            data.forEach( person => {
                console.log( person.name.first)
            } )
        })
        .catch(errorMsg)
    ;
}

// ----------------

function ThreeA(){
    // Skriv ett program som hämtar alla länder som där Euros är officiell valuta.
    // Logga, i bokstavsordning, det portugisiska namnet på vart och ett av dem.
    // (jag vet inte varför Österrike kommer först när jag kör min kod, men det verkar som att "à" är sist i alfabetet...)

    let data;

    // fetch( new Request("https://restcountries.eu/rest/v2/?fields=name;capital;currencies&currency/EUR") )
    fetch( new Request("https://restcountries.eu/rest/v2/currency/eur") )
        .then( promise => promise.json() )
        .then( dataPromise => {
            data = dataPromise;

            data.sort( (a, b) => a.translations.pt > b.translations.pt ? 1 : -1 );

            data.forEach(country => {
                console.log(country.translations.pt)
            });
        } )
        .catch(errorMsg)

}

function ThreeB(){
    // Skriv ett program som loggar namnet och ytan på alla länder i världen (enligt restcoutries.eu) där engelska är ett officiellt språk.
    // Listan ska sorteras enligt ländernas yta, där de minsta kommer först.

    fetch(new Request("https://restcountries.eu/rest/v2/lang/eng"))
        .then( responsePromise => responsePromise.json() )
        .then( data => {
            data = data.sort((a,b) => a.area > b.area? 1 : -1);
            data.forEach( country =>{
                console.log(country.name + " " + country.area)
            })
        })

    
}

function ThreeC(){
    // Skriv ett program som visar på webbsidan (i bokstavsordning) flaggorna för alla länder vars namn (på det egna språket) startar med "S"
    // Se bilden "Ö3 - C.png"

    fetch(new Request("https://restcountries.eu/rest/v2/"))
        .then(promise => promise.json())
        .then(data => {
            data = data.filter( country => country.nativeName[0] == "S");
            data = data.sort((a,b) => a.nativeName > b.nativeName ? 1 : -1);

            data.forEach(country =>{
                document.body.setAttribute("id", "three")

                let wrapper = document.createElement("div");
                let flag = document.createElement("img");
                flag.setAttribute("src", country.flag)

                let caption = document.createElement("caption");
                caption.textContent = country.nativeName

                wrapper.append(flag, caption);
            
                document.body.append(wrapper);
            })
        })

}


// ---------------------

function four(){
    //Hitta en öppen API som verkar intressant för dig och gör någon request till den.
    // Googla "list of open apis" för att hitta sidor med info om open apis, det finns några stycken...
    document.body.setAttribute("id", "four");

    let wrapper = document.createElement("div");

    let input = document.createElement("input");
    let search = document.createElement("i");
    search.textContent = "The Average Me";

    let resultWrapper = document.createElement("div");
    let resultAge = document.createElement("span");
    let resultCountry = document.createElement("span");

    resultWrapper.append(resultAge, resultCountry)

    wrapper.append(input, search, resultWrapper)

    document.body.append(wrapper)

    search.addEventListener("click", () => {
        input.value.length == 0 ? errorMsg() : getAndDisplayName(input.value)
    });

    function getAndDisplayName(inputText){

        
        fetch(new Request(`https://api.agify.io/?name=${inputText}`) )
        .then( promise => promise.json() )
        .then( data =>  resultAge.textContent = data.age +" years old")
        .catch(errorMsg)
        ;
        
        fetch(new Request(`https://api.nationalize.io/?name=${inputText}`) )
            .then( promise => promise.json() )
            // .then( data =>  console.log( data ))
            .then( data => {
                fetch(new Request(`https://restcountries.eu/rest/v2/alpha/${data.country[0].country_id}`))
                    .then( promise => promise.json() )
                    .then( data =>  resultCountry.textContent = " " + "from " + data.name)
            } )
            .catch(errorMsg)


    }

}

function fiveDOM(){
    document.body.setAttribute("id", "five");

    let fetchWrap = document.createElement("span");
    fetchWrap.textContent = "Fetches";
    let nameWrap = document.createElement("span");
    nameWrap.textContent = "Names";

    let result = document.createElement("div");

    let fetches = document.createElement("div");
    fetchWrap.append(fetches);

    let names = document.createElement("div");
    nameWrap.append(names);

    document.body.append(fetchWrap, nameWrap, result);


    fiveGetUser()


    let namesArray = [];
    let fetchCount = 0;    
    
    function fiveGetUser(){
        fetch( new Request("https://randomuser.me/api/?gender=female&nat=fr") )
            .then( p =>  p.json())
            .then( d =>{
                d = d.results[0].name.first;

                fetchCount++;
                result.textContent = d;
                names.textContent = namesArray.length;
                fetches.textContent = fetchCount;    
    
                if( namesArray.includes(d) ) {
                    result.style.backgroundColor = "tomato"
                }
                else{
                    result.style.backgroundColor = "thistle"
                    namesArray.push(d);
                }

                if( namesArray.length <= 50 ) fiveGetUser()
    
            })
    }
}




fiveDOM();











