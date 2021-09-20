"use strict";

const main = document.querySelector("main");
const aside = document.querySelector("aside");
const HA = 15;

let images;
if( localStorage.getItem("images") ){
images = JSON.parse(localStorage.getItem("images"))
} else { fetchImages() }


// CALLS
paintingsDOM( users[15])
fetchUsers()
userListDOM()




//  FUNCTION

async function fetchImages(){
    let result;
    
    let rqst = new Request('https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&q=snow');
    let response = await fetch(rqst);
    let idArr = await response.json();
    
    let objRqst = []
    idArr.objectIDs.forEach(id => {
        objRqst.push( fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`) )
    });
    response = await Promise.all( objRqst );
    let objArr = await Promise.all( response.map( r => r.json() ) )
    
    result = await objArr.map( obj =>{
        obj = {
            objectID: obj.objectID,
            primaryImageSmall: obj.primaryImageSmall,
            artistDisplayName: obj.artistDisplayName,
            title: obj.title,
        }
        return  obj
    } )
    
    localStorage.setItem("images", JSON.stringify(result) )
    
    images = result;
}

async function paintingDOM(obj, uID){
    let elem = document.createElement("div");
    elem.classList.add("painting")
    
    let imgWrap = document.createElement("div");
    imgWrap.classList.add("img-wrap")

    let img = document.createElement("img");
    img.setAttribute("src", obj.primaryImageSmall);
    imgWrap.append(img)


    let textWrap = document.createElement("div");
    textWrap.classList.add("text-wrap")

    let title = document.createElement("div");
    title.textContent = obj.title;
    let artist = document.createElement("div");
    artist.textContent = obj.artistDisplayName;
    textWrap.append(title, artist)


    elem.append(imgWrap, textWrap);

    if(uID == HA){
        elem.append( manageFavorites(obj) )
    }

    document.querySelector("main").append(elem)    
}

function manageFavorites(obj){
    let button = document.createElement("button")

    button.innerHTML  = "Add to favorites";

    button.addEventListener("click", () => {
        addFavorite(obj.objectID)
    })
    

    return button
}

<<<<<<< HEAD
// paintingDOM(images[1], 15);
=======

>>>>>>> 58488431eb9a52d4bc510e85534aa37f4084a8bd

async function addFavorite(paintingID){
    let rqst = new Request( 'http://mpp.erikpineiro.se/dbp/sameTaste/users.php',
    {
        method: "PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify( {id:HA, addFav: paintingID} ),
    } )

    let response = await fetch(rqst);
    let data = await response.json();

    console.log(data)
}

async function fetchUsers(){
    let r = await fetch( new Request('http://mpp.erikpineiro.se/dbp/sameTaste/users.php') );
    let data = await r.json();

    users = data.message;
    return data.message
}




async function userListDOM( ){
    let users = await fetchUsers();

    let elem = document.createElement("section");

    users.forEach( i => {
        elem.append( userDOM(i) )
    })

    aside.append(elem)
}

async function paintingsDOM(userObj){
    console.log(userObj)
    let paintings = [];
    if(userObj.id == HA){
        paintings = images;
    } else {
        userObj.favs.forEach( f => {
            let item = images.find(img => img.objectID == f)
            paintings.append(item)
        } )
    }

    let elem = document.createElement("section");

    paintings.forEach( i => {
        elem.append( paintingDOM(i, userObj.id) )
    })

    console.log(paintings)

    main.append(elem)
}



function userDOM(user){
    let elem = document.createElement("div");

    let name = document.createElement("span");
    name.textContent = user.alias;

    let favInfo = document.createElement("span")
    let favW = document.createElement("span");
    favW.innerHTML = `[<span class="favs"> </span>]` 
    favInfo.append(favW)
    if(user.id !== HA){
        let sharedW = document.createElement("span");
        sharedW.innerHTML = `(<span class="shared"> </span>)` 
        favInfo.append(sharedW)

        elem.addEventListener("click", () => {
            showFavs(user.id)
        })
    }

    elem.append(name, favInfo)
    
    return elem
}

function showFavs(userID){
}


function loadingScreen(){
    let elem = document.createElement("div");

    elem.setAttribute("id", "loading-splash");

    main.append(elem)
}



async function getUsers(){
    let request = new Request('http://mpp.erikpineiro.se/dbp/sameTaste/users.php')
    let response = await fetch(request);
    let data = await response.json()

    console.log(data)
}


getUsers()




localStorage.clear()


