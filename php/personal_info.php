<?php
header('Content-type:text/json;charset=utf-8');
session_start();
if(isset($_SESSION['userinfo'])){
    $name = $_SESSION['userinfo'];
$user = file_get_contents("../json/user.json");
$user = json_decode($user, true);
$data = null;
foreach ($user as $value){
    if($value['name'] == $name){
        $data = $value;
        break;
    }
}
echo json_encode($data);
}else{
    echo 0;
}

?>