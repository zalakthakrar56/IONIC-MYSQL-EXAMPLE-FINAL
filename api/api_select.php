<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Access-Control-Allow-Methods");

$data = array();

$con = mysqli_connect("localhost","root","","ionic") or die(mysqli_error($con));
$query = "SELECT * FROM register";
$res = mysqli_query($con,$query) or die(mysqli_error($con));
while($d = mysqli_fetch_assoc($res))
{
	$data[] = $d;
}
echo json_encode($data);
?>