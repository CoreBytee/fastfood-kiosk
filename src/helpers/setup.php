<!-- Read env file and connect to database -->

<?php
$env = parse_ini_file(__DIR__ . '/../../.env');

var_dump($env);

$mysql = new mysqli(
    $env["DATABASE_HOST"],
    $env["DATABASE_USERNAME"],
    $env["DATABASE_PASSWORD"],
    $env["DATABASE_NAME"],
    $env["DATABASE_PORT"]
);

if ($mysql->connect_error) {
    die("Connection failed: " . $mysql->connect_error);
}