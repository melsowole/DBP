<?php
    //check if you are logged in, otherwise redirect
    session_start();
    if(!isset($_SESSION['userId'])){
        header('Location: /');
    }

    include('../sections/header.php');
?>

<?php 
    
    function printDog($dog){
        return "
        <tr>
            <td class='name'>{$dog['name']}</td>
            <td class='breed'>{$dog['breed']}</td>
            <td class='age'>{$dog['age']}</td>
            <td class='note'>{$dog['note']}</td>
            <td><a class='del' href='/admin/delete.php?id={$dog['id']}'>Delete dog</a></td>
        </tr>
        ";
    }

    $dogs = json_decode( file_get_contents('../data.json'), true )['dogs'];
    foreach($dogs as $dog){
        if( $dog['owner'] == $_SESSION['userId'] ){
            $ownedDogs[] = $dog;
        }
    }
?>

<main class="index">
    <h1>Your Profile </h1>
    <p>Username: <?php echo $username; ?></p>
    <p>Email: <?php echo $email; ?></p>

    <hr>

    <?php
        if(!isset($ownedDogs)){
            echo "<p>Your added dogs will be displayed here</p>";
        }else{ 
            echo "
            <h2>Your dogs</h2>
            <table>
                <tr>
                    <th class='name'>Name</th>
                    <th class='breed'>Breed</th>
                    <th class='age'>Age</th>
                    <th class='note'>Note</th>
                    <th></th>
                </tr>
            ";
            foreach($ownedDogs as $dog){
                echo printDog($dog);
            }
            echo "</table>";
        }
    ?>
    
</main>
    
<?php include('../sections/footer.php');?>