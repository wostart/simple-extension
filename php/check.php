<?php
header("Access-Control-Allow-Origin: *");
// header("content-type: application/json");
session_start();
$_SESSION['logininfo'] = null;
$username = $_POST['username'];
$password = $_POST['password'];
$user = file_get_contents("../json/user.json");
$user = json_decode($user, true);
$flag = false;
foreach($user as $value){
    if($username == $value['name'] && $password == $value['password']){
        $_SESSION['userinfo'] = $username;
        $flag = true;
        break;
    }
}
$_SESSION['logininfo'] = $flag;
echo $_SESSION['logininfo'];
?>