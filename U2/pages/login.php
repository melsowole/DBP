<?php
    session_start();
    if(isset($_SESSION['userId'])){
        header('Location: /');
    } 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles.css">
    <title>Log in</title>
</head>
<body class="login">
    
<main>
    <a href="/"><img src="../images/logo.svg" alt="pugchamp logo" id="title"></a>
    <form action="#" method="GET">
        <h1>Log in</h1>

        <!-- inserts error message -->
        <?php 
            //check for previous submission
            if( isset( $_GET['email'] )  ){
                // checks for empty fields
                if( empty( $_GET['email'] ) or empty( $_GET['password'] ) ){
                    echo "<div class='error'>Please fill out all fields!</div>";
                } else {
                    $users = json_decode( file_get_contents('../data.json'), true )['users'];
                    
                    foreach($users as $user){
                        if($user['email'] == $_GET['email']
                        and $user['password'] == $_GET['password']){
                            $_SESSION['userId'] = $user['id'];

                            echo "<script>window.location = '/'</script>";
                        } else {
                            $userDoesNotExist = true;
                        }
                    }

                    if (isset($userDoesNotExist)){
                        echo "<div class='error'>User does not exist!</div>";
                    };

                }
            }

        ?>

        <div class="input-wrap">
            <label for="email">Email</label>
            <input type="text" name="email" id="email">
        </div>
        <div class="input-wrap">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <button type="submit">Log In</button>
    </form>
    
</main>

<?php include('../sections/footer.php');?>

