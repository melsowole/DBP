<?php include('../sections/header.php');?>
<?php 
    if(!isset( $_GET['id'] )){
        $idDoesNotExist = true;

    } else {
        $dogs = json_decode( file_get_contents('../data.json'), true)['dogs'];
        foreach( $dogs as $dog ){
            if($dog['id'] == $_GET['id']){
                $theDog = $dog;
            }
        }
    }

    // find dog owner
    $users = json_decode( file_get_contents('../data.json'), true )['users'];
    foreach( $users as $user ){
        if( $user['id'] == $theDog['owner']){
            $owner = $user['username'];
        }
    }

?>

<main class="index">
<?php
    if(isset( $idDoesNotExist ) or !isset($theDog)){
        echo "Dog with this id does not exist";
    } else{
        echo "
        <h1>Meet {$theDog['name']} </h1>

        <p>{$theDog['name']} is a {$theDog['age']} year old {$theDog['breed']} </p>

        <p>
            Owner $owner says this about {$theDog['name']}:

            <span class='quote'> {$theDog['note']} </span>
        </p>
        
        ";
    }
?>
    
</main>
    
<?php include('../sections/footer.php');?>



