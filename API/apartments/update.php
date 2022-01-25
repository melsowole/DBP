<?php

require_once "../functions.php";

checkMethod("PATCH");
checkConentType();


// Hämtar datan som skickas med requesten
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

// Kontrollerar att ett id skickas med
if (!isset($requestData["id"])) {
    sendJson(
        [
            "message" => "Missing `id` of request body"
        ],
        400
    );
}

// Kontrollerar att någon typ av data som ska ändras skickas med
if (!isset($requestData["owner"]) && !isset($requestData["city"]) && !isset($requestData["street_name"]) 
    && !isset($requestData["street_adress"]) && !isset($requestData["apartment_color"])) {   
    sendJson(
        [
            "message" => "Bad request"
        ],
        400
    );
}

// Kontrollerar vilka nycklar som finns och att de inte är tomma
if (isset($requestData["owner"]) && $requestData["owner"] === "" || 
    isset($requestData["city"]) && $requestData["city"] === "" || 
    isset($requestData["street_adress"]) && $requestData["street_adress"] === "" || 
    isset($requestData["apartment_color"]) && $requestData["apartment_color"] === "") {
        sendJson(
            [
                "message" => "Bad request"
            ],
            400
        );

}

// Sparar ner id:et och skapar variabler för hela databasen och lägenheter
$id = $requestData["id"];
$enteties = loadJson("../database.json");
$apartments = $enteties["apartments"];

// En variabel som kontrollerar att lägenheten hittats,
// samt en variabel där den hittade lägenheten sparas
$found = false;
$foundApartment = null;

// Går igenom lägenheterna och hittar lägenheten med rätt id
foreach ($apartments as $index => $apartment) {
    if ($apartment["id"] == $id) {
        // Lägenheten har hittats
        $found = true;  
        
        // Kollar vilka nycklar som ska ändras och ändrar dem
        if (isset($requestData["owner"])) {
            $apartment["owner"] = $requestData["owner"];
        }

        if (isset($requestData["city"])) {
            $apartment["city"] = $requestData["city"];
        }
        
        if (isset($requestData["street_adress"])) {
            $apartment["street_adress"] = $requestData["street_adress"];
        }

        if (isset($requestData["apartment_color"])) {
            $apartment["apartment_color"] = $requestData["apartment_color"];
        }

        // Ändrar $foundApartment till den uppdaterade lägenheten
        $foundApartment = $apartment;
        // Ändrar databasen som sedan ska sparas ner med den nya datan
        $apartments[$index] = $apartment;
        $enteties["apartments"] = $apartments;

        // Avbryter loopen
        break;
    }
}

// Om lägenheten inte hittas skickas ett felmeddelande
if ($found == false) {
    sendJson(
        [
            "message" => "Requested 'id' was not found"
        ],
        404
    );
}

// Sparar den uppdaterade databasen
saveJson("../database.json", $enteties);

// Skickar tillbaka den uppdaterade lägenheten till användaren
sendJson($foundApartment);
?>