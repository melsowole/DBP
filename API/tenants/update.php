<?php
//Inkluderar funktioner 
require_once "../functions.php";

// Kontrollera att rätt content-type skickades med
checkConentType();

// Kontrollera att rätt metod skickades med
checkMethod("PATCH");

// Hämtar databas och gör om till php
$enteties = loadJson("../database.json");
$tenants = $enteties["tenants"];
$apartments = $enteties["apartments"];

// Hämtar data som skickats med requesten
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

// Kontrollerar att "id" skickats med
if (!isset($requestData["id"], $requestData["apartment"])) {
    sendJson(
        [
            "message" => "You're missing an `id` or `apartmentId` of request body"
        ],
        400
    );
}

$id = $requestData["id"];
$updatedTenant = [];
$found = false;

$firstName = $requestData["first_name"]; 
$lastName = $requestData["last_name"]; 
$email =  $requestData["email"];
$gender = $requestData["gender"];
$apartmentId = $requestData["apartment"];

$apartmentFound = false;

//Loopar genom lägenheter för att kontrollera om lägenheten med given id finns
foreach($apartments as $apartment){
    if ($apartment["id"] == $apartmentId){
        $apartmentFound = true;
    };
}

//Kontrollerar om lägenheten hittades
if($apartmentFound == false){
    sendJson(
        [
            "message" => "Apartment with that id doesn`t exist"
        ],
        400
    );
}

// Hittar "tenant" som har 'id' som skickades med, och raderar ur arrayen
foreach ($tenants as $index => $tenant) {
    if ($tenant["id"] == $id) {
        $found = true;
        if(isset($firstName)){
            $tenant["first_name"] = $firstName;
        }
        if(isset($lastName)){
            $tenant["last_name"] = $lastName;
        }
        if(isset($email)){
            $tenant["email"] = $email;
        }
        if(isset($gender)){
            $tenant["gender"] = $gender;
        }
        if(isset($apartmentId)){
            $tenant["apartment"] = $apartmentId;
        }

        //Här sparas den uppdaterade tenant
        $enteties["tenants"][$index] = $tenant;
        //Och läggs i arrayen $uppdatedTenant
        array_push($updatedTenant, $tenant);
    }
}

// Om "tenant" inte hittas så skickas ett felmeddelande
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

//Skickas uppdaterade tenant
sendJson($updatedTenant);

?>