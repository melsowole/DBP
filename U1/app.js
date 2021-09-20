"use strict";

const HA = 15;
const main = document.querySelector("main");
const aside = document.querySelector("aside");
let users = [];


getUsers()


async function fetchUsers(){
    let response = await fetch( new Request("http://mpp.erikpineiro.se/dbp/sameTaste/users.php") );
    let users = await response.json();

    return users.message;
}

async function getUsers(){
    // LOAD

    users = await fetchUsers();
    users = users.sort( (x, y) => x.alias[0] > y.alias[0] ? 1 : -1 );

    console.log(users[0])
    
    await createUserList(users);

    // RESOLVE LOAD
}




// getImages(array){
//     load 

//     let imagesArray = [];

//     if( array !== "" ){
//         imagesArray = array;

//     } else {
//         if (images in local storage){
//             imagesArray = local storaged images
//         } else {
//             get list
//             let array = get img objects
//             add to local storage
//             imagesArray = array;
//         }
//     }

//     let output = printPaintings(imagesArray);

//     resolve Load
//     append output

// }

// printPaintings(imagesArray){
//     let output = "";
//     for each(img){
//         let DOM = createPaintingDOM(imgObj);
//         output += DOM;
//     }
//     return output (HTML elems)
// }

// printUserList(array){
//     let output = "";

//     array.forEach(obj){
//         let DOM = createUserDOM(obj);
//         output += DOM
//     }

//     return output  (HTML elems)
// }

function createUserList(userArray){
    userArray.forEach(userObj => {
        let DOM = createUserDOM(userObj);
        if( userObj.id == HA ){
            aside.prepend(DOM)
        } else {
            aside.append(DOM)
        }
    });
}

function createUserDOM(userObj){
    let output = document.createElement("a");

    let info = `
        <span>${userObj.alias}</span>
        <span>[${userObj.favs.length}]</span>
    `;
    
    if(userObj.id == HA){
        output.setAttribute("href", "/index");
    } else {
        output.setAttribute("href", `/user?${userObj.alias}`);
        
        let HAFavs = users.find( u => u.id == HA).favs;
        
        let counter = 0;
        
        HAFavs.forEach( HAfav => {
            if( userObj.favs.some( userfav => userfav == HAfav ) ){
                counter ++
            } 
        })
        
        info += `<span>(${counter})`;
    }

    
    output.innerHTML = info;
    
    return output
}


// createPaintingDOM(imgObj){
//     let output;

//     if( /index ){
//         let button;
//         manageFav(button)
//     } else {
//         if ( img is in HA fav ){
//             classList. add ("fav")
//         }
//     }

//    return output;
// }


// Intervalled Timeout, 30secs{
//     getUsers()
// }