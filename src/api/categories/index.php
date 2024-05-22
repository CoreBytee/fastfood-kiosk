<?php
require '../../helpers/setup.php';

$result = mysqli_query(
    $mysql,
    'SELECT * FROM categories'
);


if ($result) {
    header("Content-Type: json");
    $response = array();
    
    while ($row = mysqli_fetch_assoc($result)) {
        array_push(
            $response,
            $row
        );
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}