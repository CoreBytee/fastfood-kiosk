<?php
require '../../helpers/setup.php';
$response = array();

$sql = 'SELECT * FROM products ';
$result = mysqli_query($mysql, $sql);
if ($result) {
    header("Content-Type: json");
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $response[$i]['id'] = $row['id'];
        $response[$i]['Name'] = $row['Name'];
        $response[$i]['img'] = $row['img'];
        $response[$i]['discription'] = $row['discription'];
        $response[$i]['price'] = $row['price'];
        $i++;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}