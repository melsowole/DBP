"use strict";

fetchItems()

async function fetchItems(){
    let request = new Request( "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&q=snow" )
    let response = await fetch(request);
    let imgIdArray = await response.json()

    let imgRequestArray = [];
            
    imgIdArray.objectIDs.forEach( id => {
        imgRequestArray.push( fetch( new Request(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`) ) )
    })

    request = await Promise.all( imgRequestArray );
    let imgObjArray = await Promise.all( request.map( r => r.json() ) )

    console.log(imgObjArray)

}