<?php
header("Access-Control-Allow-Origin: *");
// 注册
// header("content-type: application/json");
// session_start();
// $_SESSION['logininfo'] = null;
$username = $_POST['username'];
$password = $_POST['password'];
$users = file_get_contents("../json/user.json");
$users = json_decode($users, true);
$flag = true;
foreach ($users as $value){
    if($username == $value['name']){
        $flag = false;
        break;
    }
}
// "phone": "",
//     "gender": "",
//     "say":"",
//     "address": ""
if($flag){
    $users[count($users)] = array(
        "name" => $username,
        "password" => $password,
        "email" => "",
        "phone" => "",
        "gender" => "",
        "address" => "",
        "qq" => "");
    $users = json_encode($users);
    file_put_contents("../json/user.json", $users);
}
echo $flag
// $_SESSION['logininfo'] = $flag;
// echo $flag;
?>