"use strict";

// Sommmarutmaningen 1a: Shopping

// Ni ska skriva koden som resulterar i en console som
// ser ut som den på bilden console.log.png

/*

Frågorna som loggen svarar på är:


8) I vilken stad har det spenderats mest pengar?
9) I vilken stad har det spenderats minst pengar?

10) Vem har spenderat mest pengar i Madrid?

*/

console.log( `Eva har spenderat ${findSpendingsWithName("Eva")}kr` )
console.log( `I Malmö har det spenderats ${findSpendingInCity("malmö")}kr` )
STUFF.forEach( thing => {
    console.log( `${findSpendingInCategory(thing)}kr i ${thing}` )
} );

console.log( `Har köpt flest antal varor: ${whoHasTheMostPurchases().name} (antal: ${whoHasTheMostPurchases().amount})` )
console.log( `Har köpt minst antal varor: ${whoHasTheLeastPurchases().name} (antal: ${whoHasTheLeastPurchases().amount})` )

console.log( `Har spenderat mest: ${whoHasSpentTheMost().name} (${whoHasSpentTheMost().amount}kr)` )
console.log( `Har spenderat mest: ${whoHasSpentTheLeast().name} (${whoHasSpentTheLeast().amount}kr)` )

function findSpendingsWithName(name){
    // get name obj
    let person = PEOPLE.find( person => person.name == name.charAt(0).toUpperCase() + name.slice(1) )

    let spendings = 0;
    // for each match add to spendings
    FAKTUROR.forEach( invoice =>{
        if( invoice.person == person.id ){
            spendings = spendings + invoice.amount
        }
    } )
    
    return spendings
}

function findSpendingInCity(name){
    let city = CITIES.indexOf( name.charAt(0).toUpperCase() + name.slice(1));

    let spendings = 0;
    FAKTUROR.forEach( invoice =>{
        if (invoice.city == city){
            spendings = spendings + invoice.amount
        }
    })

    return spendings
}

function findSpendingInCategory(name){
    let i = STUFF.indexOf(name);
    let spendings = 0;

    FAKTUROR.forEach( invoice =>{
        if(invoice.stuff == i){
            spendings = spendings + invoice.amount;
        }
    })

    return spendings;
}

function whoHasTheMostPurchases(){
    let array = amountOfInvoices();

    array.sort( (a, b) =>{
        return a.amount > b.amount ? -1 : 1;
    } );

    return array[0];
}

function whoHasTheLeastPurchases(){
    let array = amountOfInvoices();

    array.sort( (a, b) =>{
        return a.amount > b.amount ? 1 : -1;
    } );

    return array[0];
}

function whoHasSpentTheMost(){
    let array = amountOfMoney();

    array.sort( (a, b) =>{
        return a.amount > b.amount ? -1 : 1;
    } );

    return array[0];
}

function whoHasSpentTheLeast(){
    let array = amountOfMoney();

    array.sort( (a, b) =>{
        return a.amount > b.amount ? 1 : -1;
    } );

    return array[0];
}

//returns and array with objects
function amountOfInvoices(){
    // array with person ids
    let invoices = FAKTUROR.map( invoice => invoice.person);
    
    let countedInvoices = [];
    
    PEOPLE.forEach( person => {
        let counted = 0;
        
        invoices.forEach( invoice =>{
            if(person.id == invoice){
                counted++;
            }
        } )
        
        countedInvoices.push ( {
            name: person.name,
            amount: counted,
        } )
    } )
    
    return countedInvoices;
}

//returns and array with objects
function amountOfMoney(){
    // array with person ids
    let countedMoney = [];

    PEOPLE.forEach( person => {
        let counted = 0;

        FAKTUROR.forEach( invoice =>{
            if(person.id == invoice.person){
                counted = counted + invoice.amount;
            }
        } )

        countedMoney.push ( {
            name: person.name,
            amount: counted,
        } )
    } )

    return countedMoney;
}







