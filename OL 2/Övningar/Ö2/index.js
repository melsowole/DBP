"use strict";

let first;
let last;
let born;
let originalFirst;
let newFirst;


document.querySelectorAll("input").forEach( ipt => ipt.value ="");

function redeclareInputValues(){
    first = document.getElementById("first-name").value;
    last = document.getElementById("last-name").value;
    born = document.getElementById("born").value;

    originalFirst = document.getElementById("original-first").value;
    newFirst = document.getElementById("new-first").value;


}

function deletePerson(){
    let rqst= new Request( 'http://mpp.erikpineiro.se/dbp/users/');
    fetch(rqst)
        .then( r => r.json() )
        .then( d => {
            let search = d.find( element =>  {
                if( element == null ) {}
                else{
                    return element.firstName + element.lastName == first + last;
                }
            } );
            if (search == undefined) {
                console.log(first + " " + last + " does not exist")
            } else {
                let newRqst = new Request('http://mpp.erikpineiro.se/dbp/users/',
                {
                    method: "DELETE",
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({id: search.id})
                })

                fetch(newRqst)
                    .then( response => response.json() )
                    .then( console.log )
            }
        } )
}

function showFirstName(){
    getArray()
        .then( fullArray => {
            fullArray = fullArray.filter( user => {
                if( user == null) {}
                else {
                    return user.firstName == originalFirst;
                }
            } );

            console.log(fullArray)
            
            fullArray.map( p => p.id ).forEach( p => {
                editFirstName(p)
            } )
        } )
}

function addPerson(){
    let request = new Request('http://mpp.erikpineiro.se/dbp/users/',
    {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify( 
            {
                firstName: first, 
                lastName: last, 
                born: JSON.parse(born),
            } )
    });

   fetch(request)
        .then( response => response.json())
        .then(console.log)

}

async function getArray(){
    let rqst = new Request('http://mpp.erikpineiro.se/dbp/users/');
    let response = await fetch(rqst)
    let data = await response.json()
    return data
}

function editFirstName(personId){
    let request = new Request('http://mpp.erikpineiro.se/dbp/users/',
    {
        method: "PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(
            {
                id: JSON.parse(personId),
                firstName: newFirst,

            }
        )
    });

    fetch( request )
        .then( r => r.json())
        .then( console.log )
}

document.querySelector("#delete").addEventListener("click", () =>{
    redeclareInputValues()
    deletePerson()
})
document.querySelector("#get-first").addEventListener("click", () =>{
    redeclareInputValues()
    showFirstName()
})
document.querySelector("#add").addEventListener("click", () =>{
    redeclareInputValues()
    addPerson()
})

