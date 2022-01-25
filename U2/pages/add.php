<?php
    //check if you are logged in, otherwise redirect
    session_start();
    if(!isset($_SESSION['userId'])){
        header('Location: /');
    }
    
    include('../sections/header.php');
    
?>

<main class="index">

    <form action="#" method="POST">
        <h1>Add a pupper to the database</h1>
        
        <div class="flex">
            <div class="input-wrap">
                <label for="name">Name</label>
                <input type="text" id="name" name="name">
            </div>

            <div class="input-wrap">
                <label for="age">Age</label>
                <input type="number"min="0" max="35" id="age" name="age">
            </div>
        </div>
        
        <div class="input-wrap">
            <label for="breed">Breed</label>
            <input type="text" id="breed" name="breed">
        </div>

        <div class="input-wrap">
            <label for="note">Say something special about your dog</label>
            <textarea name="note" id="note" cols="30" rows="1" placeholder
            ="Fluffy, chubby and love to cuddle!"></textarea>
        </div>

        <?php
            if( isset( $_POST["name"]) ){ // if they have submitted before
                
                // check for empty fields
                if( !empty($_POST['name'])
                and !empty($_POST['age'])
                and !empty($_POST['breed'])
                and !empty($_POST['note']) ){
                    $data= json_decode( file_get_contents('../data.json'), true );
                    
                    $id = 0;
                    $dbDogs = $data['dogs'];
                    foreach($dbDogs as $dbDog){
                        $id = max($id, $dbDog['id']);
                    };

                    $dog = [
                        "name" => $_POST['name'],
                        "breed" => $_POST['breed'],
                        "age" => $_POST['age'],
                        "note" => $_POST['note'],
                        "owner" => $_SESSION['userId'],
                        "id" => strval(++$id),
                    ];

                    $data['dogs'][] = $dog;

                    $json = json_encode($data, JSON_PRETTY_PRINT);

                    file_put_contents('../data.json', $json);

                    $_POST = [];     
                    
                    echo "<div class='success'>Successfully added dog to database!</div>";
                } else{
                    echo "<div class='error'>One or more fields are empty!</div>";
                }
            }
        ?>

        <button type="submit" >Submit</button>
    </form>
    
</main>
    
<?php include('../sections/footer.php');?>