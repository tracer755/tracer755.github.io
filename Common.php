<?php

$dbName = "3801961_bddata";
$dbHost = "pdb29.awardspace.net";
$dbPass = "Min3cr@ft!";
$db = "3801961_bddata";

$secretKey = "578439675";

function dbConnect(){

    global $dbName;
    global $secretKey;

    $link = new mysqli("pdb29.awardspace.net", "3801961_bddata", "Min3cr@ft!", "3801961_bddata")
     or die("Connection failed. %s\n" . $link -> error);

     return $link; 
}

function safe($var){
    $var = addslashes(trim($var));

    return $var;
}

function fail($errMsg){
    print $errMsg;

    exit;
}

function CloseConnection($link){
    $link -> close();
}

?>