<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Access-Control-Allow-Methods");

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"));

$fullname = $data->fullname;
$email = $data->email;
$password = $data->password;


$con = mysqli_connect("localhost","root","","ionic") or die(mysqli_error($con));
$query = "UPDATE `register` SET fullname='$fullname',email='$email',password='$password' where id=$id";
mysqli_query($con,$query) or die(mysqli_error($con));
echo json_encode("Record Update");
?>