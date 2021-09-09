"use strict";

const buttons = [
    {
        name: "POST",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    },
    {
        name: "DELETE",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>`,
    },
    {
        name:"PATCH",
        svg:`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3zm-2 2H6V4h10v2z"/></svg>`,
    },
    {
        name:"GET",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
    }
];
const icons = document.getElementById("icons");
const msgBox = document.getElementById("msg-box");
const fName = document.getElementById("first-name");
const lName = document.getElementById("last-name");
const born = document.getElementById("born");

let person = {
    firstName: "Paul",
    lastName: "Anka",
    born: 2002,
}

let edit = {id:98, firstName:"Anna"}

let delID = {id:98}


buttons.forEach(icon =>{
    let i = document.createElement("i");
    i.innerHTML = icon.svg;
    i.classList.add("icon");

    i.addEventListener("click", ()=>{
        let obj = {};

        if( fName.value !== "" ){
            obj.firstName = fName.value
        }

        if( lName.value !== "" ){
            obj.lastName = lName.value
        }

        if( born.value !== "" ){
            obj.born = born.value;
        }

        

        CALLDB(icon.name, )
    })

    icons.append(i)
})

function GET(){
    fetch( new Request('http://mpp.erikpineiro.se/dbp/users/') )
        .then( r => r.json() )
        .then( d => console.log(d) )
}

function POST(){
    fetch( new Request('http://mpp.erikpineiro.se/dbp/users/',
    {
        method: "POST",
        body: JSON.stringify(person),
        headers:{"Content-type": "application/json; charset=UTF-8"},
    }) )
        .then( r => r.json() )
        .then( d => console.log( d ))
}

function PATCH(){
    fetch( new Request('http://mpp.erikpineiro.se/dbp/users/',
    {
        method: "PATCH",
        body: JSON.stringify(edit),
        headers:{"Content-type": "application/json; charset=UTF-8"}
    }) )
        .then( r => r.json() )
        .then( d => console.log(d))
}

function DELETE(){
    fetch( new Request('http://mpp.erikpineiro.se/dbp/users/',
    {
        method: "DELETE",
        body: JSON.stringify(delID),
        headers:{"Content-type": "application/json; charset=UTF-8"}

    }) )
        .then( r => r.json())
        .then( d => console.log( "deleted user eith id:" + d))
}

function CALLDB(action, obj){
    fetch( new Request('http://mpp.erikpineiro.se/dbp/users/',
    {
        method: action,
        headers: {"Content-type": "application/json; chartset=UTF-8"},
        body: JSON.stringify( obj ),
    }) )
        .then( r => {
            if( r.status == 404 ){
                let msg = document.createElement("p");
                msg.textContent = "! This user does not exist in the database";
                msg.classList.add("error")
                msgBox.append(msg)
                
                throw Error("User not in DB")
            } else if( r.status == 409 ){
                let msg = document.createElement("p");
                msg.textContent = "! ! A user already exists with the same first and last name";
                msg.classList.add("error")
                msgBox.append(msg)
                throw Error("User already in DB")
            } else{
                r.json() 
            }
        })
        .then( d => {
            if( action == "DELETE"){
                console.log("deleted user")
            } else if ( action == "POST"){
                console.log("added user" )
            } else{
                console.log("edited user")
            }
        } )
        .catch( console.log("something went wrong") )
}

// GET()

// CALLDB("DELETE", delID)

function getInputValue(input){
    return input.value[0].toUppercase() + input.value.slice(1).toLowercase();
}




































































// const input = document.querySelector("input");
// const iconWrap = document.getElementById("icons")
// const consoleBox = document.getElementById("console");
// const description = document.getElementById("description");
// const icons = [
//     {
//         name: "add",
//         method: POST,
//         svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
//     },
//     {
//         name: "delete",
//         method: DELETE,
//         svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>`,
//     },
//     {
//         name:"edit",
//         svg:`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3zm-2 2H6V4h10v2z"/></svg>`,
//     },
//     {
//         name:"search",
//         method: GET,
//         svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
//     }
// ];


// function getInputValue(){
//     return input.value[0] + input.value.slice(1);
// }

// function consoleLog(value){
//     console.log(value);
    
//     let log = document.createElement("p");
//     log.textContent = JSON.stringify(value);
//     consoleBox.append(log)
// }

// icons.forEach(icon =>{
//     let i = document.createElement("i");
//     i.innerHTML = icon.svg;
//     i.classList.add("icon");

//     i.addEventListener("click", icon.method)

//     iconWrap.append(i)
// })


// let obj = {
//     firstName: "Lennt",
//     lastName: "Oj",
//     born: 1996,
// }

// function GET(){
//     fetch( new Request( "http://mpp.erikpineiro.se/dbp/users/" ) )
//         .then( p => p.json())
//         .then (d => console.log( d) )
// }

// function ERROR(message){
//     let msg = document.createElement("p");
//     msg.classList.add("error"),
//     msg.textContent = "Sorry, the format is wrong"
// }

// function DELETE(){
//     fetch( new Request("http://mpp.erikpineiro.se/dbp/users/", 
//         {
//             method: "DELETE",
//             body: JSON.stringify( getInputValue() ),
//             headers: {"Content-type": "application/json; charset=UTF-8"}
//         }) )
//         .then( r => {
//             if(r.status == 404){
//                 ERROR("ID does not exist")
//             } else{
//                 return r.json()
//             }
//         })
//         .catch(ERROR("Something went wrong")  )
// };

// function POST(){
//     fetch( new Request("http://mpp.erikpineiro.se/dbp/users/",
//          {
//             method: "POST",
//             body: JSON.stringify( getInputValue() ),
//             headers: {"Content-type": "application/json; charset=UTF-8"}
//         }) )
//         .then( p => {
//             if( p.status == 409 ){
//                 ERROR("Person is already in database")
//             } else {
//                 return p.json() 
//             }
//         })
//         .then( d => console.log(d))
//         .catch( ERROR("Something went wrong") )
// };