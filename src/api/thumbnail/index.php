<?php

$file = sprintf(
    '../../../images/%s_%s.png',
    $_GET['type'],
    $_GET['id']
);

// echo realpath($file);

header("Content-Type: image/png");
header("Content-Length: " . filesize($file));

readfile($file);