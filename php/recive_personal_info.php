<?php
header("Access-Control-Allow-Origin: *");
// header("content-type: application/json");
session_start();
$username = $_SESSION['userinfo'];
// $_SESSION['logininfo'] = null;
$email = $_POST['email'];
$phone = $_POST['phone'];
$gender = $_POST['gender'];
$say = $_POST['say'];
$address = $_POST['address'];
$qq = $_POST['qq'];
// $username = $_POST['username'];
// $password = $_POST['password'];
// $new_password = $_POST['new_password'];
$users = file_get_contents("../json/user.json");
$users = json_decode($users, true);
$flag = false;
for ($i=0; $i < count($users); $i++) { 
    if($username == $users[$i]['name']){
        $users[$i]['email'] = $email;
        $users[$i]['phone'] = $phone;
        $users[$i]['gender'] = $gender;
        $users[$i]['say'] = $say;
        $users[$i]['address'] = $address;
        $users[$i]['qq'] = $qq;
        $flag = true;
        break;
    }
}
$users = json_encode($users);
file_put_contents("../json/user.json", $users);
// $_SESSION['logininfo'] = $flag;
echo $flag;
?>