<?php

include("Common.php");

$name = $_POST['name'];
$pass = $_POST['password'];
$getIP = $_POST['IP'];

$link = dbConnect();

$name = stripslashes($name);
$pass = stripslashes($pass);
$getIP = stripslashes($getIP);

$getIP = mysqli_real_escape_string($link, $getIP);
$name = mysqli_real_escape_string($link, $name);
$pass = mysqli_real_escape_string($link, $pass);

$check = mysqli_query($link, "SELECT * FROM LoginSystemDB WHERE `name` = `$name`") or die (mysql_error());

$numrows = mysqli_num_rows($check);

if($numrows == 0){
    die("User <color=#FF4500> ". $name . "</color> does not exist \n"); 
} else {

    $pass = md5($pass);

    while($row = mysqli_fetch_assoc($check)){
        if($pass == $row['password']){
            $userid = $row['id'];

            echo "Login done.";
            echo "|";
            echo $row['name'];
            echo "|";
            echo $row['email'];
            echo "|";
            echo $row['score'];
            echo "|";
            echo $row['status'];
            echo "|";

            if($getIP == "1"){
                echo $row['IP'];
                echo "|";
            }

        } else {
            die("Password is incorrect \n");
        }
    }
}

mysqli_close($link);

?>