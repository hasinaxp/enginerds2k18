<?php
$host="localhost";
$dbuser="itan";
$dbname="mate";
$pass="0000";

$conn = mysqli_connect($host, $dbuser, $pass, $dbname);
if(mysqli_connect_errno())
{
	die("Connection Failed! " . mysqli_connect_errno());
}

?>