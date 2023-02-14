<?php
header('Content-type:text/json;charset=utf-8');
$extension = file_get_contents("../json/extension.json");
$extension = json_decode($extension, true);
echo json_encode($extension);
?>