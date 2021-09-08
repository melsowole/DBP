/*
TYPER AV FÖRFRÅGNINGAR på internet (http protokollet)

Vi kommer att använda oss av framförallt POST men även PATCH och DELETE.
*/




/*  ===========
       POST
    ===========

    POST-requests används när man vill lägga till information på servern (DB).
    Exvis, skapa en ny användare i FB.
    Eller skapa en ny inlämning på Canvas.



    ===========
       PATCH
    ===========

    PATCH-requests används när man vill ändra på någon del av informationen som finns
    på servern.
    Exvis, ändra din profilbild i FB
    Eller ändra på deadline för en inlämning på Canvas



    ===========
       DELETE
    ===========

    DELETE-requests används när man vill ta bort information från servern.
    Exvis, radera ditt konto på FB (om det nu hade gått)
    Eller radera ett anslag på Canvas.

*/

// I JS skrivs alla dessa requests på samma sätt:
const person1 = {
    firstName: "Janis",
    lastName: "Joplin",
    born: 1973
}
const person1JSON = JSON.stringify(person1);

const request = new Request('http://mpp.erikpineiro.se/dbp/users/',
                              {
                                 method: 'POST', // eller PATCH, eller DELETE
                                 body: person1JSON, // Detta måste vara en STRÄNG!
                                 headers: {"Content-type": "application/json; charset=UTF-8"},
                              }
                           );

fetch(request)  
    .then( response => response.json())
    .then( data => console.log(data))
    .catch( error => console.log(error));


// För att veta hur objektet ska vara strukturerat behöver vi känna till hur servern fungerar.
// Vanligtvis får man endast lägga till eller ändra data i Servrar som vi själva har programmerat,
// så då vet vi hur datan ska struktureras när den skickas till servern.

/*

Väldigt viktigt!
Bara för att man skriver "DELETE" i nyckeln "method" så innebär det inte att servern kommer att
ta bort information. Det beror helt och hållet på hur servern är uppbyggd.
Att använda DELETE-förfrågningar för att ta bort data från servern är bara en överenskommelse (convention).
Detsamma gäller GET, POST, PATCH och alla andra methods.

I denna kurs kommer vi att följa överenskommelsen när vi kodar våra APIs (senare med Sebbe).

*/
