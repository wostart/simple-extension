<?php
// header('Content-type:text/json;charset=utf-8');
session_start();
if(isset($_SESSION['userinfo'])){
    $name = $_SESSION['userinfo'];
}else{
    $name = '匿名网友';
}
$date = $_POST['date'];
$time = $_POST['time'];
$content = $_POST['content'];
$liuyan = file_get_contents("../json/liuyan.json");
$liuyan = json_decode($liuyan, true);
$liuyan[count($liuyan)] = array(
    'name' => $name,
    'date' => $date,
    'time' => $time,
    'content' => $content
);
$liuyan = json_encode($liuyan);
file_put_contents('../json/liuyan.json',$liuyan);
echo 1;
?>