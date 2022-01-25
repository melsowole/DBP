<?php include('sections/header.php');?>

<?php
    if(isset($_SESSION['userId'])){
        $users = json_decode( file_get_contents('data.json'), true )['users'];
        foreach( $users as $user ){
            if($user['id'] == $_SESSION['userId']){
                $username = $user['username'];
            }
        }
    }

    function dogMessage($dogArray, $username){
        // random dog name
        $dogName = $dogArray[rand( 0, max(array_keys($dogArray)) )]['name'];

        $phrases = [
            "Give $dogName lots of hugs and kisses today!",
            "$dogName deserves a treat, don't you think?",
            "Who's a good dog? $dogName is a good dog!",
            "Have you walked $dogName today?",
            "Go give $dogName some love!",
            "When was the last time you snuggled up on the couch with $dogName?",
            "How about a trip to the park? $dogName would surely love it!",
            "When was the last time you gave $dogName some of quality time and attention?",
            "$dogName want tumtum rubrub!",
            "&quot; I love $username!&quot;  &ndash; $dogName",
            "How does $dogName show you they love you?",
            "How about teaching $dogName a new trick?"
        ];

        // random phrase
        $phrase = $phrases[ rand(0, max(array_keys($phrases)) ) ];

        return $phrase;
    }
?>

<main class="index">
    
    <?php
        
        if( !isset( $_SESSION['userId'] ) ){
            echo "
                <h1>Welcome Puggers!</h1>
                <p>The number one dog database on the internet</p>
                <div class='flex'>
                    <a class='button' href='/pages/login.php'>log in</a>
                    <a class='button solid' href='/pages/list.php'>view dogs</a>
                </div>
            ";

        } else {
            
            $dogs = json_decode( file_get_contents("data.json"), true )["dogs"];

            foreach( $dogs as $dog ){
                if( $dog['owner'] == $_SESSION['userId'] ){
                    $userDogs[] = $dog;
                }
            }

            echo"
                <h1>Welcome $username!</h1>
            ";

            if(isset($userDogs)){
                echo dogMessage($userDogs, $username);
            }

        }
    ?>
    
</main>
    
<?php include('sections/footer.php');?>
