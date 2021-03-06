"use strict";

const buttons = [
    {
        name: "POST",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
        method: function (){
            if( fName.value == "" || lName.value == "" || born.value =="" ){
                PRINT("Wrong format", "error")
            } else{
                let obj = makeObj( getInputValue(fName), getInputValue(lName), getInputValue(born), "-")

                CALLDB(this.name, obj)
            }
        }
    },
    {
        name: "DELETE",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>`,
        method: function(){
            if( idInput.value == "" ){
                PRINT("Wrong format", "error")
            } else{
                let obj = makeObj( "-","-","-", getInputValue(idInput))

                CALLDB(this.name, obj)
            }
        }
    },
    {
        name:"PATCH",
        svg:`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3zm-2 2H6V4h10v2z"/></svg>`,
    },
    {
        name:"GET",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
        method: function (){
            let u = GET();
            u.then( d => d.forEach( p => PRINT(JSON.stringify(p))))

        }
    },
    {
        name:"CLEAR",
        svg:`Clear all`,
    }
];
const icons = document.getElementById("icons");
const msgBox = document.getElementById("msg-box");
const fName = document.getElementById("first-name");
const lName = document.getElementById("last-name");
const born = document.getElementById("born");
const idInput = document.getElementById("id");
let user = GET();

let person = {
    firstName: "Paul",
    lastName: "Anka",
    born: 2002,
}

let edit = {id:98, firstName:"Anna"}

let delID = {id:98}

clearInputs()


buttons.forEach(icon =>{

    let i = document.createElement("i");
    i.innerHTML = icon.svg;
    i.classList.add("icon");

    if( icon.name =="CLEAR"){
        i.classList = "clear";

        i.addEventListener("click", () =>{
            if( fName.value + lName.value + born.value + idInput.value == "") {
                PRINT( "Fields are already cleared", "error" );
                
            } else {
                clearInputs();
                PRINT("All fields cleared", "success");
            }

        })
    } else{

        i.addEventListener("click", ()=>{
        icon.method()
        })
    }

    

    icons.append(i)
})

async function GET(){
    let request = new Request('http://mpp.erikpineiro.se/dbp/users/')
    let response = await fetch(request)
    let data = await response.json()
        
    return data
}

function GETandReturnUser(i){
    fetch( new Request('http://mpp.erikpineiro.se/dbp/users/') )
        .then( r => r.json() )
        .then( d => console.log( d.find( obj => obj.id == i ) ) )
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
                PRINT("! This user does not exist in the database", "error")           
                throw Error("User not in DB")

            } else if( r.status == 409 ){
                PRINT("! ! A user already exists with the same first and last name", "error")
                throw Error("User already in DB")

            } else{
                return r.json() 
            }
        })
        .then( d => {         
            console.log(d)
            if( action == "DELETE"){

                let array = GET()
                array.then( objD => {
                    let deletedPerson = objD.find( dp => dp.id == d.id );
                    PRINT(`Deleted user ${d.id}: ${deletedPerson.lastName}, ${deletedPerson.firstName} (${deletedPerson.born})`, "success")

                } )

            } else if ( action == "POST"){
                PRINT(`Added user ${d.id}: ${d.lastName}, ${d.firstName} (${d.born})`, "success")
                
            } else{
                console.log("edited user")
            }

            user = GET()

        } )
        .catch( error => console.log(error) )
}

function makeObj(f, l, b, i){
    let obj = {};

    if( f !== "-" )obj.firstName = f;
    if( l !== "-" ) obj.lastName = l;
    if ( b !== "-" ) obj.born = b;
    if( i !== "-" ) obj.id = i;

    return obj;
}

function getInputValue(input){
    if(input == born || input == idInput){
        return JSON.parse(input.value);
    }
    return input.value[0].toUpperCase() + input.value.slice(1).toLowerCase();
}

function PRINT(m, c){
    let msg = document.createElement("p");
    msg.textContent = m;
    msg.classList.add(c);
    msgBox.prepend(msg)
}

function clearInputs(){
    fName.value="";
    lName.value="";
    born.value="";
    idInput.value="";
}