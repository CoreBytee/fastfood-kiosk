<?php 

    $mysqli = new mysqli('localhost', 'root','','fastfood-kiosk');
    if ($mysqli->connect_errno != 0){
        echo $mysqli->connect_error;
    }

    $json_data = file_get_contents('burgerking.json');
    echo $json_data;
    $products = json_decode($json_data, JSON_OBJECT_AS_ARRAY);

    $stmt = $mysqli->prepare("
    INSERT INTO products(Name, img, discription, price, category)
    VALUES(?,?,?,?,?)
    "); 

    $stmt->bind_param("sssii", $Name, $img, $discription, $price, $category);

    $inserted_row = 0 ;
    foreach ($products as $product){
        $Name = $product["Name"];
        $img = $product["img"];
        $discription = $product["discription"];
        $category = $product["category"];

        $stmt->execute();
        $inserted_rows ++;
}

if(count($product) == $inserted_rows){
    echo "succes";
} else{
    echo "error";
}
