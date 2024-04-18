<?php
require '../../helpers/setup.php';
$response = array();

$sql = 'SELECT * FROM categories';
$result = mysqli_query($mysql, $sql);
if ($result) {
    header("Content-Type: json");
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $response[$i]['id'] = $row['id'];
        $response[$i]['Name'] = $row['Name'];
        $response[$i]['img'] = $row['img'];
        $i++;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}
