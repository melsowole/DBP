"use strict";

const mainUser = {id:15};
const galleryGrid = document.getElementById("gallery-grid");
const userLoad = document.getElementById("user-load");
const userList = document.getElementById("user-list");

let IMAGES = [];

// ***  ON PAGE LOAD ***
let usersPromise = printUsers();
getImages()
setInterval( updateUsers, 30000 )
highlightMain()

setWidthVariable() // for painting width
window.addEventListener("resize", setWidthVariable) // for painting width


//*** MAIN FUNCTIONS ***

async function printUsers(){
    load("users")

    let userArray = await fetchUsers();

    userList.innerHTML = ""; //clear old list

    userArray.forEach(userObj =>{
        userObj.id == mainUser.id ? 
        userList.prepend(createUserDOM(userObj)) : 
        userList.append( createUserDOM(userObj) );
    })

    resolveLoad("users")

    return userArray
}

async function updateUsers(){
    load("users")

    let items = document.querySelectorAll("#user-list > div");
    
    let users = await fetchUsers()

    items.forEach( item =>{
        
        let user = item.querySelector(".name").textContent;
        let userObj = users.find( u => u.alias == user );

        item.querySelector(".favs").textContent = userObj.favs.length;

        if( item.querySelector(".shared") ){
            item.querySelector(".shared").textContent = getSharedNumber(userObj);
        }

    })

    resolveLoad("users")
}

async function fetchUsers(){
    let request = await fetch( new Request("http://mpp.erikpineiro.se/dbp/sameTaste/users.php") );
    let userArray = await request.json();

    mainUser.favs = userArray.message.find( u => u.id == mainUser.id ).favs

    return userArray.message.sort( (x,y) => x.alias > y.alias ? 1 : -1 );
}

function createUserDOM( userObj ){
    let output = document.createElement("div");
    output.classList.add("user")

    let name = document.createElement("div");
    name.classList.add("name")
    name.textContent = userObj.alias;

    let favsWrapper = document.createElement("div");
    favsWrapper.classList.add("favs-wrapper");

    if( userObj.id == mainUser.id ){
        output.classList = "main-user";

        let icon = document.createElement("span");
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path class="inner-fill" d="M16.5 5c-1.54 0-3.04.99-3.56 2.36h-1.87C10.54 5.99 9.04 5 7.5 5 5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1.1-.1C16.86 14.24 20 11.39 20 8.5c0-2-1.5-3.5-3.5-3.5z" /><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>`;
        let num = document.createElement("span");
        num.textContent = userObj.favs.length;
        num.classList.add("favs")
        favsWrapper.append(icon, num)

        output.addEventListener("click", ()=>{
            getImages()
            manageActive()
        });
    } else {
        let shared = document.createElement("span");
        shared.textContent = getSharedNumber(userObj);
        shared.classList.add("shared")

        let text = document.createElement("span");
        text.innerHTML = ` favorites shared [<span class="favs">${userObj.favs.length}</span>]`

        favsWrapper.append(shared, text);

        output.addEventListener("click", ()=>{
            getImages(userObj.favs);
            manageActive();
        })
    }

    output.append(name, favsWrapper);

    return output

    function manageActive(){
        document.querySelector(".active").classList.remove("active");
        output.classList.add("active");
    }
    
}

async function getImages(optArray){
    load("paintings");

    let imagesArray = await fetchImages(optArray);

    resolveLoad("paintings");

    printPaintings(imagesArray)
}

async function fetchImages(optArray){
    let printImages = [];

    let imagesAreInLS = localStorage.getItem("images");

    
    if( optArray ){
        optArray.forEach( id =>{
            let obj = JSON.parse( localStorage.getItem("images") ).find( imgObj => imgObj.objectID == id );
            printImages.push(obj);
        } )

    }
    else {
        if( !imagesAreInLS ){
            let request = new Request( "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&q=snow" )
            let response = await fetch(request);
            let imgIdArray = await response.json()

            let imgRequestArray = [];
                    
            imgIdArray.objectIDs.forEach( id => {
                imgRequestArray.push( fetch( new Request(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`) ) );
            })

            request = await Promise.all( imgRequestArray );
            let imgObjArray = await Promise.all( request.map( r => r.json() ) )

            imgObjArray = imgObjArray.map( obj => {
                obj = {
                    objectID: obj.objectID, 
                    primaryImageSmall: obj.primaryImageSmall,
                    title: obj.title,
                    artistDisplayName: obj.artistDisplayName,
                }
                return obj
            } );

            localStorage.setItem("images", JSON.stringify(imgObjArray));
        }

        IMAGES = JSON.parse( localStorage.getItem("images") );

        printImages = IMAGES;
    }

    return printImages.sort( (x,y) => x.artistDisplayName > y.artistDisplayName ? 1 : -1)

}

