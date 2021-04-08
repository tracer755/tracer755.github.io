<?php

include("Common.php");

$link = dbConnect();

$dbcon = mysqli_connect("pdb23.awardspace.net", "2624038_dimitar", "Xavimaestro66*", "2624038_dimitar");

$result = mysqli_query($dbcon, 'SELECT score FROM LoginSystemDB');

if(!$result){
    die('Could not do the query' . mysql_error);
}

$hash = safe($_POST['hash']);

$name = stripcslashes($name);
$name = mysqli_real_escape_string($link, $_POST['name']);


$score = stripcslashes($score);
$score = mysqli_real_escape_string($link, $_POST['score']);

$IP = stripcslashes($IP);
$IP = mysqli_real_escape_string($link, $_POST['IP']);

$typ = mysqli_real_escape_string($link, $_POST['typ']);

$real_hash = md5($name . $secretKey);

$sql = "UPDATE LoginSystemDB SET score='$score' WHERE name='$name'";

if($real_hash == $hash){

    if(($typ == "1") && (mysqli_query($dbcon, $sql))){

        $numrows = mysqli_num_rows($sql);

        echo "success";

        echo $score;
    }

    if($typ == "2"){

        $check = sprintf("UPDATE LoginSystemDB SET IP='".mysql_real_escape_string($dbcon, $IP)."' WHERE name='$name'") 
        or die(mysql_error());

        echo "successipdb";
    }
}

mysqli_close($link);
?>