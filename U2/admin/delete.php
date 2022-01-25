<?php
    session_start();

    if( isset( $_GET['id'] ) ){
        $data = json_decode(file_get_contents("../data.json"), true);
    
        foreach( $data['dogs'] as $arrKey => $dog ){
            if($dog['id'] == $_GET['id']){ 
                unset($data['dogs'][$arrKey]); 
            }
        }

        file_put_contents( "../data.json",json_encode($data, JSON_PRETTY_PRINT) );
    }

    header("location: /pages/profile.php");
?>