async function printPaintings(objArray){
    objArray.forEach(imgObj => {
        let DOM = createPaintingDOM(imgObj, Boolean(objArray.length == 24))
            .then(d =>{
                galleryGrid.append( d )
            })
    })
};

async function createPaintingDOM( imgObj, isMainUser ){
    let output = document.createElement("div");
    output.classList.add("painting");

    output.innerHTML = `
    <div class="img-wrapper">
    <img src="${imgObj.primaryImageSmall}">
    </div>
    <div class="info-wrapper">
        <hr>
        <h2>${imgObj.artistDisplayName}</h2>
        <div class="work-name">${imgObj.title}</div>
    </div>
    `;

    
    
    if(isMainUser){
        let makeButton = manageFavorites(imgObj.objectID)
        .then( button => {
            output.append( button )
        })
    } else {
        if( mainUser.favs.includes(imgObj.objectID) ){
            output.classList.add("shared")
        }
    }

    return output
}

async function manageFavorites(id){
    let button = document.createElement("button");
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path class="inner-fill" d="M16.5 5c-1.54 0-3.04.99-3.56 2.36h-1.87C10.54 5.99 9.04 5 7.5 5 5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1.1-.1C16.86 14.24 20 11.39 20 8.5c0-2-1.5-3.5-3.5-3.5z" /><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>`

    await usersPromise;

    let action = addOrRemove();
    
    button.addEventListener("click", buttonFunc)

    return button

    function addOrRemove(){
        let isFav = mainUser.favs.includes(id);

        isFav ? button.classList = "is-fav" : button.classList = "not-fav";

        return isFav? "removeFav" : "addFav";
    }

    async function buttonFunc(){
        button.classList = "is-loading";

        let response =  await PATCH(id, action);
        if(response.status == 409){
            PATCHError();
            setTimeout( () =>{
                document.querySelector(".error").style.opacity = "0";
                setTimeout( ()=>{
                    document.querySelector(".error").remove()
                },1000 )
            }, 3000)
        }

        await updateUsers()

        action = addOrRemove()
    }
}


// *** SMALL HELP FUNCTIONS ***
function getSharedNumber(userObj){
    let counter = 0;

    userObj.favs.forEach( fav => {
        let userFavs = JSON.stringify( mainUser.favs );
        fav = JSON.stringify( JSON.parse(fav) );
        if( userFavs.includes( fav ) ) {
            counter++
        }
    } )  
    
    return counter
}

async function highlightMain(){
    await usersPromise;
    userList.firstChild.classList.add("active")
}

function load(type){
    if (type == "users"){
        userLoad.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="load-icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`;
    } else if( type == "paintings"){
        let loading = document.createElement("span");
        galleryGrid.append(loading)
    
        loading.textContent = "Loading";
    
        function setText(text){
            loading.textContent = text;
        }
    
        let first = true;
        for (let i = 0; i < 3; i++) {
            let char = "."
    
            if( first ) { setText("Loading.") }
    
            setTimeout( ()=>{
                if(!first){ setText(`Loading${char.repeat(i + 1)}`) }
                    
                setInterval( ()=>{
                    setText(`Loading${char.repeat(i + 1)}`)
                },1500 )
            }, ( (i * 1000 )/ 2) )
    
            first = false;
        }
    }
}

function resolveLoad(type){
    if( type == "users" ){
        userLoad.innerHTML = ""; 
    } else if( type == "paintings" ){
        galleryGrid.innerHTML = ""
    } 
}

async function PATCH(imgID, action){
    let obj = { id: mainUser.id }
    obj[action] = imgID;

    obj = JSON.stringify( obj )

    let request = new Request("http://mpp.erikpineiro.se/dbp/sameTaste/users.php",
    {
        method: "PATCH",
        headers:{"Content-type": "application/json; charset=UTF-8"},
        body: obj,
    })

    let response = await fetch( request );
    let status = await response;
    
    console.log(status);

    return status
}

function setWidthVariable(){
    let width = window.getComputedStyle( document.querySelector("main") ).getPropertyValue("width")
    document.documentElement.style.setProperty("--width", width);
    console.log(width)
}

function PATCHError(){
    let error = document.createElement("div");
    error.classList = "error";

    error.textContent = "Max amount of favorites reached!";

    galleryGrid.append(error)
}