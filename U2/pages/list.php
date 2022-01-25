<?php include('../sections/header.php');?>

<?php 
    // true gives associative array
    // false returns array
    $data = json_decode( file_get_contents("../data.json") , true)['dogs'];

    function printDog($dog){
        // find dog owner
        $users = json_decode(file_get_contents('../data.json'), true)['users'];
        foreach($users as $user){
            if($dog['owner'] == $user['id']){
                $owner = $user['username'];
            }
        }

        return "
        <tr>
            <td><a class='link name' href='/pages/dogs.php?id={$dog['id']}'>{$dog['name']}</a></td>
            <td><a class='link breed' href='?breed={$dog['breed']}'>{$dog['breed']}</a></td>
            <td class='age'>{$dog['age']}</td>
            <td class='note'>{$dog['note']}</td>
            <td class='owner'><a class='link' href='?owner={$dog['owner']}'>$owner</a></td>
        </tr>
        ";
    }

?>

<main>
    <h1>Dogs in the database</h1>
    <?php 
        if(sizeof($_GET) > 0){
            $filter = array_keys($_GET)[0];
            echo "Filtered by: $filter";
            echo "<a href='/pages/list.php'>Clear filter</a>";
        }
    
    ?>
    <table>
        <tr>
            <th class='name'>Name</th>
            <th class='breed'>Breed</th>
            <th class='age'>Age</th>
            <th class='note'>Note</th>
            <th class='owner'>Owner</th>
        </tr>

        <?php
            foreach($data as $dog){
                if( sizeof($_GET) > 0){
                    if($dog[$filter] == $_GET[$filter]){
                        echo printDog($dog);
                    }
                } else {
                    echo printDog($dog);
                }
            }
        ?>

    </table>    
    
</main>
    
<?php include('../sections/footer.php');?>