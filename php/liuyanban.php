<?php
header('Content-type:text/json;charset=utf-8');
$liuyan = file_get_contents("../json/liuyan.json");
$liuyan = json_decode($liuyan, true);
echo json_encode($liuyan);
?>