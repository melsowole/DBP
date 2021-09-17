"use strict";

const HA = 15;

let images;

if( localStorage.getItem("images") ){
    images = JSON.parse(localStorage.getItem("images"))
} else {
    fetchImages();
}

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

    fetch( new Request('mpp.erikpineiro.se/dbp/sameTaste/users.php') )
        .then( r => r.json() )
        .then( d => console.log)

    button.addEventListener("click", () => {
        addFavorite(obj.objectID)
    })
    

    return button
}

paintingDOM(images[1], 15);

async function addFavorite(paintingID){
    let rqst = new Request( 'mpp.erikpineiro.se/dbp/sameTaste/users.php',
    {
        method: "PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify( {id:HA, addFav: paintingID} ),
    } )

    let response = await fetch(rqst);
    let data = await response.json();

    console.log(data)
}




// localStorage.clear()


