<?php
header("Access-Control-Allow-Origin: *");
// header("content-type: application/json");
// session_start();
// $_SESSION['logininfo'] = null;
$username = $_POST['username'];
$password = $_POST['password'];
$new_password = $_POST['new_password'];
$users = file_get_contents("../json/user.json");
$users = json_decode($users, true);
$flag = false;
for ($i=0; $i < count($users); $i++) { 
    if($username == $users[$i]['name'] && $password == $users[$i]['password']){
        $users[$i]['password'] = $new_password;
        $flag = true;
        break;
    }
}
$users = json_encode($users);
file_put_contents("../json/user.json", $users);
// $_SESSION['logininfo'] = $flag;
echo $flag;
?>