<?php
header('Content-type:text/json;charset=utf-8');
// session_start();
$id = $_POST['id'];
// $id = 1;
$extension = file_get_contents("../json/extension.json");
$extension = json_decode($extension, true);
// $data = null;
$data = $extension[$id];
// for ($i=0; $i < $extension.length; $i++) { 
//     $data = $extension[$i];
// }
// foreach ($extension as $value){
//     if($value['name'] == $name){
//         $data = $value;
//         break;
//     }
// }
echo json_encode($data);
?>