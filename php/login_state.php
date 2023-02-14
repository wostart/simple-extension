<?php
// header("Access-Control-Allow-Origin: *");
// header('Content-type:text/html; charset=utf-8');
session_start();
if(isset($_SESSION['logininfo'])){
    echo true;
}else{
    echo false;
}
?>