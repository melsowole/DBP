<?php
    if(session_status() == 1){
        session_start();
    }

    function dump($var){
        echo "<pre>";
        var_dump($var);
        echo "</pre>";
    }

    //find and declare username and email
    if(isset($_SESSION['userId'])){
        $jsonFile = $_SERVER['DOCUMENT_ROOT'] . "/data.json";

        $users = json_decode(file_get_contents($jsonFile), true)['users'];
        foreach($users as $user){
            if($_SESSION['userId'] == $user['id']){
                $username = $user['username'];
                $email = $user['email'];
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles.css">
    <title>Puggers</title>
</head>
<body>
    <header>
        <img src="/images/logo.svg" alt="pugchamp logo" id="title">

        <nav>
        <a href="/">Home</a>
        <a href="/pages/list.php">Dogs</a>

        <?php 
            if(!isset($_SESSION['userId'])){
                echo "<a href='/pages/login.php'>Log in</a>";
            } else {
                echo "<a href='/pages/add.php'>Add</a>";
                echo "<a href='/pages/profile.php'>Profile</a>";
                echo "<a href='/admin/logout.php'>Log Out</a>";
            }
        ?>
    </nav>
    </header>
    