<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Access-Control-Allow-Methods");

$data = json_decode(file_get_contents("php://input"));

$fullname = $data->fullname;
$email = $data->email;
$password = $data->password;


$con = mysqli_connect("localhost","root","","ionic") or die(mysqli_error($con));
$query = "INSERT INTO `register` (`fullname`, `email`, `password`) VALUES ( '$fullname', '$email', '$password');";
mysqli_query($con,$query) or die(mysqli_error($con));
$data->id = mysqli_insert_id($con);
echo json_encode($data);
?>