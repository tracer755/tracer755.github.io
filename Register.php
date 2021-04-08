<?php

include("Common.php")

$link = dbConnect();

$name = safe($_POST['name']);
$password = safe($_POST['password']);
$email = safe($_POST['email']);
$score = safe($_POST['score']);
$IP = safe($_POST['IP']);
$hash = safe($_POST['hash']);

$real_hash = md5($name . $email . $password . $secretKey);

    if($real_hash == $hash){

        $check = mysqli_query($link, "SELECT * FROM LoginSystemDB WHERE `name` = '$name' ");

        $numrows = mysqli_num_rows($check);

        if($numrows == 0){
            $password = md5($password);

            $var = mysqli_query($link, "INSERT INTO `LoginSystemDB` (`name`, `email`, `password`, `IP`) VALUES 
            ('".mysqli_real_escape_string($link, $name)"', '".mysqli_real_escape_string($link, $email)"',
             '".mysqli_real_escape_string($link, $password)"', 
             '".mysqli_real_escape_string($link, $IP)"' )");

             if($var){
                 die ("Done");
             } else {
                 die ("Error: " . mysql_error());
             }
        } else {
            die("A user with this name already exists, \n please choose another one, or register another account if you wish.");
        }
    }

    CloseConnection($link);
?>